//
// Creates midi handlers for a logical deck

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

    // NOTE: If you're looking for the autoloop or param midi configurations, it is below the 'roll'
    // pad mode stuff (because it needs to be aware of the 'roll' mode)

    var tempoAdjust = midiValueHandler(function(value) {
        var ticks = ticksFromRotary(value);
        perLeftTick(ticks, function() { mixxxButtonPress(ret.channel, 'rate_perm_down'); });
        perRightTick(ticks, function() { mixxxButtonPress(ret.channel, 'rate_perm_up'); });
    });

    // independent of tempo
    var pitchAdjust = midiValueHandler(function(value) {
        var ticks = ticksFromRotary(value);
        var pitch = mixxxVGet(ret.channel, 'pitch');
        dbglog("pitch is: " + pitch);
        perRightTick(ticks, function() { mixxxVSet(ret.channel, 'pitch', mixxxVGet(ret.channel, 'pitch') + 1); });
        perLeftTick(ticks, function() { mixxxVSet(ret.channel, 'pitch', mixxxVGet(ret.channel, 'pitch') - 1); });
    });
    var pitchReset = midiValueHandler(function(value) {
        mixxxVSet(ret.channel, 'pitch', 0);
    });

    // adjusts tempo+pitch
    var tempoAdjustSmall = midiValueHandler(function(value) {
        var ticks = ticksFromRotary(value);
        perLeftTick(ticks, function() { mixxxButtonPress(ret.channel, 'rate_perm_down_small'); });
        perRightTick(ticks, function() { mixxxButtonPress(ret.channel, 'rate_perm_up_small'); });
    });

    var tempoReset = midiValueHandler(function(value) {
        if (value == 0x7F) mixxxSet(ret.channel, 'rate', .5);
    });

    midi[ret._physGet('beatRotary')] = tempoAdjust;
    midi[ret._physGet('beatRotary_shift')] = pitchAdjust;
    midi[ret._physGet('beatRotaryBtn')] = tempoReset;
    midi[ret._physGet('beatRotaryBtn_shift')] = pitchReset;

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

    midi[ret._physGet('paramBackRoll')] = function(channel, control, value, status, group) {
        // For 2.1+:
        //mixxxButton(value, ret.channel, 'loop_move_backward_beatloop_size');
        var key = 'loop_move_' + Math.round(roll.getLoopEighths()) / 8 + '_backward';
        mixxxButton(value, ret.channel, key);
    };
    midi[ret._physGet('paramBackHotcue')] = midi[ret._physGet('paramBackRoll')];
    midi[ret._physGet('paramForwardRoll')] = function(channel, control, value, status, group) {
        mixxxButton(value, ret.channel, 'loop_move_' + Math.round(roll.getLoopEighths()) / 8 + '_forward');
    };
    midi[ret._physGet('paramForwardHotcue')] = midi[ret._physGet('paramForwardRoll')];

    // holding shift jumps you 8x further
    midi[ret._physGet('paramBackRoll_shift')] = function(channel, control, value, status, group) {
        var key = 'loop_move_' + Math.round(roll.getLoopEighths()) + '_backward';
        mixxxButton(value, ret.channel, key);
    };
    midi[ret._physGet('paramBackHotcue_shift')] = midi[ret._physGet('paramBackRoll_shift')];
    midi[ret._physGet('paramForwardRoll_shift')] = function(channel, control, value, status, group) {
        mixxxButton(value, ret.channel, 'loop_move_' + Math.round(roll.getLoopEighths()) + '_forward');
    };
    midi[ret._physGet('paramForwardHotcue_shift')] = midi[ret._physGet('paramForwardRoll_shift')];

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
