
home = $(shell cd; pwd)

target = $(home)/.mixxx/controllers

files = \
	sp1.js \
	Pioneer_DDJ-SP1_MIDI_1.midi.xml \

Pioneer_DDJ-SP1_MIDI_1.midi.xml : top.xml bottom.xml sp1-generate-xml.sh sp1.js
	cp top.xml $@
	./sp1-generate-xml.sh >> $@
	cat bottom.xml >> $@

install: $(files)
	cp $^ $(target)

.PHONY: install
