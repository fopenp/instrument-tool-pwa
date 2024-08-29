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

let itoolLang = "";

function changeLanguageToAuto() {
    itoolLang = navigator.language || navigator.userLanguage;
    if (itoolLang == "it-IT" || itoolLang == "it-CH" || itoolLang == "it")
        itoolLang = "it";
    else
        itoolLang = "en";
}
changeLanguageToAuto();

let i18n = {
    
    "en": {
        title: "FopenP Instrument Tool",
        version: `v${itoolVersion}`,
        btnMemo: "MEMO",
        btnClear: "CLEAR",
        btnRelease: "REL",
        btnNotes: "NOTES",
        btnSettings: "SETTINGS",
        btnCredits: "CREDITS",
        language: "Language:",
        notation: "Notation:",
        englishNotation: "English (C3 D#3)",
        classicalNotation: "Classical (DO3 RE#3)",
        instrumentUpper: "Instrument upper screen:",
        instrumentLower: "Instrument lower screen:",
        bass: "Bass",
        guitar: "Guitar",
        pianoBass: "Piano (bass)",
        pianoGuitar: "Piano (guitar)"
    },

    "it": {
        title: "FopenP Instrument Tool",
        version: `v${itoolVersion}`,
        btnMemo: "MEMO",
        btnClear: "CANC",
        btnRelease: "RIL",
        btnNotes: "NOTE",
        btnSettings: "IMPOSTAZIONI",
        btnCredits: "CREDITI",
        language: "Lingua / Language:",
        notation: "Notazione:",
        englishNotation: "Inglese (C3 D#3)",
        classicalNotation: "Classica (DO3 RE#3)",
        instrumentUpper: "Strumento nello schermo superiore:",
        instrumentLower: "Strumento nello schermo inferiore:",
        bass: "Basso",
        guitar: "Chitarra",
        pianoBass: "Piano (basso)",
        pianoGuitar: "Piano (chitarra)"
    }

};
