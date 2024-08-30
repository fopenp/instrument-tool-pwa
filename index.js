/*
COPYRIGHT © 2024 Fabio Pollini a.k.a. FopenP <f.open.p@gmail.com> and contributors (see CONTRIBUTORS.md)

The MIT License
---------------

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
*/

console.log(`App version: v${itoolVersion}`);

let itoolInstrument1IsClick = false;  // If the user has clicking on the instrument n.1

let itoolNavBarId = 0  // 0 = notes ; 1 = settings ; 2 = credits
let itoolNavBarCurrentStr = "";
let itoolNavBarNextStr = "";


let Globals = {
    versionMaj: itoolVersionMaj,
    versionMin: itoolVersionMin,
    versionRev: itoolVersionRev,
    version: itoolVersion,
    instrument1: "",
    instrument2: "",
    lang: itoolLang,
    langAuto: true,  // It's true when "Auto" language is set.
    classicalNotation: false  // It's true when the user wants to see notes in classical notation.
};

let audioContext = null;

let Instrument = {
    "bass-jb8": {
        image: "assets/i/bass-jb8.jpg",
        imageWidth: "8340",
        imageHeight: "1280",
        /*
        left: -2500,
        top: -500,
        */
        left: 0,
        top: 0,
        scalePercentage: 20,
        noteRadius: 8,
        noteColor: "red",
        singleNote: true,  // it's true when no multiple chords are allowed to play.
        note: {
            "ch4-e1": { idx: 1, name: "E", octave: 1, chord: 4, imagePosX: 467, imagePosY: 158, color: "#cc0000", sound: "assets/s/jb8/001-e1.mp3" },
            "ch4-f1": { idx: 2, name: "F", octave: 1, chord: 4, imagePosX: 512, imagePosY: 158, sound: "assets/s/jb8/001-e1.mp3", detune: 100 },
            "ch4-fd1": { idx: 3, name: "F#", octave: 1, chord: 4, imagePosX: 554, imagePosY: 158, sound: "assets/s/jb8/001-e1.mp3", detune: 200 },
            "ch4-g1": { idx: 4, name: "G", octave: 1, chord: 4, imagePosX: 599, imagePosY: 158, sound: "assets/s/jb8/001-e1.mp3", detune: 300 },
            "ch4-gd1": { idx: 5, name: "G#", octave: 1, chord: 4, imagePosX: 642, imagePosY: 158, sound: "assets/s/jb8/001-e1.mp3", detune: 400 },
            "ch4-a1": { idx: 6, name: "A", octave: 1, chord: 4, imagePosX: 689, imagePosY: 158, sound: "assets/s/jb8/001-e1.mp3", detune: 500 },
            "ch4-ad1": { idx: 7, name: "A#", octave: 1, chord: 4, imagePosX: 732, imagePosY: 158, sound: "assets/s/jb8/001-e1.mp3", detune: 600 },
            "ch4-b1": { idx: 8, name: "B", octave: 1, chord: 4, imagePosX: 776, imagePosY: 158, sound: "assets/s/jb8/001-e1.mp3", detune: 700 },
            "ch4-c2": { idx: 9, name: "C", octave: 2, chord: 4, imagePosX: 821, imagePosY: 158, sound: "assets/s/jb8/001-e1.mp3", detune: 800 },
            "ch4-cd2": { idx: 10, name: "C#", octave: 2, chord: 4, imagePosX: 865, imagePosY: 158, sound: "assets/s/jb8/001-e1.mp3", detune: 900 },
            "ch4-d2": { idx: 11, name: "D", octave: 2, chord: 4, imagePosX: 909, imagePosY: 158, sound: "assets/s/jb8/001-e1.mp3", detune: 1000 },
            "ch4-dd2": { idx: 12, name: "D#", octave: 2, chord: 4, imagePosX: 955, imagePosY: 158, sound: "assets/s/jb8/001-e1.mp3", detune: 1100 },
            "ch4-e2": { idx: 13, name: "E", octave: 2, chord: 4, imagePosX: 997, imagePosY: 158, sound: "assets/s/jb8/001-e1.mp3", detune: 1200 },
            "ch4-f2": { idx: 14, name: "F", octave: 2, chord: 4, imagePosX: 1043, imagePosY: 158, sound: "assets/s/jb8/013-e2.mp3", detune: 100 },
            "ch4-fd2": { idx: 15, name: "F#", octave: 2, chord: 4, imagePosX: 1087, imagePosY: 158, sound: "assets/s/jb8/013-e2.mp3", detune: 200 },
            "ch4-g2": { idx: 16, name: "G", octave: 2, chord: 4, imagePosX: 1132, imagePosY: 158, sound: "assets/s/jb8/013-e2.mp3", detune: 300 },
            "ch4-gd2": { idx: 17, name: "G#", octave: 2, chord: 4, imagePosX: 1176, imagePosY: 158, sound: "assets/s/jb8/013-e2.mp3", detune: 400 },
            "ch4-a2": { idx: 18, name: "A", octave: 2, chord: 4, imagePosX: 1221, imagePosY: 158, sound: "assets/s/jb8/013-e2.mp3", detune: 500 },
            "ch4-ad2": { idx: 19, name: "A#", octave: 2, chord: 4, imagePosX: 1265, imagePosY: 158, sound: "assets/s/jb8/013-e2.mp3", detune: 600 },
            "ch4-b2": { idx: 20, name: "B", octave: 2, chord: 4, imagePosX: 1310, imagePosY: 158, sound: "assets/s/jb8/013-e2.mp3", detune: 700 },
            "ch4-c3": { idx: 21, name: "C", octave: 3, chord: 4, imagePosX: 1349, imagePosY: 158, sound: "assets/s/jb8/013-e2.mp3", detune: 800 },
            "ch4-cd3": { idx: 22, name: "C#", octave: 3, chord: 4, imagePosX: 1382, imagePosY: 158, sound: "assets/s/jb8/013-e2.mp3", detune: 900 },
            "ch4-d3": { idx: 23, name: "D", octave: 3, chord: 4, imagePosX: 1410, imagePosY: 158, sound: "assets/s/jb8/013-e2.mp3", detune: 1000 },
            "ch4-dd3": { idx: 24, name: "D#", octave: 3, chord: 4, imagePosX: 1439, imagePosY: 158, sound: "assets/s/jb8/013-e2.mp3", detune: 1100 },
            "ch4-e3": { idx: 25, name: "E", octave: 3, chord: 4, imagePosX: 1466, imagePosY: 158, sound: "assets/s/jb8/013-e2.mp3", detune: 1200 },
            "ch3-a1": { idx: 26, name: "A", octave: 1, chord: 3, imagePosX: 467, imagePosY: 138, color: "#cc0000", sound: "assets/s/jb8/026-a1.mp3" },
            "ch3-ad1": { idx: 27, name: "A#", octave: 1, chord: 3, imagePosX: 512, imagePosY: 138, sound: "assets/s/jb8/026-a1.mp3", detune: 100 },
            "ch3-b1": { idx: 28, name: "B", octave: 1, chord: 3, imagePosX: 554, imagePosY: 138, sound: "assets/s/jb8/026-a1.mp3", detune: 200 },
            "ch3-c2": { idx: 29, name: "C", octave: 2, chord: 3, imagePosX: 599, imagePosY: 138, sound: "assets/s/jb8/026-a1.mp3", detune: 300 },
            "ch3-cd2": { idx: 30, name: "C#", octave: 2, chord: 3, imagePosX: 642, imagePosY: 138, sound: "assets/s/jb8/026-a1.mp3", detune: 400 },
            "ch3-d2": { idx: 31, name: "D", octave: 2, chord: 3, imagePosX: 689, imagePosY: 138, sound: "assets/s/jb8/026-a1.mp3", detune: 500 },
            "ch3-dd2": { idx: 32, name: "D#", octave: 2, chord: 3, imagePosX: 732, imagePosY: 138, sound: "assets/s/jb8/026-a1.mp3", detune: 600 },
            "ch3-e2": { idx: 33, name: "E", octave: 2, chord: 3, imagePosX: 776, imagePosY: 138, sound: "assets/s/jb8/026-a1.mp3", detune: 700 },
            "ch3-f2": { idx: 34, name: "F", octave: 2, chord: 3, imagePosX: 821, imagePosY: 138, sound: "assets/s/jb8/026-a1.mp3", detune: 800 },
            "ch3-fd2": { idx: 35, name: "F#", octave: 2, chord: 3, imagePosX: 865, imagePosY: 138, sound: "assets/s/jb8/026-a1.mp3", detune: 900 },
            "ch3-g2": { idx: 36, name: "G", octave: 2, chord: 3, imagePosX: 909, imagePosY: 138, sound: "assets/s/jb8/026-a1.mp3", detune: 1000 },
            "ch3-gd2": { idx: 37, name: "G#", octave: 2, chord: 3, imagePosX: 955, imagePosY: 138, sound: "assets/s/jb8/026-a1.mp3", detune: 1100 },
            "ch3-a2": { idx: 38, name: "A", octave: 2, chord: 3, imagePosX: 997, imagePosY: 138, sound: "assets/s/jb8/038-a2.mp3" },
            "ch3-ad2": { idx: 39, name: "A#", octave: 2, chord: 3, imagePosX: 1043, imagePosY: 138, sound: "assets/s/jb8/038-a2.mp3", detune: 100 },
            "ch3-b2": { idx: 40, name: "B", octave: 2, chord: 3, imagePosX: 1087, imagePosY: 138, sound: "assets/s/jb8/038-a2.mp3", detune: 200 },
            "ch3-c3": { idx: 41, name: "C", octave: 3, chord: 3, imagePosX: 1132, imagePosY: 138, sound: "assets/s/jb8/038-a2.mp3", detune: 300 },
            "ch3-cd3": { idx: 42, name: "C#", octave: 3, chord: 3, imagePosX: 1176, imagePosY: 138, sound: "assets/s/jb8/038-a2.mp3", detune: 400 },
            "ch3-d3": { idx: 43, name: "D", octave: 3, chord: 3, imagePosX: 1221, imagePosY: 138, sound: "assets/s/jb8/038-a2.mp3", detune: 500 },
            "ch3-dd3": { idx: 44, name: "D#", octave: 3, chord: 3, imagePosX: 1265, imagePosY: 138, sound: "assets/s/jb8/038-a2.mp3", detune: 600 },
            "ch3-e3": { idx: 45, name: "E", octave: 3, chord: 3, imagePosX: 1310, imagePosY: 138, sound: "assets/s/jb8/038-a2.mp3", detune: 700 },
            "ch3-f3": { idx: 46, name: "F", octave: 3, chord: 3, imagePosX: 1349, imagePosY: 138, sound: "assets/s/jb8/038-a2.mp3", detune: 800 },
            "ch3-fd3": { idx: 47, name: "F#", octave: 3, chord: 3, imagePosX: 1382, imagePosY: 138, sound: "assets/s/jb8/038-a2.mp3", detune: 900 },
            "ch3-g3": { idx: 48, name: "G", octave: 3, chord: 3, imagePosX: 1410, imagePosY: 138, sound: "assets/s/jb8/038-a2.mp3", detune: 1000 },
            "ch3-gd3": { idx: 49, name: "G#", octave: 3, chord: 3, imagePosX: 1439, imagePosY: 138, sound: "assets/s/jb8/038-a2.mp3", detune: 1100 },
            "ch3-a3": { idx: 50, name: "A", octave: 3, chord: 3, imagePosX: 1466, imagePosY: 138, sound: "assets/s/jb8/038-a2.mp3", detune: 1200 },
            "ch2-d2": { idx: 51, name: "D", octave: 2, chord: 2, imagePosX: 467, imagePosY: 118, color: "#cc0000", sound: "assets/s/jb8/051-d2.mp3" },
            "ch2-dd2": { idx: 52, name: "D#", octave: 2, chord: 2, imagePosX: 512, imagePosY: 118, sound: "assets/s/jb8/051-d2.mp3", detune: 100 },
            "ch2-e2": { idx: 53, name: "E", octave: 2, chord: 2, imagePosX: 554, imagePosY: 118, sound: "assets/s/jb8/051-d2.mp3", detune: 200 },
            "ch2-f2": { idx: 54, name: "F", octave: 2, chord: 2, imagePosX: 599, imagePosY: 118, sound: "assets/s/jb8/051-d2.mp3", detune: 300 },
            "ch2-fd2": { idx: 55, name: "F#", octave: 2, chord: 2, imagePosX: 642, imagePosY: 118, sound: "assets/s/jb8/051-d2.mp3", detune: 400 },
            "ch2-g2": { idx: 56, name: "G", octave: 2, chord: 2, imagePosX: 689, imagePosY: 118, sound: "assets/s/jb8/051-d2.mp3", detune: 500 },
            "ch2-gd2": { idx: 57, name: "G#", octave: 2, chord: 2, imagePosX: 732, imagePosY: 118, sound: "assets/s/jb8/051-d2.mp3", detune: 600 },
            "ch2-a2": { idx: 58, name: "A", octave: 2, chord: 2, imagePosX: 776, imagePosY: 118, sound: "assets/s/jb8/051-d2.mp3", detune: 700 },
            "ch2-ad2": { idx: 59, name: "A#", octave: 2, chord: 2, imagePosX: 821, imagePosY: 118, sound: "assets/s/jb8/051-d2.mp3", detune: 800 },
            "ch2-b2": { idx: 60, name: "B", octave: 2, chord: 2, imagePosX: 865, imagePosY: 118, sound: "assets/s/jb8/051-d2.mp3", detune: 900 },
            "ch2-c3": { idx: 61, name: "C", octave: 3, chord: 2, imagePosX: 909, imagePosY: 118, sound: "assets/s/jb8/051-d2.mp3", detune: 1000 },
            "ch2-cd3": { idx: 62, name: "C#", octave: 3, chord: 2, imagePosX: 955, imagePosY: 118, sound: "assets/s/jb8/051-d2.mp3", detune: 1100 },
            "ch2-d3": { idx: 63, name: "D", octave: 3, chord: 2, imagePosX: 997, imagePosY: 118, sound: "assets/s/jb8/063-d3.mp3" },
            "ch2-dd3": { idx: 64, name: "D#", octave: 3, chord: 2, imagePosX: 1043, imagePosY: 118, sound: "assets/s/jb8/063-d3.mp3", detune: 100 },
            "ch2-e3": { idx: 65, name: "E", octave: 3, chord: 2, imagePosX: 1087, imagePosY: 118, sound: "assets/s/jb8/063-d3.mp3", detune: 200 },
            "ch2-f3": { idx: 66, name: "F", octave: 3, chord: 2, imagePosX: 1132, imagePosY: 118, sound: "assets/s/jb8/063-d3.mp3", detune: 300 },
            "ch2-fd3": { idx: 67, name: "F#", octave: 3, chord: 2, imagePosX: 1176, imagePosY: 118, sound: "assets/s/jb8/063-d3.mp3", detune: 400 },
            "ch2-g3": { idx: 68, name: "G", octave: 3, chord: 2, imagePosX: 1221, imagePosY: 118, sound: "assets/s/jb8/063-d3.mp3", detune: 500 },
            "ch2-gd3": { idx: 69, name: "G#", octave: 3, chord: 2, imagePosX: 1265, imagePosY: 118, sound: "assets/s/jb8/063-d3.mp3", detune: 600 },
            "ch2-a3": { idx: 70, name: "A", octave: 3, chord: 2, imagePosX: 1310, imagePosY: 118, sound: "assets/s/jb8/063-d3.mp3", detune: 700 },
            "ch2-ad3": { idx: 71, name: "A#", octave: 3, chord: 2, imagePosX: 1349, imagePosY: 118, sound: "assets/s/jb8/063-d3.mp3", detune: 800 },
            "ch2-b3": { idx: 72, name: "B", octave: 3, chord: 2, imagePosX: 1382, imagePosY: 118, sound: "assets/s/jb8/063-d3.mp3", detune: 900 },
            "ch2-c4": { idx: 73, name: "C", octave: 4, chord: 2, imagePosX: 1410, imagePosY: 118, sound: "assets/s/jb8/063-d3.mp3", detune: 1000 },
            "ch2-cd4": { idx: 74, name: "C#", octave: 4, chord: 2, imagePosX: 1439, imagePosY: 118, sound: "assets/s/jb8/063-d3.mp3", detune: 1100 },
            "ch2-d4": { idx: 75, name: "D", octave: 4, chord: 2, imagePosX: 1466, imagePosY: 118, sound: "assets/s/jb8/063-d3.mp3", detune: 1200 },
            "ch1-g2": { idx: 76, name: "G", octave: 2, chord: 1, imagePosX: 467, imagePosY: 98, color: "#cc0000", sound: "assets/s/jb8/076-g2.mp3" },
            "ch1-gd2": { idx: 77, name: "G#", octave: 2, chord: 1, imagePosX: 512, imagePosY: 98, sound: "assets/s/jb8/076-g2.mp3", detune: 100 },
            "ch1-a2": { idx: 78, name: "A", octave: 2, chord: 1, imagePosX: 554, imagePosY: 98, sound: "assets/s/jb8/076-g2.mp3", detune: 200 },
            "ch1-ad2": { idx: 79, name: "A#", octave: 2, chord: 1, imagePosX: 599, imagePosY: 98, sound: "assets/s/jb8/076-g2.mp3", detune: 300 },
            "ch1-b2": { idx: 80, name: "B", octave: 2, chord: 1, imagePosX: 642, imagePosY: 98, sound: "assets/s/jb8/076-g2.mp3", detune: 400 },
            "ch1-c3": { idx: 81, name: "C", octave: 3, chord: 1, imagePosX: 689, imagePosY: 98, sound: "assets/s/jb8/076-g2.mp3", detune: 500 },
            "ch1-cd3": { idx: 82, name: "C#", octave: 3, chord: 1, imagePosX: 732, imagePosY: 98, sound: "assets/s/jb8/076-g2.mp3", detune: 600 },
            "ch1-d3": { idx: 83, name: "D", octave: 3, chord: 1, imagePosX: 776, imagePosY: 98, sound: "assets/s/jb8/076-g2.mp3", detune: 700 },
            "ch1-dd3": { idx: 84, name: "D#", octave: 3, chord: 1, imagePosX: 821, imagePosY: 98, sound: "assets/s/jb8/076-g2.mp3", detune: 800 },
            "ch1-e3": { idx: 85, name: "E", octave: 3, chord: 1, imagePosX: 865, imagePosY: 98, sound: "assets/s/jb8/076-g2.mp3", detune: 900 },
            "ch1-f3": { idx: 86, name: "F", octave: 3, chord: 1, imagePosX: 909, imagePosY: 98, sound: "assets/s/jb8/076-g2.mp3", detune: 1000 },
            "ch1-fd3": { idx: 87, name: "F#", octave: 3, chord: 1, imagePosX: 955, imagePosY: 98, sound: "assets/s/jb8/076-g2.mp3", detune: 1100 },
            "ch1-g3": { idx: 88, name: "G", octave: 3, chord: 1, imagePosX: 997, imagePosY: 98, sound: "assets/s/jb8/088-g3.mp3" },
            "ch1-gd3": { idx: 89, name: "G#", octave: 3, chord: 1, imagePosX: 1043, imagePosY: 98, sound: "assets/s/jb8/088-g3.mp3", detune: 100 },
            "ch1-a3": { idx: 90, name: "A", octave: 3, chord: 1, imagePosX: 1087, imagePosY: 98, sound: "assets/s/jb8/088-g3.mp3", detune: 200 },
            "ch1-ad3": { idx: 91, name: "A#", octave: 3, chord: 1, imagePosX: 1132, imagePosY: 98, sound: "assets/s/jb8/088-g3.mp3", detune: 300 },
            "ch1-b3": { idx: 92, name: "B", octave: 3, chord: 1, imagePosX: 1176, imagePosY: 98, sound: "assets/s/jb8/088-g3.mp3", detune: 400 },
            "ch1-c4": { idx: 93, name: "C", octave: 4, chord: 1, imagePosX: 1221, imagePosY: 98, sound: "assets/s/jb8/088-g3.mp3", detune: 500 },
            "ch1-cd4": { idx: 94, name: "C#", octave: 4, chord: 1, imagePosX: 1265, imagePosY: 98, sound: "assets/s/jb8/088-g3.mp3", detune: 600 },
            "ch1-d4": { idx: 95, name: "D", octave: 4, chord: 1, imagePosX: 1310, imagePosY: 98, sound: "assets/s/jb8/088-g3.mp3", detune: 700 },
            "ch1-dd4": { idx: 96, name: "D#", octave: 4, chord: 1, imagePosX: 1349, imagePosY: 98, sound: "assets/s/jb8/088-g3.mp3", detune: 800 },
            "ch1-e4": { idx: 97, name: "E", octave: 4, chord: 1, imagePosX: 1382, imagePosY: 98, sound: "assets/s/jb8/088-g3.mp3", detune: 900 },
            "ch1-f4": { idx: 98, name: "F", octave: 4, chord: 1, imagePosX: 1410, imagePosY: 98, sound: "assets/s/jb8/088-g3.mp3", detune: 1000 },
            "ch1-fd4": { idx: 99, name: "F#", octave: 4, chord: 1, imagePosX: 1439, imagePosY: 98, sound: "assets/s/jb8/088-g3.mp3", detune: 1100 },
            "ch1-g4": { idx: 100, name: "G", octave: 4, chord: 1, imagePosX: 1466, imagePosY: 98, sound: "assets/s/jb8/088-g3.mp3", detune: 1200 }
        },
        soundBuffers: {}
    },

    "piano-bass": {
        image: "assets/i/piano-bass.jpg",
        imageWidth: "7680",
        imageHeight: "1320",
        /*
        left: -2500,
        top: -500,
        */
        left: 0,
        top: 0,
        scalePercentage: 20,
        noteRadius: 8,
        noteColor: "red",
        singleNote: true,  // it's true when no multiple chords are allowed to play.
        note: {
            "e1": { idx: 1, name: "E", octave: 1, imagePosX: 260, imagePosY: 197, color: "#cc0000", sound: "assets/s/jb8/001-e1.mp3" },
            "f1": { idx: 2, name: "F", octave: 1, imagePosX: 287, imagePosY: 197, sound: "assets/s/jb8/001-e1.mp3", detune: 100 },
            "fd1": { idx: 3, name: "F#", octave: 1, imagePosX: 298, imagePosY: 152, sound: "assets/s/jb8/001-e1.mp3", detune: 200 },
            "g1": { idx: 4, name: "G", octave: 1, imagePosX: 313, imagePosY: 197, sound: "assets/s/jb8/001-e1.mp3", detune: 300 },
            "gd1": { idx: 5, name: "G#", octave: 1, imagePosX: 329, imagePosY: 152, sound: "assets/s/jb8/001-e1.mp3", detune: 400 },
            "a1": { idx: 6, name: "A", octave: 1, imagePosX: 341, imagePosY: 197, color: "#cc0000", sound: "assets/s/jb8/001-e1.mp3", detune: 500 },
            "ad1": { idx: 7, name: "A#", octave: 1, imagePosX: 361, imagePosY: 152, sound: "assets/s/jb8/001-e1.mp3", detune: 600 },
            "b1": { idx: 8, name: "B", octave: 1, imagePosX: 368, imagePosY: 197, sound: "assets/s/jb8/001-e1.mp3", detune: 700 },
            "c2": { idx: 9, name: "C", octave: 2, imagePosX: 399, imagePosY: 197, sound: "assets/s/jb8/001-e1.mp3", detune: 800 },
            "cd2": { idx: 10, name: "C#", octave: 2, imagePosX: 407, imagePosY: 152, sound: "assets/s/jb8/001-e1.mp3", detune: 900 },
            "d2": { idx: 11, name: "D", octave: 2, imagePosX: 425, imagePosY: 197, color: "#cc0000", sound: "assets/s/jb8/001-e1.mp3", detune: 1000 },
            "dd2": { idx: 12, name: "D#", octave: 2, imagePosX: 442, imagePosY: 152, sound: "assets/s/jb8/001-e1.mp3", detune: 1100 },
            "e2": { idx: 13, name: "E", octave: 2, imagePosX: 452, imagePosY: 197, sound: "assets/s/jb8/013-e2.mp3" },
            "f2": { idx: 14, name: "F", octave: 2, imagePosX: 479, imagePosY: 197, sound: "assets/s/jb8/013-e2.mp3", detune: 100 },
            "fd2": { idx: 15, name: "F#", octave: 2, imagePosX: 490, imagePosY: 152, sound: "assets/s/jb8/013-e2.mp3", detune: 200 },
            "g2": { idx: 16, name: "G", octave: 2, imagePosX: 505, imagePosY: 197, color: "#cc0000", sound: "assets/s/jb8/013-e2.mp3", detune: 300 },
            "gd2": { idx: 17, name: "G#", octave: 2, imagePosX: 521, imagePosY: 152, sound: "assets/s/jb8/013-e2.mp3", detune: 400 },
            "a2": { idx: 18, name: "A", octave: 2, imagePosX: 533, imagePosY: 197, sound: "assets/s/jb8/013-e2.mp3", detune: 500 },
            "ad2": { idx: 19, name: "A#", octave: 2, imagePosX: 552, imagePosY: 152, sound: "assets/s/jb8/013-e2.mp3", detune: 600 },
            "b2": { idx: 20, name: "B", octave: 2, imagePosX: 560, imagePosY: 197, sound: "assets/s/jb8/013-e2.mp3", detune: 700 },
            "c3": { idx: 21, name: "C", octave: 3, imagePosX: 590, imagePosY: 197, sound: "assets/s/jb8/013-e2.mp3", detune: 800 },
            "cd3": { idx: 22, name: "C#", octave: 3, imagePosX: 600, imagePosY: 152, sound: "assets/s/jb8/013-e2.mp3", detune: 900 },
            "d3": { idx: 23, name: "D", octave: 3, imagePosX: 617, imagePosY: 197, sound: "assets/s/jb8/063-d3.mp3" },
            "dd3": { idx: 24, name: "D#", octave: 3, imagePosX: 634, imagePosY: 152, sound: "assets/s/jb8/063-d3.mp3", detune: 100 },
            "e3": { idx: 25, name: "E", octave: 3, imagePosX: 644, imagePosY: 197, sound: "assets/s/jb8/063-d3.mp3", detune: 200 },
            "f3": { idx: 26, name: "F", octave: 3, imagePosX: 672, imagePosY: 197, sound: "assets/s/jb8/063-d3.mp3", detune: 300 },
            "fd3": { idx: 27, name: "F#", octave: 3, imagePosX: 682, imagePosY: 152, sound: "assets/s/jb8/063-d3.mp3", detune: 400 },
            "g3": { idx: 28, name: "G", octave: 3, imagePosX: 697, imagePosY: 197, sound: "assets/s/jb8/088-g3.mp3" },
            "gd3": { idx: 29, name: "G#", octave: 3, imagePosX: 713, imagePosY: 152, sound: "assets/s/jb8/088-g3.mp3", detune: 100 },
            "a3": { idx: 30, name: "A", octave: 3, imagePosX: 726, imagePosY: 197, sound: "assets/s/jb8/088-g3.mp3", detune: 200 },
            "ad3": { idx: 31, name: "A#", octave: 3, imagePosX: 745, imagePosY: 152, sound: "assets/s/jb8/088-g3.mp3", detune: 300 },
            "b3": { idx: 32, name: "B", octave: 3, imagePosX: 752, imagePosY: 197, sound: "assets/s/jb8/088-g3.mp3", detune: 400 },
            "c4": { idx: 33, name: "C", octave: 4, imagePosX: 782, imagePosY: 197, sound: "assets/s/jb8/088-g3.mp3", detune: 500 },
            "cd4": { idx: 34, name: "C#", octave: 4, imagePosX: 792, imagePosY: 152, sound: "assets/s/jb8/088-g3.mp3", detune: 600 },
            "d4": { idx: 35, name: "D", octave: 4, imagePosX: 808, imagePosY: 197, sound: "assets/s/jb8/088-g3.mp3", detune: 700 },
            "dd4": { idx: 36, name: "D#", octave: 4, imagePosX: 826, imagePosY: 152, sound: "assets/s/jb8/088-g3.mp3", detune: 800 },
            "e4": { idx: 37, name: "E", octave: 4, imagePosX: 837, imagePosY: 197, sound: "assets/s/jb8/088-g3.mp3", detune: 900 },
            "f4": { idx: 38, name: "F", octave: 4, imagePosX: 864, imagePosY: 197, sound: "assets/s/jb8/088-g3.mp3", detune: 1000 },
            "fd4": { idx: 39, name: "F#", octave: 4, imagePosX: 874, imagePosY: 152, sound: "assets/s/jb8/088-g3.mp3", detune: 1100 },
            "g4": { idx: 40, name: "G", octave: 4, imagePosX: 891, imagePosY: 197, sound: "assets/s/jb8/088-g3.mp3", detune: 1200 }
        },
        soundBuffers: {}
    },

    "elguitar-sq": {
        image: "assets/i/elguitar-sq.jpg",
        imageWidth: "8340",
        imageHeight: "1280",
        /*
        left: -2500,
        top: -500,
        */
        left: 0,
        top: 0,
        scalePercentage: 20,
        noteRadius: 8,
        noteColor: "red",
        singleNote: true,  // it's true when no multiple chords are allowed to play.
        note: {
            "str6-e2": { idx: 1, name: "E", octave: 2, chord: 6, imagePosX: 467, imagePosY: 181, color: "#cc0000", sound: "assets/s/elgsq/001-str6-e2.mp3" },
            "str6-f2": { idx: 2, name: "F", octave: 2, chord: 6, imagePosX: 511, imagePosY: 181, sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 100 },
            "str6-fd2": { idx: 3, name: "F#", octave: 2, chord: 6, imagePosX: 554, imagePosY: 181, sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 200 },
            "str6-g2": { idx: 4, name: "G", octave: 2, chord: 6, imagePosX: 598, imagePosY: 181, sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 300 },
            "str6-gd2": { idx: 5, name: "G#", octave: 2, chord: 6, imagePosX: 644, imagePosY: 181, sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 400 },
            "str6-a2": { idx: 6, name: "A", octave: 2, chord: 6, imagePosX: 688, imagePosY: 181, sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 500 },
            "str6-ad2": { idx: 7, name: "A#", octave: 2, chord: 6, imagePosX: 733, imagePosY: 181, sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 600 },
            "str6-b2": { idx: 8, name: "B", octave: 2, chord: 6, imagePosX: 777, imagePosY: 181, sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 700 },
            "str6-c2": { idx: 9, name: "C", octave: 3, chord: 6, imagePosX: 821, imagePosY: 181, sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 800 },
            "str6-cd2": { idx: 10, name: "C#", octave: 3, chord: 6, imagePosX: 866, imagePosY: 181, sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 900 },
            "str6-d3": { idx: 11, name: "D", octave: 3, chord: 6, imagePosX: 910, imagePosY: 181, sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 1000 },
            "str6-dd3": { idx: 12, name: "D#", octave: 3, chord: 6, imagePosX: 955, imagePosY: 181, sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 1100 },
            "str6-e3": { idx: 13, name: "E", octave: 3, chord: 6, imagePosX: 998, imagePosY: 181, sound: "assets/s/elgsq/013-str6-e3.mp3" },
            "str6-f3": { idx: 14, name: "F", octave: 3, chord: 6, imagePosX: 1042, imagePosY: 181, sound: "assets/s/elgsq/013-str6-e3.mp3", detune: 100 },
            "str6-fd3": { idx: 15, name: "F#", octave: 3, chord: 6, imagePosX: 1080, imagePosY: 181, sound: "assets/s/elgsq/013-str6-e3.mp3", detune: 200 },
            "str6-g3": { idx: 16, name: "G", octave: 3, chord: 6, imagePosX: 1111, imagePosY: 181, sound: "assets/s/elgsq/013-str6-e3.mp3", detune: 300 },
            "str6-gd3": { idx: 17, name: "G#", octave: 3, chord: 6, imagePosX: 1138, imagePosY: 181, sound: "assets/s/elgsq/013-str6-e3.mp3", detune: 400 },
            "str6-a3": { idx: 18, name: "A", octave: 3, chord: 6, imagePosX: 1166, imagePosY: 181, sound: "assets/s/elgsq/013-str6-e3.mp3", detune: 500 },
            "str6-ad3": { idx: 19, name: "A#", octave: 3, chord: 6, imagePosX: 1194, imagePosY: 181, sound: "assets/s/elgsq/013-str6-e3.mp3", detune: 600 },
            "str6-b4": { idx: 20, name: "B", octave: 3, chord: 6, imagePosX: 1222, imagePosY: 181, sound: "assets/s/elgsq/013-str6-e3.mp3", detune: 700 },
            "str6-c4": { idx: 21, name: "C", octave: 4, chord: 6, imagePosX: 1252, imagePosY: 181, sound: "assets/s/elgsq/013-str6-e3.mp3", detune: 800 },
            "str6-cd4": { idx: 22, name: "C#", octave: 4, chord: 6, imagePosX: 1281, imagePosY: 181, sound: "assets/s/elgsq/013-str6-e3.mp3", detune: 900 },
            "str5-a2": { idx: 23, name: "A", octave: 2, chord: 5, imagePosX: 467, imagePosY: 160, color: "#cc0000", sound: "assets/s/elgsq/023-str5-a2.mp3" },
            "str5-ad2": { idx: 24, name: "A#", octave: 2, chord: 5, imagePosX: 511, imagePosY: 160, sound: "assets/s/elgsq/023-str5-a2.mp3", detune: 100 },
            "str5-b2": { idx: 25, name: "B", octave: 2, chord: 5, imagePosX: 554, imagePosY: 160, sound: "assets/s/elgsq/023-str5-a2.mp3", detune: 200 },
            "str5-c3": { idx: 26, name: "C", octave: 3, chord: 5, imagePosX: 598, imagePosY: 160, sound: "assets/s/elgsq/023-str5-a2.mp3", detune: 300 },
            "str5-cd3": { idx: 27, name: "C#", octave: 3, chord: 5, imagePosX: 644, imagePosY: 160, sound: "assets/s/elgsq/023-str5-a2.mp3", detune: 400 },
            "str5-d3": { idx: 28, name: "D", octave: 3, chord: 5, imagePosX: 688, imagePosY: 160, sound: "assets/s/elgsq/023-str5-a2.mp3", detune: 500 },
            "str5-dd3": { idx: 29, name: "D#", octave: 3, chord: 5, imagePosX: 733, imagePosY: 160, sound: "assets/s/elgsq/023-str5-a2.mp3", detune: 600 },
            "str5-e3": { idx: 30, name: "E", octave: 3, chord: 5, imagePosX: 777, imagePosY: 160, sound: "assets/s/elgsq/023-str5-a2.mp3", detune: 700 },
            "str5-f3": { idx: 31, name: "F", octave: 3, chord: 5, imagePosX: 821, imagePosY: 160, sound: "assets/s/elgsq/023-str5-a2.mp3", detune: 800 },
            "str5-fd3": { idx: 32, name: "F#", octave: 3, chord: 5, imagePosX: 866, imagePosY: 160, sound: "assets/s/elgsq/023-str5-a2.mp3", detune: 900 },
            "str5-g3": { idx: 33, name: "G", octave: 3, chord: 5, imagePosX: 910, imagePosY: 160, sound: "assets/s/elgsq/023-str5-a2.mp3", detune: 1000 },
            "str5-gd3": { idx: 34, name: "G#", octave: 3, chord: 5, imagePosX: 955, imagePosY: 160, sound: "assets/s/elgsq/023-str5-a2.mp3", detune: 1100 },
            "str5-a3": { idx: 35, name: "A", octave: 3, chord: 5, imagePosX: 998, imagePosY: 160, sound: "assets/s/elgsq/035-str5-a3.mp3" },
            "str5-ad3": { idx: 36, name: "A#", octave: 3, chord: 5, imagePosX: 1042, imagePosY: 160, sound: "assets/s/elgsq/035-str5-a3.mp3", detune: 100 },
            "str5-b3": { idx: 37, name: "B", octave: 3, chord: 5, imagePosX: 1080, imagePosY: 160, sound: "assets/s/elgsq/035-str5-a3.mp3", detune: 200 },
            "str5-c4": { idx: 38, name: "C", octave: 4, chord: 5, imagePosX: 1111, imagePosY: 160, sound: "assets/s/elgsq/035-str5-a3.mp3", detune: 300 },
            "str5-cd4": { idx: 39, name: "C#", octave: 4, chord: 5, imagePosX: 1138, imagePosY: 160, sound: "assets/s/elgsq/035-str5-a3.mp3", detune: 400 },
            "str5-d4": { idx: 40, name: "D", octave: 4, chord: 5, imagePosX: 1166, imagePosY: 160, sound: "assets/s/elgsq/035-str5-a3.mp3", detune: 500 },
            "str5-dd4": { idx: 41, name: "D#", octave: 4, chord: 5, imagePosX: 1194, imagePosY: 160, sound: "assets/s/elgsq/035-str5-a3.mp3", detune: 600 },
            "str5-e4": { idx: 42, name: "E", octave: 4, chord: 5, imagePosX: 1222, imagePosY: 160, sound: "assets/s/elgsq/035-str5-a3.mp3", detune: 700 },
            "str5-f4": { idx: 43, name: "F", octave: 4, chord: 5, imagePosX: 1252, imagePosY: 160, sound: "assets/s/elgsq/035-str5-a3.mp3", detune: 800 },
            "str5-fd4": { idx: 44, name: "F#", octave: 4, chord: 5, imagePosX: 1281, imagePosY: 160, sound: "assets/s/elgsq/035-str5-a3.mp3", detune: 900 },
            "str4-d3": { idx: 45, name: "D", octave: 3, chord: 4, imagePosX: 467, imagePosY: 138, color: "#cc0000", sound: "assets/s/elgsq/045-str4-d3.mp3" },
            "str4-dd3": { idx: 46, name: "D#", octave: 3, chord: 4, imagePosX: 511, imagePosY: 138, sound: "assets/s/elgsq/045-str4-d3.mp3", detune: 100 },
            "str4-e3": { idx: 47, name: "E", octave: 3, chord: 4, imagePosX: 554, imagePosY: 138, sound: "assets/s/elgsq/045-str4-d3.mp3", detune: 200 },
            "str4-f3": { idx: 48, name: "F", octave: 3, chord: 4, imagePosX: 598, imagePosY: 138, sound: "assets/s/elgsq/045-str4-d3.mp3", detune: 300 },
            "str4-fd3": { idx: 49, name: "F#", octave: 3, chord: 4, imagePosX: 644, imagePosY: 138, sound: "assets/s/elgsq/045-str4-d3.mp3", detune: 400 },
            "str4-g3": { idx: 50, name: "G", octave: 3, chord: 4, imagePosX: 688, imagePosY: 138, sound: "assets/s/elgsq/045-str4-d3.mp3", detune: 500 },
            "str4-gd3": { idx: 51, name: "G#", octave: 3, chord: 4, imagePosX: 733, imagePosY: 138, sound: "assets/s/elgsq/045-str4-d3.mp3", detune: 600 },
            "str4-a3": { idx: 52, name: "A", octave: 3, chord: 4, imagePosX: 777, imagePosY: 138, sound: "assets/s/elgsq/045-str4-d3.mp3", detune: 700 },
            "str4-ad3": { idx: 53, name: "A#", octave: 3, chord: 4, imagePosX: 821, imagePosY: 138, sound: "assets/s/elgsq/045-str4-d3.mp3", detune: 800 },
            "str4-b3": { idx: 54, name: "B", octave: 3, chord: 4, imagePosX: 866, imagePosY: 138, sound: "assets/s/elgsq/045-str4-d3.mp3", detune: 900 },
            "str4-c4": { idx: 55, name: "C", octave: 4, chord: 4, imagePosX: 910, imagePosY: 138, sound: "assets/s/elgsq/045-str4-d3.mp3", detune: 1000 },
            "str4-cd4": { idx: 56, name: "C#", octave: 4, chord: 4, imagePosX: 955, imagePosY: 138, sound: "assets/s/elgsq/045-str4-d3.mp3", detune: 1100 },
            "str4-d4": { idx: 57, name: "D", octave: 4, chord: 4, imagePosX: 998, imagePosY: 138, sound: "assets/s/elgsq/057-str4-d4.mp3" },
            "str4-dd4": { idx: 58, name: "D#", octave: 4, chord: 4, imagePosX: 1042, imagePosY: 138, sound: "assets/s/elgsq/057-str4-d4.mp3", detune: 100 },
            "str4-e4": { idx: 59, name: "E", octave: 4, chord: 4, imagePosX: 1080, imagePosY: 138, sound: "assets/s/elgsq/057-str4-d4.mp3", detune: 200 },
            "str4-f4": { idx: 60, name: "F", octave: 4, chord: 4, imagePosX: 1111, imagePosY: 138, sound: "assets/s/elgsq/057-str4-d4.mp3", detune: 300 },
            "str4-fd4": { idx: 61, name: "F#", octave: 4, chord: 4, imagePosX: 1138, imagePosY: 138, sound: "assets/s/elgsq/057-str4-d4.mp3", detune: 400 },
            "str4-g4": { idx: 62, name: "G", octave: 4, chord: 4, imagePosX: 1166, imagePosY: 138, sound: "assets/s/elgsq/057-str4-d4.mp3", detune: 500 },
            "str4-gd4": { idx: 63, name: "G#", octave: 4, chord: 4, imagePosX: 1194, imagePosY: 138, sound: "assets/s/elgsq/057-str4-d4.mp3", detune: 600 },
            "str4-a4": { idx: 64, name: "A", octave: 4, chord: 4, imagePosX: 1222, imagePosY: 138, sound: "assets/s/elgsq/057-str4-d4.mp3", detune: 700 },
            "str4-ad4": { idx: 65, name: "A#", octave: 4, chord: 4, imagePosX: 1252, imagePosY: 138, sound: "assets/s/elgsq/057-str4-d4.mp3", detune: 800 },
            "str4-b4": { idx: 66, name: "B", octave: 4, chord: 4, imagePosX: 1281, imagePosY: 138, sound: "assets/s/elgsq/057-str4-d4.mp3", detune: 900 },
            "str3-g3": { idx: 67, name: "G", octave: 3, chord: 3, imagePosX: 467, imagePosY: 118, color: "#cc0000", sound: "assets/s/elgsq/067-str3-g3.mp3" },
            "str3-gd3": { idx: 68, name: "G#", octave: 3, chord: 3, imagePosX: 511, imagePosY: 118, sound: "assets/s/elgsq/067-str3-g3.mp3", detune: 100 },
            "str3-a3": { idx: 69, name: "A", octave: 3, chord: 3, imagePosX: 554, imagePosY: 118, sound: "assets/s/elgsq/067-str3-g3.mp3", detune: 200 },
            "str3-ad3": { idx: 70, name: "A#", octave: 3, chord: 3, imagePosX: 598, imagePosY: 118, sound: "assets/s/elgsq/067-str3-g3.mp3", detune: 300 },
            "str3-b3": { idx: 71, name: "B", octave: 3, chord: 3, imagePosX: 644, imagePosY: 118, sound: "assets/s/elgsq/067-str3-g3.mp3", detune: 400 },
            "str3-c4": { idx: 72, name: "C", octave: 4, chord: 3, imagePosX: 688, imagePosY: 118, sound: "assets/s/elgsq/067-str3-g3.mp3", detune: 500 },
            "str3-cd4": { idx: 73, name: "C#", octave: 4, chord: 3, imagePosX: 733, imagePosY: 118, sound: "assets/s/elgsq/067-str3-g3.mp3", detune: 600 },
            "str3-d4": { idx: 74, name: "D", octave: 4, chord: 3, imagePosX: 777, imagePosY: 118, sound: "assets/s/elgsq/067-str3-g3.mp3", detune: 700 },
            "str3-dd4": { idx: 75, name: "D#", octave: 4, chord: 3, imagePosX: 821, imagePosY: 118, sound: "assets/s/elgsq/067-str3-g3.mp3", detune: 800 },
            "str3-e4": { idx: 76, name: "E", octave: 4, chord: 3, imagePosX: 866, imagePosY: 118, sound: "assets/s/elgsq/067-str3-g3.mp3", detune: 900 },
            "str3-f4": { idx: 77, name: "F", octave: 4, chord: 3, imagePosX: 910, imagePosY: 118, sound: "assets/s/elgsq/067-str3-g3.mp3", detune: 1000 },
            "str3-fd4": { idx: 78, name: "F#", octave: 4, chord: 3, imagePosX: 955, imagePosY: 118, sound: "assets/s/elgsq/067-str3-g3.mp3", detune: 1100 },
            "str3-g4": { idx: 79, name: "G", octave: 4, chord: 3, imagePosX: 998, imagePosY: 118, sound: "assets/s/elgsq/079-str3-g4.mp3" },
            "str3-gd4": { idx: 80, name: "G#", octave: 4, chord: 3, imagePosX: 1042, imagePosY: 118, sound: "assets/s/elgsq/079-str3-g4.mp3", detune: 100 },
            "str3-a4": { idx: 81, name: "A", octave: 4, chord: 3, imagePosX: 1080, imagePosY: 118, sound: "assets/s/elgsq/079-str3-g4.mp3", detune: 200 },
            "str3-ad4": { idx: 82, name: "A#", octave: 4, chord: 3, imagePosX: 1111, imagePosY: 118, sound: "assets/s/elgsq/079-str3-g4.mp3", detune: 300 },
            "str3-b4": { idx: 83, name: "B", octave: 4, chord: 3, imagePosX: 1138, imagePosY: 118, sound: "assets/s/elgsq/079-str3-g4.mp3", detune: 400 },
            "str3-c5": { idx: 84, name: "C", octave: 5, chord: 3, imagePosX: 1166, imagePosY: 118, sound: "assets/s/elgsq/079-str3-g4.mp3", detune: 500 },
            "str3-cd5": { idx: 85, name: "C#", octave: 5, chord: 3, imagePosX: 1194, imagePosY: 118, sound: "assets/s/elgsq/079-str3-g4.mp3", detune: 600 },
            "str3-d5": { idx: 86, name: "D", octave: 5, chord: 3, imagePosX: 1222, imagePosY: 118, sound: "assets/s/elgsq/079-str3-g4.mp3", detune: 700 },
            "str3-dd5": { idx: 87, name: "D#", octave: 5, chord: 3, imagePosX: 1252, imagePosY: 118, sound: "assets/s/elgsq/079-str3-g4.mp3", detune: 800 },
            "str3-e5": { idx: 88, name: "E", octave: 5, chord: 3, imagePosX: 1281, imagePosY: 118, sound: "assets/s/elgsq/079-str3-g4.mp3", detune: 900 },
            "str2-b3": { idx: 89, name: "B", octave: 3, chord: 2, imagePosX: 467, imagePosY: 97, color: "#cc0000", sound: "assets/s/elgsq/089-str2-b3.mp3" },
            "str2-c4": { idx: 90, name: "C", octave: 4, chord: 2, imagePosX: 511, imagePosY: 97, sound: "assets/s/elgsq/089-str2-b3.mp3", detune: 100 },
            "str2-cd4": { idx: 91, name: "C#", octave: 4, chord: 2, imagePosX: 554, imagePosY: 97, sound: "assets/s/elgsq/089-str2-b3.mp3", detune: 200 },
            "str2-d4": { idx: 92, name: "D", octave: 4, chord: 2, imagePosX: 598, imagePosY: 97, sound: "assets/s/elgsq/089-str2-b3.mp3", detune: 300 },
            "str2-dd4": { idx: 93, name: "D#", octave: 4, chord: 2, imagePosX: 644, imagePosY: 97, sound: "assets/s/elgsq/089-str2-b3.mp3", detune: 400 },
            "str2-e4": { idx: 94, name: "E", octave: 4, chord: 2, imagePosX: 688, imagePosY: 97, sound: "assets/s/elgsq/089-str2-b3.mp3", detune: 500 },
            "str2-f4": { idx: 95, name: "F", octave: 4, chord: 2, imagePosX: 733, imagePosY: 97, sound: "assets/s/elgsq/089-str2-b3.mp3", detune: 600 },
            "str2-fd4": { idx: 96, name: "F#", octave: 4, chord: 2, imagePosX: 777, imagePosY: 97, sound: "assets/s/elgsq/089-str2-b3.mp3", detune: 700 },
            "str2-g4": { idx: 97, name: "G", octave: 4, chord: 2, imagePosX: 821, imagePosY: 97, sound: "assets/s/elgsq/089-str2-b3.mp3", detune: 800 },
            "str2-gd4": { idx: 98, name: "G#", octave: 4, chord: 2, imagePosX: 866, imagePosY: 97, sound: "assets/s/elgsq/089-str2-b3.mp3", detune: 900 },
            "str2-a4": { idx: 99, name: "A", octave: 4, chord: 2, imagePosX: 910, imagePosY: 97, sound: "assets/s/elgsq/089-str2-b3.mp3", detune: 1000 },
            "str2-ad4": { idx: 100, name: "A#", octave: 4, chord: 2, imagePosX: 955, imagePosY: 97, sound: "assets/s/elgsq/089-str2-b3.mp3", detune: 1100 },
            "str2-b4": { idx: 101, name: "B", octave: 4, chord: 2, imagePosX: 998, imagePosY: 97, sound: "assets/s/elgsq/101-str2-b4.mp3" },
            "str2-c5": { idx: 102, name: "C", octave: 5, chord: 2, imagePosX: 1042, imagePosY: 97, sound: "assets/s/elgsq/101-str2-b4.mp3", detune: 100 },
            "str2-cd5": { idx: 103, name: "C#", octave: 5, chord: 2, imagePosX: 1080, imagePosY: 97, sound: "assets/s/elgsq/101-str2-b4.mp3", detune: 200 },
            "str2-d5": { idx: 104, name: "D", octave: 5, chord: 2, imagePosX: 1111, imagePosY: 97, sound: "assets/s/elgsq/101-str2-b4.mp3", detune: 300 },
            "str2-dd5": { idx: 105, name: "D#", octave: 5, chord: 2, imagePosX: 1138, imagePosY: 97, sound: "assets/s/elgsq/101-str2-b4.mp3", detune: 400 },
            "str2-e5": { idx: 106, name: "E", octave: 5, chord: 2, imagePosX: 1166, imagePosY: 97, sound: "assets/s/elgsq/101-str2-b4.mp3", detune: 500 },
            "str2-f5": { idx: 107, name: "F", octave: 5, chord: 2, imagePosX: 1194, imagePosY: 97, sound: "assets/s/elgsq/101-str2-b4.mp3", detune: 600 },
            "str2-fd5": { idx: 108, name: "F#", octave: 5, chord: 2, imagePosX: 1222, imagePosY: 97, sound: "assets/s/elgsq/101-str2-b4.mp3", detune: 700 },
            "str2-g5": { idx: 109, name: "G", octave: 5, chord: 2, imagePosX: 1252, imagePosY: 97, sound: "assets/s/elgsq/101-str2-b4.mp3", detune: 800 },
            "str2-gd5": { idx: 110, name: "G#", octave: 5, chord: 2, imagePosX: 1281, imagePosY: 97, sound: "assets/s/elgsq/101-str2-b4.mp3", detune: 900 },
            "str1-e4": { idx: 111, name: "E", octave: 4, chord: 1, imagePosX: 467, imagePosY: 74, color: "#cc0000", sound: "assets/s/elgsq/111-str1-e4.mp3" },
            "str1-f4": { idx: 112, name: "F", octave: 4, chord: 1, imagePosX: 511, imagePosY: 74, sound: "assets/s/elgsq/111-str1-e4.mp3", detune: 100 },
            "str1-fd4": { idx: 113, name: "F#", octave: 4, chord: 1, imagePosX: 554, imagePosY: 74, sound: "assets/s/elgsq/111-str1-e4.mp3", detune: 200 },
            "str1-g4": { idx: 114, name: "G", octave: 4, chord: 1, imagePosX: 598, imagePosY: 74, sound: "assets/s/elgsq/111-str1-e4.mp3", detune: 300 },
            "str1-gd4": { idx: 115, name: "G#", octave: 4, chord: 1, imagePosX: 644, imagePosY: 74, sound: "assets/s/elgsq/111-str1-e4.mp3", detune: 400 },
            "str1-a4": { idx: 116, name: "A", octave: 4, chord: 1, imagePosX: 688, imagePosY: 74, sound: "assets/s/elgsq/111-str1-e4.mp3", detune: 500 },
            "str1-ad4": { idx: 117, name: "A#", octave: 4, chord: 1, imagePosX: 733, imagePosY: 74, sound: "assets/s/elgsq/111-str1-e4.mp3", detune: 600 },
            "str1-b4": { idx: 118, name: "B", octave: 4, chord: 1, imagePosX: 777, imagePosY: 74, sound: "assets/s/elgsq/111-str1-e4.mp3", detune: 700 },
            "str1-c5": { idx: 119, name: "C", octave: 5, chord: 1, imagePosX: 821, imagePosY: 74, sound: "assets/s/elgsq/111-str1-e4.mp3", detune: 800 },
            "str1-cd5": { idx: 120, name: "C#", octave: 5, chord: 1, imagePosX: 866, imagePosY: 74, sound: "assets/s/elgsq/111-str1-e4.mp3", detune: 900 },
            "str1-d5": { idx: 121, name: "D", octave: 5, chord: 1, imagePosX: 910, imagePosY: 74, sound: "assets/s/elgsq/111-str1-e4.mp3", detune: 1000 },
            "str1-dd5": { idx: 122, name: "D#", octave: 5, chord: 1, imagePosX: 955, imagePosY: 74, sound: "assets/s/elgsq/111-str1-e4.mp3", detune: 1100 },
            "str1-e5": { idx: 123, name: "E", octave: 5, chord: 1, imagePosX: 998, imagePosY: 74, sound: "assets/s/elgsq/123-str1-e5.mp3" },
            "str1-f5": { idx: 124, name: "F", octave: 5, chord: 1, imagePosX: 1042, imagePosY: 74, sound: "assets/s/elgsq/123-str1-e5.mp3", detune: 100 },
            "str1-fd5": { idx: 125, name: "F#", octave: 5, chord: 1, imagePosX: 1080, imagePosY: 74, sound: "assets/s/elgsq/123-str1-e5.mp3", detune: 200 },
            "str1-g5": { idx: 126, name: "G", octave: 5, chord: 1, imagePosX: 1111, imagePosY: 74, sound: "assets/s/elgsq/123-str1-e5.mp3", detune: 300 },
            "str1-gd5": { idx: 127, name: "G#", octave: 5, chord: 1, imagePosX: 1138, imagePosY: 74, sound: "assets/s/elgsq/123-str1-e5.mp3", detune: 400 },
            "str1-a5": { idx: 128, name: "A", octave: 5, chord: 1, imagePosX: 1166, imagePosY: 74, sound: "assets/s/elgsq/123-str1-e5.mp3", detune: 500 },
            "str1-ad5": { idx: 129, name: "A#", octave: 5, chord: 1, imagePosX: 1194, imagePosY: 74, sound: "assets/s/elgsq/123-str1-e5.mp3", detune: 600 },
            "str1-b5": { idx: 130, name: "B", octave: 5, chord: 1, imagePosX: 1222, imagePosY: 74, sound: "assets/s/elgsq/123-str1-e5.mp3", detune: 700 },
            "str1-c6": { idx: 131, name: "C", octave: 6, chord: 1, imagePosX: 1252, imagePosY: 74, sound: "assets/s/elgsq/123-str1-e5.mp3", detune: 800 },
            "str1-cd6": { idx: 132, name: "C#", octave: 6, chord: 1, imagePosX: 1281, imagePosY: 74, sound: "assets/s/elgsq/123-str1-e5.mp3", detune: 900 }
        },
        soundBuffers: {}
    },

    "piano-elguitar-sq": {
        image: "assets/i/piano-elguitar-sq.jpg",
        imageWidth: "7680",
        imageHeight: "1320",
        /*
        left: -2500,
        top: -500,
        */
        left: 0,
        top: 0,
        scalePercentage: 20,
        noteRadius: 8,
        noteColor: "red",
        singleNote: true,  // it's true when no multiple chords are allowed to play.
        note: {
            "e2": { idx: 1, name: "E", octave: 2, imagePosX: 452, imagePosY: 197, sound: "assets/s/elgsq/001-str6-e2.mp3" },
            "f2": { idx: 2, name: "F", octave: 2, imagePosX: 479, imagePosY: 197, sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 100 },
            "fd2": { idx: 3, name: "F#", octave: 2, imagePosX: 490, imagePosY: 152, sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 200 },
            "g2": { idx: 4, name: "G", octave: 2, imagePosX: 505, imagePosY: 197, sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 300 },
            "gd2": { idx: 5, name: "G#", octave: 2, imagePosX: 521, imagePosY: 152, sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 400 },
            "a2": { idx: 6, name: "A", octave: 2, imagePosX: 533, imagePosY: 197, color: "#cc0000", sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 500 },
            "ad2": { idx: 7, name: "A#", octave: 2, imagePosX: 552, imagePosY: 152, sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 600 },
            "b2": { idx: 8, name: "B", octave: 2, imagePosX: 560, imagePosY: 197, sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 700 },
            "c3": { idx: 9, name: "C", octave: 3, imagePosX: 590, imagePosY: 197, sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 800 },
            "cd3": { idx: 10, name: "C#", octave: 3, imagePosX: 600, imagePosY: 152, sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 900 },
            "d3": { idx: 11, name: "D", octave: 3, imagePosX: 617, imagePosY: 197, color: "#cc0000", sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 1000 },
            "dd3": { idx: 12, name: "D#", octave: 3, imagePosX: 634, imagePosY: 152, sound: "assets/s/elgsq/001-str6-e2.mp3", detune: 1100 },
            "e3": { idx: 13, name: "E", octave: 3, imagePosX: 644, imagePosY: 197, sound: "assets/s/elgsq/013-str6-e3.mp3" },
            "f3": { idx: 14, name: "F", octave: 3, imagePosX: 672, imagePosY: 197, sound: "assets/s/elgsq/013-str6-e3.mp3", detune: 100 },
            "fd3": { idx: 15, name: "F#", octave: 3, imagePosX: 682, imagePosY: 152, sound: "assets/s/elgsq/013-str6-e3.mp3", detune: 200 },
            "g3": { idx: 16, name: "G", octave: 3, imagePosX: 697, imagePosY: 197, color: "#cc0000", sound: "assets/s/elgsq/013-str6-e3.mp3", detune: 300 },
            "gd3": { idx: 17, name: "G#", octave: 3, imagePosX: 713, imagePosY: 152, sound: "assets/s/elgsq/013-str6-e3.mp3", detune: 400 },
            "a3": { idx: 18, name: "A", octave: 3, imagePosX: 726, imagePosY: 197, sound: "assets/s/elgsq/013-str6-e3.mp3", detune: 500 },
            "ad3": { idx: 19, name: "A#", octave: 3, imagePosX: 745, imagePosY: 152, sound: "assets/s/elgsq/013-str6-e3.mp3", detune: 600 },
            "b3": { idx: 20, name: "B", octave: 3, imagePosX: 752, imagePosY: 197, color: "#cc0000", sound: "assets/s/elgsq/013-str6-e3.mp3", detune: 700 },
            "c4": { idx: 21, name: "C", octave: 4, imagePosX: 782, imagePosY: 197, sound: "assets/s/elgsq/013-str6-e3.mp3", detune: 800 },
            "cd4": { idx: 22, name: "C#", octave: 4, imagePosX: 792, imagePosY: 152, sound: "assets/s/elgsq/013-str6-e3.mp3", detune: 900 },
            "d4": { idx: 23, name: "D", octave: 4, imagePosX: 808, imagePosY: 197, sound: "assets/s/elgsq/057-str4-d4.mp3" },
            "dd4": { idx: 24, name: "D#", octave: 4, imagePosX: 826, imagePosY: 152, sound: "assets/s/elgsq/057-str4-d4.mp3", detune: 100 },
            "e4": { idx: 25, name: "E", octave: 4, imagePosX: 837, imagePosY: 197, color: "#cc0000", sound: "assets/s/elgsq/057-str4-d4.mp3", detune: 200 },
            "f4": { idx: 26, name: "F", octave: 4, imagePosX: 864, imagePosY: 197, sound: "assets/s/elgsq/057-str4-d4.mp3", detune: 300 },
            "fd4": { idx: 27, name: "F#", octave: 4, imagePosX: 874, imagePosY: 152, sound: "assets/s/elgsq/057-str4-d4.mp3", detune: 400 },
            "g4": { idx: 28, name: "G", octave: 4, imagePosX: 891, imagePosY: 197, sound: "assets/s/elgsq/057-str4-d4.mp3", detune: 500 },
            "gd4": { idx: 29, name: "G#", octave: 4, imagePosX: 906, imagePosY: 152, sound: "assets/s/elgsq/057-str4-d4.mp3", detune: 600 },
            "a4": { idx: 30, name: "A", octave: 4, imagePosX: 915, imagePosY: 197, sound: "assets/s/elgsq/057-str4-d4.mp3", detune: 700 },
            "ad4": { idx: 31, name: "A#", octave: 4, imagePosX: 938, imagePosY: 152, sound: "assets/s/elgsq/057-str4-d4.mp3", detune: 800 },
            "b4": { idx: 32, name: "B", octave: 4, imagePosX: 944, imagePosY: 197, sound: "assets/s/elgsq/057-str4-d4.mp3", detune: 900 },
            "c5": { idx: 33, name: "C", octave: 5, imagePosX: 975, imagePosY: 197, sound: "assets/s/elgsq/057-str4-d4.mp3", detune: 1000 },
            "cd5": { idx: 34, name: "C#", octave: 5, imagePosX: 984, imagePosY: 152, sound: "assets/s/elgsq/057-str4-d4.mp3", detune: 1100 },
            "d5": { idx: 35, name: "D", octave: 5, imagePosX: 1000, imagePosY: 197, sound: "assets/s/elgsq/111-str1-e4.mp3", detune: 1000 },
            "dd5": { idx: 36, name: "D#", octave: 5, imagePosX: 1019, imagePosY: 152, sound: "assets/s/elgsq/111-str1-e4.mp3", detune: 1100 },
            "e5": { idx: 37, name: "E", octave: 5, imagePosX: 1030, imagePosY: 197, sound: "assets/s/elgsq/123-str1-e5.mp3" },
            "f5": { idx: 38, name: "F", octave: 5, imagePosX: 1054, imagePosY: 197, sound: "assets/s/elgsq/123-str1-e5.mp3", detune: 100 },
            "fd5": { idx: 39, name: "F#", octave: 5, imagePosX: 1067, imagePosY: 152, sound: "assets/s/elgsq/123-str1-e5.mp3", detune: 200 },
            "g5": { idx: 40, name: "G", octave: 5, imagePosX: 1081, imagePosY: 197, sound: "assets/s/elgsq/123-str1-e5.mp3", detune: 300 },
            "gd5": { idx: 41, name: "G#", octave: 5, imagePosX: 1097, imagePosY: 152, sound: "assets/s/elgsq/123-str1-e5.mp3", detune: 400 },
            "a5": { idx: 42, name: "A", octave: 5, imagePosX: 1109, imagePosY: 197, sound: "assets/s/elgsq/123-str1-e5.mp3", detune: 500 },
            "ad5": { idx: 43, name: "A#", octave: 5, imagePosX: 1130, imagePosY: 152, sound: "assets/s/elgsq/123-str1-e5.mp3", detune: 600 },
            "b5": { idx: 44, name: "B", octave: 5, imagePosX: 1135, imagePosY: 197, sound: "assets/s/elgsq/123-str1-e5.mp3", detune: 700 },
            "c6": { idx: 45, name: "C", octave: 6, imagePosX: 1167, imagePosY: 197, sound: "assets/s/elgsq/123-str1-e5.mp3", detune: 800 },
            "cd6": { idx: 46, name: "C#", octave: 6, imagePosX: 1176, imagePosY: 152, sound: "assets/s/elgsq/123-str1-e5.mp3", detune: 900 }
        },
        soundBuffers: {}
    }

};


