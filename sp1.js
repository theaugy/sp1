
var sp1 = {};

var dbglog = function(msg) {
    script.midiDebug(0, 0, 0, 0, msg);
}

// each button/knob/etc. on the sp1 surface is identified by a status+midinumber pair.
// The map is ordered:
// left-to-right
// top-to-bottom
// F_ prefixes controls that are in the 'effects' region
// L_ prefixes controls that are in the 'left deck' region
// R_ prefixes controls that are in the 'right deck' region
// M_ prefixes controls that are in the middle region (between the vertical white dividing lines)
// _shift suffixes controls while the shift key is pressed
// Note that there is a space before the comma because I use an awk script to generate the xml for
// .midi.xml, and not having to hack off the comma keeps that script a bit simpler.
sp1.midiMap = {
    F_knob1: [ 0xB4 , 0x02 , {led: false , type: 'knob'}] ,
    F_knob1_shift: [ 0xB4 , 0x12 , {led: false , type: 'knob'}] ,
    F_knob1Detail: [ 0xB4 , 0x22 , {led: false , type: 'detail'}] ,
    F_knob1Detail_shift: [ 0xB4 , 0x32 , {led: false , type: 'detail'}] ,
    F_knob2: [ 0xB4 , 0x04 , {led: false , type: 'knob'}] ,
    F_knob2_shift: [ 0xB4 , 0x14 , {led: false , type: 'knob'}] ,
    F_knob2Detail: [ 0xB4 , 0x24 , {led: false , type: 'detail'}] ,
    F_knob2Detail_shift: [ 0xB4 , 0x34 , {led: false , type: 'detail'}] ,

    L_knob3: [ 0xB4 , 0x06 , {led: false , type: 'knob'}] ,
    L_knob3_shift: [ 0xB4 , 0x16 , {led: false , type: 'knob'}] ,
    L_knob3Detail: [ 0xB4 , 0x26 , {led: false , type: 'detail'}] ,
    L_knob3Detail_shift: [ 0xB4 , 0x36 , {led: false , type: 'detail'}] ,

    L_beatRotary: [ 0xB4 , 0x00 , {led: false , type: 'rotary'}] ,
    L_beatRotary_shift: [ 0xB4 , 0x10 , {led: false , type: 'rotary'}] ,
    L_beatRotaryBtn: [ 0x94 , 0x43 , {led: false , type: 'button'}] ,
    L_beatRotaryBtn_shift: [ 0x94 , 0x40 , {led: false , type: 'button'}] ,
    F_fxBtn1: [ 0x94 , 0x47 , {led: true , type: 'button'}] ,
    F_fxBtn2: [ 0x94 , 0x48 , {led: true , type: 'button'}] ,
    L_fxBtn3: [ 0x94 , 0x49 , {led: true , type: 'button'}] ,
    L_beatBtn: [ 0x94 , 0x4A , {led: true , type: 'button'}] ,
    L_sync: [ 0x90 , 0x58 , {led: true , type: 'button'}] ,
    L_sync_shift: [ 0x90 , 0x5C , {led: true , type: 'button'}] ,
    // the slip button sends 2 signals: a 'latch' , which automatically translates presses into latches ,
    // and a regular button , which sends a midi signal on down and up like any other button/pad
    L_slipLatch: [ 0x90 , 0x3B , {led: true , type: 'latch'}] ,
    L_slipBtn: [ 0x90 , 0x40 , {led: true , type: 'button'}] ,
    // the censor button , however , does not have a 'latch' midi signal.
    L_censor: [ 0x90 , 0x15 , {led: true , type: 'button'}] ,
    L_paramBack: [ 0x90 , 0x24 , {led: true , type: 'button'}] ,
    L_paramForward: [ 0x90 , 0x2C , {led: true , type: 'button'}] ,
    L_loopRotary: [ 0xB0 , 0x17 , {led: false , type: 'rotary'}] ,
    L_loopRotaryBtn: [ 0x90 , 0x0D , {led: false , type: 'button'}] ,
    L_hotCue: [ 0x90 , 0x1B , {led: true , type: 'button'}] ,
    L_roll: [ 0x90 , 0x1E , {led: true , type: 'button'}] ,
    L_slicer: [ 0x90 , 0x20 , {led: true , type: 'button'}] ,
    L_sampler: [ 0x90 , 0x22 , {led: true , type: 'button'}] ,

    // the sp1 does some trickyness with internal state: if you light up, for instance,
    // 'roll', it will start sending different midi messages from the pads.
    // Rather that make some kind of hierarchy here, we'll just assign those pads ascending
    // values.

    // hot cue pads
    L_pad1: [ 0x97 , 0x00 , {led: true , type: 'button'}] ,
    L_pad2: [ 0x97 , 0x01 , {led: true , type: 'button'}] ,
    L_pad3: [ 0x97 , 0x02 , {led: true , type: 'button'}] ,
    L_pad4: [ 0x97 , 0x03 , {led: true , type: 'button'}] ,
    L_pad5: [ 0x97 , 0x04 , {led: true , type: 'button'}] ,
    L_pad6: [ 0x97 , 0x05 , {led: true , type: 'button'}] ,
    L_pad7: [ 0x97 , 0x06 , {led: true , type: 'button'}] ,
    L_pad8: [ 0x97 , 0x07 , {led: true , type: 'button'}] ,

    // roll pads
    L_pad9:  [ 0x97 , 0x10 , {led: true , type: 'button'}] ,
    L_pad10: [ 0x97 , 0x11 , {led: true , type: 'button'}] ,
    L_pad11: [ 0x97 , 0x12 , {led: true , type: 'button'}] ,
    L_pad12: [ 0x97 , 0x13 , {led: true , type: 'button'}] ,
    L_pad13: [ 0x97 , 0x14 , {led: true , type: 'button'}] ,
    L_pad14: [ 0x97 , 0x15 , {led: true , type: 'button'}] ,
    L_pad15: [ 0x97 , 0x16 , {led: true , type: 'button'}] ,
    L_pad16: [ 0x97 , 0x17 , {led: true , type: 'button'}] ,

    // slicer pads: MIDINUMBERS NOT YET CONFIRMED
    L_pad17: [ 0x97 , 0x20 , {led: true , type: 'button'}] ,
    L_pad18: [ 0x97 , 0x21 , {led: true , type: 'button'}] ,
    L_pad19: [ 0x97 , 0x22 , {led: true , type: 'button'}] ,
    L_pad20: [ 0x97 , 0x23 , {led: true , type: 'button'}] ,
    L_pad21: [ 0x97 , 0x24 , {led: true , type: 'button'}] ,
    L_pad22: [ 0x97 , 0x25 , {led: true , type: 'button'}] ,
    L_pad23: [ 0x97 , 0x26 , {led: true , type: 'button'}] ,
    L_pad24: [ 0x97 , 0x27 , {led: true , type: 'button'}] ,

    // sampler pads: MIDINUMBERS NOT YET CONFIRMED
    L_pad25: [ 0x97 , 0x30 , {led: true , type: 'button'}] ,
    L_pad26: [ 0x97 , 0x31 , {led: true , type: 'button'}] ,
    L_pad27: [ 0x97 , 0x32 , {led: true , type: 'button'}] ,
    L_pad28: [ 0x97 , 0x33 , {led: true , type: 'button'}] ,
    L_pad29: [ 0x97 , 0x34 , {led: true , type: 'button'}] ,
    L_pad30: [ 0x97 , 0x35 , {led: true , type: 'button'}] ,
    L_pad31: [ 0x97 , 0x36 , {led: true , type: 'button'}] ,
    L_pad32: [ 0x97 , 0x37 , {led: true , type: 'button'}] ,

    F_knob3: [ 0xB5 , 0x02 , {led: false , type: 'knob'}] ,
    F_knob3_shift: [ 0xB5 , 0x12 , {led: false , type: 'knob'}] ,
    F_knob3Detail: [ 0xB5 , 0x22 , {led: false , type: 'detail'}] ,
    F_knob3Detail_shift: [ 0xB5 , 0x32 , {led: false , type: 'detail'}] ,
    F_knob4: [ 0xB5 , 0x04 , {led: false , type: 'knob'}] ,
    F_knob4_shift: [ 0xB5 , 0x14 , {led: false , type: 'knob'}] ,
    F_knob4Detail: [ 0xB5 , 0x24 , {led: false , type: 'detail'}] ,
    F_knob4Detail_shift: [ 0xB5 , 0x34 , {led: false , type: 'detail'}] ,

    R_knob3: [ 0xB5 , 0x06 , {led: false , type: 'knob'}] ,
    R_knob3_shift: [ 0xB5 , 0x16 , {led: false , type: 'knob'}] ,
    R_knob3Detail: [ 0xB5 , 0x26 , {led: false , type: 'detail'}] ,
    R_knob3Detail_shift: [ 0xB5 , 0x36 , {led: false , type: 'detail'}] ,

    R_beatRotary: [ 0xB5 , 0x00 , {led: false , type: 'rotary'}] ,
    R_beatRotary_shift: [ 0xB5 , 0x10 , {led: false , type: 'rotary'}] ,
    R_beatRotaryBtn: [ 0x95 , 0x43 , {led: false , type: 'button'}] ,
    R_beatRotaryBtn_shift: [ 0x95 , 0x40 , {led: false , type: 'button'}] ,
    F_fxBtn3: [ 0x95 , 0x47 , {led: true , type: 'button'}] ,
    F_fxBtn4: [ 0x95 , 0x48 , {led: true , type: 'button'}] ,
    R_fxBtn3: [ 0x95 , 0x49 , {led: true , type: 'button'}] ,
    R_beatBtn: [ 0x95 , 0x4A , {led: true , type: 'button'}] ,
    R_sync: [ 0x91 , 0x58 , {led: true , type: 'button'}] ,
    R_sync_shift: [ 0x91 , 0x5C , {led: true , type: 'button'}] ,
    R_slipLatch: [ 0x91 , 0x3B , {led: true , type: 'latch'}] ,
    R_slipBtn: [ 0x91 , 0x40 , {led: true , type: 'button'}] ,
    R_censor: [ 0x91 , 0x15 , {led: true , type: 'button'}] ,
    R_paramBack: [ 0x91 , 0x24 , {led: true , type: 'button'}] ,
    R_paramForward: [ 0x91 , 0x2C , {led: true , type: 'button'}] ,
    R_loopRotary: [ 0xB1 , 0x17 , {led: false , type: 'rotary'}] ,
    R_loopRotaryBtn: [ 0x91 , 0x0D , {led: false , type: 'button'}] ,
    R_hotCue: [ 0x91 , 0x1B , {led: true , type: 'button'}] ,
    R_roll: [ 0x91 , 0x1E , {led: true , type: 'button'}] ,
    R_slicer: [ 0x91 , 0x20 , {led: true , type: 'button'}] ,
    R_sampler: [ 0x91 , 0x22 , {led: true , type: 'button'}] ,

    // hot cue pads
    R_pad1: [ 0x98 , 0x00 , {led: true , type: 'button'}] ,
    R_pad2: [ 0x98 , 0x01 , {led: true , type: 'button'}] ,
    R_pad3: [ 0x98 , 0x02 , {led: true , type: 'button'}] ,
    R_pad4: [ 0x98 , 0x03 , {led: true , type: 'button'}] ,
    R_pad5: [ 0x98 , 0x04 , {led: true , type: 'button'}] ,
    R_pad6: [ 0x98 , 0x05 , {led: true , type: 'button'}] ,
    R_pad7: [ 0x98 , 0x06 , {led: true , type: 'button'}] ,
    R_pad8: [ 0x98 , 0x07 , {led: true , type: 'button'}] ,

    // roll pads
    R_pad9:  [ 0x98 , 0x10 , {led: true , type: 'button'}] ,
    R_pad10: [ 0x98 , 0x11 , {led: true , type: 'button'}] ,
    R_pad11: [ 0x98 , 0x12 , {led: true , type: 'button'}] ,
    R_pad12: [ 0x98 , 0x13 , {led: true , type: 'button'}] ,
    R_pad13: [ 0x98 , 0x14 , {led: true , type: 'button'}] ,
    R_pad14: [ 0x98 , 0x15 , {led: true , type: 'button'}] ,
    R_pad15: [ 0x98 , 0x16 , {led: true , type: 'button'}] ,
    R_pad16: [ 0x98 , 0x17 , {led: true , type: 'button'}] ,

    // slicer pads: MIDINUMBERS NOT YET CONFIRMED
    R_pad17: [ 0x98 , 0x20 , {led: true , type: 'button'}] ,
    R_pad18: [ 0x98 , 0x21 , {led: true , type: 'button'}] ,
    R_pad19: [ 0x98 , 0x22 , {led: true , type: 'button'}] ,
    R_pad20: [ 0x98 , 0x23 , {led: true , type: 'button'}] ,
    R_pad21: [ 0x98 , 0x24 , {led: true , type: 'button'}] ,
    R_pad22: [ 0x98 , 0x25 , {led: true , type: 'button'}] ,
    R_pad23: [ 0x98 , 0x26 , {led: true , type: 'button'}] ,
    R_pad24: [ 0x98 , 0x27 , {led: true , type: 'button'}] ,

    // sampler pads: MIDINUMBERS NOT YET CONFIRMED
    R_pad25: [ 0x98 , 0x30 , {led: true , type: 'button'}] ,
    R_pad26: [ 0x98 , 0x31 , {led: true , type: 'button'}] ,
    R_pad27: [ 0x98 , 0x32 , {led: true , type: 'button'}] ,
    R_pad28: [ 0x98 , 0x33 , {led: true , type: 'button'}] ,
    R_pad29: [ 0x98 , 0x34 , {led: true , type: 'button'}] ,
    R_pad30: [ 0x98 , 0x35 , {led: true , type: 'button'}] ,
    R_pad31: [ 0x98 , 0x36 , {led: true , type: 'button'}] ,
    R_pad32: [ 0x98 , 0x37 , {led: true , type: 'button'}] ,

    M_fxLdeck1: [ 0x96 , 0x4C , {led: true , type: 'button'}] ,
    M_fxRdeck1: [ 0x96 , 0x50 , {led: true , type: 'button'}] ,
    M_fxLdeck2: [ 0x96 , 0x4D , {led: true , type: 'button'}] ,
    M_fxRdeck2: [ 0x96 , 0x51 , {led: true , type: 'button'}] ,
    M_LdeckSelect: [ 0x92 , 0x72 , {led: true , type: 'button'}] ,
    M_RdeckSelect: [ 0x93 , 0x72 , {led: true , type: 'button'}] ,
    M_rotary: [ 0xB6 , 0x40 , {led: false , type: 'rotary'}] ,
    M_rotaryBtn: [ 0x96 , 0x41 , {led: false , type: 'button'}] ,
    M_backUtil: [ 0x96 , 0x65 , {led: false , type: 'button'}] ,
    M_loadPrep: [ 0x96 , 0x67 , {led: false , type: 'button'}] ,
    M_loadL: [ 0x96 , 0x46 , {led: true , type: 'button'}] ,
    M_loadL_shift: [ 0x96 , 0x58 , {led: true , type: 'button'}] ,
    M_loadR: [ 0x96 , 0x47 , {led: true , type: 'button'}] ,
    M_loadR_shift: [ 0x96 , 0x59 , {led: true , type: 'button'}] ,
    M_shift: [ 0x96 , 0x40 , {led: false , type: 'button'}] ,
    M_vol: [ 0xB6 , 0x03 , {led: false , type: 'knob'}] ,
    M_volDetail: [ 0xB6 , 0x23 , {led: false , type: 'detail'}]
};

