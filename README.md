# SP1 for Mixxx

![Pioneer DDJ-SP1](https://pdj-ecom-cdn.azureedge.net/-/media/pioneerdj/images/products/controller/ddj-sp1/black/ddj-sp1-main.png)

This script seeks to mimic the behavior of the Pioneer DDJ-SP1 under Serato,
but with some choice behavior modifications to make it better suited for DJ'ing
without turntables.

My philosophy is that it should be simple to use and avoid design decisions that require you to
stare at your computer to do basic things, or which make it too easy to bork things up. This means
that you should be able to look at your SP1 and know what state Mixxx is in.

It also implements a 'prep mode', which is optimized for preparing tracks to play live.

It supports 4 decks, effects, hotcues, loops, and basic library navigation, and targets
Mixxx 2.0.

## Installation

   *   Download `Pioneer_DDJ-SP1_MIDI_1.midi.xml` and `sp1.js`
   *   Copy both to the `.mixxx/controllers` directory (see [Installing a Preset from the Forum](https://www.mixxx.org/manual/latest/chapters/controlling_mixxx.html))
   *   Plug in your SP1, start Mixxx, select the DDJ-SP1 under Controllers, and select
        the `Pioneer_DDJ-SP1_MIDI_1` preset

You should now see your SP1 initialize (the LEDs should all light up from top to bottom). Have fun!

## Performance Mode

By default, the SP1 is initialized in performance mode. Performance mode has controls for
global and deck-specific effects, tempo adjustments, looping, and hotcues.

### Effects

As under Serato, effects are global, and can be assigned to individual decks using the
`FX Assign` buttons. Use `Shift` to assign to decks 3 and 4.

Unlike Serato, each effect knob is hard-coded to a single effect. While it is possible to
have the turn-knob-to-select-effect behavior, doing so also means you need to look at your
computer to know what an effect will do. I don't like looking at my computer on stage.

Turning the knob right will give you "more" of the effect. Left will give you less.
The latch buttons underneath each knob toggles the effect on or off.

Because Mixxx has 4 effect units, and the SP1 has 6 effect knobs (3 per side), the
first 2 knobs of `FX1` and `FX2` are mapped to Mixxx's effect units 1-4. This leaves
the 3rd knob open on each side, which is used to control the filter "quick effect" for the currently
active deck. So if you have deck 1 active on the left and deck 2 active on the right,
Turning the 3rd `FX1` knob will tweak deck 1's filter, and the 3rd `FX2` knob will tweak
deck 2's filter.

### Tempo

The FX rotary, `Beats`, will adjust the tempo of the currently active deck. Press the rotary
button to reset the tempo.

`Shift+Beats` will adjust the pitch without affecting the tempo. Hold `Shift` and press to reset
the pitch.

### Sync

Pressing `Sync` will sync this deck's tempo to the "other" deck's tempo. I'm not 100%
sure I understand how the "other" deck is selected, but it seems to roughly be that
the closest (by deck number) lower-number deck is used. If there is no such deck, the
closest higher-number deck is used.

### Looping

Looping is controlled by the Roll pad mode (press `Roll` button to switch), as well as
the `Autoloop` rotary and the `ParamLeft`/`ParamRight` controls.

In Roll mode, the pads can be used to create or toggle loops of various sizes from 1/8th
of a beat up to 16 beats (this matches the loop sizes available in the Mixxx default skin).
Press a pad once to create the loop. Press it again to escape the loop. You can use the
`Autoloop` rotary to halve/double the loop size, and you can press the `Autoloop` rotary button
to toggle the loop active/inactive.

`ParamLeft`/`ParamRight` will move the loop left or right an amount equal to the loop size.

`Shift+ParamLeft`/`Shift+ParamRight` will move the loop left or right 8x the loop length, which
can create some interesting effects.

If you are in Hotcue mode (see below), `Shift+HotcueN` will jump to HotcueN and create a 4 beat
loop there.

### Hotcues

When you load a track or switch to Hotcue mode, the pads will light up to show you which hotcues
have been set. Pressing a hotcue will jump to that position and put the deck in play mode.

Pressing `Shift+HotcueN` will create a 4 bar loop at that position, but will _not_ change the play mode.
So if you are already playing, the track will immediately start looping at that
hotcue, but if you are stopped, the track will wait for you to press play (or press the hotcue again
without holding `Shift`) to begin playback.

Slip mode is supported: just press `Slip`. The `Slip` button will light up. You can now do whatever
looping/hotcue juggling you want, and when you press `Slip` again, playback will resume as though
you had not touched anything.

### Selecting Decks

`SelectDeck3` and `SelectDeck4` are momentary buttons by default. This is meant to allow you to
quickly jump to one of these "background" decks, do something like initiate a loop or tweak the
filter, and jump back to deck 2 or deck 3.

You can permanently select these decks by holding `Shift` while you press either button. The
`SelectDeck3`/`SelectDeck4` button will stay lit. You can press the corresponding `SelectDeckN`
button (with or without `Shift`) to switch back to the "foreground" deck.

### Volume Slider

By default, the `SamplerVolume` slider (bottom center) controls the volume of the _inactive_
deck on either the left (without `Shift`) or right (while holding `Shift`). The rationale
here is that if you are blending between deck 1 and deck 2, but have, say, a loop playing on
deck 3, you might want to be able to filter out deck 1, filter in deck 2, and fade out
deck 3 simultaneously. Having `SamplerVolume` control a deck that isn't already active
saves you from having to switch to deck 3 to fade it out.

### Selecting Tracks

The `MiddleRotary` will select previous/next track in the library. the `LoadLeft` and `LoadRight`
buttons will load the currently selected track into the currently active deck on the respective
side.

### Some Performance Mode Tricks

Some stuff I've been doing in the lab:

   *   Some controls, like the per-deck filter (The third knob in `FX1`/`FX2`) and `SamplerVolume`,
        change their target deck based on the active deck or the `Shift` button. You can, for instance,
        effectively filter out deck 1 and deck 3 simultaneously by rapidly pressing `SelectDeck3` while
        turning the 3rd `FX1` knob, or turn down deck 3 and deck 4 simultaneously by rapdily pressing
        `Shift` while lowering the volume slider.
   *   `Shift+ParamLeft` and `Shift+ParamRight` can jump you pretty far around a track, which can
        allow you to tease drops (with large loop sizes) or create glitchy renditions of melodies
        (with small loop sizes)

### Unclaimed Controls

There are a few "unclaimed" controls. I'm still looking for features to implement for them:

   *   `Censor` / `Shift+Censor`
   *   `Slicer`/`Sampler`, as well as all the `Shift`+PadMode pad modes.
        It should be possible to emulate Serato's Slicer feature within this script.
        Mixxx does have a "Sampler", which is basically just a ton of hidden decks. I don't use it but perhaps it would be a good starting point.
   *   `Shift+Autoloop`
   *   `Shift+Slip`
   *   `Back`/`Load/Prepare` (although Mixxx v2.1 adds some controls that should work for these)
   *   `Tap` (the latch under the `Beat` rotary)


## Prep Mode

Holding `SelectDeck3`+`SelectDeck4` then pressing the `Load/Prepare` button will put the
SP1 in prep mode, which is designed to allow you to prepare tracks without touching your mouse
or keyboard. I will never prep tracks again without it :]

The controls in Prep Mode are the same as in performance mode, with the following exceptions:

   *   Hotcue mode pads set the hotcue. Hold `Shift` and press a pad to clear that hotcue
   *   `Autoloop` jumps forward/backward by 1 beat
   *   `Autoloop` rotary button sets the cue point and starts playing in CDJ cue point mode
   *   `Sync` sets the downbeat to the current playback position
   *   `Beat` rotary adjusts the track's BPM. This is the BPM stored in the library, *not* the playback tempo!
   *   `Slip` jumps to current cue point
   *   `Shift+Autloop` does fine-grained adjustment of the current playback position
   *   `ParamLeft`/`ParamRight` jumps 8 beats backwards/forwards, where the first 4 beats happen on button-down, and the second 4 beats happen when you release.
        Note that you can set hotcues while holding one of the buttons, which is handy for the odd track
        that has smaller phrasing

This is very well suited to a particular workflow:

   1)  Use `MiddleRotary` + `LoadLeft` to load up a track
   2)  Use `Autoloop` to get to a downbeat transient (use `Shift+Autoloop` to get it exact). Press `Autoloop` to preview track at current position.
   3)  Press `Sync` to set the downbeat
   4)  Set a hotcue
   5)  Use `Autoloop` to scan through the track and ensure the BPM was detected correctly
   6)  If not, use `Beat` rotary to adjust BPM.
   7)  Jump to downbeat (press hotcue you set)
   8)  Press `Sync` to reset the downbeat
   9)  Go to 5. Note that you can press `Autoloop` later in the track to set cue point, then press `Slip` here to jump to it and check the BPM.
   10) Once BPM is correct, use `ParamLeft`/`ParamRight` to quickly jump through the track and set hotcues elsewhere

Note that there is acceleration applied to `Autoloop` and `Beat` rotary movement.

The `Slip` button is designed to make it possible to quickly check a downbeat far away from your
"reference" downbeat, which is helpful when you're dialing in a track's BPM.

#### TODO

   *   Find use for the Slicer and Sampler pad modes

   *   Check for updates for autoloop rotary btn bug (deck3 sends same midi as deck4)

   *   Shift+fx1/fx2 functionality?

   *   Tap tempo doesn't seem to work? Doesn't work in UI either, so... Mixxx bug?

   *   Visual feedback when switching between performance and prep modes

   *   Acceleration for `MiddleRotary`

   *   Make YouTube video for "Prep Mode" workflow