function changeLanguage() {
    document.getElementById("btnClear1").textContent = i18n[itoolLang].btnClear;
    document.getElementById("btnMemo1").textContent = i18n[itoolLang].btnMemo;
    document.getElementById("btnRelease1").textContent = i18n[itoolLang].btnRelease;
    document.getElementById("btnClear2").textContent = i18n[itoolLang].btnClear;
    document.getElementById("btnMemo2").textContent = i18n[itoolLang].btnMemo;
    document.getElementById("btnRelease2").textContent = i18n[itoolLang].btnRelease;
    document.getElementById("btnNotes").textContent = i18n[itoolLang].btnNotes;
    document.getElementById("btnSettings").textContent = i18n[itoolLang].btnSettings;
    document.getElementById("btnCredits").textContent = i18n[itoolLang].btnCredits;
    document.getElementById("txtLanguage").textContent = i18n[itoolLang].language;

    Globals.lang = itoolLang;
    Globals.langAuto = document.getElementById("radLangAuto").checked;

    document.getElementById("txtNotation").textContent = i18n[itoolLang].notation;
    document.getElementById("txtEnglishNotation").textContent = i18n[itoolLang].englishNotation;
    document.getElementById("txtClassicalNotation").textContent = i18n[itoolLang].classicalNotation;

    document.getElementById("txtInstrumentUpper").textContent = i18n[itoolLang].instrumentUpper;
    document.getElementById("txtInstrumentLower").textContent = i18n[itoolLang].instrumentLower;
    document.getElementById("txtBass1").textContent = document.getElementById("txtBass2").textContent = i18n[itoolLang].bass;
    document.getElementById("txtGuitar1").textContent = document.getElementById("txtGuitar2").textContent = i18n[itoolLang].guitar;
    document.getElementById("txtPianoBass1").textContent = document.getElementById("txtPianoBass2").textContent = i18n[itoolLang].pianoBass;
    document.getElementById("txtPianoGuitar1").textContent = document.getElementById("txtPianoGuitar2").textContent = i18n[itoolLang].pianoGuitar;

    loadCreditsPage();
}
changeLanguage();