// NOTE: This reflects the order in which the effects cycle in the mixxx ui.
// Therefore, this is a particularly brittle component of this script.
sp1._fx = [
     'flanger',
     'bitcrusher' ,
     'filter' ,
     'reverb' ,
     'echo' 
];

sp1._midiGet = function(physKey) {
    var midi = sp1.midiMap[physKey];
    if (typeof midi === 'undefined') {
        throw 'physKey ' + physKey + ' doesnt match anything in midiMap';
    }
    return midi;
};

sp1.ledOn = function(physKey) {
    var m = null;
    try {
        m = sp1._midiGet(physKey);
    } catch (e) {
        return;
    }
    if (m[2].led === true) {
        midi.sendShortMsg(m[0], m[1], 0x7F);
    } else {
    }
};

sp1.ledOff = function(physKey) {
    var m = null;
    try {
        m = sp1._midiGet(physKey);
    } catch (e) {
        return;
    }
    if (m[2].led === true) {
        midi.sendShortMsg(m[0], m[1], 0x00);
    }
};

sp1.ledSet = function(physKey, value) {
    var m = null;
    try {
        m = sp1._midiGet(physKey);
    } catch (e) {
        return;
    }
    if (m[2].led === true) {
        midi.sendShortMsg(m[0], m[1], value? 0x7F : 0x00);
    }
};

