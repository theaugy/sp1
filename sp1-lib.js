//
// functions in this file should be sp1-object agnostic

var dbglog = function(msg) {
    script.midiDebug(0, 0, 0, 0, msg);
}

var mixxxSet = function(group, key, value) {
    engine.setParameter(group, key, value);
};

var mixxxVSet = function(group, key, value) {
    engine.setValue(group, key, value);
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

var mixxxVGet = function(group, key) {
    return engine.getValue(group, key);
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

var samplesToBeats = function(samples, bpm, rate) {
    var spm = rate * 60; // samples per minute
    var spb = spm / bpm; // samples per beat
    var beats = samples / spb;
    beats = beats / 2; // for reasons I do not understand, this math always comes up 2x what it should be.
    //dbglog(samples + ' samples == ' + beats + ' beats at ' + rate + 'Hz and ' + bpm + 'bpm');
    return beats;
};

var beatsToSamples = function(beats, bpm, rate) {
    var spm = rate * 60; // samples per minute
    var spb = spm / bpm; // samples per beat
    return 2 * spb * beats; // once again, comes out half what I expect
};

// most of the time, we only care about the value, since our design ensures that the
// rest of the values are superfluous
var midiValueHandler = function(f) {
    return function(channel, control, value, status, group, physKey) {
        return f(value, physKey);
    };
};

// this is apparently a sysex message understood by all serato-certified
// controllers. It will cause the controller to spit out a status for
// all of its controls (sliders/knobs, maybe also buttons will be triggered?)
var ControllerStatusSysex = [0xF0, 0x00, 0x20, 0x7F, 0x03, 0x01, 0xF7];