function convertEnglishNoteToClassicalNote(name) {
    if (name == "C")
        return "DO";
    else if (name == "C#")
        return "DO#";
    else if (name == "D")
        return "RE";
    else if (name == "D#")
        return "RE#";
    else if (name == "E")
        return "MI";
    else if (name == "F")
        return "FA";
    else if (name == "F#")
        return "FA#";
    else if (name == "G")
        return "SOL";
    else if (name == "G#")
        return "SOL#";
    else if (name == "A")
        return "LA";
    else if (name == "A#")
        return "LA#";
    else if (name == "B")
        return "SI";
    else
        console.error("ERROR: convertEnglishNoteToClassicalNote() has received a wrong 'name' string.");
        return "(err)";
}

function cbUnClickImageInstrument1(e) {
    itoolInstrument1IsClick = false;
}

function cbClickImageInstrument1(e) {
    itoolInstrument1IsClick = true;
}

function cbMoveImageInstrument1(e) {
    if (!itoolInstrument1IsClick)
        return;
    
    let img = document.getElementById("instrument1image");
    // console.log("img.style.left: " + img.style.left);
    Globals.instrument1Left += e.movementX;
    Globals.instrument1Top += e.movementY;
    img.style.left = Globals.instrument1Left + "px";
    img.style.top = Globals.instrument1Top + "px";
}

