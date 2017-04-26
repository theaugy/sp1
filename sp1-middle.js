//
// Creates midi handlers for the middle section of the sp1

var makeMiddle = function() {
    var ret = {};
    ret.physicalPrefix = 'middle_';
    // NOTE: _physGet cannot get the shift key itself (though no need for that yet)
    ret._physGet = function(shift, logicalKey) {
        return ret.physicalPrefix + (shift? 'shifton_' : 'shiftoff_') + logicalKey;
    };

    var midi = sp1.midi;

    var unit = function(n) { return  '[EffectRack1_EffectUnit' + n + ']'};
    var chan = function(n) { return 'group_[Channel' + n + ']_enable'; };
    var fxenable = function(u, c, led) {
        sp1.ledSet(led, mixxxGet(unit(u), chan(c)));
        return midiValueHandler(function(value) {
            if (value == 0x7F) {
                mixxxToggle(unit(u), chan(c));
                mixxxSet(unit(u+1), chan(c), mixxxGet(unit(u), chan(c)));
                var enabled = mixxxGet(unit(u), chan(c));
                sp1.ledSet(led, enabled);
            }
        });
    };
    midi[ret._physGet(false, 'fxAssignL1')] = fxenable(1, 1, ret._physGet(false, 'fxAssignL1'));
    midi[ret._physGet(false, 'fxAssignL2')] = fxenable(1, 2, ret._physGet(false, 'fxAssignL2'));
    midi[ret._physGet(false, 'fxAssignR1')] = fxenable(3, 1, ret._physGet(false, 'fxAssignR1'));
    midi[ret._physGet(false, 'fxAssignR2')] = fxenable(3, 2, ret._physGet(false, 'fxAssignR2'));

    midi[ret._physGet(true, 'fxAssignL1')] = fxenable(1, 3, ret.physicalPrefix + 'fx1Assign3LED');
    midi[ret._physGet(true, 'fxAssignL2')] = fxenable(1, 4, ret.physicalPrefix + 'fx1Assign4LED');
    midi[ret._physGet(true, 'fxAssignR1')] = fxenable(3, 3, ret.physicalPrefix + 'fx2Assign3LED');
    midi[ret._physGet(true, 'fxAssignR2')] = fxenable(3, 4, ret.physicalPrefix + 'fx2Assign4LED');

    var toggleDecks = function(options) {
        var ondeck = options.ondeck;
        var offdeck = options.offdeck;
        var led = options.led;
        var member = options.member;
        var current = sp1[member]; // we'll treat this as the off deck
        return midiValueHandler(function(value) {
            if (value == 0x7F) {
                // toggle deck
                sp1[member] = (sp1[member] === ondeck)? offdeck : ondeck;
                sp1.ledSet(led, sp1[member] === ondeck);
            }
        });
    };
    var momentaryDeckSwitch = function(options) {
        var ondeck = options.ondeck;
        var offdeck = options.offdeck;
        var led = options.led;
        var member = options.member;
        return midiValueHandler(function(value) {
            if (value === 0x7F) {
                sp1[member] = ondeck;
                sp1.ledSet(led, true);
            } else {
                sp1[member] = offdeck;
                sp1.ledSet(led, false);
            }
        });
    };

    // while deck3 is pressed, left side is deck3
    midi[ret._physGet(false, 'selectDeck3')] = momentaryDeckSwitch(
        { ondeck: sp1.deck3, offdeck: sp1.deck1,
          led: ret._physGet(false, 'selectDeck3'),
          member: 'currentLeftDeck'
        });
    // shift+deck3 toggles deck3/deck1
    midi[ret._physGet(true, 'selectDeck3')] = toggleDecks(
        { ondeck: sp1.deck3, offdeck: sp1.deck1,
          led: ret._physGet(false, 'selectDeck3'),
          member: 'currentLeftDeck'
        });

    // same for right side
    midi[ret._physGet(false, 'selectDeck4')] = momentaryDeckSwitch(
        { ondeck: sp1.deck4, offdeck: sp1.deck2,
          led: ret._physGet(false, 'selectDeck4'),
          member: 'currentRightDeck'
        });
    midi[ret._physGet(true, 'selectDeck4')] = toggleDecks(
        { ondeck: sp1.deck4, offdeck: sp1.deck2,
          led: ret._physGet(false, 'selectDeck4'),
          member: 'currentRightDeck'
        });

    var loadDeckN = function(deck) {

        midi[ret._physGet(false, 'load' + deck)] = midiValueHandler(function(value) {
            mixxxButtonPress('[Channel' + deck + ']', 'LoadSelectedTrack');
        });
        // shift+load stops the deck
        midi[ret._physGet(true, 'load' + deck)] = midiValueHandler(function(value) {
            mixxxButtonPress('[Channel' + deck + ']', 'stop');
        });

    };

    loadDeckN(1);
    loadDeckN(2);
    loadDeckN(3);
    loadDeckN(4);

    midi[ret._physGet(false, 'rotary')] = midiValueHandler(function(value) {
        var ticks = ticksFromRotary(value);
        // These will be preferred for 2.1+
        //perLeftTick(ticks, function() { mixxxButtonPress('[Library]', 'MoveUp'); });
        //perRightTick(ticks, function() { mixxxButtonPress('[Library]', 'MoveDown'); });
        perLeftTick(ticks, function() { mixxxButtonPress('[Playlist]', 'SelectPrevTrack'); });
        perRightTick(ticks, function() { mixxxButtonPress('[Playlist]', 'SelectNextTrack'); });
    });

    sp1.ledSet(ret._physGet(false, 'selectDeck3'), false);
    sp1.ledSet(ret._physGet(false, 'selectDeck4'), false);
    sp1.currentLeftDeck  = sp1.deck1;
    sp1.currentRightDeck = sp1.deck2;

    midi[ret._physGet(false, 'volume')] = midiValueHandler(function(value) {
        // whichever deck is NOT currently active, adjust its volume
        if (sp1.getLeftDeck().deck === 1) {
            mixxxSet('[Channel3]', 'volume', valueFromMidi(value));
        } else {
            mixxxSet('[Channel1]', 'volume', valueFromMidi(value));
        }
    });
    // shift + volume to access the not-active right deck
    midi[ret._physGet(true, 'volume')] = midiValueHandler(function(value) {
        // whichever deck is NOT currently active, adjust its volume
        if (sp1.getRightDeck().deck === 2) {
            mixxxSet('[Channel4]', 'volume', valueFromMidi(value));
        } else {
            mixxxSet('[Channel2]', 'volume', valueFromMidi(value));
        }
    });

    ret.midi = midi;

    return ret;
};