// this is apparently a sysex message understood by all serato-certified
// controllers. It will cause the controller to spit out a status for
// all of its controls (sliders/knobs, maybe also buttons will be triggered?)
var ControllerStatusSysex = [0xF0, 0x00, 0x20, 0x7F, 0x03, 0x01, 0xF7];

var mixxxSet = function(group, key, value) {
    engine.setParameter(group, key, value);
};

// when you want to trigger a button press+release
var mixxxButtonPress = function(group, key) {
    mixxxSet(group, key, true);
    mixxxSet(group, key, false);
};

// allows you to just forward a midi button press to a mixxx button
var mixxxButton = function(value, group, key) {
    if (value == 0x7F) {
        mixxxSet(group, key, true);
    } else if (value == 0x00) {
        mixxxSet(group, key, false);
    }
};

var mixxxLatch = function(value, group, key) {
    if (value == 0x7F) {
        mixxxToggle(group, key);
        return true;
    }
    return false;
}

var mixxxToggle = function(group, key) {
    script.toggleControl(group, key);
}

var mixxxGet = function(group, key) {
    return engine.getParameter(group, key);
};

var valueFromMidi = function(midiValue) {
    return (midiValue / 127);
};

// negative number for left turn, positive number for right turn
var ticksFromRotary = function(value) {
    if (value >= 0x70) {
        // left turn
        var ticks = 0x7F - value + 1; // fast turns produce more 'ticks'
        return 0 - ticks;
    } else if (value <= 0x10) {
        var ticks = value;
        return ticks;
    }
    dbglog('ticksFromRotary(' + value + ') is out of range (>= 0x70 or <= 0x10)');
    return 0;
};