function moveImage(div, offsetX, offsetY) {
    div.style.left = offsetX + "px";
    div.style.top = offsetY + "px";
}

function resizeImage(div, origWidth, origHeight, percentage) {
    let newWidth = origWidth * (percentage / 100);
    let newHeight = origHeight * (percentage / 100);
    div.style.width = newWidth + "px";
    div.style.height = newHeight + "px";
    div.style.backgroundSize = newWidth + "px " + newHeight + "px";
}

function clearCircle(canvasCtx, radius, positionX, positionY) {
    radius += 2;
    canvasCtx.clearRect(positionX - radius, positionY - radius, radius * 2, radius * 2);
}

function drawCircle(canvasCtx, radius, colorString, positionX, positionY) {
    canvasCtx.beginPath();
    canvasCtx.arc(positionX, positionY, radius, 0, 2 * Math.PI, false);
    canvasCtx.fillStyle = colorString;
    canvasCtx.fill();
}

function cbResizeEvent(e) {
    console.log("resize: " + document.body.clientWidth + ", " + document.body.clientHeight);
}
window.addEventListener("resize", cbResizeEvent, false);


class InstrumentFrame {

    instrumentName = "";
    #instrumentImageId = "";
    #instrumentCanvasId = "";
    #instrumentCanvasCtx = null;
    #instrumentIsClick = false;
    #instrumentLeft = 0;
    #instrumentTop = 0;
    #instrumentScalePercentage = 0;
    selectedNotes = [];
    #mouseDragged = false;  // It's true when a drag is detected.
    soundsLoaded = false;  // It's true when all sounds are loaded (when there is a user's click).
    memoSelNotes = [];
    touchEvX = Infinity;
    touchEvY = Infinity;
    touchEvXprev = Infinity;
    touchEvYprev = Infinity;
    touchDragged = false;  // It's true when a drag is detected (in touch screen mode).
    instrumentShowNote = null;
    #listenersAdded = false;


