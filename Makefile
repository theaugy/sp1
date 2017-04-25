
home = $(shell cd; pwd)

target = $(home)/.mixxx/controllers

files = \
	sp1.js \
	Pioneer_DDJ-SP1_MIDI_1.midi.xml \

Pioneer_DDJ-SP1_MIDI_1.midi.xml : top.xml bottom.xml sp1-generate-xml.sh sp1.js
	cp top.xml $@
	./sp1-generate-xml.sh >> $@
	cat bottom.xml >> $@

components = \
	sp1-midiMap.js \
	sp1-lib.js \
	sp1-deck.js	 \
	sp1-middle.js \
	sp1-fx.js \
	sp1-main.js


sp1.js : $(components) sp1-js-make.sh
	./sp1-js-make.sh > $@


install: $(files)
	cp $^ $(target)

.PHONY: install
