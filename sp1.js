// This is the 'main' file from which sp1.js is generated.
// It just includes the other components, and sets up the
// dispatch map.

var sp1 = {};

//// include sp1-midiMap.js

// each button/knob/etc. on the sp1 surface is identified by a status+midinumber pair.
// The map is ordered:
// Note that there is a space before the comma because I use an awk script to generate the xml for
// .midi.xml, and not having to hack off the comma keeps that script a bit simpler.
sp1.midiMap = {
deck1_anymode_shiftoff_autoloop:       [  0xB0  ,  0x17  ,  {  led:  false,  type:  "button"  }  ],
deck1_anymode_shiftoff_autoloopBtn:    [  0x90  ,  0x0D  ,  {  led:  true,  type:  "button"  }  ],
deck1_anymode_shiftoff_censor:         [  0x90  ,  0x15  ,  {  led:  true,  type:  "button"  }  ],
deck1_anymode_shiftoff_slip:           [  0x90  ,  0x40  ,  {  led:  true,  type:  "button"  }  ],
deck1_anymode_shiftoff_sync:           [  0x90  ,  0x58  ,  {  led:  true,  type:  "button"  }  ],
deck1_anymode_shifton_autoloop:        [  0xB0  ,  0x37  ,  {  led:  false,  type:  "button"  }  ],
deck1_anymode_shifton_autoloopBtn:     [  0x9E  ,  0x02  ,  {  led:  true,  type:  "button"  }  ],
deck1_anymode_shifton_censor:          [  0x90  ,  0x38  ,  {  led:  true,  type:  "button"  }  ],
deck1_anymode_shifton_slip:            [  0x90  ,  0x63  ,  {  led:  true,  type:  "button"  }  ],
deck1_anymode_shifton_sync:            [  0x90  ,  0x5C  ,  {  led:  true,  type:  "button"  }  ],
deck1_autoloop:                        [  0x90  ,  0x6B  ,  {  led:  true,  type:  "button"  }  ],
deck1_autoloop_shiftoff_pad1:          [  0x97  ,  0x50  ,  {  led:  true,  type:  "button"  }  ],
deck1_autoloop_shiftoff_pad2:          [  0x97  ,  0x51  ,  {  led:  true,  type:  "button"  }  ],
deck1_autoloop_shiftoff_pad3:          [  0x97  ,  0x52  ,  {  led:  true,  type:  "button"  }  ],
deck1_autoloop_shiftoff_pad4:          [  0x97  ,  0x53  ,  {  led:  true,  type:  "button"  }  ],
deck1_autoloop_shiftoff_pad5:          [  0x97  ,  0x54  ,  {  led:  true,  type:  "button"  }  ],
deck1_autoloop_shiftoff_pad6:          [  0x97  ,  0x55  ,  {  led:  true,  type:  "button"  }  ],
deck1_autoloop_shiftoff_pad7:          [  0x97  ,  0x56  ,  {  led:  true,  type:  "button"  }  ],
deck1_autoloop_shiftoff_pad8:          [  0x97  ,  0x57  ,  {  led:  true,  type:  "button"  }  ],
deck1_autoloop_shiftoff_paramLeft:     [  0x90  ,  0x29  ,  {  led:  true,  type:  "button"  }  ],
deck1_autoloop_shiftoff_paramRight:    [  0x90  ,  0x31  ,  {  led:  true,  type:  "button"  }  ],
deck1_autoloop_shifton_pad1:           [  0x97  ,  0x58  ,  {  led:  true,  type:  "button"  }  ],
deck1_autoloop_shifton_pad2:           [  0x97  ,  0x59  ,  {  led:  true,  type:  "button"  }  ],
deck1_autoloop_shifton_pad3:           [  0x97  ,  0x5a  ,  {  led:  true,  type:  "button"  }  ],
deck1_autoloop_shifton_pad4:           [  0x97  ,  0x5b  ,  {  led:  true,  type:  "button"  }  ],
deck1_autoloop_shifton_pad5:           [  0x97  ,  0x5c  ,  {  led:  true,  type:  "button"  }  ],
deck1_autoloop_shifton_pad6:           [  0x97  ,  0x5d  ,  {  led:  true,  type:  "button"  }  ],
deck1_autoloop_shifton_pad7:           [  0x97  ,  0x5e  ,  {  led:  true,  type:  "button"  }  ],
deck1_autoloop_shifton_pad8:           [  0x97  ,  0x5f  ,  {  led:  true,  type:  "button"  }  ],
deck1_autoloop_shifton_paramLeft:      [  0x90  ,  0x06  ,  {  led:  true,  type:  "button"  }  ],
deck1_autoloop_shifton_paramRight:     [  0x90  ,  0x7E  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotcue:                          [  0x90  ,  0x1B  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotcue_shiftoff_pad1:            [  0x97  ,  0x00  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotcue_shiftoff_pad2:            [  0x97  ,  0x01  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotcue_shiftoff_pad3:            [  0x97  ,  0x02  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotcue_shiftoff_pad4:            [  0x97  ,  0x03  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotcue_shiftoff_pad5:            [  0x97  ,  0x04  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotcue_shiftoff_pad6:            [  0x97  ,  0x05  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotcue_shiftoff_pad7:            [  0x97  ,  0x06  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotcue_shiftoff_pad8:            [  0x97  ,  0x07  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotcue_shiftoff_paramLeft:       [  0x90  ,  0x24  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotcue_shiftoff_paramRight:      [  0x90  ,  0x2C  ,  {  led:  false,  type:  "button"  }  ],
deck1_hotcue_shifton_pad1:             [  0x97  ,  0x08  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotcue_shifton_pad2:             [  0x97  ,  0x09  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotcue_shifton_pad3:             [  0x97  ,  0x0a  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotcue_shifton_pad4:             [  0x97  ,  0x0b  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotcue_shifton_pad5:             [  0x97  ,  0x0c  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotcue_shifton_pad6:             [  0x97  ,  0x0d  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotcue_shifton_pad7:             [  0x97  ,  0x0e  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotcue_shifton_pad8:             [  0x97  ,  0x0f  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotcue_shifton_paramLeft:        [  0x90  ,  0x01  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotcue_shifton_paramRight:       [  0x90  ,  0x09  ,  {  led:  false,  type:  "button"  }  ],
deck1_hotloop:                         [  0x90  ,  0x69  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotloop_shiftoff_pad1:           [  0x97  ,  0x40  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotloop_shiftoff_pad2:           [  0x97  ,  0x41  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotloop_shiftoff_pad3:           [  0x97  ,  0x42  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotloop_shiftoff_pad4:           [  0x97  ,  0x43  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotloop_shiftoff_pad5:           [  0x97  ,  0x44  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotloop_shiftoff_pad6:           [  0x97  ,  0x45  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotloop_shiftoff_pad7:           [  0x97  ,  0x46  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotloop_shiftoff_pad8:           [  0x97  ,  0x47  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotloop_shiftoff_paramLeft:      [  0x90  ,  0x28  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotloop_shiftoff_paramRight:     [  0x90  ,  0x30  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotloop_shifton_pad1:            [  0x97  ,  0x48  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotloop_shifton_pad2:            [  0x97  ,  0x49  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotloop_shifton_pad3:            [  0x97  ,  0x4a  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotloop_shifton_pad4:            [  0x97  ,  0x4b  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotloop_shifton_pad5:            [  0x97  ,  0x4c  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotloop_shifton_pad6:            [  0x97  ,  0x4d  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotloop_shifton_pad7:            [  0x97  ,  0x4e  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotloop_shifton_pad8:            [  0x97  ,  0x4f  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotloop_shifton_paramLeft:       [  0x90  ,  0x05  ,  {  led:  true,  type:  "button"  }  ],
deck1_hotloop_shifton_paramRight:      [  0x90  ,  0x7D  ,  {  led:  false,  type:  "button"  }  ],
deck1_manualloop:                      [  0x90  ,  0x6D  ,  {  led:  false,  type:  "button"  }  ],
deck1_manualloop_shiftoff_pad1:        [  0x97  ,  0x60  ,  {  led:  true,  type:  "button"  }  ],
deck1_manualloop_shiftoff_pad2:        [  0x97  ,  0x61  ,  {  led:  true,  type:  "button"  }  ],
deck1_manualloop_shiftoff_pad3:        [  0x97  ,  0x62  ,  {  led:  true,  type:  "button"  }  ],
deck1_manualloop_shiftoff_pad4:        [  0x97  ,  0x63  ,  {  led:  true,  type:  "button"  }  ],
deck1_manualloop_shiftoff_pad5:        [  0x97  ,  0x64  ,  {  led:  true,  type:  "button"  }  ],
deck1_manualloop_shiftoff_pad6:        [  0x97  ,  0x65  ,  {  led:  true,  type:  "button"  }  ],
deck1_manualloop_shiftoff_pad7:        [  0x97  ,  0x66  ,  {  led:  true,  type:  "button"  }  ],
deck1_manualloop_shiftoff_pad8:        [  0x97  ,  0x67  ,  {  led:  true,  type:  "button"  }  ],
deck1_manualloop_shiftoff_paramLeft:   [  0x90  ,  0x2A  ,  {  led:  true,  type:  "button"  }  ],
deck1_manualloop_shiftoff_paramRight:  [  0x90  ,  0x32  ,  {  led:  false,  type:  "button"  }  ],
deck1_manualloop_shifton_pad1:         [  0x97  ,  0x68  ,  {  led:  true,  type:  "button"  }  ],
deck1_manualloop_shifton_pad2:         [  0x97  ,  0x69  ,  {  led:  true,  type:  "button"  }  ],
deck1_manualloop_shifton_pad3:         [  0x97  ,  0x6a  ,  {  led:  true,  type:  "button"  }  ],
deck1_manualloop_shifton_pad4:         [  0x97  ,  0x6b  ,  {  led:  true,  type:  "button"  }  ],
deck1_manualloop_shifton_pad5:         [  0x97  ,  0x6c  ,  {  led:  true,  type:  "button"  }  ],
deck1_manualloop_shifton_pad6:         [  0x97  ,  0x6d  ,  {  led:  true,  type:  "button"  }  ],
deck1_manualloop_shifton_pad7:         [  0x97  ,  0x6e  ,  {  led:  true,  type:  "button"  }  ],
deck1_manualloop_shifton_pad8:         [  0x97  ,  0x6f  ,  {  led:  true,  type:  "button"  }  ],
deck1_manualloop_shifton_paramLeft:    [  0x90  ,  0x07  ,  {  led:  true,  type:  "button"  }  ],
deck1_manualloop_shifton_paramRight:   [  0x90  ,  0x7F  ,  {  led:  false,  type:  "button"  }  ],
deck1_roll:                            [  0x90  ,  0x1E  ,  {  led:  true,  type:  "button"  }  ],
deck1_roll_shiftoff_pad1:              [  0x97  ,  0x10  ,  {  led:  true,  type:  "button"  }  ],
deck1_roll_shiftoff_pad2:              [  0x97  ,  0x11  ,  {  led:  true,  type:  "button"  }  ],
deck1_roll_shiftoff_pad3:              [  0x97  ,  0x12  ,  {  led:  true,  type:  "button"  }  ],
deck1_roll_shiftoff_pad4:              [  0x97  ,  0x13  ,  {  led:  true,  type:  "button"  }  ],
deck1_roll_shiftoff_pad5:              [  0x97  ,  0x14  ,  {  led:  true,  type:  "button"  }  ],
deck1_roll_shiftoff_pad6:              [  0x97  ,  0x15  ,  {  led:  true,  type:  "button"  }  ],
deck1_roll_shiftoff_pad7:              [  0x97  ,  0x16  ,  {  led:  true,  type:  "button"  }  ],
deck1_roll_shiftoff_pad8:              [  0x97  ,  0x17  ,  {  led:  true,  type:  "button"  }  ],
deck1_roll_shiftoff_paramLeft:         [  0x90  ,  0x25  ,  {  led:  true,  type:  "button"  }  ],
deck1_roll_shiftoff_paramRight:        [  0x90  ,  0x2D  ,  {  led:  true,  type:  "button"  }  ],
deck1_roll_shifton_pad1:               [  0x97  ,  0x18  ,  {  led:  true,  type:  "button"  }  ],
deck1_roll_shifton_pad2:               [  0x97  ,  0x19  ,  {  led:  true,  type:  "button"  }  ],
deck1_roll_shifton_pad3:               [  0x97  ,  0x1a  ,  {  led:  true,  type:  "button"  }  ],
deck1_roll_shifton_pad4:               [  0x97  ,  0x1b  ,  {  led:  true,  type:  "button"  }  ],
deck1_roll_shifton_pad5:               [  0x97  ,  0x1c  ,  {  led:  true,  type:  "button"  }  ],
deck1_roll_shifton_pad6:               [  0x97  ,  0x1d  ,  {  led:  true,  type:  "button"  }  ],
deck1_roll_shifton_pad7:               [  0x97  ,  0x1e  ,  {  led:  true,  type:  "button"  }  ],
deck1_roll_shifton_pad8:               [  0x97  ,  0x1f  ,  {  led:  true,  type:  "button"  }  ],
deck1_roll_shifton_paramLeft:          [  0x90  ,  0x02  ,  {  led:  true,  type:  "button"  }  ],
deck1_roll_shifton_paramRight:         [  0x90  ,  0x7A  ,  {  led:  false,  type:  "button"  }  ],
deck1_sampler:                         [  0x90  ,  0x22  ,  {  led:  false,  type:  "button"  }  ],
deck1_sampler_shiftoff_pad1:           [  0x97  ,  0x30  ,  {  led:  true,  type:  "button"  }  ],
deck1_sampler_shiftoff_pad2:           [  0x97  ,  0x31  ,  {  led:  true,  type:  "button"  }  ],
deck1_sampler_shiftoff_pad3:           [  0x97  ,  0x32  ,  {  led:  true,  type:  "button"  }  ],
deck1_sampler_shiftoff_pad4:           [  0x97  ,  0x33  ,  {  led:  true,  type:  "button"  }  ],
deck1_sampler_shiftoff_pad5:           [  0x97  ,  0x34  ,  {  led:  true,  type:  "button"  }  ],
deck1_sampler_shiftoff_pad6:           [  0x97  ,  0x35  ,  {  led:  true,  type:  "button"  }  ],
deck1_sampler_shiftoff_pad7:           [  0x97  ,  0x36  ,  {  led:  true,  type:  "button"  }  ],
deck1_sampler_shiftoff_pad8:           [  0x97  ,  0x37  ,  {  led:  true,  type:  "button"  }  ],
deck1_sampler_shiftoff_paramLeft:      [  0x90  ,  0x27  ,  {  led:  true,  type:  "button"  }  ],
deck1_sampler_shiftoff_paramRight:     [  0x90  ,  0x2F  ,  {  led:  false,  type:  "button"  }  ],
deck1_sampler_shifton_pad1:            [  0x97  ,  0x38  ,  {  led:  true,  type:  "button"  }  ],
deck1_sampler_shifton_pad2:            [  0x97  ,  0x39  ,  {  led:  true,  type:  "button"  }  ],
deck1_sampler_shifton_pad3:            [  0x97  ,  0x3a  ,  {  led:  true,  type:  "button"  }  ],
deck1_sampler_shifton_pad4:            [  0x97  ,  0x3b  ,  {  led:  true,  type:  "button"  }  ],
deck1_sampler_shifton_pad5:            [  0x97  ,  0x3c  ,  {  led:  true,  type:  "button"  }  ],
deck1_sampler_shifton_pad6:            [  0x97  ,  0x3d  ,  {  led:  true,  type:  "button"  }  ],
deck1_sampler_shifton_pad7:            [  0x97  ,  0x3e  ,  {  led:  true,  type:  "button"  }  ],
deck1_sampler_shifton_pad8:            [  0x97  ,  0x3f  ,  {  led:  true,  type:  "button"  }  ],
deck1_sampler_shifton_paramLeft:       [  0x90  ,  0x04  ,  {  led:  true,  type:  "button"  }  ],
deck1_sampler_shifton_paramRight:      [  0x90  ,  0x7C  ,  {  led:  false,  type:  "button"  }  ],
deck1_slicer:                          [  0x90  ,  0x20  ,  {  led:  true,  type:  "button"  }  ],
deck1_slicer_shiftoff_pad1:            [  0x97  ,  0x20  ,  {  led:  true,  type:  "button"  }  ],
deck1_slicer_shiftoff_pad2:            [  0x97  ,  0x21  ,  {  led:  true,  type:  "button"  }  ],
deck1_slicer_shiftoff_pad3:            [  0x97  ,  0x22  ,  {  led:  true,  type:  "button"  }  ],
deck1_slicer_shiftoff_pad4:            [  0x97  ,  0x23  ,  {  led:  true,  type:  "button"  }  ],
deck1_slicer_shiftoff_pad5:            [  0x97  ,  0x24  ,  {  led:  true,  type:  "button"  }  ],
deck1_slicer_shiftoff_pad6:            [  0x97  ,  0x25  ,  {  led:  true,  type:  "button"  }  ],
deck1_slicer_shiftoff_pad7:            [  0x97  ,  0x26  ,  {  led:  true,  type:  "button"  }  ],
deck1_slicer_shiftoff_pad8:            [  0x97  ,  0x27  ,  {  led:  true,  type:  "button"  }  ],
deck1_slicer_shiftoff_paramLeft:       [  0x90  ,  0x26  ,  {  led:  true,  type:  "button"  }  ],
deck1_slicer_shiftoff_paramRight:      [  0x90  ,  0x2E  ,  {  led:  true,  type:  "button"  }  ],
deck1_slicer_shifton_pad1:             [  0x97  ,  0x28  ,  {  led:  true,  type:  "button"  }  ],
deck1_slicer_shifton_pad2:             [  0x97  ,  0x29  ,  {  led:  true,  type:  "button"  }  ],
deck1_slicer_shifton_pad3:             [  0x97  ,  0x2a  ,  {  led:  true,  type:  "button"  }  ],
deck1_slicer_shifton_pad4:             [  0x97  ,  0x2b  ,  {  led:  true,  type:  "button"  }  ],
deck1_slicer_shifton_pad5:             [  0x97  ,  0x2c  ,  {  led:  true,  type:  "button"  }  ],
deck1_slicer_shifton_pad6:             [  0x97  ,  0x2d  ,  {  led:  true,  type:  "button"  }  ],
deck1_slicer_shifton_pad7:             [  0x97  ,  0x2e  ,  {  led:  true,  type:  "button"  }  ],
deck1_slicer_shifton_pad8:             [  0x97  ,  0x2f  ,  {  led:  true,  type:  "button"  }  ],
deck1_slicer_shifton_paramLeft:        [  0x90  ,  0x03  ,  {  led:  true,  type:  "button"  }  ],
deck1_slicer_shifton_paramRight:       [  0x90  ,  0x7B  ,  {  led:  false,  type:  "button"  }  ],
deck1_velocity:                        [  0x90  ,  0x6F  ,  {  led:  false,  type:  "button"  }  ],
deck1_velocity_shiftoff_pad1:          [  0x97  ,  0x70  ,  {  led:  true,  type:  "button"  }  ],
deck1_velocity_shiftoff_pad2:          [  0x97  ,  0x71  ,  {  led:  true,  type:  "button"  }  ],
deck1_velocity_shiftoff_pad3:          [  0x97  ,  0x72  ,  {  led:  true,  type:  "button"  }  ],
deck1_velocity_shiftoff_pad4:          [  0x97  ,  0x73  ,  {  led:  true,  type:  "button"  }  ],
deck1_velocity_shiftoff_pad5:          [  0x97  ,  0x74  ,  {  led:  true,  type:  "button"  }  ],
deck1_velocity_shiftoff_pad6:          [  0x97  ,  0x75  ,  {  led:  true,  type:  "button"  }  ],
deck1_velocity_shiftoff_pad7:          [  0x97  ,  0x76  ,  {  led:  true,  type:  "button"  }  ],
deck1_velocity_shiftoff_pad8:          [  0x97  ,  0x77  ,  {  led:  true,  type:  "button"  }  ],
deck1_velocity_shiftoff_paramLeft:     [  0x90  ,  0x2B  ,  {  led:  true,  type:  "button"  }  ],
deck1_velocity_shiftoff_paramRight:    [  0x90  ,  0x33  ,  {  led:  false,  type:  "button"  }  ],
deck1_velocity_shifton_pad1:           [  0x97  ,  0x78  ,  {  led:  true,  type:  "button"  }  ],
deck1_velocity_shifton_pad2:           [  0x97  ,  0x79  ,  {  led:  true,  type:  "button"  }  ],
deck1_velocity_shifton_pad3:           [  0x97  ,  0x7a  ,  {  led:  true,  type:  "button"  }  ],
deck1_velocity_shifton_pad4:           [  0x97  ,  0x7b  ,  {  led:  true,  type:  "button"  }  ],
deck1_velocity_shifton_pad5:           [  0x97  ,  0x7c  ,  {  led:  true,  type:  "button"  }  ],
deck1_velocity_shifton_pad6:           [  0x97  ,  0x7d  ,  {  led:  true,  type:  "button"  }  ],
deck1_velocity_shifton_pad7:           [  0x97  ,  0x7e  ,  {  led:  true,  type:  "button"  }  ],
deck1_velocity_shifton_pad8:           [  0x97  ,  0x7f  ,  {  led:  true,  type:  "button"  }  ],
deck1_velocity_shifton_paramLeft:      [  0x90  ,  0x08  ,  {  led:  true,  type:  "button"  }  ],
deck1_velocity_shifton_paramRight:     [  0x90  ,  0x00  ,  {  led:  false,  type:  "button"  }  ],
deck2_anymode_shiftoff_autoloop:       [  0xB1  ,  0x17  ,  {  led:  false,  type:  "button"  }  ],
deck2_anymode_shiftoff_autoloopBtn:    [  0x91  ,  0x0D  ,  {  led:  true,  type:  "button"  }  ],
deck2_anymode_shiftoff_censor:         [  0x91  ,  0x15  ,  {  led:  true,  type:  "button"  }  ],
deck2_anymode_shiftoff_slip:           [  0x91  ,  0x40  ,  {  led:  true,  type:  "button"  }  ],
deck2_anymode_shiftoff_sync:           [  0x91  ,  0x58  ,  {  led:  true,  type:  "button"  }  ],
deck2_anymode_shifton_autoloop:        [  0xB1  ,  0x37  ,  {  led:  false,  type:  "button"  }  ],
deck2_anymode_shifton_autoloopBtn:     [  0x9E  ,  0x12  ,  {  led:  true,  type:  "button"  }  ],
deck2_anymode_shifton_censor:          [  0x91  ,  0x38  ,  {  led:  true,  type:  "button"  }  ],
deck2_anymode_shifton_slip:            [  0x91  ,  0x63  ,  {  led:  true,  type:  "button"  }  ],
deck2_anymode_shifton_sync:            [  0x91  ,  0x5C  ,  {  led:  true,  type:  "button"  }  ],
deck2_autoloop:                        [  0x91  ,  0x6B  ,  {  led:  true,  type:  "button"  }  ],
deck2_autoloop_shiftoff_pad1:          [  0x98  ,  0x50  ,  {  led:  true,  type:  "button"  }  ],
deck2_autoloop_shiftoff_pad2:          [  0x98  ,  0x51  ,  {  led:  true,  type:  "button"  }  ],
deck2_autoloop_shiftoff_pad3:          [  0x98  ,  0x52  ,  {  led:  true,  type:  "button"  }  ],
deck2_autoloop_shiftoff_pad4:          [  0x98  ,  0x53  ,  {  led:  true,  type:  "button"  }  ],
deck2_autoloop_shiftoff_pad5:          [  0x98  ,  0x54  ,  {  led:  true,  type:  "button"  }  ],
deck2_autoloop_shiftoff_pad6:          [  0x98  ,  0x55  ,  {  led:  true,  type:  "button"  }  ],
deck2_autoloop_shiftoff_pad7:          [  0x98  ,  0x56  ,  {  led:  true,  type:  "button"  }  ],
deck2_autoloop_shiftoff_pad8:          [  0x98  ,  0x57  ,  {  led:  true,  type:  "button"  }  ],
deck2_autoloop_shiftoff_paramLeft:     [  0x91  ,  0x29  ,  {  led:  true,  type:  "button"  }  ],
deck2_autoloop_shiftoff_paramRight:    [  0x91  ,  0x31  ,  {  led:  true,  type:  "button"  }  ],
deck2_autoloop_shifton_pad1:           [  0x98  ,  0x58  ,  {  led:  true,  type:  "button"  }  ],
deck2_autoloop_shifton_pad2:           [  0x98  ,  0x59  ,  {  led:  true,  type:  "button"  }  ],
deck2_autoloop_shifton_pad3:           [  0x98  ,  0x5a  ,  {  led:  true,  type:  "button"  }  ],
deck2_autoloop_shifton_pad4:           [  0x98  ,  0x5b  ,  {  led:  true,  type:  "button"  }  ],
deck2_autoloop_shifton_pad5:           [  0x98  ,  0x5c  ,  {  led:  true,  type:  "button"  }  ],
deck2_autoloop_shifton_pad6:           [  0x98  ,  0x5d  ,  {  led:  true,  type:  "button"  }  ],
deck2_autoloop_shifton_pad7:           [  0x98  ,  0x5e  ,  {  led:  true,  type:  "button"  }  ],
deck2_autoloop_shifton_pad8:           [  0x98  ,  0x5f  ,  {  led:  true,  type:  "button"  }  ],
deck2_autoloop_shifton_paramLeft:      [  0x91  ,  0x06  ,  {  led:  true,  type:  "button"  }  ],
deck2_autoloop_shifton_paramRight:     [  0x91  ,  0x7E  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotcue:                          [  0x91  ,  0x1B  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotcue_shiftoff_pad1:            [  0x98  ,  0x00  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotcue_shiftoff_pad2:            [  0x98  ,  0x01  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotcue_shiftoff_pad3:            [  0x98  ,  0x02  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotcue_shiftoff_pad4:            [  0x98  ,  0x03  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotcue_shiftoff_pad5:            [  0x98  ,  0x04  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotcue_shiftoff_pad6:            [  0x98  ,  0x05  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotcue_shiftoff_pad7:            [  0x98  ,  0x06  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotcue_shiftoff_pad8:            [  0x98  ,  0x07  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotcue_shiftoff_paramLeft:       [  0x91  ,  0x24  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotcue_shiftoff_paramRight:      [  0x91  ,  0x2C  ,  {  led:  false,  type:  "button"  }  ],
deck2_hotcue_shifton_pad1:             [  0x98  ,  0x08  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotcue_shifton_pad2:             [  0x98  ,  0x09  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotcue_shifton_pad3:             [  0x98  ,  0x0a  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotcue_shifton_pad4:             [  0x98  ,  0x0b  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotcue_shifton_pad5:             [  0x98  ,  0x0c  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotcue_shifton_pad6:             [  0x98  ,  0x0d  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotcue_shifton_pad7:             [  0x98  ,  0x0e  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotcue_shifton_pad8:             [  0x98  ,  0x0f  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotcue_shifton_paramLeft:        [  0x91  ,  0x01  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotcue_shifton_paramRight:       [  0x91  ,  0x09  ,  {  led:  false,  type:  "button"  }  ],
deck2_hotloop:                         [  0x91  ,  0x69  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotloop_shiftoff_pad1:           [  0x98  ,  0x40  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotloop_shiftoff_pad2:           [  0x98  ,  0x41  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotloop_shiftoff_pad3:           [  0x98  ,  0x42  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotloop_shiftoff_pad4:           [  0x98  ,  0x43  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotloop_shiftoff_pad5:           [  0x98  ,  0x44  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotloop_shiftoff_pad6:           [  0x98  ,  0x45  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotloop_shiftoff_pad7:           [  0x98  ,  0x46  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotloop_shiftoff_pad8:           [  0x98  ,  0x47  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotloop_shiftoff_paramLeft:      [  0x91  ,  0x28  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotloop_shiftoff_paramRight:     [  0x91  ,  0x30  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotloop_shifton_pad1:            [  0x98  ,  0x48  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotloop_shifton_pad2:            [  0x98  ,  0x49  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotloop_shifton_pad3:            [  0x98  ,  0x4a  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotloop_shifton_pad4:            [  0x98  ,  0x4b  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotloop_shifton_pad5:            [  0x98  ,  0x4c  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotloop_shifton_pad6:            [  0x98  ,  0x4d  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotloop_shifton_pad7:            [  0x98  ,  0x4e  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotloop_shifton_pad8:            [  0x98  ,  0x4f  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotloop_shifton_paramLeft:       [  0x91  ,  0x05  ,  {  led:  true,  type:  "button"  }  ],
deck2_hotloop_shifton_paramRight:      [  0x91  ,  0x7D  ,  {  led:  false,  type:  "button"  }  ],
deck2_manualloop:                      [  0x91  ,  0x6D  ,  {  led:  false,  type:  "button"  }  ],
deck2_manualloop_shiftoff_pad1:        [  0x98  ,  0x60  ,  {  led:  true,  type:  "button"  }  ],
deck2_manualloop_shiftoff_pad2:        [  0x98  ,  0x61  ,  {  led:  true,  type:  "button"  }  ],
deck2_manualloop_shiftoff_pad3:        [  0x98  ,  0x62  ,  {  led:  true,  type:  "button"  }  ],
deck2_manualloop_shiftoff_pad4:        [  0x98  ,  0x63  ,  {  led:  true,  type:  "button"  }  ],
deck2_manualloop_shiftoff_pad5:        [  0x98  ,  0x64  ,  {  led:  true,  type:  "button"  }  ],
deck2_manualloop_shiftoff_pad6:        [  0x98  ,  0x65  ,  {  led:  true,  type:  "button"  }  ],
deck2_manualloop_shiftoff_pad7:        [  0x98  ,  0x66  ,  {  led:  true,  type:  "button"  }  ],
deck2_manualloop_shiftoff_pad8:        [  0x98  ,  0x67  ,  {  led:  true,  type:  "button"  }  ],
deck2_manualloop_shiftoff_paramLeft:   [  0x91  ,  0x2A  ,  {  led:  true,  type:  "button"  }  ],
deck2_manualloop_shiftoff_paramRight:  [  0x91  ,  0x32  ,  {  led:  false,  type:  "button"  }  ],
deck2_manualloop_shifton_pad1:         [  0x98  ,  0x68  ,  {  led:  true,  type:  "button"  }  ],
deck2_manualloop_shifton_pad2:         [  0x98  ,  0x69  ,  {  led:  true,  type:  "button"  }  ],
deck2_manualloop_shifton_pad3:         [  0x98  ,  0x6a  ,  {  led:  true,  type:  "button"  }  ],
deck2_manualloop_shifton_pad4:         [  0x98  ,  0x6b  ,  {  led:  true,  type:  "button"  }  ],
deck2_manualloop_shifton_pad5:         [  0x98  ,  0x6c  ,  {  led:  true,  type:  "button"  }  ],
deck2_manualloop_shifton_pad6:         [  0x98  ,  0x6d  ,  {  led:  true,  type:  "button"  }  ],
deck2_manualloop_shifton_pad7:         [  0x98  ,  0x6e  ,  {  led:  true,  type:  "button"  }  ],
deck2_manualloop_shifton_pad8:         [  0x98  ,  0x6f  ,  {  led:  true,  type:  "button"  }  ],
deck2_manualloop_shifton_paramLeft:    [  0x91  ,  0x07  ,  {  led:  true,  type:  "button"  }  ],
deck2_manualloop_shifton_paramRight:   [  0x91  ,  0x7F  ,  {  led:  false,  type:  "button"  }  ],
deck2_roll:                            [  0x91  ,  0x1E  ,  {  led:  true,  type:  "button"  }  ],
deck2_roll_shiftoff_pad1:              [  0x98  ,  0x10  ,  {  led:  true,  type:  "button"  }  ],
deck2_roll_shiftoff_pad2:              [  0x98  ,  0x11  ,  {  led:  true,  type:  "button"  }  ],
deck2_roll_shiftoff_pad3:              [  0x98  ,  0x12  ,  {  led:  true,  type:  "button"  }  ],
deck2_roll_shiftoff_pad4:              [  0x98  ,  0x13  ,  {  led:  true,  type:  "button"  }  ],
deck2_roll_shiftoff_pad5:              [  0x98  ,  0x14  ,  {  led:  true,  type:  "button"  }  ],
deck2_roll_shiftoff_pad6:              [  0x98  ,  0x15  ,  {  led:  true,  type:  "button"  }  ],
deck2_roll_shiftoff_pad7:              [  0x98  ,  0x16  ,  {  led:  true,  type:  "button"  }  ],
deck2_roll_shiftoff_pad8:              [  0x98  ,  0x17  ,  {  led:  true,  type:  "button"  }  ],
deck2_roll_shiftoff_paramLeft:         [  0x91  ,  0x25  ,  {  led:  true,  type:  "button"  }  ],
deck2_roll_shiftoff_paramRight:        [  0x91  ,  0x2D  ,  {  led:  true,  type:  "button"  }  ],
deck2_roll_shifton_pad1:               [  0x98  ,  0x18  ,  {  led:  true,  type:  "button"  }  ],
deck2_roll_shifton_pad2:               [  0x98  ,  0x19  ,  {  led:  true,  type:  "button"  }  ],
deck2_roll_shifton_pad3:               [  0x98  ,  0x1a  ,  {  led:  true,  type:  "button"  }  ],
deck2_roll_shifton_pad4:               [  0x98  ,  0x1b  ,  {  led:  true,  type:  "button"  }  ],
deck2_roll_shifton_pad5:               [  0x98  ,  0x1c  ,  {  led:  true,  type:  "button"  }  ],
deck2_roll_shifton_pad6:               [  0x98  ,  0x1d  ,  {  led:  true,  type:  "button"  }  ],
deck2_roll_shifton_pad7:               [  0x98  ,  0x1e  ,  {  led:  true,  type:  "button"  }  ],
deck2_roll_shifton_pad8:               [  0x98  ,  0x1f  ,  {  led:  true,  type:  "button"  }  ],
deck2_roll_shifton_paramLeft:          [  0x91  ,  0x02  ,  {  led:  true,  type:  "button"  }  ],
deck2_roll_shifton_paramRight:         [  0x91  ,  0x7A  ,  {  led:  false,  type:  "button"  }  ],
deck2_sampler:                         [  0x91  ,  0x22  ,  {  led:  false,  type:  "button"  }  ],
deck2_sampler_shiftoff_pad1:           [  0x98  ,  0x30  ,  {  led:  true,  type:  "button"  }  ],
deck2_sampler_shiftoff_pad2:           [  0x98  ,  0x31  ,  {  led:  true,  type:  "button"  }  ],
deck2_sampler_shiftoff_pad3:           [  0x98  ,  0x32  ,  {  led:  true,  type:  "button"  }  ],
deck2_sampler_shiftoff_pad4:           [  0x98  ,  0x33  ,  {  led:  true,  type:  "button"  }  ],
deck2_sampler_shiftoff_pad5:           [  0x98  ,  0x34  ,  {  led:  true,  type:  "button"  }  ],
deck2_sampler_shiftoff_pad6:           [  0x98  ,  0x35  ,  {  led:  true,  type:  "button"  }  ],
deck2_sampler_shiftoff_pad7:           [  0x98  ,  0x36  ,  {  led:  true,  type:  "button"  }  ],
deck2_sampler_shiftoff_pad8:           [  0x98  ,  0x37  ,  {  led:  true,  type:  "button"  }  ],
deck2_sampler_shiftoff_paramLeft:      [  0x91  ,  0x27  ,  {  led:  true,  type:  "button"  }  ],
deck2_sampler_shiftoff_paramRight:     [  0x91  ,  0x2F  ,  {  led:  false,  type:  "button"  }  ],
deck2_sampler_shifton_pad1:            [  0x98  ,  0x38  ,  {  led:  true,  type:  "button"  }  ],
deck2_sampler_shifton_pad2:            [  0x98  ,  0x39  ,  {  led:  true,  type:  "button"  }  ],
deck2_sampler_shifton_pad3:            [  0x98  ,  0x3a  ,  {  led:  true,  type:  "button"  }  ],
deck2_sampler_shifton_pad4:            [  0x98  ,  0x3b  ,  {  led:  true,  type:  "button"  }  ],
deck2_sampler_shifton_pad5:            [  0x98  ,  0x3c  ,  {  led:  true,  type:  "button"  }  ],
deck2_sampler_shifton_pad6:            [  0x98  ,  0x3d  ,  {  led:  true,  type:  "button"  }  ],
deck2_sampler_shifton_pad7:            [  0x98  ,  0x3e  ,  {  led:  true,  type:  "button"  }  ],
deck2_sampler_shifton_pad8:            [  0x98  ,  0x3f  ,  {  led:  true,  type:  "button"  }  ],
deck2_sampler_shifton_paramLeft:       [  0x91  ,  0x04  ,  {  led:  true,  type:  "button"  }  ],
deck2_sampler_shifton_paramRight:      [  0x91  ,  0x7C  ,  {  led:  false,  type:  "button"  }  ],
deck2_slicer:                          [  0x91  ,  0x20  ,  {  led:  true,  type:  "button"  }  ],
deck2_slicer_shiftoff_pad1:            [  0x98  ,  0x20  ,  {  led:  true,  type:  "button"  }  ],
deck2_slicer_shiftoff_pad2:            [  0x98  ,  0x21  ,  {  led:  true,  type:  "button"  }  ],
deck2_slicer_shiftoff_pad3:            [  0x98  ,  0x22  ,  {  led:  true,  type:  "button"  }  ],
deck2_slicer_shiftoff_pad4:            [  0x98  ,  0x23  ,  {  led:  true,  type:  "button"  }  ],
deck2_slicer_shiftoff_pad5:            [  0x98  ,  0x24  ,  {  led:  true,  type:  "button"  }  ],
deck2_slicer_shiftoff_pad6:            [  0x98  ,  0x25  ,  {  led:  true,  type:  "button"  }  ],
deck2_slicer_shiftoff_pad7:            [  0x98  ,  0x26  ,  {  led:  true,  type:  "button"  }  ],
deck2_slicer_shiftoff_pad8:            [  0x98  ,  0x27  ,  {  led:  true,  type:  "button"  }  ],
deck2_slicer_shiftoff_paramLeft:       [  0x91  ,  0x26  ,  {  led:  true,  type:  "button"  }  ],
deck2_slicer_shiftoff_paramRight:      [  0x91  ,  0x2E  ,  {  led:  true,  type:  "button"  }  ],
deck2_slicer_shifton_pad1:             [  0x98  ,  0x28  ,  {  led:  true,  type:  "button"  }  ],
deck2_slicer_shifton_pad2:             [  0x98  ,  0x29  ,  {  led:  true,  type:  "button"  }  ],
deck2_slicer_shifton_pad3:             [  0x98  ,  0x2a  ,  {  led:  true,  type:  "button"  }  ],
deck2_slicer_shifton_pad4:             [  0x98  ,  0x2b  ,  {  led:  true,  type:  "button"  }  ],
deck2_slicer_shifton_pad5:             [  0x98  ,  0x2c  ,  {  led:  true,  type:  "button"  }  ],
deck2_slicer_shifton_pad6:             [  0x98  ,  0x2d  ,  {  led:  true,  type:  "button"  }  ],
deck2_slicer_shifton_pad7:             [  0x98  ,  0x2e  ,  {  led:  true,  type:  "button"  }  ],
deck2_slicer_shifton_pad8:             [  0x98  ,  0x2f  ,  {  led:  true,  type:  "button"  }  ],
deck2_slicer_shifton_paramLeft:        [  0x91  ,  0x03  ,  {  led:  true,  type:  "button"  }  ],
deck2_slicer_shifton_paramRight:       [  0x91  ,  0x7B  ,  {  led:  false,  type:  "button"  }  ],
deck2_velocity:                        [  0x91  ,  0x6F  ,  {  led:  false,  type:  "button"  }  ],
deck2_velocity_shiftoff_pad1:          [  0x98  ,  0x70  ,  {  led:  true,  type:  "button"  }  ],
deck2_velocity_shiftoff_pad2:          [  0x98  ,  0x71  ,  {  led:  true,  type:  "button"  }  ],
deck2_velocity_shiftoff_pad3:          [  0x98  ,  0x72  ,  {  led:  true,  type:  "button"  }  ],
deck2_velocity_shiftoff_pad4:          [  0x98  ,  0x73  ,  {  led:  true,  type:  "button"  }  ],
deck2_velocity_shiftoff_pad5:          [  0x98  ,  0x74  ,  {  led:  true,  type:  "button"  }  ],
deck2_velocity_shiftoff_pad6:          [  0x98  ,  0x75  ,  {  led:  true,  type:  "button"  }  ],
deck2_velocity_shiftoff_pad7:          [  0x98  ,  0x76  ,  {  led:  true,  type:  "button"  }  ],
deck2_velocity_shiftoff_pad8:          [  0x98  ,  0x77  ,  {  led:  true,  type:  "button"  }  ],
deck2_velocity_shiftoff_paramLeft:     [  0x91  ,  0x2B  ,  {  led:  true,  type:  "button"  }  ],
deck2_velocity_shiftoff_paramRight:    [  0x91  ,  0x33  ,  {  led:  false,  type:  "button"  }  ],
deck2_velocity_shifton_pad1:           [  0x98  ,  0x78  ,  {  led:  true,  type:  "button"  }  ],
deck2_velocity_shifton_pad2:           [  0x98  ,  0x79  ,  {  led:  true,  type:  "button"  }  ],
deck2_velocity_shifton_pad3:           [  0x98  ,  0x7a  ,  {  led:  true,  type:  "button"  }  ],
deck2_velocity_shifton_pad4:           [  0x98  ,  0x7b  ,  {  led:  true,  type:  "button"  }  ],
deck2_velocity_shifton_pad5:           [  0x98  ,  0x7c  ,  {  led:  true,  type:  "button"  }  ],
deck2_velocity_shifton_pad6:           [  0x98  ,  0x7d  ,  {  led:  true,  type:  "button"  }  ],
deck2_velocity_shifton_pad7:           [  0x98  ,  0x7e  ,  {  led:  true,  type:  "button"  }  ],
deck2_velocity_shifton_pad8:           [  0x98  ,  0x7f  ,  {  led:  true,  type:  "button"  }  ],
deck2_velocity_shifton_paramLeft:      [  0x91  ,  0x08  ,  {  led:  true,  type:  "button"  }  ],
deck2_velocity_shifton_paramRight:     [  0x91  ,  0x00  ,  {  led:  false,  type:  "button"  }  ],
deck3_anymode_shiftoff_autoloop:       [  0xB2  ,  0x17  ,  {  led:  false,  type:  "button"  }  ],
deck3_anymode_shiftoff_autoloopBtn:    [  0x92  ,  0x0D  ,  {  led:  true,  type:  "button"  }  ],
deck3_anymode_shiftoff_censor:         [  0x92  ,  0x15  ,  {  led:  true,  type:  "button"  }  ],
deck3_anymode_shiftoff_slip:           [  0x92  ,  0x40  ,  {  led:  true,  type:  "button"  }  ],
deck3_anymode_shiftoff_sync:           [  0x92  ,  0x58  ,  {  led:  true,  type:  "button"  }  ],
deck3_anymode_shifton_autoloop:        [  0xB2  ,  0x37  ,  {  led:  false,  type:  "button"  }  ],
deck3_anymode_shifton_autoloopBtn:     [  0x9E  ,  0x02  ,  {  led:  true,  type:  "button"  }  ],
deck3_anymode_shifton_censor:          [  0x92  ,  0x38  ,  {  led:  true,  type:  "button"  }  ],
deck3_anymode_shifton_slip:            [  0x92  ,  0x63  ,  {  led:  true,  type:  "button"  }  ],
deck3_anymode_shifton_sync:            [  0x92  ,  0x5C  ,  {  led:  true,  type:  "button"  }  ],
deck3_autoloop:                        [  0x92  ,  0x6B  ,  {  led:  true,  type:  "button"  }  ],
deck3_autoloop_shiftoff_pad1:          [  0x99  ,  0x50  ,  {  led:  true,  type:  "button"  }  ],
deck3_autoloop_shiftoff_pad2:          [  0x99  ,  0x51  ,  {  led:  true,  type:  "button"  }  ],
deck3_autoloop_shiftoff_pad3:          [  0x99  ,  0x52  ,  {  led:  true,  type:  "button"  }  ],
deck3_autoloop_shiftoff_pad4:          [  0x99  ,  0x53  ,  {  led:  true,  type:  "button"  }  ],
deck3_autoloop_shiftoff_pad5:          [  0x99  ,  0x54  ,  {  led:  true,  type:  "button"  }  ],
deck3_autoloop_shiftoff_pad6:          [  0x99  ,  0x55  ,  {  led:  true,  type:  "button"  }  ],
deck3_autoloop_shiftoff_pad7:          [  0x99  ,  0x56  ,  {  led:  true,  type:  "button"  }  ],
deck3_autoloop_shiftoff_pad8:          [  0x99  ,  0x57  ,  {  led:  true,  type:  "button"  }  ],
deck3_autoloop_shiftoff_paramLeft:     [  0x92  ,  0x29  ,  {  led:  true,  type:  "button"  }  ],
deck3_autoloop_shiftoff_paramRight:    [  0x92  ,  0x31  ,  {  led:  true,  type:  "button"  }  ],
deck3_autoloop_shifton_pad1:           [  0x99  ,  0x58  ,  {  led:  true,  type:  "button"  }  ],
deck3_autoloop_shifton_pad2:           [  0x99  ,  0x59  ,  {  led:  true,  type:  "button"  }  ],
deck3_autoloop_shifton_pad3:           [  0x99  ,  0x5a  ,  {  led:  true,  type:  "button"  }  ],
deck3_autoloop_shifton_pad4:           [  0x99  ,  0x5b  ,  {  led:  true,  type:  "button"  }  ],
deck3_autoloop_shifton_pad5:           [  0x99  ,  0x5c  ,  {  led:  true,  type:  "button"  }  ],
deck3_autoloop_shifton_pad6:           [  0x99  ,  0x5d  ,  {  led:  true,  type:  "button"  }  ],
deck3_autoloop_shifton_pad7:           [  0x99  ,  0x5e  ,  {  led:  true,  type:  "button"  }  ],
deck3_autoloop_shifton_pad8:           [  0x99  ,  0x5f  ,  {  led:  true,  type:  "button"  }  ],
deck3_autoloop_shifton_paramLeft:      [  0x92  ,  0x06  ,  {  led:  true,  type:  "button"  }  ],
deck3_autoloop_shifton_paramRight:     [  0x92  ,  0x7E  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotcue:                          [  0x92  ,  0x1B  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotcue_shiftoff_pad1:            [  0x99  ,  0x00  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotcue_shiftoff_pad2:            [  0x99  ,  0x01  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotcue_shiftoff_pad3:            [  0x99  ,  0x02  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotcue_shiftoff_pad4:            [  0x99  ,  0x03  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotcue_shiftoff_pad5:            [  0x99  ,  0x04  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotcue_shiftoff_pad6:            [  0x99  ,  0x05  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotcue_shiftoff_pad7:            [  0x99  ,  0x06  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotcue_shiftoff_pad8:            [  0x99  ,  0x07  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotcue_shiftoff_paramLeft:       [  0x92  ,  0x24  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotcue_shiftoff_paramRight:      [  0x92  ,  0x2C  ,  {  led:  false,  type:  "button"  }  ],
deck3_hotcue_shifton_pad1:             [  0x99  ,  0x08  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotcue_shifton_pad2:             [  0x99  ,  0x09  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotcue_shifton_pad3:             [  0x99  ,  0x0a  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotcue_shifton_pad4:             [  0x99  ,  0x0b  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotcue_shifton_pad5:             [  0x99  ,  0x0c  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotcue_shifton_pad6:             [  0x99  ,  0x0d  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotcue_shifton_pad7:             [  0x99  ,  0x0e  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotcue_shifton_pad8:             [  0x99  ,  0x0f  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotcue_shifton_paramLeft:        [  0x92  ,  0x01  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotcue_shifton_paramRight:       [  0x92  ,  0x09  ,  {  led:  false,  type:  "button"  }  ],
deck3_hotloop:                         [  0x92  ,  0x69  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotloop_shiftoff_pad1:           [  0x99  ,  0x40  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotloop_shiftoff_pad2:           [  0x99  ,  0x41  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotloop_shiftoff_pad3:           [  0x99  ,  0x42  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotloop_shiftoff_pad4:           [  0x99  ,  0x43  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotloop_shiftoff_pad5:           [  0x99  ,  0x44  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotloop_shiftoff_pad6:           [  0x99  ,  0x45  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotloop_shiftoff_pad7:           [  0x99  ,  0x46  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotloop_shiftoff_pad8:           [  0x99  ,  0x47  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotloop_shiftoff_paramLeft:      [  0x92  ,  0x28  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotloop_shiftoff_paramRight:     [  0x92  ,  0x30  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotloop_shifton_pad1:            [  0x99  ,  0x48  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotloop_shifton_pad2:            [  0x99  ,  0x49  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotloop_shifton_pad3:            [  0x99  ,  0x4a  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotloop_shifton_pad4:            [  0x99  ,  0x4b  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotloop_shifton_pad5:            [  0x99  ,  0x4c  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotloop_shifton_pad6:            [  0x99  ,  0x4d  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotloop_shifton_pad7:            [  0x99  ,  0x4e  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotloop_shifton_pad8:            [  0x99  ,  0x4f  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotloop_shifton_paramLeft:       [  0x92  ,  0x05  ,  {  led:  true,  type:  "button"  }  ],
deck3_hotloop_shifton_paramRight:      [  0x92  ,  0x7D  ,  {  led:  false,  type:  "button"  }  ],
deck3_manualloop:                      [  0x92  ,  0x6D  ,  {  led:  false,  type:  "button"  }  ],
deck3_manualloop_shiftoff_pad1:        [  0x99  ,  0x60  ,  {  led:  true,  type:  "button"  }  ],
deck3_manualloop_shiftoff_pad2:        [  0x99  ,  0x61  ,  {  led:  true,  type:  "button"  }  ],
deck3_manualloop_shiftoff_pad3:        [  0x99  ,  0x62  ,  {  led:  true,  type:  "button"  }  ],
deck3_manualloop_shiftoff_pad4:        [  0x99  ,  0x63  ,  {  led:  true,  type:  "button"  }  ],
deck3_manualloop_shiftoff_pad5:        [  0x99  ,  0x64  ,  {  led:  true,  type:  "button"  }  ],
deck3_manualloop_shiftoff_pad6:        [  0x99  ,  0x65  ,  {  led:  true,  type:  "button"  }  ],
deck3_manualloop_shiftoff_pad7:        [  0x99  ,  0x66  ,  {  led:  true,  type:  "button"  }  ],
deck3_manualloop_shiftoff_pad8:        [  0x99  ,  0x67  ,  {  led:  true,  type:  "button"  }  ],
deck3_manualloop_shiftoff_paramLeft:   [  0x92  ,  0x2A  ,  {  led:  true,  type:  "button"  }  ],
deck3_manualloop_shiftoff_paramRight:  [  0x92  ,  0x32  ,  {  led:  false,  type:  "button"  }  ],
deck3_manualloop_shifton_pad1:         [  0x99  ,  0x68  ,  {  led:  true,  type:  "button"  }  ],
deck3_manualloop_shifton_pad2:         [  0x99  ,  0x69  ,  {  led:  true,  type:  "button"  }  ],
deck3_manualloop_shifton_pad3:         [  0x99  ,  0x6a  ,  {  led:  true,  type:  "button"  }  ],
deck3_manualloop_shifton_pad4:         [  0x99  ,  0x6b  ,  {  led:  true,  type:  "button"  }  ],
deck3_manualloop_shifton_pad5:         [  0x99  ,  0x6c  ,  {  led:  true,  type:  "button"  }  ],
deck3_manualloop_shifton_pad6:         [  0x99  ,  0x6d  ,  {  led:  true,  type:  "button"  }  ],
deck3_manualloop_shifton_pad7:         [  0x99  ,  0x6e  ,  {  led:  true,  type:  "button"  }  ],
deck3_manualloop_shifton_pad8:         [  0x99  ,  0x6f  ,  {  led:  true,  type:  "button"  }  ],
deck3_manualloop_shifton_paramLeft:    [  0x92  ,  0x07  ,  {  led:  true,  type:  "button"  }  ],
deck3_manualloop_shifton_paramRight:   [  0x92  ,  0x7F  ,  {  led:  false,  type:  "button"  }  ],
deck3_roll:                            [  0x92  ,  0x1E  ,  {  led:  true,  type:  "button"  }  ],
deck3_roll_shiftoff_pad1:              [  0x99  ,  0x10  ,  {  led:  true,  type:  "button"  }  ],
deck3_roll_shiftoff_pad2:              [  0x99  ,  0x11  ,  {  led:  true,  type:  "button"  }  ],
deck3_roll_shiftoff_pad3:              [  0x99  ,  0x12  ,  {  led:  true,  type:  "button"  }  ],
deck3_roll_shiftoff_pad4:              [  0x99  ,  0x13  ,  {  led:  true,  type:  "button"  }  ],
deck3_roll_shiftoff_pad5:              [  0x99  ,  0x14  ,  {  led:  true,  type:  "button"  }  ],
deck3_roll_shiftoff_pad6:              [  0x99  ,  0x15  ,  {  led:  true,  type:  "button"  }  ],
deck3_roll_shiftoff_pad7:              [  0x99  ,  0x16  ,  {  led:  true,  type:  "button"  }  ],
deck3_roll_shiftoff_pad8:              [  0x99  ,  0x17  ,  {  led:  true,  type:  "button"  }  ],
deck3_roll_shiftoff_paramLeft:         [  0x92  ,  0x25  ,  {  led:  true,  type:  "button"  }  ],
deck3_roll_shiftoff_paramRight:        [  0x92  ,  0x2D  ,  {  led:  true,  type:  "button"  }  ],
deck3_roll_shifton_pad1:               [  0x99  ,  0x18  ,  {  led:  true,  type:  "button"  }  ],
deck3_roll_shifton_pad2:               [  0x99  ,  0x19  ,  {  led:  true,  type:  "button"  }  ],
deck3_roll_shifton_pad3:               [  0x99  ,  0x1a  ,  {  led:  true,  type:  "button"  }  ],
deck3_roll_shifton_pad4:               [  0x99  ,  0x1b  ,  {  led:  true,  type:  "button"  }  ],
deck3_roll_shifton_pad5:               [  0x99  ,  0x1c  ,  {  led:  true,  type:  "button"  }  ],
deck3_roll_shifton_pad6:               [  0x99  ,  0x1d  ,  {  led:  true,  type:  "button"  }  ],
deck3_roll_shifton_pad7:               [  0x99  ,  0x1e  ,  {  led:  true,  type:  "button"  }  ],
deck3_roll_shifton_pad8:               [  0x99  ,  0x1f  ,  {  led:  true,  type:  "button"  }  ],
deck3_roll_shifton_paramLeft:          [  0x92  ,  0x02  ,  {  led:  true,  type:  "button"  }  ],
deck3_roll_shifton_paramRight:         [  0x92  ,  0x7A  ,  {  led:  false,  type:  "button"  }  ],
deck3_sampler:                         [  0x92  ,  0x22  ,  {  led:  false,  type:  "button"  }  ],
deck3_sampler_shiftoff_pad1:           [  0x99  ,  0x30  ,  {  led:  true,  type:  "button"  }  ],
deck3_sampler_shiftoff_pad2:           [  0x99  ,  0x31  ,  {  led:  true,  type:  "button"  }  ],
deck3_sampler_shiftoff_pad3:           [  0x99  ,  0x32  ,  {  led:  true,  type:  "button"  }  ],
deck3_sampler_shiftoff_pad4:           [  0x99  ,  0x33  ,  {  led:  true,  type:  "button"  }  ],
deck3_sampler_shiftoff_pad5:           [  0x99  ,  0x34  ,  {  led:  true,  type:  "button"  }  ],
deck3_sampler_shiftoff_pad6:           [  0x99  ,  0x35  ,  {  led:  true,  type:  "button"  }  ],
deck3_sampler_shiftoff_pad7:           [  0x99  ,  0x36  ,  {  led:  true,  type:  "button"  }  ],
deck3_sampler_shiftoff_pad8:           [  0x99  ,  0x37  ,  {  led:  true,  type:  "button"  }  ],
deck3_sampler_shiftoff_paramLeft:      [  0x92  ,  0x27  ,  {  led:  true,  type:  "button"  }  ],
deck3_sampler_shiftoff_paramRight:     [  0x92  ,  0x2F  ,  {  led:  false,  type:  "button"  }  ],
deck3_sampler_shifton_pad1:            [  0x99  ,  0x38  ,  {  led:  true,  type:  "button"  }  ],
deck3_sampler_shifton_pad2:            [  0x99  ,  0x39  ,  {  led:  true,  type:  "button"  }  ],
deck3_sampler_shifton_pad3:            [  0x99  ,  0x3a  ,  {  led:  true,  type:  "button"  }  ],
deck3_sampler_shifton_pad4:            [  0x99  ,  0x3b  ,  {  led:  true,  type:  "button"  }  ],
deck3_sampler_shifton_pad5:            [  0x99  ,  0x3c  ,  {  led:  true,  type:  "button"  }  ],
deck3_sampler_shifton_pad6:            [  0x99  ,  0x3d  ,  {  led:  true,  type:  "button"  }  ],
deck3_sampler_shifton_pad7:            [  0x99  ,  0x3e  ,  {  led:  true,  type:  "button"  }  ],
deck3_sampler_shifton_pad8:            [  0x99  ,  0x3f  ,  {  led:  true,  type:  "button"  }  ],
deck3_sampler_shifton_paramLeft:       [  0x92  ,  0x04  ,  {  led:  true,  type:  "button"  }  ],
deck3_sampler_shifton_paramRight:      [  0x92  ,  0x7C  ,  {  led:  false,  type:  "button"  }  ],
deck3_slicer:                          [  0x92  ,  0x20  ,  {  led:  true,  type:  "button"  }  ],
deck3_slicer_shiftoff_pad1:            [  0x99  ,  0x20  ,  {  led:  true,  type:  "button"  }  ],
deck3_slicer_shiftoff_pad2:            [  0x99  ,  0x21  ,  {  led:  true,  type:  "button"  }  ],
deck3_slicer_shiftoff_pad3:            [  0x99  ,  0x22  ,  {  led:  true,  type:  "button"  }  ],
deck3_slicer_shiftoff_pad4:            [  0x99  ,  0x23  ,  {  led:  true,  type:  "button"  }  ],
deck3_slicer_shiftoff_pad5:            [  0x99  ,  0x24  ,  {  led:  true,  type:  "button"  }  ],
deck3_slicer_shiftoff_pad6:            [  0x99  ,  0x25  ,  {  led:  true,  type:  "button"  }  ],
deck3_slicer_shiftoff_pad7:            [  0x99  ,  0x26  ,  {  led:  true,  type:  "button"  }  ],
deck3_slicer_shiftoff_pad8:            [  0x99  ,  0x27  ,  {  led:  true,  type:  "button"  }  ],
deck3_slicer_shiftoff_paramLeft:       [  0x92  ,  0x26  ,  {  led:  true,  type:  "button"  }  ],
deck3_slicer_shiftoff_paramRight:      [  0x92  ,  0x2E  ,  {  led:  true,  type:  "button"  }  ],
deck3_slicer_shifton_pad1:             [  0x99  ,  0x28  ,  {  led:  true,  type:  "button"  }  ],
deck3_slicer_shifton_pad2:             [  0x99  ,  0x29  ,  {  led:  true,  type:  "button"  }  ],
deck3_slicer_shifton_pad3:             [  0x99  ,  0x2a  ,  {  led:  true,  type:  "button"  }  ],
deck3_slicer_shifton_pad4:             [  0x99  ,  0x2b  ,  {  led:  true,  type:  "button"  }  ],
deck3_slicer_shifton_pad5:             [  0x99  ,  0x2c  ,  {  led:  true,  type:  "button"  }  ],
deck3_slicer_shifton_pad6:             [  0x99  ,  0x2d  ,  {  led:  true,  type:  "button"  }  ],
deck3_slicer_shifton_pad7:             [  0x99  ,  0x2e  ,  {  led:  true,  type:  "button"  }  ],
deck3_slicer_shifton_pad8:             [  0x99  ,  0x2f  ,  {  led:  true,  type:  "button"  }  ],
deck3_slicer_shifton_paramLeft:        [  0x92  ,  0x03  ,  {  led:  true,  type:  "button"  }  ],
deck3_slicer_shifton_paramRight:       [  0x92  ,  0x7B  ,  {  led:  false,  type:  "button"  }  ],
deck3_velocity:                        [  0x92  ,  0x6F  ,  {  led:  false,  type:  "button"  }  ],
deck3_velocity_shiftoff_pad1:          [  0x99  ,  0x70  ,  {  led:  true,  type:  "button"  }  ],
deck3_velocity_shiftoff_pad2:          [  0x99  ,  0x71  ,  {  led:  true,  type:  "button"  }  ],
deck3_velocity_shiftoff_pad3:          [  0x99  ,  0x72  ,  {  led:  true,  type:  "button"  }  ],
deck3_velocity_shiftoff_pad4:          [  0x99  ,  0x73  ,  {  led:  true,  type:  "button"  }  ],
deck3_velocity_shiftoff_pad5:          [  0x99  ,  0x74  ,  {  led:  true,  type:  "button"  }  ],
deck3_velocity_shiftoff_pad6:          [  0x99  ,  0x75  ,  {  led:  true,  type:  "button"  }  ],
deck3_velocity_shiftoff_pad7:          [  0x99  ,  0x76  ,  {  led:  true,  type:  "button"  }  ],
deck3_velocity_shiftoff_pad8:          [  0x99  ,  0x77  ,  {  led:  true,  type:  "button"  }  ],
deck3_velocity_shiftoff_paramLeft:     [  0x92  ,  0x2B  ,  {  led:  true,  type:  "button"  }  ],
deck3_velocity_shiftoff_paramRight:    [  0x92  ,  0x33  ,  {  led:  false,  type:  "button"  }  ],
deck3_velocity_shifton_pad1:           [  0x99  ,  0x78  ,  {  led:  true,  type:  "button"  }  ],
deck3_velocity_shifton_pad2:           [  0x99  ,  0x79  ,  {  led:  true,  type:  "button"  }  ],
deck3_velocity_shifton_pad3:           [  0x99  ,  0x7a  ,  {  led:  true,  type:  "button"  }  ],
deck3_velocity_shifton_pad4:           [  0x99  ,  0x7b  ,  {  led:  true,  type:  "button"  }  ],
deck3_velocity_shifton_pad5:           [  0x99  ,  0x7c  ,  {  led:  true,  type:  "button"  }  ],
deck3_velocity_shifton_pad6:           [  0x99  ,  0x7d  ,  {  led:  true,  type:  "button"  }  ],
deck3_velocity_shifton_pad7:           [  0x99  ,  0x7e  ,  {  led:  true,  type:  "button"  }  ],
deck3_velocity_shifton_pad8:           [  0x99  ,  0x7f  ,  {  led:  true,  type:  "button"  }  ],
deck3_velocity_shifton_paramLeft:      [  0x92  ,  0x08  ,  {  led:  true,  type:  "button"  }  ],
deck3_velocity_shifton_paramRight:     [  0x92  ,  0x00  ,  {  led:  false,  type:  "button"  }  ],
deck4_anymode_shiftoff_autoloop:       [  0xB3  ,  0x17  ,  {  led:  false,  type:  "button"  }  ],
deck4_anymode_shiftoff_autoloopBtn:    [  0x93  ,  0x0D  ,  {  led:  true,  type:  "button"  }  ],
deck4_anymode_shiftoff_censor:         [  0x93  ,  0x15  ,  {  led:  true,  type:  "button"  }  ],
deck4_anymode_shiftoff_slip:           [  0x93  ,  0x40  ,  {  led:  true,  type:  "button"  }  ],
deck4_anymode_shiftoff_sync:           [  0x93  ,  0x58  ,  {  led:  true,  type:  "button"  }  ],
deck4_anymode_shifton_autoloop:        [  0xB3  ,  0x37  ,  {  led:  false,  type:  "button"  }  ],
deck4_anymode_shifton_autoloopBtn:     [  0x9E  ,  0x12  ,  {  led:  true,  type:  "button"  }  ],
deck4_anymode_shifton_censor:          [  0x93  ,  0x38  ,  {  led:  true,  type:  "button"  }  ],
deck4_anymode_shifton_slip:            [  0x93  ,  0x63  ,  {  led:  true,  type:  "button"  }  ],
deck4_anymode_shifton_sync:            [  0x93  ,  0x5C  ,  {  led:  true,  type:  "button"  }  ],
deck4_autoloop:                        [  0x93  ,  0x6B  ,  {  led:  true,  type:  "button"  }  ],
deck4_autoloop_shiftoff_pad1:          [  0x9A  ,  0x50  ,  {  led:  true,  type:  "button"  }  ],
deck4_autoloop_shiftoff_pad2:          [  0x9A  ,  0x51  ,  {  led:  true,  type:  "button"  }  ],
deck4_autoloop_shiftoff_pad3:          [  0x9A  ,  0x52  ,  {  led:  true,  type:  "button"  }  ],
deck4_autoloop_shiftoff_pad4:          [  0x9A  ,  0x53  ,  {  led:  true,  type:  "button"  }  ],
deck4_autoloop_shiftoff_pad5:          [  0x9A  ,  0x54  ,  {  led:  true,  type:  "button"  }  ],
deck4_autoloop_shiftoff_pad6:          [  0x9A  ,  0x55  ,  {  led:  true,  type:  "button"  }  ],
deck4_autoloop_shiftoff_pad7:          [  0x9A  ,  0x56  ,  {  led:  true,  type:  "button"  }  ],
deck4_autoloop_shiftoff_pad8:          [  0x9A  ,  0x57  ,  {  led:  true,  type:  "button"  }  ],
deck4_autoloop_shiftoff_paramLeft:     [  0x93  ,  0x29  ,  {  led:  true,  type:  "button"  }  ],
deck4_autoloop_shiftoff_paramRight:    [  0x93  ,  0x31  ,  {  led:  true,  type:  "button"  }  ],
deck4_autoloop_shifton_pad1:           [  0x9A  ,  0x58  ,  {  led:  true,  type:  "button"  }  ],
deck4_autoloop_shifton_pad2:           [  0x9A  ,  0x59  ,  {  led:  true,  type:  "button"  }  ],
deck4_autoloop_shifton_pad3:           [  0x9A  ,  0x5a  ,  {  led:  true,  type:  "button"  }  ],
deck4_autoloop_shifton_pad4:           [  0x9A  ,  0x5b  ,  {  led:  true,  type:  "button"  }  ],
deck4_autoloop_shifton_pad5:           [  0x9A  ,  0x5c  ,  {  led:  true,  type:  "button"  }  ],
deck4_autoloop_shifton_pad6:           [  0x9A  ,  0x5d  ,  {  led:  true,  type:  "button"  }  ],
deck4_autoloop_shifton_pad7:           [  0x9A  ,  0x5e  ,  {  led:  true,  type:  "button"  }  ],
deck4_autoloop_shifton_pad8:           [  0x9A  ,  0x5f  ,  {  led:  true,  type:  "button"  }  ],
deck4_autoloop_shifton_paramLeft:      [  0x93  ,  0x06  ,  {  led:  true,  type:  "button"  }  ],
deck4_autoloop_shifton_paramRight:     [  0x93  ,  0x7E  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotcue:                          [  0x93  ,  0x1B  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotcue_shiftoff_pad1:            [  0x9A  ,  0x00  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotcue_shiftoff_pad2:            [  0x9A  ,  0x01  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotcue_shiftoff_pad3:            [  0x9A  ,  0x02  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotcue_shiftoff_pad4:            [  0x9A  ,  0x03  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotcue_shiftoff_pad5:            [  0x9A  ,  0x04  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotcue_shiftoff_pad6:            [  0x9A  ,  0x05  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotcue_shiftoff_pad7:            [  0x9A  ,  0x06  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotcue_shiftoff_pad8:            [  0x9A  ,  0x07  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotcue_shiftoff_paramLeft:       [  0x93  ,  0x24  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotcue_shiftoff_paramRight:      [  0x93  ,  0x2C  ,  {  led:  false,  type:  "button"  }  ],
deck4_hotcue_shifton_pad1:             [  0x9A  ,  0x08  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotcue_shifton_pad2:             [  0x9A  ,  0x09  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotcue_shifton_pad3:             [  0x9A  ,  0x0a  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotcue_shifton_pad4:             [  0x9A  ,  0x0b  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotcue_shifton_pad5:             [  0x9A  ,  0x0c  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotcue_shifton_pad6:             [  0x9A  ,  0x0d  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotcue_shifton_pad7:             [  0x9A  ,  0x0e  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotcue_shifton_pad8:             [  0x9A  ,  0x0f  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotcue_shifton_paramLeft:        [  0x93  ,  0x01  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotcue_shifton_paramRight:       [  0x93  ,  0x09  ,  {  led:  false,  type:  "button"  }  ],
deck4_hotloop:                         [  0x93  ,  0x69  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotloop_shiftoff_pad1:           [  0x9A  ,  0x40  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotloop_shiftoff_pad2:           [  0x9A  ,  0x41  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotloop_shiftoff_pad3:           [  0x9A  ,  0x42  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotloop_shiftoff_pad4:           [  0x9A  ,  0x43  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotloop_shiftoff_pad5:           [  0x9A  ,  0x44  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotloop_shiftoff_pad6:           [  0x9A  ,  0x45  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotloop_shiftoff_pad7:           [  0x9A  ,  0x46  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotloop_shiftoff_pad8:           [  0x9A  ,  0x47  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotloop_shiftoff_paramLeft:      [  0x93  ,  0x28  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotloop_shiftoff_paramRight:     [  0x93  ,  0x30  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotloop_shifton_pad1:            [  0x9A  ,  0x48  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotloop_shifton_pad2:            [  0x9A  ,  0x49  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotloop_shifton_pad3:            [  0x9A  ,  0x4a  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotloop_shifton_pad4:            [  0x9A  ,  0x4b  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotloop_shifton_pad5:            [  0x9A  ,  0x4c  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotloop_shifton_pad6:            [  0x9A  ,  0x4d  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotloop_shifton_pad7:            [  0x9A  ,  0x4e  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotloop_shifton_pad8:            [  0x9A  ,  0x4f  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotloop_shifton_paramLeft:       [  0x93  ,  0x05  ,  {  led:  true,  type:  "button"  }  ],
deck4_hotloop_shifton_paramRight:      [  0x93  ,  0x7D  ,  {  led:  false,  type:  "button"  }  ],
deck4_manualloop:                      [  0x93  ,  0x6D  ,  {  led:  false,  type:  "button"  }  ],
deck4_manualloop_shiftoff_pad1:        [  0x9A  ,  0x60  ,  {  led:  true,  type:  "button"  }  ],
deck4_manualloop_shiftoff_pad2:        [  0x9A  ,  0x61  ,  {  led:  true,  type:  "button"  }  ],
deck4_manualloop_shiftoff_pad3:        [  0x9A  ,  0x62  ,  {  led:  true,  type:  "button"  }  ],
deck4_manualloop_shiftoff_pad4:        [  0x9A  ,  0x63  ,  {  led:  true,  type:  "button"  }  ],
deck4_manualloop_shiftoff_pad5:        [  0x9A  ,  0x64  ,  {  led:  true,  type:  "button"  }  ],
deck4_manualloop_shiftoff_pad6:        [  0x9A  ,  0x65  ,  {  led:  true,  type:  "button"  }  ],
deck4_manualloop_shiftoff_pad7:        [  0x9A  ,  0x66  ,  {  led:  true,  type:  "button"  }  ],
deck4_manualloop_shiftoff_pad8:        [  0x9A  ,  0x67  ,  {  led:  true,  type:  "button"  }  ],
deck4_manualloop_shiftoff_paramLeft:   [  0x93  ,  0x2A  ,  {  led:  true,  type:  "button"  }  ],
deck4_manualloop_shiftoff_paramRight:  [  0x93  ,  0x32  ,  {  led:  false,  type:  "button"  }  ],
deck4_manualloop_shifton_pad1:         [  0x9A  ,  0x68  ,  {  led:  true,  type:  "button"  }  ],
deck4_manualloop_shifton_pad2:         [  0x9A  ,  0x69  ,  {  led:  true,  type:  "button"  }  ],
deck4_manualloop_shifton_pad3:         [  0x9A  ,  0x6a  ,  {  led:  true,  type:  "button"  }  ],
deck4_manualloop_shifton_pad4:         [  0x9A  ,  0x6b  ,  {  led:  true,  type:  "button"  }  ],
deck4_manualloop_shifton_pad5:         [  0x9A  ,  0x6c  ,  {  led:  true,  type:  "button"  }  ],
deck4_manualloop_shifton_pad6:         [  0x9A  ,  0x6d  ,  {  led:  true,  type:  "button"  }  ],
deck4_manualloop_shifton_pad7:         [  0x9A  ,  0x6e  ,  {  led:  true,  type:  "button"  }  ],
deck4_manualloop_shifton_pad8:         [  0x9A  ,  0x6f  ,  {  led:  true,  type:  "button"  }  ],
deck4_manualloop_shifton_paramLeft:    [  0x93  ,  0x07  ,  {  led:  true,  type:  "button"  }  ],
deck4_manualloop_shifton_paramRight:   [  0x93  ,  0x7F  ,  {  led:  false,  type:  "button"  }  ],
deck4_roll:                            [  0x93  ,  0x1E  ,  {  led:  true,  type:  "button"  }  ],
deck4_roll_shiftoff_pad1:              [  0x9A  ,  0x10  ,  {  led:  true,  type:  "button"  }  ],
deck4_roll_shiftoff_pad2:              [  0x9A  ,  0x11  ,  {  led:  true,  type:  "button"  }  ],
deck4_roll_shiftoff_pad3:              [  0x9A  ,  0x12  ,  {  led:  true,  type:  "button"  }  ],
deck4_roll_shiftoff_pad4:              [  0x9A  ,  0x13  ,  {  led:  true,  type:  "button"  }  ],
deck4_roll_shiftoff_pad5:              [  0x9A  ,  0x14  ,  {  led:  true,  type:  "button"  }  ],
deck4_roll_shiftoff_pad6:              [  0x9A  ,  0x15  ,  {  led:  true,  type:  "button"  }  ],
deck4_roll_shiftoff_pad7:              [  0x9A  ,  0x16  ,  {  led:  true,  type:  "button"  }  ],
deck4_roll_shiftoff_pad8:              [  0x9A  ,  0x17  ,  {  led:  true,  type:  "button"  }  ],
deck4_roll_shiftoff_paramLeft:         [  0x93  ,  0x25  ,  {  led:  true,  type:  "button"  }  ],
deck4_roll_shiftoff_paramRight:        [  0x93  ,  0x2D  ,  {  led:  true,  type:  "button"  }  ],
deck4_roll_shifton_pad1:               [  0x9A  ,  0x18  ,  {  led:  true,  type:  "button"  }  ],
deck4_roll_shifton_pad2:               [  0x9A  ,  0x19  ,  {  led:  true,  type:  "button"  }  ],
deck4_roll_shifton_pad3:               [  0x9A  ,  0x1a  ,  {  led:  true,  type:  "button"  }  ],
deck4_roll_shifton_pad4:               [  0x9A  ,  0x1b  ,  {  led:  true,  type:  "button"  }  ],
deck4_roll_shifton_pad5:               [  0x9A  ,  0x1c  ,  {  led:  true,  type:  "button"  }  ],
deck4_roll_shifton_pad6:               [  0x9A  ,  0x1d  ,  {  led:  true,  type:  "button"  }  ],
deck4_roll_shifton_pad7:               [  0x9A  ,  0x1e  ,  {  led:  true,  type:  "button"  }  ],
deck4_roll_shifton_pad8:               [  0x9A  ,  0x1f  ,  {  led:  true,  type:  "button"  }  ],
deck4_roll_shifton_paramLeft:          [  0x93  ,  0x02  ,  {  led:  true,  type:  "button"  }  ],
deck4_roll_shifton_paramRight:         [  0x93  ,  0x7A  ,  {  led:  false,  type:  "button"  }  ],
deck4_sampler:                         [  0x93  ,  0x22  ,  {  led:  false,  type:  "button"  }  ],
deck4_sampler_shiftoff_pad1:           [  0x9A  ,  0x30  ,  {  led:  true,  type:  "button"  }  ],
deck4_sampler_shiftoff_pad2:           [  0x9A  ,  0x31  ,  {  led:  true,  type:  "button"  }  ],
deck4_sampler_shiftoff_pad3:           [  0x9A  ,  0x32  ,  {  led:  true,  type:  "button"  }  ],
deck4_sampler_shiftoff_pad4:           [  0x9A  ,  0x33  ,  {  led:  true,  type:  "button"  }  ],
deck4_sampler_shiftoff_pad5:           [  0x9A  ,  0x34  ,  {  led:  true,  type:  "button"  }  ],
deck4_sampler_shiftoff_pad6:           [  0x9A  ,  0x35  ,  {  led:  true,  type:  "button"  }  ],
deck4_sampler_shiftoff_pad7:           [  0x9A  ,  0x36  ,  {  led:  true,  type:  "button"  }  ],
deck4_sampler_shiftoff_pad8:           [  0x9A  ,  0x37  ,  {  led:  true,  type:  "button"  }  ],
deck4_sampler_shiftoff_paramLeft:      [  0x93  ,  0x27  ,  {  led:  true,  type:  "button"  }  ],
deck4_sampler_shiftoff_paramRight:     [  0x93  ,  0x2F  ,  {  led:  false,  type:  "button"  }  ],
deck4_sampler_shifton_pad1:            [  0x9A  ,  0x38  ,  {  led:  true,  type:  "button"  }  ],
deck4_sampler_shifton_pad2:            [  0x9A  ,  0x39  ,  {  led:  true,  type:  "button"  }  ],
deck4_sampler_shifton_pad3:            [  0x9A  ,  0x3a  ,  {  led:  true,  type:  "button"  }  ],
deck4_sampler_shifton_pad4:            [  0x9A  ,  0x3b  ,  {  led:  true,  type:  "button"  }  ],
deck4_sampler_shifton_pad5:            [  0x9A  ,  0x3c  ,  {  led:  true,  type:  "button"  }  ],
deck4_sampler_shifton_pad6:            [  0x9A  ,  0x3d  ,  {  led:  true,  type:  "button"  }  ],
deck4_sampler_shifton_pad7:            [  0x9A  ,  0x3e  ,  {  led:  true,  type:  "button"  }  ],
deck4_sampler_shifton_pad8:            [  0x9A  ,  0x3f  ,  {  led:  true,  type:  "button"  }  ],
deck4_sampler_shifton_paramLeft:       [  0x93  ,  0x04  ,  {  led:  true,  type:  "button"  }  ],
deck4_sampler_shifton_paramRight:      [  0x93  ,  0x7C  ,  {  led:  false,  type:  "button"  }  ],
deck4_slicer:                          [  0x93  ,  0x20  ,  {  led:  true,  type:  "button"  }  ],
deck4_slicer_shiftoff_pad1:            [  0x9A  ,  0x20  ,  {  led:  true,  type:  "button"  }  ],
deck4_slicer_shiftoff_pad2:            [  0x9A  ,  0x21  ,  {  led:  true,  type:  "button"  }  ],
deck4_slicer_shiftoff_pad3:            [  0x9A  ,  0x22  ,  {  led:  true,  type:  "button"  }  ],
deck4_slicer_shiftoff_pad4:            [  0x9A  ,  0x23  ,  {  led:  true,  type:  "button"  }  ],
deck4_slicer_shiftoff_pad5:            [  0x9A  ,  0x24  ,  {  led:  true,  type:  "button"  }  ],
deck4_slicer_shiftoff_pad6:            [  0x9A  ,  0x25  ,  {  led:  true,  type:  "button"  }  ],
deck4_slicer_shiftoff_pad7:            [  0x9A  ,  0x26  ,  {  led:  true,  type:  "button"  }  ],
deck4_slicer_shiftoff_pad8:            [  0x9A  ,  0x27  ,  {  led:  true,  type:  "button"  }  ],
deck4_slicer_shiftoff_paramLeft:       [  0x93  ,  0x26  ,  {  led:  true,  type:  "button"  }  ],
deck4_slicer_shiftoff_paramRight:      [  0x93  ,  0x2E  ,  {  led:  true,  type:  "button"  }  ],
deck4_slicer_shifton_pad1:             [  0x9A  ,  0x28  ,  {  led:  true,  type:  "button"  }  ],
deck4_slicer_shifton_pad2:             [  0x9A  ,  0x29  ,  {  led:  true,  type:  "button"  }  ],
deck4_slicer_shifton_pad3:             [  0x9A  ,  0x2a  ,  {  led:  true,  type:  "button"  }  ],
deck4_slicer_shifton_pad4:             [  0x9A  ,  0x2b  ,  {  led:  true,  type:  "button"  }  ],
deck4_slicer_shifton_pad5:             [  0x9A  ,  0x2c  ,  {  led:  true,  type:  "button"  }  ],
deck4_slicer_shifton_pad6:             [  0x9A  ,  0x2d  ,  {  led:  true,  type:  "button"  }  ],
deck4_slicer_shifton_pad7:             [  0x9A  ,  0x2e  ,  {  led:  true,  type:  "button"  }  ],
deck4_slicer_shifton_pad8:             [  0x9A  ,  0x2f  ,  {  led:  true,  type:  "button"  }  ],
deck4_slicer_shifton_paramLeft:        [  0x93  ,  0x03  ,  {  led:  true,  type:  "button"  }  ],
deck4_slicer_shifton_paramRight:       [  0x93  ,  0x7B  ,  {  led:  false,  type:  "button"  }  ],
deck4_velocity:                        [  0x93  ,  0x6F  ,  {  led:  false,  type:  "button"  }  ],
deck4_velocity_shiftoff_pad1:          [  0x9A  ,  0x70  ,  {  led:  true,  type:  "button"  }  ],
deck4_velocity_shiftoff_pad2:          [  0x9A  ,  0x71  ,  {  led:  true,  type:  "button"  }  ],
deck4_velocity_shiftoff_pad3:          [  0x9A  ,  0x72  ,  {  led:  true,  type:  "button"  }  ],
deck4_velocity_shiftoff_pad4:          [  0x9A  ,  0x73  ,  {  led:  true,  type:  "button"  }  ],
deck4_velocity_shiftoff_pad5:          [  0x9A  ,  0x74  ,  {  led:  true,  type:  "button"  }  ],
deck4_velocity_shiftoff_pad6:          [  0x9A  ,  0x75  ,  {  led:  true,  type:  "button"  }  ],
deck4_velocity_shiftoff_pad7:          [  0x9A  ,  0x76  ,  {  led:  true,  type:  "button"  }  ],
deck4_velocity_shiftoff_pad8:          [  0x9A  ,  0x77  ,  {  led:  true,  type:  "button"  }  ],
deck4_velocity_shiftoff_paramLeft:     [  0x93  ,  0x2B  ,  {  led:  true,  type:  "button"  }  ],
deck4_velocity_shiftoff_paramRight:    [  0x93  ,  0x33  ,  {  led:  false,  type:  "button"  }  ],
deck4_velocity_shifton_pad1:           [  0x9A  ,  0x78  ,  {  led:  true,  type:  "button"  }  ],
deck4_velocity_shifton_pad2:           [  0x9A  ,  0x79  ,  {  led:  true,  type:  "button"  }  ],
deck4_velocity_shifton_pad3:           [  0x9A  ,  0x7a  ,  {  led:  true,  type:  "button"  }  ],
deck4_velocity_shifton_pad4:           [  0x9A  ,  0x7b  ,  {  led:  true,  type:  "button"  }  ],
deck4_velocity_shifton_pad5:           [  0x9A  ,  0x7c  ,  {  led:  true,  type:  "button"  }  ],
deck4_velocity_shifton_pad6:           [  0x9A  ,  0x7d  ,  {  led:  true,  type:  "button"  }  ],
deck4_velocity_shifton_pad7:           [  0x9A  ,  0x7e  ,  {  led:  true,  type:  "button"  }  ],
deck4_velocity_shifton_pad8:           [  0x9A  ,  0x7f  ,  {  led:  true,  type:  "button"  }  ],
deck4_velocity_shifton_paramLeft:      [  0x93  ,  0x08  ,  {  led:  true,  type:  "button"  }  ],
deck4_velocity_shifton_paramRight:     [  0x93  ,  0x00  ,  {  led:  false,  type:  "button"  }  ],
fx_shiftoff_fx1knob1:                  [  0xB4  ,  0x02  ,  {  led:  false,  type:  "knob"    }  ],
fx_shiftoff_fx1knob1_detail:           [  0xB4  ,  0x22  ,  {  led:  false,  type:  "detail"  }  ],
fx_shiftoff_fx1knob2:                  [  0xB4  ,  0x04  ,  {  led:  false,  type:  "knob"    }  ],
fx_shiftoff_fx1knob2_detail:           [  0xB4  ,  0x24  ,  {  led:  false,  type:  "detail"  }  ],
fx_shiftoff_fx1knob3:                  [  0xB4  ,  0x06  ,  {  led:  false,  type:  "knob"    }  ],
fx_shiftoff_fx1knob3_detail:           [  0xB4  ,  0x26  ,  {  led:  false,  type:  "detail"  }  ],
fx_shiftoff_fx1latch1:                 [  0x94  ,  0x47  ,  {  led:  true,  type:  "button"  }  ],
fx_shiftoff_fx1latch2:                 [  0x94  ,  0x48  ,  {  led:  true,  type:  "button"  }  ],
fx_shiftoff_fx1latch3:                 [  0x94  ,  0x49  ,  {  led:  true,  type:  "button"  }  ],
fx_shiftoff_fx1rotary:                 [  0xB4  ,  0x00  ,  {  led:  false,  type:  "button"  }  ],
fx_shiftoff_fx1rotaryBtn:              [  0x94  ,  0x43  ,  {  led:  false,  type:  "button"  }  ],
fx_shiftoff_fx1rotaryLatch:            [  0x94  ,  0x4A  ,  {  led:  true,  type:  "button"  }  ],
fx_shiftoff_fx2knob1:                  [  0xB5  ,  0x02  ,  {  led:  false,  type:  "knob"    }  ],
fx_shiftoff_fx2knob1_detail:           [  0xB5  ,  0x22  ,  {  led:  false,  type:  "detail"  }  ],
fx_shiftoff_fx2knob2:                  [  0xB5  ,  0x04  ,  {  led:  false,  type:  "knob"    }  ],
fx_shiftoff_fx2knob2_detail:           [  0xB5  ,  0x24  ,  {  led:  false,  type:  "detail"  }  ],
fx_shiftoff_fx2knob3:                  [  0xB5  ,  0x06  ,  {  led:  false,  type:  "knob"    }  ],
fx_shiftoff_fx2knob3_detail:           [  0xB5  ,  0x26  ,  {  led:  false,  type:  "detail"  }  ],
fx_shiftoff_fx2latch1:                 [  0x95  ,  0x47  ,  {  led:  true,  type:  "button"  }  ],
fx_shiftoff_fx2latch2:                 [  0x95  ,  0x48  ,  {  led:  true,  type:  "button"  }  ],
fx_shiftoff_fx2latch3:                 [  0x95  ,  0x49  ,  {  led:  true,  type:  "button"  }  ],
fx_shiftoff_fx2rotary:                 [  0xB5  ,  0x00  ,  {  led:  true,  type:  "button"  }  ],
fx_shiftoff_fx2rotaryBtn:              [  0x95  ,  0x43  ,  {  led:  false,  type:  "button"  }  ],
fx_shiftoff_fx2rotaryLatch:            [  0x95  ,  0x4A  ,  {  led:  true,  type:  "button"  }  ],
fx_shifton_fx1knob1:                   [  0xB4  ,  0x12  ,  {  led:  false,  type:  "knob"    }  ],
fx_shifton_fx1knob1_detail:            [  0xB4  ,  0x32  ,  {  led:  false,  type:  "detail"  }  ],
fx_shifton_fx1knob2:                   [  0xB4  ,  0x14  ,  {  led:  false,  type:  "knob"    }  ],
fx_shifton_fx1knob2_detail:            [  0xB4  ,  0x34  ,  {  led:  false,  type:  "detail"  }  ],
fx_shifton_fx1knob3:                   [  0xB4  ,  0x16  ,  {  led:  false,  type:  "knob"    }  ],
fx_shifton_fx1knob3_detail:            [  0xB4  ,  0x36  ,  {  led:  false,  type:  "detail"  }  ],
fx_shifton_fx1latch1:                  [  0x94  ,  0x63  ,  {  led:  true,  type:  "button"  }  ],
fx_shifton_fx1latch2:                  [  0x94  ,  0x64  ,  {  led:  true,  type:  "button"  }  ],
fx_shifton_fx1latch3:                  [  0x94  ,  0x65  ,  {  led:  true,  type:  "button"  }  ],
fx_shifton_fx1rotary:                  [  0xB4  ,  0x10  ,  {  led:  false,  type:  "button"  }  ],
fx_shifton_fx1rotaryBtn:               [  0x94  ,  0x40  ,  {  led:  false,  type:  "button"  }  ],
fx_shifton_fx1rotaryLatch:             [  0x94  ,  0x66  ,  {  led:  true,  type:  "button"  }  ],
fx_shifton_fx2knob1:                   [  0xB5  ,  0x12  ,  {  led:  false,  type:  "knob"    }  ],
fx_shifton_fx2knob1_detail:            [  0xB5  ,  0x32  ,  {  led:  false,  type:  "detail"  }  ],
fx_shifton_fx2knob2:                   [  0xB5  ,  0x14  ,  {  led:  false,  type:  "knob"    }  ],
fx_shifton_fx2knob2_detail:            [  0xB5  ,  0x34  ,  {  led:  false,  type:  "detail"  }  ],
fx_shifton_fx2knob3:                   [  0xB5  ,  0x16  ,  {  led:  false,  type:  "knob"    }  ],
fx_shifton_fx2knob3_detail:            [  0xB5  ,  0x36  ,  {  led:  false,  type:  "detail"  }  ],
fx_shifton_fx2latch1:                  [  0x95  ,  0x63  ,  {  led:  true,  type:  "button"  }  ],
fx_shifton_fx2latch2:                  [  0x95  ,  0x64  ,  {  led:  true,  type:  "button"  }  ],
fx_shifton_fx2latch3:                  [  0x95  ,  0x65  ,  {  led:  true,  type:  "button"  }  ],
fx_shifton_fx2rotary:                  [  0xB5  ,  0x10  ,  {  led:  false,  type:  "button"  }  ],
fx_shifton_fx2rotaryBtn:               [  0x95  ,  0x40  ,  {  led:  false,  type:  "button"  }  ],
fx_shifton_fx2rotaryLatch:             [  0x95  ,  0x66  ,  {  led:  true,  type:  "button"  }  ],
middle_shift:                          [  0x96  ,  0x40  ,  {  led:  false,  type:  "button"  }  ],
middle_shiftoff_back:                  [  0x96  ,  0x65  ,  {  led:  false,  type:  "button"  }  ],
middle_shiftoff_forward:               [  0x96  ,  0x67  ,  {  led:  false,  type:  "button"  }  ],
middle_shiftoff_fxAssignL1:            [  0x96  ,  0x4C  ,  {  led:  true,  type:  "button"  }  ],
middle_shiftoff_fxAssignL2:            [  0x96  ,  0x4D  ,  {  led:  true,  type:  "button"  }  ],
middle_shiftoff_fxAssignR1:            [  0x96  ,  0x50  ,  {  led:  true,  type:  "button"  }  ],
middle_shiftoff_fxAssignR2:            [  0x96  ,  0x51  ,  {  led:  true,  type:  "button"  }  ],
middle_fx1Assign3LED:                  [  0x96  ,  0x5A  ,  {  led:  true,  type:  "led"  }  ],
middle_fx1Assign4LED:                  [  0x96  ,  0x5B  ,  {  led:  true,  type:  "led"  }  ],
middle_fx2Assign3LED:                  [  0x96  ,  0x5C  ,  {  led:  true,  type:  "led"  }  ],
middle_fx2Assign4LED:                  [  0x96  ,  0x5D  ,  {  led:  true,  type:  "led"  }  ],
middle_shiftoff_load1:                 [  0x96  ,  0x46  ,  {  led:  false,  type:  "button"  }  ],
middle_shiftoff_load2:                 [  0x96  ,  0x47  ,  {  led:  false,  type:  "button"  }  ],
middle_shiftoff_load3:                 [  0x96  ,  0x48  ,  {  led:  false,  type:  "button"  }  ],
middle_shiftoff_load4:                 [  0x96  ,  0x49  ,  {  led:  false,  type:  "button"  }  ],
middle_shiftoff_rotary:                [  0xB6  ,  0x40  ,  {  led:  false,  type:  "button"  }  ],
middle_shiftoff_rotaryBtn:             [  0x96  ,  0x41  ,  {  led:  false,  type:  "button"  }  ],
middle_shiftoff_selectDeck3:           [  0x92  ,  0x72  ,  {  led:  true,  type:  "button"  }  ],
middle_shiftoff_selectDeck4:           [  0x93  ,  0x72  ,  {  led:  true,  type:  "button"  }  ],
middle_shiftoff_volume:                [  0xB6  ,  0x03  ,  {  led:  false,  type:  "button"  }  ],
middle_shiftoff_volume_detail:         [  0xB6  ,  0x23  ,  {  led:  false,  type:  "detail"  }  ],
middle_shifton_back:                   [  0x96  ,  0x66  ,  {  led:  false,  type:  "button"  }  ],
middle_shifton_forward:                [  0x96  ,  0x68  ,  {  led:  false,  type:  "button"  }  ],
middle_shifton_fxAssignL1:             [  0x96  ,  0x4E  ,  {  led:  true,  type:  "button"  }  ],
middle_shifton_fxAssignL2:             [  0x96  ,  0x4F  ,  {  led:  true,  type:  "button"  }  ],
middle_shifton_fxAssignR1:             [  0x96  ,  0x52  ,  {  led:  true,  type:  "button"  }  ],
middle_shifton_fxAssignR2:             [  0x96  ,  0x53  ,  {  led:  true,  type:  "button"  }  ],
middle_shifton_load1:                  [  0x96  ,  0x58  ,  {  led:  false,  type:  "button"  }  ],
middle_shifton_load2:                  [  0x96  ,  0x59  ,  {  led:  false,  type:  "button"  }  ],
middle_shifton_load3:                  [  0x96  ,  0x60  ,  {  led:  false,  type:  "button"  }  ],
middle_shifton_load4:                  [  0x96  ,  0x61  ,  {  led:  false,  type:  "button"  }  ],
middle_shifton_rotary:                 [  0xB6  ,  0x64  ,  {  led:  false,  type:  "button"  }  ],
middle_shifton_rotaryBtn:              [  0x96  ,  0x42  ,  {  led:  false,  type:  "button"  }  ],
middle_shifton_selectDeck3:            [  0x92  ,  0x73  ,  {  led:  false,  type:  "button"  }  ],
middle_shifton_selectDeck4:            [  0x93  ,  0x73  ,  {  led:  false,  type:  "button"  }  ],
middle_shifton_volume:                 [  0xB6  ,  0x69  ,  {  led:  false,  type:  "knob"  }  ],
    last: true
};
// End of sp1-midiMap.js
//// include sp1-lib.js
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
// End of sp1-lib.js
//// include sp1-deck.js
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
// End of sp1-deck.js
//// include sp1-middle.js
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
                sp1.fx.updateDeckLeds();
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
                sp1.fx.updateDeckLeds();
            } else {
                sp1[member] = offdeck;
                sp1.ledSet(led, false);
                sp1.fx.updateDeckLeds();
            }
            options.andThen(value);
        });
    };

    var selectDeck3Down = false;
    var selectDeck4Down = false;

    // while deck3 is pressed, left side is deck3
    midi[ret._physGet(false, 'selectDeck3')] = momentaryDeckSwitch(
        { ondeck: sp1.deck3, offdeck: sp1.deck1,
          led: ret._physGet(false, 'selectDeck3'),
          member: 'currentLeftDeck',
          andThen: function(value) { selectDeck3Down = (value === 0x7F); }
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
          member: 'currentRightDeck',
          andThen: function(value) { selectDeck4Down = (value === 0x7F); }
        });
    midi[ret._physGet(true, 'selectDeck4')] = toggleDecks(
        { ondeck: sp1.deck4, offdeck: sp1.deck2,
          led: ret._physGet(false, 'selectDeck4'),
          member: 'currentRightDeck'
        });

    var loadDeckN = function(deck) {

        midi[ret._physGet(false, 'load' + deck)] = midiValueHandler(function(value) {
            mixxxButtonPress('[Channel' + deck + ']', 'LoadSelectedTrack');
            sp1['deck' + deck].trackLoaded();
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

    // hold deck3+deck4+load/prepare to go into prepareMode
    midi[ret._physGet(false, 'forward')] = midiValueHandler(function(value) {
        if (value == 0x7F && selectDeck3Down && selectDeck4Down) {
            sp1.prepMode = !sp1.prepMode;
            dbglog("prepMode is now " + sp1.prepMode);
        }
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

// End of sp1-middle.js
//// include sp1-fx.js
//
// Creates midi handlers for the fx portion of the sp1
// Note that the 'fx portion' refers to the portion that
// _we_ use as the global fx (first 2 knobs/latches on each side)

// NOTE: This reflects the order in which the effects cycle in the mixxx ui.
// Therefore, this is a particularly brittle component of this script.
sp1._fx = [
     'flanger',
     'bitcrusher' ,
     'filter' ,
     'reverb' ,
     'echo' 
];

var makeFx = function() {

    var ret = {};
    var midi = sp1.midi;
    ret.physicalPrefix = 'fx_';
    ret._physGet = function(shift, logicalKey) {
        return ret.physicalPrefix + (shift? 'shifton_' : 'shiftoff_') + logicalKey;
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

    // no shift support here yet
    var makeFxControl = function(knob, latch, groupNum) {
        midi[ret._physGet(false, knob)] = midiValueHandler(function(value) {
            mixxxSet(fxgroup(groupNum), 'super1', valueFromMidi(value));
            // mix should very quickly hit max (note that we rely on mixxx to 'clip' the value
            // once we hit 0x7F
            mixxxSet(fxgroup(groupNum), 'mix', valueFromMidi(value*value / 4));
        });
        midi[ret._physGet(false, latch)] = midiValueHandler(function(value) {
            if (value == 0x7F) {
                mixxxToggle(fxgroup(groupNum), 'enabled');
                sp1.ledSet(ret._physGet(false, latch), mixxxGet(fxgroup(groupNum), 'enabled'));
            }
        });
        sp1.ledSet(ret._physGet(false, latch), mixxxGet(fxgroup(groupNum), 'enabled'));
    };

    makeFxControl('fx1knob1', 'fx1latch1', 1);
    makeFxControl('fx1knob2', 'fx1latch2', 2);
    // reverb needs special handling: 1) damping inversed 2) set parameter2 instead of super1
    (function(knob, latch, groupNum) {
        midi[ret._physGet(false, knob)] = function(channel, control, value, status, group) {
            mixxxSet('[EffectRack1_EffectUnit3_Effect1]', 'parameter2', valueFromMidi(0x7F - value));
            mixxxSet(fxgroup(groupNum), 'mix', valueFromMidi(value*value / 4));
        };
        midi[ret._physGet(false, latch)] = function(channel, control, value, status, group) {
            if (value == 0x7F) {
                mixxxToggle(fxgroup(groupNum), 'enabled');
                sp1.ledSet(ret._physGet(false, latch), mixxxGet(fxgroup(groupNum), 'enabled'));
            }
        };
        sp1.ledSet(ret._physGet(false, latch), mixxxGet(fxgroup(groupNum), 'enabled'));
    })('fx2knob1', 'fx2latch1', 3);
    makeFxControl('fx2knob2', 'fx2latch2', 4);

    var connectToDeckKnobLatch = function(getDeckFn, knobLatchName, knob, latch) {
        midi[ret._physGet(false, knob)] = midiValueHandler(function(value) {
            getDeckFn()[knobLatchName].knob(value);
        });
        midi[ret._physGet(false, latch)] = midiValueHandler(function(value) {
            if (value === 127) {
                getDeckFn()[knobLatchName].latch();
                var isLatched = getDeckFn()[knobLatchName].latched === true;
                sp1.ledSet(ret._physGet(false, latch), isLatched);
            }
        });
    };

    var getLeftDeck = function() { return sp1.getLeftDeck(); };
    var getRightDeck = function() { return sp1.getRightDeck(); };
    // knob3/latch3 are redirected to the current left or right deck's volume
    connectToDeckKnobLatch(getLeftDeck, 'volume', 'fx1knob3', 'fx1latch3');
    connectToDeckKnobLatch(getRightDeck, 'volume', 'fx2knob3', 'fx2latch3');
    // knob2/latch2 are redirected to current left/right deck's low eq
    connectToDeckKnobLatch(getLeftDeck, 'eqHigh', 'fx1knob2', 'fx1latch2');
    connectToDeckKnobLatch(getRightDeck, 'eqHigh', 'fx2knob2', 'fx2latch2');
    // knob1/latch1 are redirected to current left/right deck's low eq
    connectToDeckKnobLatch(getLeftDeck, 'eqLow', 'fx1knob1', 'fx1latch1');
    connectToDeckKnobLatch(getRightDeck, 'eqLow', 'fx2knob1', 'fx2latch1');

    ret.updateDeckLeds = function() {
        return;
        sp1.ledSet(ret._physGet(false, 'fx1latch1'), sp1.getLeftDeck().eqLowLatchGet());
        sp1.ledSet(ret._physGet(false, 'fx2latch1'), sp1.getRightDeck().eqLowLatchGet());

        sp1.ledSet(ret._physGet(false, 'fx1latch2'), sp1.getLeftDeck().eqHighLatchGet());
        sp1.ledSet(ret._physGet(false, 'fx2latch2'), sp1.getRightDeck().eqHighLatchGet());

        sp1.ledSet(ret._physGet(false, 'fx1latch3'), sp1.getLeftDeck().volumeLatchGet());
        sp1.ledSet(ret._physGet(false, 'fx2latch3'), sp1.getRightDeck().volumeLatchGet());
    };

    // forward rotary to left/right deck
    midi[ret._physGet(false, 'fx1rotary')] = midiValueHandler(function(value) {
        sp1.getLeftDeck().tempoAdjust(value);
    });
    midi[ret._physGet(true, 'fx1rotary')] = midiValueHandler(function(value) {
        sp1.getLeftDeck().pitchAdjust(value);
    });
    midi[ret._physGet(false, 'fx2rotary')] = midiValueHandler(function(value) {
        sp1.getRightDeck().tempoAdjust(value);
    });
    midi[ret._physGet(true, 'fx2rotary')] = midiValueHandler(function(value) {
        sp1.getRightDeck().pitchAdjust(value);
    });
    midi[ret._physGet(false, 'fx1rotaryLatch')] = midiValueHandler(function(value) {
        sp1.getLeftDeck().tapTempo(value);
    });

    midi[ret._physGet(false, 'fx1rotaryBtn')] = midiValueHandler(function(value) {
        sp1.getLeftDeck().tempoReset(value);
    });
    midi[ret._physGet(true, 'fx1rotaryBtn')] = midiValueHandler(function(value) {
        sp1.getLeftDeck().pitchReset(value);
    });
    midi[ret._physGet(false, 'fx2rotaryBtn')] = midiValueHandler(function(value) {
        sp1.getRightDeck().tempoReset(value);
    });
    midi[ret._physGet(true, 'fx2rotaryBtn')] = midiValueHandler(function(value) {
        sp1.getRightDeck().pitchReset(value);
    });
    midi[ret._physGet(false, 'fx2rotaryLatch')] = midiValueHandler(function(value) {
        sp1.getRightDeck().tapTempo(value);
    });

    return ret;
};

// End of sp1-fx.js

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