    constructor(instrumentImageId, instrumentCanvasId, instrumentShowNote) {
        this.instrumentImageId = instrumentImageId;
        this.instrumentCanvasId = instrumentCanvasId;
        this.instrumentCanvasCtx = document.getElementById(instrumentCanvasId).getContext("2d");
        this.instrumentShowNote = instrumentShowNote;
    }

    releaseSelectedNotes() {
        this.deselectAllNotes();
        this.selectedNotes = this.memoSelNotes.slice(0);
        this.drawSelectedNotes();
    }

    memoSelectedNotes() {
        this.memoSelNotes = this.selectedNotes.slice(0);
    }

    // After copied some notes, it's possible that the same note will be selected more than once.
    // This function removes the doubles from this.selectedNotes .
    removeDoubleSelectedNotes() {
        this.selectedNotes = [...new Set(this.selectedNotes)];
    }

    // Write the notes into the center of screen (notesTextAtCenter).
    writeNotes() {
        let ordlist = [];

        for (const n of this.selectedNotes) {
            // let obj = {};
            let obj = Instrument[this.instrumentName].note[n];
            ordlist.push(obj);
        }

        ordlist.sort(
            function (a, b) {
                return a.idx - b.idx;
            }
        );

        let str = " ";

        for (const n of ordlist) {
            let name = n.name;
            if (Globals.classicalNotation) {
                name = convertEnglishNoteToClassicalNote(n.name);
            }
            str += name + n.octave + " ";
        }

        if (str !== " ") {
            document.getElementById("notesTextAtCenter").textContent = str;
        }
        else {
            document.getElementById("notesTextAtCenter").textContent = "";
        }
    }