var perLeftTick = function(ticks, func) {
    for (var i = ticks; i < 0; ++i) {
        func();
    }
};

var perRightTick = function(ticks, func) {
    for (var i = 0; i < ticks; ++i) {
        func();
    }
};

var cycleFx = function(fxunit, byAmount) {
    while (byAmount != 0) {
        if (byAmount > 0) {
            engine.setParameter(fxunit, 'next_chain', true);
            engine.setParameter(fxunit, 'next_chain', false);
            --byAmount;
        } else {
            engine.setParameter(fxunit, 'prev_chain', true);
            engine.setParameter(fxunit, 'prev_chain', false);
            ++byAmount;
        }
    }
};

samplesToBeats = function(samples, bpm, rate) {
    var spm = rate * 60; // samples per minute
    var spb = spm / bpm; // samples per beat
    var beats = samples / spb;
    beats = beats / 2; // for reasons I do not understand, this math always comes up 2x what it should be.
    //dbglog(samples + ' samples == ' + beats + ' beats at ' + rate + 'Hz and ' + bpm + 'bpm');
    return beats;
};

var makeDeck = function(deckNum) {
    var ret = {};
    if (deckNum == 1 || deckNum == 3) {
        ret.physicalPrefix = 'L_';
    } else {
        ret.physicalPrefix = 'R_';
    }
    ret.deck = deckNum;

    // this will map a physical midi key to a function that accepts channel,
    // status, etc.
    var midi = {};

    ret._physGet = function(logicalKey) {
        return ret.physicalPrefix + logicalKey;
    };
    ret._midiGet = function(logicalKey) {
        return sp1.midiMap[ret._physGet(logicalKey)];
    };


    var deckFilter = '[QuickEffectRack1_[Channel' + ret.deck + ']]';
    midi[ret._physGet('knob3')] = function(channel, control, value, status, group) {
        mixxxSet(deckFilter, 'super1', valueFromMidi(value));
    };

    midi[ret._physGet('fxBtn3')] = function(channel, control, value, status, group) {
        if (mixxxLatch(value, deckFilter, 'enabled')) {
            sp1.ledSet(ret._physGet('fxBtn3'), mixxxGet(deckFilter, 'enabled'));
        }
    };
    sp1.ledSet(ret._physGet('fxBtn3'), mixxxGet(deckFilter, 'enabled'));

    ret.channel = '[Channel' + ret.deck + ']';

    midi[ret._physGet('beatRotary')] = function(channel, control, value, status, group) {
        var ticks = ticksFromRotary(value);
        perLeftTick(ticks, function() { mixxxButtonPress(ret.channel, 'rate_perm_down'); });
        perRightTick(ticks, function() { mixxxButtonPress(ret.channel, 'rate_perm_up'); });
    };

    midi[ret._physGet('beatRotary_shift')] = function(channel, control, value, status, group) {
        var ticks = ticksFromRotary(value);
        perLeftTick(ticks, function() { mixxxButtonPress(ret.channel, 'rate_perm_down_small'); });
        perRightTick(ticks, function() { mixxxButtonPress(ret.channel, 'rate_perm_up_small'); });
    };

    midi[ret._physGet('beatRotaryBtn')] = function(channel, control, value, status, group) {
        mixxxSet(ret.channel, 'rate', .5); // reset speed
    };

    midi[ret._physGet('sync')] = function(channel, control, value, status, group) {
        mixxxButton(value, ret.channel, 'beatsync_tempo');
    };

    midi[ret._physGet('slipBtn')] = function(channel, control, value, status, group) {
        mixxxLatch(value, ret.channel, 'slip_enabled');
        if (value == 0x7F) {
            sp1.ledSet(ret._physGet('slipBtn'), mixxxGet(ret.channel, 'slip_enabled'));
        }
    };
    sp1.ledSet(ret._physGet('slipBtn'), mixxxGet(ret.channel, 'slip_enabled'));

    ret.currentPadMode = 'hotcues';
    ret.padMode = {}; // maps a pad mode name to a pad mode object
    ret.refreshPadLeds = function() {
        for (var i = 1; i <= 32; ++i) {
            sp1.ledOff(ret._physGet('pad' + i));
        }
        sp1.ledOff(ret._physGet('hotCue'));
        sp1.ledOff(ret._physGet('roll'));
        sp1.ledOff(ret._physGet('slicer'));
        sp1.ledOff(ret._physGet('sampler'));
        ret.padMode[ret.currentPadMode].setLeds();
    };
    ret.setPadMode = function(newmode) {
        //dbglog('setting pad mode from ' + ret.currentPadMode + ' to ' + newmode);
        ret.currentPadMode = newmode;
        ret.refreshPadLeds();
    }

    var hotcues = {}; // pad mode object
    hotcues.setLeds = function() {
        for (var i = 1; i <= 8; ++i) {
            sp1.ledSet(ret._physGet('pad' + i), mixxxGet(ret.channel, 'hotcue_' + i + '_enabled'));
        }
        sp1.ledOn(ret._physGet('hotCue'));
    };

    // pressing hotCue button sets the current pad mode to 'hotcues'
    midi[ret._physGet('hotCue')] = function (channel, control, value, status, group) {
        if (value == 0x7F) {
            ret.setPadMode('hotcues');
        }
    };

    var makePad = function(hactivate, physKey) {
        hotcues[physKey] = function (channel, control, value, status, group) {
            mixxxButton(value, ret.channel, hactivate);
        };
    };

    for (var i = 1; i <= 8; ++i) {
        // NOTE: gotoandplay is used to avoid accidentally setting cue points.
        makePad('hotcue_' + i + '_gotoandplay', ret._physGet('pad' + i));
    }

    ret.padMode['hotcues'] = hotcues;

    var roll = {};
    roll.getLoopEighths = function() {
        // var currentLoopLength = mixxxGet(ret.channel, 'beatloop_size'); // TODO in mixxx 2.1
        var currentLoopStart = mixxxGet(ret.channel, 'loop_start_position');
        var currentLoopEnd = mixxxGet(ret.channel, 'loop_end_position');
        if (currentLoopEnd <= currentLoopStart) return 0;
        var currentLoopLength = currentLoopEnd - currentLoopStart;
        // now we need to do some math to figure out how long the loop currently is.
        var beats = samplesToBeats(currentLoopLength, mixxxGet(ret.channel, 'file_bpm'), mixxxGet(ret.channel, 'track_samplerate'));
        var eighths = beats * 8; // our 8 pads go from 1/8th to 16 beats
        return eighths;
    };
    // OK to pass nothing for 'eighths'; setLeds() will get it itself if needed.
    roll.setLeds = function(eighths) {
        sp1.ledOn(ret._physGet('roll'));
        // turn on the LED corresponding to the beat loop size we are at
        if (typeof eighths === 'undefined') {
            eighths = Math.round(roll.getLoopEighths());
        }
        if (eighths > 0) {
            if (eighths >= 1 && eighths <= (16 * 8)) {
                switch (eighths) {
                    case 1: sp1.ledOn(ret._physGet('pad9')); break;
                    case 2: sp1.ledOn(ret._physGet('pad10')); break;
                    case 4: sp1.ledOn(ret._physGet('pad11')); break;
                    case 8: sp1.ledOn(ret._physGet('pad12')); break;
                    case 16: sp1.ledOn(ret._physGet('pad13')); break;
                    case 32: sp1.ledOn(ret._physGet('pad14')); break;
                    case 64: sp1.ledOn(ret._physGet('pad15')); break;
                    case 128: sp1.ledOn(ret._physGet('pad16')); break;
                    default:
                        dbglog(eighths + ' didnt match anything!');
                }
            } else {
                dbglog(eighths + ' 8ths cannot be represented by roll pads');
                // loop is some other size we can't represent
            }
        }
    };
    roll.clearLeds = function() {
        for (var i = 9; i <= 16; ++i) {
            sp1.ledOff(ret._physGet('pad' + i));
        }
    };

    midi[ret._physGet('roll')] = function(channel, control, value, status, group) {
        if (value == 0x7F) {
            ret.setPadMode('roll');
        }
    };

    makePad = function(lengthInBeats, setloop, physKey) {
        roll[physKey] = function (channel, control, value, status, group) {
            if (value != 0x7F) return;
            if (Math.round(roll.getLoopEighths()) == Math.round(lengthInBeats*8) && mixxxGet(ret.channel, 'loop_enabled')) {
                // loop is already set to this value and enabled. Disable the loop.
                mixxxButtonPress(ret.channel, setloop);
                // leave the LED on.
            } else {
                // change to this loop value using the setloop key, which will change the loop
                // length and enable the loop
                mixxxButtonPress(ret.channel, setloop);
                roll.clearLeds();
                sp1.ledOn(physKey);
            }
        };
    };

    var beatlength = (1/8);
    for (var i = 9; i <= 16; ++i) {
        makePad(beatlength, 'beatloop_' + beatlength + '_toggle', ret._physGet('pad' + i));
        beatlength *= 2;
    }

    midi[ret._physGet('loopRotary')] = function(channel, control, value, status, group) {
        var ticks = ticksFromRotary(value);
        var loopLength = roll.getLoopEighths();
        perRightTick(ticks, function() { mixxxButtonPress(ret.channel, 'loop_double'); loopLength *= 2; });
        perLeftTick(ticks, function() { mixxxButtonPress(ret.channel, 'loop_halve'); loopLength /= 2; });
        if (ret.currentPadMode === 'roll') {
            var rollmode = ret.padMode['roll'];
            rollmode.clearLeds();
            // it seems that loop_length doesn't get updated immediately. perhaps it's something that
            // gets updated by mixxx after we return? At any rate, we need to pass in the loop length
            // (in eighths) that setLeds() should assume, which is why we 'track' loopLength in this
            // handler.
            rollmode.setLeds(Math.round(loopLength));
        }
    };

    // This doesn't seem to work with the beat loop controls? weird.
    midi[ret._physGet('loopRotaryBtn')] = function(channel, control, value, status, group) {
        mixxxButtonPress(ret.channel, 'reloop_exit');
    };

    ret.padMode['roll'] = roll;

    // forward pad presses to our current pad mode
    var dispatchPad = function(pad, args) {
        var pads = ret.padMode[ret.currentPadMode];
        if (typeof pads === 'undefined') {
            dbglog('No pad mode matching ' + ret.currentPadMode);
            return;
        }
        var handler = pads[ret._physGet(pad)];
        if (handler) {
            handler.apply(pads, args);
        }
    };
    for (var i = 1; i <= 32; ++i) {
        midi[ret._physGet('pad' + i)] = function(i) { return function(args) {
            dispatchPad('pad' + i, arguments);
        }
        }(i);
    };

    midi[ret._physGet('loopRotaryBtn')] = function(channel, control, value, status, group) {
        mixxxButtonPress(ret.channel, 'beatsync_tempo');
    };

    ret.midi = midi;

    return ret;
};

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

