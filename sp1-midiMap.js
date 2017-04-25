
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