    stopSound(note) {
        if(Instrument[this.instrumentName].note[note].sourceBuffer === undefined)
            return;
        
        Instrument[this.instrumentName].note[note].sourceBuffer.stop();
        Instrument[this.instrumentName].note[note].sourceBuffer = undefined;
    }

    stopAllSounds() {
        for (let k in Instrument[this.instrumentName].note) {
            if (Instrument[this.instrumentName].note[k].sourceBuffer !== undefined)
                this.stopSound(k);
        }
    }

    playSound(note) {
        let path = Instrument[this.instrumentName].note[note].sound;

        if(Instrument[this.instrumentName].soundBuffers[path] === undefined) {
            console.error(`ERROR on playSound(): before you need to use loadSound("${path}") .`);
            return;
        }

        const source = audioContext.createBufferSource();
        source.buffer = Instrument[this.instrumentName].soundBuffers[path];
        if (Instrument[this.instrumentName].note[note].detune !== undefined)
            source.detune.value = Instrument[this.instrumentName].note[note].detune;
        source.connect(audioContext.destination);
        source.start(0);
        Instrument[this.instrumentName].note[note].sourceBuffer = source;
    }

    async loadSound(path) {
        if (Instrument[this.instrumentName].soundBuffers[path] !== undefined) {
            console.debug("Sound file has been already loaded: " + path);
            return;
        }

        if (audioContext === null) {
            audioContext = new AudioContext();
        }

        const soundData = await fetch(path)
            .then((response) => {
                if (!response.ok) {
                    console.error("ERROR fetching sound file: " + response.status);
                }
                return response.arrayBuffer();
            })
            .then((buffer) => audioContext.decodeAudioData(buffer));

        Instrument[this.instrumentName].soundBuffers[path] = soundData;
    }

