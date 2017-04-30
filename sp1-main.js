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
        sp1.midi = {};
        sp1.prepMode = false;
        sp1.getLeftDeck = function() {
            return this.currentLeftDeck;
        };
        sp1.getRightDeck = function() {
            return this.currentRightDeck;
        }
        sp1.fx = makeFx();
        sp1.deck1 = makeDeck(1);
        sp1.deck2 = makeDeck(2);
        sp1.deck3 = makeDeck(3);
        sp1.deck4 = makeDeck(4);

        // NOTE: middle controls currentLeftDeck/currentRightDeck
        sp1.middle = makeMiddle();

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

    sp1.handlers = [];

    var add = function(status, midinumber, f) {
        if (typeof dm[status] === 'undefined') {
            dm[status] = {};
        }
        dm[status][midinumber] = f;
    };

    // go through each key, and map the status+midinumber pair to the deck function that
    // handles it
    var physKeys = Object.keys(sp1.midiMap);

    var thises = {};
    thises['deck1_'] = sp1.deck1;
    thises['deck2_'] = sp1.deck2;
    thises['deck3_'] = sp1.deck3;
    thises['deck4_'] = sp1.deck4;
    thises['middle_'] = sp1.middle;
    thises['fx_'] = sp1.fx;

    var thisesKeys = Object.keys(thises);

    for (var i = 0; i < physKeys.length; ++i) {
        var midiValues = sp1.midiMap[physKeys[i]];
        var wrapper = function(physKey) {
            var This = null;
            for (var t = 0; t < thisesKeys.length; ++t) {
                if (physKey.indexOf(thisesKeys[t] == 0)) {
                    This = thises[thisesKeys[t]];
                    break;
                }
            }
            if (This === null) {
                throw "Couldn't find a this for " + physKey;
            }
            var handler = sp1.midi[physKey];
            if (handler) {
                sp1.handlers.push(physKey);
                return function (args) {
                    var fargs = Array.prototype.slice.call(arguments);
                    fargs.push(physKey);
                    //dbglog(physKey + ' : ' + handler);
                    handler.apply(This, fargs);
                }
            } else {
                return undefined;
            }
        } (physKeys[i]);
        add(midiValues[0], midiValues[1], wrapper);
    }

    sp1.dispatchMap = dm;
};

sp1.dumpMidiHandlers = function() {
    dbglog(JSON.stringify(sp1.midi));
    dbglog(JSON.stringify(sp1.handlers));
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
        //dbglog(status + ' ' + control + ' -> ' + f);
        f.apply(null, arguments);
    } else {
        //script.midiDebug(channel, control, value, status, group + ": Nothing in dispatch map");
        //sp1.dumpMidiHandlers();
    }
};

