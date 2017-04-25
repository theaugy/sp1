// This is the 'main' file from which sp1.js is generated.
// It just includes the other components, and sets up the
// dispatch map.

var sp1 = {};

//// include sp1-midiMap.js
//// include sp1-lib.js
//// include sp1-deck.js
//// include sp1-middle.js
//// include sp1-fx.js

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