    loadSounds() {
        if (this.soundsLoaded) {
            // console.debug("Sounds already loaded.");
            return;
        }
        this.soundsLoaded = true;

        let list = [];

        for (let k in Instrument[this.instrumentName].note) {
            let sound = Instrument[this.instrumentName].note[k].sound;
            if (list.indexOf(sound) !== -1) {
                // console.debug(`sound is already present: ${sound} (${k})`);
            }
            else {
                list.push(sound);
            }
        }

        for (const s of list) {
            this.loadSound(s);
        }
    }

    #cbDrawAllNotes (el) {
        // console.debug("el: " + el);
        drawCircle(
            this.instrumentCanvasCtx,
            Instrument[this.instrumentName].noteRadius,
            (Instrument[this.instrumentName].note[el].color || Instrument[this.instrumentName].noteColor),
            Instrument[this.instrumentName].note[el].imagePosX,
            Instrument[this.instrumentName].note[el].imagePosY);
    }

    getNearestNote(imgPosX, imgPosY) {
        let distance = Infinity;
        let noteKeyStr = "";
        for (let k in Instrument[this.instrumentName].note) {
            // console.debug("k: " + k);
            let dist = Math.sqrt(
                ((imgPosX - Instrument[this.instrumentName].note[k].imagePosX) ** 2) +
                ((imgPosY - Instrument[this.instrumentName].note[k].imagePosY) ** 2)
            );
            // console.debug("dist: " + dist);
            if (dist < distance) {
                distance = dist;
                noteKeyStr = k;
            }
        }
        return noteKeyStr;  // Return the note key (or "" if no notes was found)
    }

    clearNoteToShow() {
        document.getElementById(this.instrumentShowNote).textContent = "";
    }

    // Write the note to the upper or lower right part of the screen
    writeNoteToShow(note) {
        let n = Instrument[this.instrumentName].note[note];

        let name = n.name;
        if (Globals.classicalNotation) {
            name = convertEnglishNoteToClassicalNote(n.name);
        }
        let str = name + n.octave;


        let isn = document.getElementById(this.instrumentShowNote).textContent = str;
    }

    deselectNote(note) {
        // Remove the circle drawing
        clearCircle(
            this.instrumentCanvasCtx,
            Instrument[this.instrumentName].noteRadius,
            Instrument[this.instrumentName].note[note].imagePosX,
            Instrument[this.instrumentName].note[note].imagePosY);

        // Remove from selected notes.
        let x = this.selectedNotes.indexOf(note);
        if (x === -1) {
            console.error("ERROR from deselectNote() - note not found: " + note);
            return;
        }
        this.selectedNotes.splice(x, 1);

        this.stopSound(note);

        // Write the overall notes into the center of screen
        this.writeNotes();

        this.writeNoteToShow(note);
    }

    emptyNoteToShow() {
        document.getElementById(this.instrumentShowNote).textContent = "";
    }

    deselectAllNotes() {
        while (this.selectedNotes.length > 0) {
            this.deselectNote(this.selectedNotes[0]);
        }
        this.emptyNoteToShow();
    }

    // Draw the notes inside selectedNotes.
    drawSelectedNotes() {
        for (const nnote of this.selectedNotes) {
            drawCircle(
                this.instrumentCanvasCtx,
                Instrument[this.instrumentName].noteRadius,
                (Instrument[this.instrumentName].note[nnote].color || Instrument[this.instrumentName].noteColor),
                Instrument[this.instrumentName].note[nnote].imagePosX,
                Instrument[this.instrumentName].note[nnote].imagePosY);
        }
        this.writeNotes();
    }

    selectNoteFromImage(imgPosX, imgPosY) {
        let nnote = this.getNearestNote(imgPosX, imgPosY);
        if (nnote === "") {
            console.error("ERROR: notes not found.");
            return;
        }

        if (this.selectedNotes.indexOf(nnote) !== -1) {
            // console.debug("Note already selected.");
            this.deselectNote(nnote);
            return;
        }

        drawCircle(
            this.instrumentCanvasCtx,
            Instrument[this.instrumentName].noteRadius,
            (Instrument[this.instrumentName].note[nnote].color || Instrument[this.instrumentName].noteColor),
            Instrument[this.instrumentName].note[nnote].imagePosX,
            Instrument[this.instrumentName].note[nnote].imagePosY);
        
        this.selectedNotes.push(nnote);

        // Play the note
        if(Instrument[this.instrumentName].singleNote)
            this.stopAllSounds();
        this.playSound(nnote);

        // Write the overall notes into the center of screen
        this.writeNotes();

        // Write the note to the upper or lower right part of the screen
        this.writeNoteToShow(nnote);
    }

    drawAllNotes() {
        Object.keys(Instrument[this.instrumentName].note).forEach(this.#cbDrawAllNotes.bind(this));
    }

    #cbMouseClickImageInstrument(e) {
        // console.debug("e.offset XY: " + e.offsetX + ", " + e.offsetY);  // Decomment this if you want to see the instrument's X,Y image axis.

        // Create an audio context on click
        if (audioContext === null) {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();
        }
        this.loadSounds();

        // console.debug("nearest note: " + this.getNearestNote(e.offsetX, e.offsetY));
        if (this.mouseDragged) {
            this.mouseDragged = false;
            return;
        }
        this.selectNoteFromImage(e.offsetX, e.offsetY);
    }

    #cbMoveImageInstrument(e) {
        if (!this.instrumentIsClick)
            return;
    
        this.mouseDragged = true;
        let img = document.getElementById(this.instrumentImageId);
        // console.log("img.style.left: " + img.style.left);
        if (this.touchDragged) {
            // touch
            if (this.touchEvX == Infinity) {
                this.touchEvXprev = this.touchEvX = e.clientX;
                this.touchEvYprev = this.touchEvY = e.clientY;
            }
            this.touchEvXprev = this.touchEvX;
            this.touchEvYprev = this.touchEvY;
            this.touchEvX = e.clientX;
            this.touchEvY = e.clientY;
            this.#instrumentLeft += -(this.touchEvXprev - this.touchEvX);
            this.#instrumentTop += -(this.touchEvYprev - this.touchEvY);
        }
        else {
            // mouse
            this.#instrumentLeft += e.movementX;
            this.#instrumentTop += e.movementY;
        }
        img.style.left = this.#instrumentLeft + "px";
        img.style.top = this.#instrumentTop + "px";
    }

    #cbMouseDownImageInstrument() { this.instrumentIsClick = true; }

    #cbMouseUpImageInstrument() { this.instrumentIsClick = false; }

    #cbTouchHandlerStart(e) {
        this.instrumentIsClick = true;
        this.touchDragged = true;

        let touch = e.changedTouches[0];
        this.touchEvXprev = this.touchEvX = touch.clientX;
        this.touchEvYprev = this.touchEvY = touch.clientY;
    }

    #cbTouchHandlerMove(e) {
        let img = document.getElementById(this.instrumentImageId);
        let touch = e.changedTouches[0];
        let me = new MouseEvent("mousemove", { clientX: touch.clientX, clientY: touch.clientY });
        img.dispatchEvent(me);
    }

    #cbTouchHandlerEnd(e) {
        this.instrumentIsClick = false;
        this.touchDragged = false;
    }

    loadInstrument(name) {
        this.instrumentName = name;
        this.selectedNotes = [];
        this.memoSelNotes = [];
        let img = document.getElementById(this.instrumentImageId);
        img.style.backgroundImage = "url(" + Instrument[name].image + ")";
        img.style.imageWidth = Instrument[name].imageWidth + "px";
        img.style.imageHeight = Instrument[name].imageHeight + "px";
        img.style.width = Instrument[name].imageWidth + "px";
        img.style.height = Instrument[name].imageHeight + "px";
        this.instrumentLeft = Instrument[name].left;
        this.instrumentTop = Instrument[name].top;
        this.instrumentScalePercentage = Instrument[name].scalePercentage;
        img.style.left = this.instrumentLeft + "px";
        img.style.top = this.instrumentTop + "px";
        // resizeImage(img, Instrument[name].imageWidth, Instrument[name].imageHeight, 10);
        if (Instrument[name].scalePercentage != 100)
            resizeImage(img, Instrument[name].imageWidth, Instrument[name].imageHeight, Instrument[name].scalePercentage);
        // moveImage(img, -500, -500);

        if (!this.#listenersAdded) {
            this.#listenersAdded = true;
            img.addEventListener("mousemove", this.#cbMoveImageInstrument.bind(this), false);
            img.addEventListener("touchstart", this.#cbTouchHandlerStart.bind(this), false);
            img.addEventListener("touchmove", this.#cbTouchHandlerMove.bind(this), false);
            img.addEventListener("touchend", this.#cbTouchHandlerEnd.bind(this), false);
            img.addEventListener("mousedown", this.#cbMouseDownImageInstrument.bind(this), false);
            img.addEventListener("mouseup", this.#cbMouseUpImageInstrument.bind(this), false);
            img.addEventListener("click", this.#cbMouseClickImageInstrument.bind(this), false);
        }
    
        let canvas = document.getElementById(this.instrumentCanvasId);
        canvas.width = Instrument[name].imageWidth;
        canvas.height = Instrument[name].imageHeight;
    }
}  // class InstrumentFrame

let instrument1fr = new InstrumentFrame("instrument1image", "instrument1canvas", "instrument1showNote");
// Load JB8 as default instrument n.1 ("notes", upper view)
// TODO: deallocare le risorse del vecchio Globals.instrument1 .
Globals.instrument1 = "bass-jb8";
instrument1fr.loadInstrument(Globals.instrument1);
// instrument1fr.drawAllNotes();

let instrument2fr = new InstrumentFrame("instrument2image", "instrument2canvas", "instrument2showNote");
Globals.instrument2 = "piano-bass";
instrument2fr.loadInstrument(Globals.instrument2);
// instrument2fr.drawAllNotes();

function copyNotes(instrum1, instrum2) {
    instrum2.deselectAllNotes();

    let list = [];

    for (const n of instrum1.selectedNotes) {
        let obj = Instrument[instrum1.instrumentName].note[n];
        list.push(obj);
    }

    for (const l of list) {
        // console.debug("l.name: " + l.name);
        for (let [key, value] of Object.entries(Instrument[instrum2.instrumentName].note)) {
            // console.debug("key: " + key + " ; value: " + value);
            // console.debug("value.name: " + value.name);
            if (value.name == l.name && value.octave == l.octave) {
                instrum2.selectedNotes.push(key);
            }
        }
    }

    instrum2.removeDoubleSelectedNotes();
    instrum2.drawSelectedNotes();
}

function navBarPassToId(id) {
    if (itoolNavBarId == id)
        return;
    
    let current = "";
    let next = "";

    if (itoolNavBarId == 0) {
        current = "notes";
    }
    else if (itoolNavBarId == 1) {
        current = "settings";
    }
    else if (itoolNavBarId == 2) {
        current = "credits";
    }

    if (id == 0) {
        next = "notes";
    }
    else if (id == 1) {
        next = "settings";
    }
    else if (id == 2) {
        next = "credits";
    }

    itoolNavBarCurrentStr = current;
    itoolNavBarNextStr = next;

    // If the new ID is greater, do a right scrool.
    // Otherwise, if the ID is lesser, do a left scroll.
    if (id > itoolNavBarId) {
        document.getElementById(next).classList.remove("trnsOpacity");
        document.getElementById(next).classList.remove("stayLeft");
        document.getElementById(next).classList.add("stayRight");
        document.getElementById(current).classList.add("stayLeft");
        document.getElementById(next).inert = false;

        const prom1 = new Promise((resolved, refused) => {
            setTimeout(() => {
                document.getElementById(next).classList.add("trnsOpacity");
                document.getElementById(next).classList.remove("opacity0");
    
                const prom2 = new Promise((resolved, refused) => {
                    setTimeout(() => {
                        document.getElementById(itoolNavBarNextStr).classList.remove("stayRight");
                        document.getElementById(itoolNavBarCurrentStr).classList.add("opacity0");
                        document.getElementById(itoolNavBarCurrentStr).inert = true;
                    }, 50);
                });
            }, 50);
        });
    }
    else {
        document.getElementById(next).classList.remove("trnsOpacity");
        document.getElementById(next).classList.remove("stayRight");
        document.getElementById(next).classList.add("stayLeft");
        document.getElementById(current).classList.add("stayRight");
        document.getElementById(next).inert = false;

        const prom1 = new Promise((resolved, refused) => {
            setTimeout(() => {
                document.getElementById(next).classList.add("trnsOpacity");
                document.getElementById(next).classList.remove("opacity0");
    
                const prom2 = new Promise((resolved, refused) => {
                    setTimeout(() => {
                        document.getElementById(itoolNavBarNextStr).classList.remove("stayLeft");
                        document.getElementById(itoolNavBarCurrentStr).classList.add("opacity0");
                        document.getElementById(itoolNavBarCurrentStr).inert = true;
                    }, 50);
                });
            }, 50);
        });
    }

    itoolNavBarId = id;
}

function fnBtnCopyDown() {
    copyNotes(instrument1fr, instrument2fr);
}

function fnBtnCopyUp() {
    copyNotes(instrument2fr, instrument1fr);
}

function fnBtnClear1() {
    instrument1fr.deselectAllNotes();
}

function fnBtnClear2() {
    instrument2fr.deselectAllNotes();
}

function fnBtnMemo1() {
    instrument1fr.memoSelectedNotes();
}

function fnBtnRelease1() {
    instrument1fr.releaseSelectedNotes();
}

function fnBtnMemo2() {
    instrument2fr.memoSelectedNotes();
}

function fnBtnRelease2() {
    instrument2fr.releaseSelectedNotes();
}

function fnRadEnglishNotation() {
    if (!Globals.classicalNotation)
        return;
    
    Globals.classicalNotation = false;
    document.getElementById("notesTextAtCenter").textContent = "";  // Clear the notes on center screen

    instrument1fr.emptyNoteToShow();
    instrument2fr.emptyNoteToShow();
}

function fnRadClassicalNotation() {
    if (Globals.classicalNotation)
        return;
    
    Globals.classicalNotation = true;
    document.getElementById("notesTextAtCenter").textContent = "";  // Clear the notes on center screen

    instrument1fr.emptyNoteToShow();
    instrument2fr.emptyNoteToShow();
}

function enlightBtnNotes() {
    const el = document.getElementById("btnNotes");
    el.style.opacity = "1.0";
    el.style.backgroundColor = "#2e2e2e";
    el.style.color = "#efefef";
}

function darkenBtnNotes() {
    const el = document.getElementById("btnNotes");
    el.style.opacity = "0.4";
    el.style.backgroundColor = "#8e8e8e";
    el.style.color = "#e0e0e0";
}

function enlightBtnSettings() {
    const el = document.getElementById("btnSettings");
    el.style.opacity = "1.0";
    el.style.backgroundColor = "#2e2e2e";
    el.style.color = "#efefef";
}

function darkenBtnSettings() {
    const el = document.getElementById("btnSettings");
    el.style.opacity = "0.4";
    el.style.backgroundColor = "#8e8e8e";
    el.style.color = "#e0e0e0";
}

function enlightBtnCredits() {
    const el = document.getElementById("btnCredits");
    el.style.opacity = "1.0";
    el.style.backgroundColor = "#2e2e2e";
    el.style.color = "#efefef";
}

function darkenBtnCredits() {
    const el = document.getElementById("btnCredits");
    el.style.opacity = "0.4";
    el.style.backgroundColor = "#8e8e8e";
    el.style.color = "#e0e0e0";
}

function fnBtnNotes() {
    navBarPassToId(0);

    enlightBtnNotes();
    darkenBtnSettings();
    darkenBtnCredits();
}

function fnBtnSettings() {
    navBarPassToId(1);

    darkenBtnNotes();
    enlightBtnSettings();
    darkenBtnCredits();
}

function fnBtnCredits() {
    navBarPassToId(2);

    darkenBtnNotes();
    darkenBtnSettings();
    enlightBtnCredits();
}

function fnRadInstrumentUpperBass() {
    Globals.instrument1 = "bass-jb8";
    instrument1fr.loadInstrument("bass-jb8");
    instrument1fr.soundsLoaded = false;
    instrument1fr.loadSounds();
    instrument1fr.clearNoteToShow();
}

function fnRadInstrumentUpperGuitar() {
    Globals.instrument1 = "elguitar-sq";
    instrument1fr.loadInstrument("elguitar-sq");
    instrument1fr.soundsLoaded = false;
    instrument1fr.loadSounds();
    instrument1fr.clearNoteToShow();
}

function fnRadInstrumentUpperPianoBass() {
    Globals.instrument1 = "piano-bass";
    instrument1fr.loadInstrument("piano-bass");
    instrument1fr.soundsLoaded = false;
    instrument1fr.loadSounds();
    instrument1fr.clearNoteToShow();
}

function fnRadInstrumentUpperPianoGuitar() {
    Globals.instrument1 = "piano-elguitar-sq";
    instrument1fr.loadInstrument("piano-elguitar-sq");
    instrument1fr.soundsLoaded = false;
    instrument1fr.loadSounds();
    instrument1fr.clearNoteToShow();
}

function fnRadInstrumentLowerBass() {
    Globals.instrument2 = "bass-jb8";
    instrument2fr.loadInstrument("bass-jb8");
    instrument2fr.soundsLoaded = false;
    instrument2fr.loadSounds();
    instrument2fr.clearNoteToShow();
}

function fnRadInstrumentLowerGuitar() {
    Globals.instrument2 = "elguitar-sq";
    instrument2fr.loadInstrument("elguitar-sq");
    instrument2fr.soundsLoaded = false;
    instrument2fr.loadSounds();
    instrument2fr.clearNoteToShow();
}

function fnRadInstrumentLowerPianoBass() {
    Globals.instrument2 = "piano-bass";
    instrument2fr.loadInstrument("piano-bass");
    instrument2fr.soundsLoaded = false;
    instrument2fr.loadSounds();
    instrument2fr.clearNoteToShow();
}

function fnRadInstrumentLowerPianoGuitar() {
    Globals.instrument2 = "piano-elguitar-sq";
    instrument2fr.loadInstrument("piano-elguitar-sq");
    instrument2fr.soundsLoaded = false;
    instrument2fr.loadSounds();
    instrument2fr.clearNoteToShow();
}

function loadCreditsPage() {
    document.getElementById("objectCredits").data = "credits/credits." + itoolLang + ".html";
}
loadCreditsPage();

console.log("index.js is lodaded.");
