//
// Creates midi handlers for a logical deck

var makeDeck = function(deckNum) {
    var ret = {};
    ret.physicalPrefix='deck' + deckNum + '_';
    ret.deck = deckNum;

    // this will map a physical midi key to a function that accepts channel,
    // status, etc.
    var midi = sp1.midi;

    ret._physGet = function (opts) {
        return ret.physicalPrefix + opts.mode + '_' + opts.shift + '_' + opts.key;
    };
    ret._mode = function(mode) {
        return ret.physicalPrefix + mode;
    };
    // shorthand for 'mode, shift, key' tuple
    ret._msk = function(m, s, k) {
        if (m === false || m === 0) {
            m = "anymode";
        }
        if (s === true) {
            s = 'shifton';
        } else {
            s = 'shiftoff';
        }
        return ret._physGet({ mode: m, shift: s, key: k });
    };

    // called by fx
    ret.deckFilterKnob = function(value) {
        var deckFilter = '[QuickEffectRack1_[Channel' + ret.deck + ']]';
        mixxxSet(deckFilter, 'super1', valueFromMidi(value));
    };
    ret.deckFilterLatch = function(value) {
        var deckFilter = '[QuickEffectRack1_[Channel' + ret.deck + ']]';
        mixxxLatch(value, deckFilter, 'enabled');
    };
    ret.deckFilterLatchGet = function() {
        var deckFilter = '[QuickEffectRack1_[Channel' + ret.deck + ']]';
        return mixxxGet(deckFilter, 'enabled');
    };

    ret.channel = '[Channel' + ret.deck + ']';

    // NOTE: If you're looking for the autoloop or param midi configurations, it is below the 'roll'
    // pad mode stuff (because it needs to be aware of the 'roll' mode)

    ret.tempoAdjust = function(value) {
        var ticks = ticksFromRotary(value);
        if (sp1.prepMode) {
            var mult = [ 1, 16, 16, 32, 64, 64, 64, 64 ];
            var i = 0;
            var adjust = function(x) {
                var n = mult[i++];
                for (var j = 0; j < n; ++j)
                {
                    mixxxButtonPress(ret.channel, x);
                }
            };
            perLeftTick(ticks, function() { adjust('beats_adjust_slower'); });
            perRightTick(ticks, function() { adjust('beats_adjust_faster'); });
            return;
        }
        perLeftTick(ticks, function() { mixxxButtonPress(ret.channel, 'rate_perm_down'); });
        perRightTick(ticks, function() { mixxxButtonPress(ret.channel, 'rate_perm_up'); });
    };

    // independent of tempo
    ret.pitchAdjust = function(value) {
        var ticks = ticksFromRotary(value);
        var pitch = mixxxVGet(ret.channel, 'pitch');
        perRightTick(ticks, function() { mixxxVSet(ret.channel, 'pitch', mixxxVGet(ret.channel, 'pitch') + 1); });
        perLeftTick(ticks, function() { mixxxVSet(ret.channel, 'pitch', mixxxVGet(ret.channel, 'pitch') - 1); });
    };
    ret.pitchReset = function(value) {
        mixxxVSet(ret.channel, 'pitch', 0);
    };

    // adjusts tempo+pitch
    ret.tempoAdjustSmall = function(value) {
        var ticks = ticksFromRotary(value);
        perLeftTick(ticks, function() { mixxxButtonPress(ret.channel, 'rate_perm_down_small'); });
        perRightTick(ticks, function() { mixxxButtonPress(ret.channel, 'rate_perm_up_small'); });
    };

    ret.tempoReset = function(value) {
        if (value == 0x7F) mixxxSet(ret.channel, 'rate', .5);
    };

    ret.tapTempo = function(value) {
        if (value == 0x7F) {
            mixxxButtonPress(ret.channel, 'bpm_tap');
        }
    };

    var sync = midiValueHandler(function(value, physKey) {
        if (sp1.prepMode) {
            if (value == 0x7F) {
                mixxxButtonPress(ret.channel, 'beats_translate_curpos');
            }
            return;
        }

        mixxxButton(value, ret.channel, 'beatsync_tempo');
        sp1.ledSet(physKey, value);
    });

    var slip = midiValueHandler(function(value) {
        if (sp1.prepMode) {
            mixxxButtonPress(ret.channel, 'cue_gotoandstop');
            return;
        }

        mixxxLatch(value, ret.channel, 'slip_enabled');
        if (value == 0x7F) {
            sp1.ledSet(ret._msk(false, false, 'slip'), mixxxGet(ret.channel, 'slip_enabled'));
        }
    });


    midi[ret._msk(false, false, 'sync')] = sync;
    midi[ret._msk(false, false, 'slip')] = slip;
    sp1.ledSet(ret._msk(false, false, 'slip'), mixxxGet(ret.channel, 'slip_enabled'));

    ret.currentPadMode = 'hotcues';
    ret.padMode = {}; // maps a pad mode name to a pad mode object
    ret.refreshPadLeds = function() {
        for (var i = 1; i <= 8; ++i) {
            sp1.ledOff(ret._msk(ret.currentPadMode, false, 'pad' + i));
            sp1.ledOff(ret._msk(ret.currentPadMode, true, 'pad' + i));
        }
        sp1.ledOff(ret._mode('hotcue'));
        sp1.ledOff(ret._mode('roll'));
        sp1.ledOff(ret._mode('slicer'));
        sp1.ledOff(ret._mode('sampler'));
        ret.padMode[ret.currentPadMode].setLeds();
    };
    ret.trackLoaded = function() {
        ret.refreshPadLeds();
    };
    ret.setPadMode = function(newmode) {
        //dbglog('setting pad mode from ' + ret.currentPadMode + ' to ' + newmode);
        ret.currentPadMode = newmode;
        ret.refreshPadLeds();
    }

    var hotcues = {}; // pad mode object
    hotcues.setLeds = function() {
        // NOTE: not doing anything with the shift-pads
        for (var i = 1; i <= 8; ++i) {
            var ledon = mixxxGet(ret.channel, 'hotcue_' + i + '_enabled');
            sp1.ledSet(ret._msk('hotcue', false, 'pad' + i), ledon);
        }
        sp1.ledOn(ret._mode('hotcue'));
    };

    // pressing hotCue button sets the current pad mode to 'hotcues'
    midi[ret._mode('hotcue')] = midiValueHandler(function(value) {
        if (value == 0x7F) {
            ret.setPadMode('hotcues');
        }
    });


    var makePad = function(hcdo, physKey) {
        midi[physKey] = midiValueHandler(function(value) {
            var hotcueBehavior = '_gotoandplay';
            if (sp1.prepMode) {
                hotcueBehavior = '_activate';
            }
            mixxxButton(value, ret.channel, hcdo + hotcueBehavior);
            if (sp1.prepMode) {
                hotcues.setLeds();
            }
        });
    };

    var shiftPad = function(hcdo, physKey) {
        midi[physKey] = midiValueHandler(function(value) {
            if (sp1.prepMode) {
                mixxxButton(value, ret.channel, hcdo + '_clear');
                hotcues.setLeds();
            }
            // no behavior currently if not in prep mode. Maybe could access
            // extra hotcues?
        });
    };

    for (var i = 1; i <= 8; ++i) {
        // NOTE: gotoandplay is used to avoid accidentally setting cue points.
        makePad('hotcue_' + i, ret._msk('hotcue', false, 'pad' + i));
        shiftPad('hotcue_' + i, ret._msk('hotcue', true, 'pad' + i));
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
        sp1.ledOn(ret._mode('roll'));
        // turn on the LED corresponding to the beat loop size we are at
        if (typeof eighths === 'undefined') {
            eighths = Math.round(roll.getLoopEighths());
        }
        if (eighths > 0) {
            if (eighths >= 1 && eighths <= (16 * 8)) {
                switch (eighths) {
                    case 1: sp1.ledOn(ret._msk('roll', false, 'pad1')); break;
                    case 2: sp1.ledOn(ret._msk('roll', false, 'pad2')); break;
                    case 4: sp1.ledOn(ret._msk('roll', false, 'pad3')); break;
                    case 8: sp1.ledOn(ret._msk('roll', false, 'pad4')); break;
                    case 16: sp1.ledOn(ret._msk('roll', false, 'pad5')); break;
                    case 32: sp1.ledOn(ret._msk('roll', false, 'pad6')); break;
                    case 64: sp1.ledOn(ret._msk('roll', false, 'pad7')); break;
                    case 128: sp1.ledOn(ret._msk('roll', false, 'pad8')); break;
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
        for (var i = 1; i <= 8; ++i) {
            sp1.ledOff(ret._msk('roll', false, 'pad' + i));
        }
    };

    midi[ret._mode('roll')] = midiValueHandler(function(value) {
        if (value == 0x7F) {
            ret.setPadMode('roll');
        }
    });

    makePad = function(lengthInBeats, setloop, physKey) {
        midi[physKey] = midiValueHandler(function(value) {
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
        });
    };

    var beatlength = (1/8);
    for (var i = 1; i <= 8; ++i) {
        makePad(beatlength, 'beatloop_' + beatlength + '_toggle', ret._msk('roll', false, 'pad' + i));
        beatlength *= 2;
    }

    // very fine-grained selection
    var shiftprepModeAutoloop = function(ticks) {
        var tmp = {};
        tmp.pos = mixxxGet(ret.channel, 'playposition');
        var posDiff = 1 / (1048576/2);
        perRightTick(ticks, function() { tmp.pos += posDiff; posDiff *= 2; });
        perLeftTick(ticks, function() { tmp.pos -= posDiff; posDiff *= 2; });
        mixxxSet(ret.channel, 'playposition', tmp.pos);
    };

    midi[ret._msk(false, false, 'autoloop')] = midiValueHandler(function(value) {
        var ticks = ticksFromRotary(value);
        if (sp1.prepMode) {
            moveTickBeats(ticks);
            return;
        }

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
    });

    midi[ret._msk(false, true, 'autoloop')] = midiValueHandler(function(value) {
        var ticks = ticksFromRotary(value);
        if (sp1.prepMode) {
            shiftprepModeAutoloop(ticks);
            return;
        }
    });

    // This doesn't seem to work with the beat loop controls? weird.
    midi[ret._msk(false, false, 'autoloopBtn')] = midiValueHandler(function(value) {
        if (sp1.prepMode) {
            if (value == 0x7F) {
                mixxxButtonPress(ret.channel, 'cue_set');
            }
            mixxxButton(value, ret.channel, 'cue_cdj');
            return;
        }
        mixxxButtonPress(ret.channel, 'reloop_exit');
    });

    // quantized set cue
    midi[ret._msk(false, true, 'autoloopBtn')] = midiValueHandler(function(value) {
        if (sp1.prepMode) {
            if (value == 0x7F) {
                var restore = mixxxGet(ret.channel, 'quantize');
                mixxxSet(ret.channel, 'quantize', true);
                mixxxButtonPress(ret.channel, 'cue_set');
                mixxxSet(ret.channel, 'quantize', restore);
            }
        };
    });

    // moves a whole beat at a time (at least)
    var moveTickBeats = function(ticks) {
        var samples = beatsToSamples(1, mixxxGet(ret.channel, 'file_bpm'), mixxxGet(ret.channel, 'track_samplerate'));
        var trackSamples = mixxxGet(ret.channel, 'track_samples');
        var tmp = {};
        tmp.pos = mixxxGet(ret.channel, 'playposition');
        var posDiff = samples / trackSamples;
        var muls = [ 1, 1, 2, 4, 8, 16, 16, 16, 16, 16, 16 ];
        var i = 0;
        var nextPosDiff = function() {
            return posDiff * muls[i++];
        };
        //dbglog(ticks + ' * ' + posDiff + ' from ' + tmp.pos + ' / ' + trackSamples + ' (' + samples + ' / beat)');
        perRightTick(ticks, function() { tmp.pos += nextPosDiff(); });
        perLeftTick(ticks, function() { tmp.pos -= nextPosDiff(); });
        //dbglog('Final position: ' + tmp.pos);
        mixxxSet(ret.channel, 'playposition', tmp.pos);
    };

    // paramleft
    midi[ret._msk('roll', false, 'paramLeft')] = midiValueHandler(function(value) {
        if (sp1.prepMode) {
            moveTickBeats(-4);
            return;
        }
        // For 2.1+:
        //mixxxButton(value, ret.channel, 'loop_move_backward_beatloop_size');
        var key = 'loop_move_' + Math.round(roll.getLoopEighths()) / 8 + '_backward';
        mixxxButton(value, ret.channel, key);
    });
    midi[ret._msk('hotcue', false, 'paramLeft')] = midi[ret._msk('roll', false, 'paramLeft')];

    // paramright
    midi[ret._msk('roll', false, 'paramRight')] = midiValueHandler(function(value) {
        if (sp1.prepMode) {
            moveTickBeats(4);
            return;
        }
        mixxxButton(value, ret.channel, 'loop_move_' + Math.round(roll.getLoopEighths()) / 8 + '_forward');
    });
    midi[ret._msk('hotcue', false, 'paramRight')] = midi[ret._msk('roll', false, 'paramRight')];

    // shift+paramleft/right jumps you 8x further
    midi[ret._msk('roll', true, 'paramLeft')] = midiValueHandler(function(value) {
        var key = 'loop_move_' + Math.round(roll.getLoopEighths()) + '_backward';
        mixxxButton(value, ret.channel, key);
    });
    midi[ret._msk('hotcue', true, 'paramLeft')] = midi[ret._msk('roll', true, 'paramLeft')];

    // shift+paramright
    midi[ret._msk('roll', true, 'paramRight')] = midiValueHandler(function(value) {
        mixxxButton(value, ret.channel, 'loop_move_' + Math.round(roll.getLoopEighths()) + '_forward');
    });
    midi[ret._msk('hotcue', true, 'paramRight')] = midi[ret._msk('roll', true, 'paramRight')];

    ret.padMode['roll'] = roll;

    return ret;
};
