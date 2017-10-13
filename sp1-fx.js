//
// Creates midi handlers for the fx portion of the sp1
// Note that the 'fx portion' refers to the portion that
// _we_ use as the global fx (first 2 knobs/latches on each side)

// NOTE: This reflects the order in which the effects cycle in the mixxx ui.
// Therefore, this is a particularly brittle component of this script.
sp1._fx = [
     'flanger',
     'bitcrusher' ,
     'filter' ,
     'reverb' ,
     'echo' 
];

var makeFx = function() {

    var ret = {};
    var midi = sp1.midi;
    ret.physicalPrefix = 'fx_';
    ret._physGet = function(shift, logicalKey) {
        return ret.physicalPrefix + (shift? 'shifton_' : 'shiftoff_') + logicalKey;
    };

    var fxgroup = function(num) {
        return '[EffectRack1_EffectUnit' + num + ']';
    };

    cycleFx(fxgroup(1), 1+sp1._fx.indexOf('flanger'));
    cycleFx(fxgroup(2), 1+sp1._fx.indexOf('bitcrusher'));
    cycleFx(fxgroup(3), 1+sp1._fx.indexOf('reverb'));
    // setting link_type requires us to obey 'midi takeover' rules when we initialize
    // (i.e., when we send the sysex message) which isn't ideal. We'll just set it ourselves.
    //mixxxSet('[EffectRack1_EffectUnit3_Effect1]', 'parameter2_link_type', 1);
    // Note: link_inverse doesn't seem to work at all.
    //mixxxSet('[EffectRack1_EffectUnit3_Effect1]', 'parameter2_link_inverse', true);
    cycleFx(fxgroup(4), 1+sp1._fx.indexOf('echo'));

    // no shift support here yet
    var makeFxControl = function(knob, latch, groupNum) {
        midi[ret._physGet(false, knob)] = midiValueHandler(function(value) {
            mixxxSet(fxgroup(groupNum), 'super1', valueFromMidi(value));
            // mix should very quickly hit max (note that we rely on mixxx to 'clip' the value
            // once we hit 0x7F
            mixxxSet(fxgroup(groupNum), 'mix', valueFromMidi(value*value / 4));
        });
        midi[ret._physGet(false, latch)] = midiValueHandler(function(value) {
            if (value == 0x7F) {
                mixxxToggle(fxgroup(groupNum), 'enabled');
                sp1.ledSet(ret._physGet(false, latch), mixxxGet(fxgroup(groupNum), 'enabled'));
            }
        });
        sp1.ledSet(ret._physGet(false, latch), mixxxGet(fxgroup(groupNum), 'enabled'));
    };

    makeFxControl('fx1knob1', 'fx1latch1', 1);
    makeFxControl('fx1knob2', 'fx1latch2', 2);
    // reverb needs special handling: 1) damping inversed 2) set parameter2 instead of super1
    (function(knob, latch, groupNum) {
        midi[ret._physGet(false, knob)] = function(channel, control, value, status, group) {
            mixxxSet('[EffectRack1_EffectUnit3_Effect1]', 'parameter2', valueFromMidi(0x7F - value));
            mixxxSet(fxgroup(groupNum), 'mix', valueFromMidi(value*value / 4));
        };
        midi[ret._physGet(false, latch)] = function(channel, control, value, status, group) {
            if (value == 0x7F) {
                mixxxToggle(fxgroup(groupNum), 'enabled');
                sp1.ledSet(ret._physGet(false, latch), mixxxGet(fxgroup(groupNum), 'enabled'));
            }
        };
        sp1.ledSet(ret._physGet(false, latch), mixxxGet(fxgroup(groupNum), 'enabled'));
    })('fx2knob1', 'fx2latch1', 3);
    makeFxControl('fx2knob2', 'fx2latch2', 4);

    var connectToDeckKnobLatch = function(getDeckFn, knobLatchName, knob, latch) {
        midi[ret._physGet(false, knob)] = midiValueHandler(function(value) {
            getDeckFn()[knobLatchName].knob(value);
        });
        midi[ret._physGet(false, latch)] = midiValueHandler(function(value) {
            if (value === 127) {
                getDeckFn()[knobLatchName].latch();
                var isLatched = getDeckFn()[knobLatchName].latched === true;
                sp1.ledSet(ret._physGet(false, latch), isLatched);
            }
        });
    };

    var getLeftDeck = function() { return sp1.getLeftDeck(); };
    var getRightDeck = function() { return sp1.getRightDeck(); };
    // knob3/latch3 are redirected to the current left or right deck's volume
    connectToDeckKnobLatch(getLeftDeck, 'volume', 'fx1knob3', 'fx1latch3');
    connectToDeckKnobLatch(getRightDeck, 'volume', 'fx2knob3', 'fx2latch3');
    // knob2/latch2 are redirected to current left/right deck's low eq
    connectToDeckKnobLatch(getLeftDeck, 'eqHigh', 'fx1knob2', 'fx1latch2');
    connectToDeckKnobLatch(getRightDeck, 'eqHigh', 'fx2knob2', 'fx2latch2');
    // knob1/latch1 are redirected to current left/right deck's low eq
    connectToDeckKnobLatch(getLeftDeck, 'eqLow', 'fx1knob1', 'fx1latch1');
    connectToDeckKnobLatch(getRightDeck, 'eqLow', 'fx2knob1', 'fx2latch1');

    ret.updateDeckLeds = function() {
        return;
        sp1.ledSet(ret._physGet(false, 'fx1latch1'), sp1.getLeftDeck().eqLowLatchGet());
        sp1.ledSet(ret._physGet(false, 'fx2latch1'), sp1.getRightDeck().eqLowLatchGet());

        sp1.ledSet(ret._physGet(false, 'fx1latch2'), sp1.getLeftDeck().eqHighLatchGet());
        sp1.ledSet(ret._physGet(false, 'fx2latch2'), sp1.getRightDeck().eqHighLatchGet());

        sp1.ledSet(ret._physGet(false, 'fx1latch3'), sp1.getLeftDeck().volumeLatchGet());
        sp1.ledSet(ret._physGet(false, 'fx2latch3'), sp1.getRightDeck().volumeLatchGet());
    };

    // forward rotary to left/right deck
    midi[ret._physGet(false, 'fx1rotary')] = midiValueHandler(function(value) {
        sp1.getLeftDeck().tempoAdjust(value);
    });
    midi[ret._physGet(true, 'fx1rotary')] = midiValueHandler(function(value) {
        sp1.getLeftDeck().pitchAdjust(value);
    });
    midi[ret._physGet(false, 'fx2rotary')] = midiValueHandler(function(value) {
        sp1.getRightDeck().tempoAdjust(value);
    });
    midi[ret._physGet(true, 'fx2rotary')] = midiValueHandler(function(value) {
        sp1.getRightDeck().pitchAdjust(value);
    });
    midi[ret._physGet(false, 'fx1rotaryLatch')] = midiValueHandler(function(value) {
        sp1.getLeftDeck().tapTempo(value);
    });

    midi[ret._physGet(false, 'fx1rotaryBtn')] = midiValueHandler(function(value) {
        sp1.getLeftDeck().tempoReset(value);
    });
    midi[ret._physGet(true, 'fx1rotaryBtn')] = midiValueHandler(function(value) {
        sp1.getLeftDeck().pitchReset(value);
    });
    midi[ret._physGet(false, 'fx2rotaryBtn')] = midiValueHandler(function(value) {
        sp1.getRightDeck().tempoReset(value);
    });
    midi[ret._physGet(true, 'fx2rotaryBtn')] = midiValueHandler(function(value) {
        sp1.getRightDeck().pitchReset(value);
    });
    midi[ret._physGet(false, 'fx2rotaryLatch')] = midiValueHandler(function(value) {
        sp1.getRightDeck().tapTempo(value);
    });

    return ret;
};

