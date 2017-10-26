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
  ret.beatsToSamples = function(beats) {
    return beatsToSamples(beats, mixxxGet(ret.channel, 'file_bpm'), mixxxGet(ret.channel, 'track_samplerate'));
  };
  ret.samplesNormalized = function(samples) {
    return samples / mixxxGet(ret.channel, 'track_samples');
  };
  ret.normalizedToSamples = function(norm) {
    return norm * mixxxGet(ret.channel, 'track_samples');
  };
  ret.adjustLoopSamples = function(startSample, endSample) {
    var prevStart = mixxxGet(ret.channel, 'loop_start_position');
    var prevEnd = mixxxGet(ret.channel, 'loop_end_position');
    if (prevStart > endSample) {
      // new end comes before current start. adjust start first.
      mixxxSet(ret.channel, 'loop_start_position', startSample);
      mixxxSet(ret.channel, 'loop_end_position', endSample);
    } else {
      mixxxSet(ret.channel, 'loop_end_position', endSample);
      mixxxSet(ret.channel, 'loop_start_position', startSample);
    }
  };
  ret.adjustLoopNormalized = function(start, end) {
    ret.adjustLoopSamples(ret.normalizedToSamples(start), ret.normalizedToSamples(end));
  };
  ret.loopEnabled = function() {
    return mixxxGet(ret.channel, 'loop_enabled');
  };
  ret.shiftLoopBeats = function(beats) {
    if (beats === 0) return;
    mixxxSet(ret.channel, 'loop_move', beats);
  };
  ret.round = function(args) {
    return Math.floor(args.n / args.toNearest) * args.toNearest;
  };
  ret.samplesToBeats = function(samples) {
    return samplesToBeats(samples, mixxxGet(ret.channel, 'file_bpm'), mixxxGet(ret.channel, 'track_samplerate'));
  }

  ret.channel = '[Channel' + ret.deck + ']';

  var makeKnobLatch = function(group, key, override) {
    var kl = {};
    kl.latched = true;
    kl.knobValue = override;
    kl.knob = function(value) {
      kl.knobValue = value;
      if (kl.latched === true) return;
      mixxxSet(group, key, valueFromMidi(value));
    };
    kl.latch = function() {
      if (!kl.latched) {
        mixxxSet(group, key, override);
        kl.latched = true;
      } else {
        mixxxSet(group, key, valueFromMidi(kl.knobValue));
        kl.latched = false;
      }
    };
    return kl;
  };

  var deckFilter = '[QuickEffectRack1_[Channel' + ret.deck + ']]';
  var mixerEq = '[EqualizerRack1_' + ret.channel + '_Effect1]'
  var mixerLo = 'parameter1';
  var mixerHi = 'parameter3';
  ret.volume = makeKnobLatch(ret.channel, 'volume', 1);
  ret.eqLow = makeKnobLatch(mixerEq, mixerLo, .5);
  ret.eqHigh = makeKnobLatch(mixerEq, mixerHi, .5);
  ret.filter = makeKnobLatch(deckFilter, 'super1', .5);

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

  var getLoopEighths = function() {
    // var currentLoopLength = mixxxGet(ret.channel, 'beatloop_size'); // TODO in mixxx 2.1
    var currentLoopStart = mixxxGet(ret.channel, 'loop_start_position');
    var currentLoopEnd = mixxxGet(ret.channel, 'loop_end_position');
    if (currentLoopEnd <= currentLoopStart) return 0;
    var currentLoopLength = currentLoopEnd - currentLoopStart;
    // now we need to do some math to figure out how long the loop currently is.
    var beats = ret.samplesToBeats(currentLoopLength);
    var eighths = beats * 8; // our 8 pads go from 1/8th to 16 beats
    return eighths;
  };

  var hotcues = {}; // pad mode object
  hotcues.setLeds = function() {
    // NOTE: not doing anything with the shift-pads
    for (var i = 1; i <= 8; ++i) {
      var ledon = mixxxGet(ret.channel, 'hotcue_' + i + '_enabled');
      sp1.ledSet(ret._msk('hotcue', false, 'pad' + i), ledon);
    }
    sp1.ledOn(ret._mode('hotcue'));
  };

  // you can just call pressDown(), hotcuePressed(), and release(), and
  // recordLoop should handle it from there
  var recordLoop = {
    recording: false,
    padPressedAtSample: -1, // _position of hotcue pressed, if any
    pressedAt: -1,
    reset: function() {
      this.recording = false;
      this.padPressedAtSample = -1;
      this.pressedAt = -1;
    },
    ledOn: function() {
      sp1.ledOn(ret._msk(false, false, 'autoloop'));
    },
    ledOff: function() {
      sp1.ledOff(ret._msk(false, false, 'autoloop'));
    },
    pressDown: function() {
      dbglog("recordLoop down");
      var nowEnabled = !ret.loopEnabled(); // invert because we're flipping it
      if (nowEnabled) {
        this.reset();
        this.recording = true;
        this.pressedAt = mixxxGet(ret.channel, 'position');
      }
      else {
        // turn off loop. Maybe this should be done in release?
        mixxxButtonPress(ret.channel, 'reloop_exit');
        this.ledOff();
      }
    },
    roundSample: function(sample) {
      return ret.round({
        n: sample,
        toNearest: ret.beatsToSamples(1)
      });
    },
    release: function() {
      dbglog("recordLoop up");
      if (this.recording === true) { // shouldn't be necessary, but defensive
        var currentPosNorm = mixxxGet(ret.channel, 'playposition');
        var currentPosSample = ret.normalizedToSamples(currentPosNorm);
        var currentPosRounded = this.roundSample(currentPosSample);
        var startAtSample;
        if (this.padPressedAtSample > -1) {
          // start at pad position
          startAtSample = this.roundSample(this.padPressedAtSample);
        }
        else {
          // start at position where recordLoop button was pressed
          startAtSample = this.roundSample(this.pressedAt);
        }
        // establish loop. First, let's try computing the number of
        // beats, using beatloop_n_toggle, then shifting it (similar to
        // how slicer does it)
        var beatLength = ret.round({
          n: ret.samplesToBeats(currentPosRounded - startAtSample),
          toNearest: 1
        });
        mixxxButtonPress(ret.channel, 'beatloop_' + beatLength + '_toggle');
        ret.shiftLoopBeats(beatLength);
        this.ledOn();
      }
      else {
        console.log("recordLoop not recording??");
        this.reset(); // take this opportunity to reset
        this.ledOff();
      }
    },
    // little awkward that we accept 'hotcue_i' instead of just i, but
    // that is easiest given the implementation of makePad for hotcue mode
    hotcuePressed: function(hcdo) {
      if (this.recording === true) {
        this.padPressedAtSample = mixxxGet(ret.channel,  hcdo + '_position');
      }
    }
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
      recordLoop.hotcuePressed(hcdo);
    });
  };

  var shiftPad = function(hcdo, physKey) {
    midi[physKey] = midiValueHandler(function(value) {
      if (sp1.prepMode) {
        mixxxButton(value, ret.channel, hcdo + '_clear');
        hotcues.setLeds();
        return;
      }
      // goto hotcue and begin 4 beat loop
      if (value == 0x7F) {
        var pos = mixxxGet(ret.channel, hcdo + '_position'); // in samples
        if (pos == -1)
        {
          dbglog(hcdo + ' is not set');
          return;
        }
        var samples = ret.beatsToSamples(4);
        mixxxSet(ret.channel, 'playposition', ret.samplesNormalized(pos));
        ret.adjustLoopSamples(pos, pos+samples);
        if (!ret.loopEnabled())
        {
          mixxxButtonPress(ret.channel, 'reloop_exit');
        }
      }
    });
  };

  for (var i = 1; i <= 8; ++i) {
    // NOTE: gotoandplay is used to avoid accidentally setting cue points.
    makePad('hotcue_' + i, ret._msk('hotcue', false, 'pad' + i));
    shiftPad('hotcue_' + i, ret._msk('hotcue', true, 'pad' + i));
  }

  ret.padMode['hotcues'] = hotcues;

  var roll = {};
  // OK to pass nothing for 'eighths'; setLeds() will get it itself if needed.
  roll.setLeds = function(eighths) {
    sp1.ledOn(ret._mode('roll'));
    // turn on the LED corresponding to the beat loop size we are at
    if (typeof eighths === 'undefined') {
      eighths = Math.round(getLoopEighths());
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
      recordLoop.pressDown();
    }
    else {
      recordLoop.release();
    }
  });

  // emulates the behavior of Serato's slicer
  var slicer = {};
  slicer.reservedHotcue = 'hotcue_36';
  ret.padMode['slicer'] = slicer;
  slicer.beats = 8;
  slicer.slice0 = -1;
  slicer.currentSlice = -1;
  slicer.padstack = [];
  slicer.ensureReferenceDownbeat = function() {
    if (!mixxxGet(ret.channel, slicer.reservedHotcue + '_enabled')) {
      dbglog(slicer.reservedHotcue + ' is not set...');
      for (var i = 1; i <= 8; ++i) {
        if (mixxxGet(ret.channel, 'hotcue_' + i + '_enabled')) {
          // assume that the first non-empty hotcue is on a downbeat. The user can
          // press Shift+Slicer to override this.
          var pos = mixxxGet(ret.channel, 'hotcue_' + i + '_position');
          return ret.samplesNormalized(pos);
        }
      }
      throw "Cannot use slicer features without a reference downbeat. Press Shift+Slicer on a downbeat.";
    } else {
      return ret.samplesNormalized(mixxxGet(ret.channel, slicer.reservedHotcue + '_position'));
    }
  };
  slicer.setLeds = function() {
    for (var i = 1; i <= 8; ++i) {
      sp1.ledSet(ret._msk('slicer', false, 'pad' + i), slicer.beats === (1/4) * Math.pow(2, i - 1));
    }
    sp1.ledOn(ret._mode('slicer'));
  };

  var setSliceLoop = function(pad) {
    var referenceNorm = slicer.ensureReferenceDownbeat();
    var currentPosNorm = mixxxGet(ret.channel, 'playposition');
    // "section" is the extent being sliced
    // slice0 = normalized offset of start of section
    // quant = length of slice in beats
    // slicer.beats = length of section in beats
    var quant = slicer.beats / 8;
    var sectionLengthNorm = ret.samplesNormalized(ret.beatsToSamples(slicer.beats));

    var slice0 = slicer.slice0;
    var currentPositionRoundedToSlice = slicer.currentSlice;
    if (slice0 === -1) {
      slice0 = ret.round({
        n: Math.abs(currentPosNorm - referenceNorm),
        toNearest: sectionLengthNorm });
      slicer.slice0 = slice0;

      currentPositionRoundedToSlice = ret.round({ // slice-rounded normalized offset
        n: Math.abs(currentPosNorm - referenceNorm),
        toNearest: (sectionLengthNorm / 8) });

      if (slicer.padstack.length !== 0) {
        dbglog("WHOA! Somehow, padstack is non-empty but slicer.slice0 isn't set");
      }

      mixxxSet(ret.channel, 'slip_enabled', true);
      sp1.ledSet(ret._msk(false, false, 'slip'), mixxxGet(ret.channel, 'slip_enabled'));
    }

    // normalized offset for this slice
    var slicePad = slice0 + (pad-1) * ret.samplesNormalized(ret.beatsToSamples(quant));

    // are we currently quantized? assume so.
    var beatDiff = slicePad - currentPositionRoundedToSlice; // normalized diff
    // convert normalized to beat
    beatDiff = ret.samplesToBeats(ret.normalizedToSamples(beatDiff));

    slicer.currentSlice = slicePad;

    //dbglog("Currently in section " + slice0 / sectionLengthNorm + ", pos " + sliceCurrentPos + ", beatDiff = " + beatDiff);

    // turn on our beat loop
    if (!ret.loopEnabled()) {
      dbglog("enabling beatloop " + quant);
      mixxxButtonPress(ret.channel, 'beatloop_' + quant + '_toggle');
    }
    // and shift it beatDiff
    dbglog("Shifting beatloop by " + beatDiff);
    ret.shiftLoopBeats(beatDiff);
  };

  makePad = function(pad, physKey, shiftPhysKey) {
    midi[physKey] = midiValueHandler(function(value) {
      if (value == 0x7F) {
        setSliceLoop(pad);
        slicer.padstack.push( { pad: pad } );
      } else if (slicer.beats !== 0) {
        var waslast = false;
        for (var i = 0; i < slicer.padstack.length; ++i) {
          if (slicer.padstack[i].pad === pad) {
            break;
          }
        }
        if (i >= 0 && i < slicer.padstack.length)
        {
          if (i === slicer.padstack.length - 1)
            waslast = true;
          slicer.padstack.splice(i, 1);
        }
        else
          return;
        if (slicer.padstack.length !== 0)
        {
          if (waslast) {
            // update loop to match top of pad stack
            var last = slicer.padstack[slicer.padstack.length - 1];
            setSliceLoop(last.pad);
          }
          return;
        }
        dbglog("turning off loop");
        slicer.slice0 = -1;
        // turn off the loop
        if (ret.loopEnabled()) {
          mixxxButtonPress(ret.channel, 'reloop_exit');
        }
        // disable slip
        mixxxSet(ret.channel, 'slip_enabled', false);
        sp1.ledSet(ret._msk(false, false, 'slip'), mixxxGet(ret.channel, 'slip_enabled'));
      }
    });
    midi[shiftPhysKey] = midiValueHandler(function(value) {
      if (value == 0x7F) {
        slicer.beats = (1/4) * Math.pow(2, pad - 1);
        slicer.setLeds();
      }
    });
  };

  for (var i = 1; i <= 8; ++i)
  {
    makePad(i, ret._msk('slicer', false, 'pad' + i), ret._msk('slicer', true, 'pad' + i));
  }

  midi[ret._mode('slicer')] = midiValueHandler(function(value) {
    return;
    if (value == 0x7F) {
      ret.setPadMode('slicer');
    }
  });
  // shift + slicer to reset the slicer size
  midi[ret._mode('manualloop')] = midiValueHandler(function(value) {
    if (value == 0x7F) {
      // set the reference downbeat to current position
      dbglog("Setting reference downbeat");
      mixxxButtonPress(ret.channel, slicer.reservedHotcue + '_clear');
      mixxxButtonPress(ret.channel, slicer.reservedHotcue + '_set');
      slicer.setLeds();
    }
  });

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

    var loopLength = getLoopEighths();
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
    var samples = ret.beatsToSamples(1);
    var tmp = {};
    tmp.pos = mixxxGet(ret.channel, 'playposition');
    var posDiff = ret.samplesNormalized(samples);
    var muls = [ 1, 1, 2, 4, 8, 16, 16, 16, 16, 16, 16 ];
    var i = 0;
    var nextPosDiff = function() {
      return posDiff * muls[i++];
    };
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
    var key = 'loop_move_' + Math.round(getLoopEighths()) / 8 + '_backward';
    mixxxButton(value, ret.channel, key);
  });
  midi[ret._msk('hotcue', false, 'paramLeft')] = midi[ret._msk('roll', false, 'paramLeft')];

  // paramright
  midi[ret._msk('roll', false, 'paramRight')] = midiValueHandler(function(value) {
    if (sp1.prepMode) {
      moveTickBeats(4);
      return;
    }
    mixxxButton(value, ret.channel, 'loop_move_' + Math.round(getLoopEighths()) / 8 + '_forward');
  });
  midi[ret._msk('hotcue', false, 'paramRight')] = midi[ret._msk('roll', false, 'paramRight')];

  // shift+paramleft/right jumps you 8x further
  midi[ret._msk('roll', true, 'paramLeft')] = midiValueHandler(function(value) {
    var key = 'loop_move_' + Math.round(getLoopEighths()) + '_backward';
    mixxxButton(value, ret.channel, key);
  });
  midi[ret._msk('hotcue', true, 'paramLeft')] = midi[ret._msk('roll', true, 'paramLeft')];

  // shift+paramright
  midi[ret._msk('roll', true, 'paramRight')] = midiValueHandler(function(value) {
    mixxxButton(value, ret.channel, 'loop_move_' + Math.round(getLoopEighths()) + '_forward');
  });
  midi[ret._msk('hotcue', true, 'paramRight')] = midi[ret._msk('roll', true, 'paramRight')];

  ret.padMode['roll'] = roll;

  return ret;
};
