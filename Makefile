
home = $(shell cd; pwd)

target = $(home)/.mixxx/controllers

files = \
	sp1.js \
	Pioneer_DDJ-SP1_MIDI_1.midi.xml \

install: $(files)
	cp $^ $(target)

.PHONY: install
