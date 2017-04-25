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
    var midi = {};
    ret.physicalPrefix = 'F_';
    ret._physGet = function(logicalKey) {
        return ret.physicalPrefix + logicalKey;
    };
    ret._midiGet = function(logicalKey) {
        return sp1.midiMap[ret._physGet(logicalKey)];
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

    var makeFxControl = function(knob, latch, groupNum) {
        midi[ret._physGet(knob)] = function(channel, control, value, status, group) {
            mixxxSet(fxgroup(groupNum), 'super1', valueFromMidi(value));
            // mix should very quickly hit max (note that we rely on mixxx to 'clip' the value
            // once we hit 0x7F
            mixxxSet(fxgroup(groupNum), 'mix', valueFromMidi(value*value / 4));
        };
        midi[ret._physGet(latch)] = function(channel, control, value, status, group) {
            if (value == 0x7F) {
                mixxxToggle(fxgroup(groupNum), 'enabled');
                sp1.ledSet(ret._physGet(latch), mixxxGet(fxgroup(groupNum), 'enabled'));
            }
        };
        sp1.ledSet(ret._physGet(latch), mixxxGet(fxgroup(groupNum), 'enabled'));
    };

    makeFxControl('knob1', 'fxBtn1', 1);
    makeFxControl('knob2', 'fxBtn2', 2);
    //makeFxControl('knob3', 'fxBtn3', 3);
    // reverb needs special handling: 1) damping inversed 2) set parameter2 instead of super1
    (function(knob, latch, groupNum) {
        midi[ret._physGet(knob)] = function(channel, control, value, status, group) {
            mixxxSet('[EffectRack1_EffectUnit3_Effect1]', 'parameter2', valueFromMidi(0x7F - value));
            mixxxSet(fxgroup(groupNum), 'mix', valueFromMidi(value*value / 4));
        };
        midi[ret._physGet(latch)] = function(channel, control, value, status, group) {
            if (value == 0x7F) {
                mixxxToggle(fxgroup(groupNum), 'enabled');
                sp1.ledSet(ret._physGet(latch), mixxxGet(fxgroup(groupNum), 'enabled'));
            }
        };
        sp1.ledSet(ret._physGet(latch), mixxxGet(fxgroup(groupNum), 'enabled'));
    })('knob3', 'fxBtn3', 3);
    makeFxControl('knob4', 'fxBtn4', 4);
    // Note that 'L_knob3' and 'R_knob3' is reserved for the deck-specific filter effect

    ret.midi = midi;
    return ret;
};