sp1.init = function(id, debugging) {
    sp1.id        = id;
    sp1.debugging = debugging;

    try
    {
        sp1.fx = makeFx();
        sp1.deck1 = makeDeck(1);
        sp1.deck2 = makeDeck(2);
        sp1.deck3 = makeDeck(3);
        sp1.deck4 = makeDeck(4);

        sp1.middle = makeMiddle();

        sp1.currentLeftDeck  = sp1.deck1;
        sp1.currentRightDeck = sp1.deck2;

        sp1.buildDispatchMap();
    }
    catch (e)
    {
        sp1.exception = e + e.lineNumber;
    }

    midi.sendSysexMsg(ControllerStatusSysex, ControllerStatusSysex.length);
};

sp1.shutdown = function() {
};

// The rest of the file is basically just a thin forwarding layer.
// Each of these forwarding functions should only:
// 1) get the target deck
// 2) forward the arguments to the handler for that deck

sp1.buildDispatchMap = function() {
    var dm = {};

    var add = function(status, midinumber, f) {
        if (typeof dm[status] === 'undefined') {
            dm[status] = {};
        }
        dm[status][midinumber] = f;
    };

    // go through each key, and map the status+midinumber pair to the deck function that
    // handles it
    var physKeys = Object.keys(sp1.midiMap);
    var logicalSurfaceCall = function(physKey, surface, fargs) {
        // has the surface defined a handler for this message?
        var handler = surface.midi[physKey];
        if (typeof handler !== 'undefined') {
            handler.apply(surface, fargs);
        } else {
            var deckMappings = Object.keys(surface.midi);
        }
    };
    for (var i = 0; i < physKeys.length; ++i) {
        var midiValues = sp1.midiMap[physKeys[i]];
        var wrapper;
        if (physKeys[i].indexOf('L_') == 0) {
            // it's a left side message
            wrapper = function(physKey) { return function(args) {
                var deck  = sp1.currentLeftDeck;
                logicalSurfaceCall(physKey, deck, arguments);
            } }(physKeys[i]);
        } else if (physKeys[i].indexOf('R_') == 0) {
            // it's a right side message
            wrapper = function(physKey) { return function(args) {
                var deck  = sp1.currentRightDeck;
                logicalSurfaceCall(physKey, deck, arguments);
            } }(physKeys[i]);
        } else if (physKeys[i].indexOf('M_') == 0) {
            wrapper = function(physKey) { return function(args) {
                var middle = sp1.middle;
                logicalSurfaceCall(physKey, middle, arguments);
            }
            } (physKeys[i]);
        } else if (physKeys[i].indexOf('F_') == 0) {
            wrapper = function(physKey) { return function(args) {
                var fx = sp1.fx;
                logicalSurfaceCall(physKey, fx, arguments);
            }
            } (physKeys[i]);
        }
        if (wrapper) {
            add(midiValues[0], midiValues[1], wrapper);
        }
    }

    sp1.dispatchMap = dm;
};

sp1.dispatch = function(channel, control, value, status, group) {
    if (sp1.exception) {
        dbglog("exception during init: " + sp1.exception);
        return;
    }
    var smap = sp1.dispatchMap[status];
    if (typeof smap === 'undefined') {
        throw 'status ' + status + ' is not recognized in map: ' + JSON.stringify(sp1.dispatchMap);
    }
    var f = sp1.dispatchMap[status][control];
    if (f) {
        f.apply(sp1, arguments);
    } else {
        script.midiDebug(channel, control, value, status, group + ": Nothing in dispatch map");
    }
};
