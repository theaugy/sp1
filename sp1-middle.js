//
// Creates midi handlers for the middle section of the sp1

var makeMiddle = function() {
    var ret = {};
    ret.physicalPrefix = 'M_';
    ret._physGet = function(logicalKey) {
        return ret.physicalPrefix + logicalKey;
    };
    ret._midiGet = function(logicalKey) {
        return sp1.midiMap[ret._physGet(logicalKey)];
    };

    var midi = {};

    var unit = function(n) { return  '[EffectRack1_EffectUnit' + n + ']'};
    var chan = function(n) { return 'group_[Channel' + n + ']_enable'; };
    var fxenable = function(u, c, btn) {
        sp1.ledSet(ret._physGet(btn), mixxxGet(unit(u), chan(c)));
        return function(channel, control, value, status, group) {
            if (value == 0x7F) {
                mixxxToggle(unit(u), chan(c));
                mixxxSet(unit(u+1), chan(c), mixxxGet(unit(u), chan(c)));
                sp1.ledSet(ret._physGet(btn), mixxxGet(unit(u), chan(c)));
            }
        }
    };
    midi[ret._physGet('fxLdeck1')] = fxenable(1, 1, 'fxLdeck1');
    midi[ret._physGet('fxLdeck2')] = fxenable(1, 2, 'fxLdeck2');
    midi[ret._physGet('fxRdeck1')] = fxenable(3, 1, 'fxRdeck1');
    midi[ret._physGet('fxRdeck2')] = fxenable(3, 2, 'fxRdeck2');

    midi[ret._physGet('loadL')] = function(channel, control, value, status, group) {
        mixxxButtonPress('[Channel' + sp1.currentLeftDeck.deck + ']', 'LoadSelectedTrack');
    };
    midi[ret._physGet('loadL_shift')] = function(channel, control, value, status, group) {
        mixxxButtonPress('[Channel' + sp1.currentLeftDeck.deck + ']', 'stop');
    };
    midi[ret._physGet('loadR')] = function(channel, control, value, status, group) {
        mixxxButtonPress('[Channel' + sp1.currentRightDeck.deck + ']', 'LoadSelectedTrack');
    };
    midi[ret._physGet('loadR_shift')] = function(channel, control, value, status, group) {
        mixxxButtonPress('[Channel' + sp1.currentRightDeck.deck + ']', 'stop');
    };

    midi[ret._physGet('rotary')] = function(channel, control, value, status, group) {
        var ticks = ticksFromRotary(value);
        // These will be preferred for 2.1+
        //perLeftTick(ticks, function() { mixxxButtonPress('[Library]', 'MoveUp'); });
        //perRightTick(ticks, function() { mixxxButtonPress('[Library]', 'MoveDown'); });
        perLeftTick(ticks, function() { mixxxButtonPress('[Playlist]', 'SelectPrevTrack'); });
        perRightTick(ticks, function() { mixxxButtonPress('[Playlist]', 'SelectNextTrack'); });
    };

    ret.midi = midi;

    return ret;
};

