class Random {
    /**
     *
     * @param min
     * @param max
     * @returns a random integer between min and max (inclusive)
     */
    static randomInteger(min, max) {
        if (min == null || max == null)
            throw new Error("minimum or maximum must not be null");
        if (min > max)
            throw new Error("minimum must not be larger than the maximum");
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     *
     * @param min
     * @param max
     * @returns a random float between min and max (inclusive)
     */
    static randomFloat(min, max) {
        if (min == null || max == null)
            throw new Error("minimum or maximum must not be null");
        if (min > max)
            throw new Error("minimum must not be larger than the maximum");
        return (Math.random() * (max - min + Number.MIN_VALUE)) + min;
    }
    /**
     *
     * @returns a random boolean
     */
    static randomBoolean() {
        return Random.randomChance(.5);
    }
    /**
     *
     * @param chance a number in the range [0,1]
     * @returns a boolean
     */
    static randomChance(chance) {
        if (chance > 1 || chance < 0)
            throw new Error(`chance must be in the range [0,1] instead ${chance} was given`);
        return Math.random() <= chance;
    }
    static randomArrayIndexFromArray(arr) {
        return Random.randomInteger(0, arr.length - 1);
    }
    static randomElementFromArray(arr) {
        return arr[Random.randomArrayIndexFromArray(arr)];
    }
}
var NoteIds;
(function (NoteIds) {
    NoteIds[NoteIds["C"] = 0] = "C";
    NoteIds[NoteIds["C#|Db"] = 1] = "C#|Db";
    NoteIds[NoteIds["D"] = 2] = "D";
    NoteIds[NoteIds["D#|Eb"] = 3] = "D#|Eb";
    NoteIds[NoteIds["E"] = 4] = "E";
    NoteIds[NoteIds["F"] = 5] = "F";
    NoteIds[NoteIds["F#|Gb"] = 6] = "F#|Gb";
    NoteIds[NoteIds["G"] = 7] = "G";
    NoteIds[NoteIds["G#|Ab"] = 8] = "G#|Ab";
    NoteIds[NoteIds["A"] = 9] = "A";
    NoteIds[NoteIds["A#|Bb"] = 10] = "A#|Bb";
    NoteIds[NoteIds["B"] = 11] = "B";
})(NoteIds || (NoteIds = {}));
class Note {
    static letterNotes = ["C", "C#|Db", "D", "D#|Eb", "E", "F", "F#|Gb", "G", "G#|Ab", "A", "A#|Bb", "B"];
    #noteId;
    set noteId(newNoteId) {
        this.#noteId = ((newNoteId % 12) + 12) % 12;
    }
    get noteId() {
        return this.#noteId;
    }
    get string() {
        return this.toString();
    }
    constructor(noteId) {
        if (typeof noteId != "number")
            throw new Error("noteId must be a number");
        this.noteId = Math.floor(noteId);
    }
    toString() {
        return Note.letterNotes[this.noteId];
    }
    transpose(n) {
        if (typeof n != "number")
            throw new Error("n must be a number");
        return new Note(this.noteId + n);
    }
    copy() {
        return new Note(this.noteId);
    }
}
class Chord {
    notes;
    name;
    constructor(name, ...notes) {
        this.notes = notes;
        this.name = name;
    }
}
class InstrumentPresets {
    static Guitar = {
        Standard6String: [
            new Note(NoteIds.E),
            new Note(NoteIds.A),
            new Note(NoteIds.D),
            new Note(NoteIds.G),
            new Note(NoteIds.B),
            new Note(NoteIds.E),
        ],
        Standard7String: [
            new Note(NoteIds.B),
            new Note(NoteIds.E),
            new Note(NoteIds.A),
            new Note(NoteIds.D),
            new Note(NoteIds.G),
            new Note(NoteIds.B),
            new Note(NoteIds.E),
        ],
        HalfDown6String: [
            new Note(NoteIds["D#|Eb"]),
            new Note(NoteIds["G#|Ab"]),
            new Note(NoteIds["C#|Db"]),
            new Note(NoteIds["F#|Gb"]),
            new Note(NoteIds["A#|Bb"]),
            new Note(NoteIds["D#|Eb"]),
        ]
    };
    static Bass = {
        Standard4String: [
            new Note(NoteIds.E),
            new Note(NoteIds.A),
            new Note(NoteIds.D),
            new Note(NoteIds.G)
        ]
    };
    static Ukelele = {
        Standard4String: [
            new Note(NoteIds.G),
            new Note(NoteIds.C),
            new Note(NoteIds.E),
            new Note(NoteIds.A)
        ]
    };
    static Banjo = {
        OpenG: [
            new Note(NoteIds.G),
            new Note(NoteIds.D),
            new Note(NoteIds.G),
            new Note(NoteIds.B),
            new Note(NoteIds.D)
        ],
        Usual4String: [
            new Note(NoteIds.C),
            new Note(NoteIds.G),
            new Note(NoteIds.B),
            new Note(NoteIds.D),
        ]
    };
}
const chordNotation = {
    Major: "",
    Minor: "m",
    Sus2: "sus2",
    Sus4: "sus4",
    Power: "5",
    Diminished: "dim",
    HalfDiminished: "m7b5",
    Augmented: "aug",
    Add6: "6",
    Dominant7: "7",
    Major7: "maj7", // Can be notated as "maj7", "M7", "7", "Δ7", or "Δ"
};
const mainChords = [
    new Chord(chordNotation.Sus4, 0, 2, 7),
    new Chord(chordNotation.Minor, 0, 3, 7),
    new Chord(chordNotation.Major, 0, 4, 7),
    new Chord(chordNotation.Sus4, 0, 5, 7),
    new Chord(chordNotation.Power, 0, 7),
    new Chord(chordNotation.Diminished, 0, 3, 6),
    new Chord(chordNotation.HalfDiminished, 0, 3, 6, 10),
    new Chord(chordNotation.Augmented, 0, 4, 8)
];
const chordModifiers = [
    new Chord(chordNotation.Add6, 9),
    new Chord(chordNotation.Dominant7, 10),
    new Chord(chordNotation.Major7, 11),
];
let instrument = InstrumentPresets.Guitar.Standard6String;
/**
 * Detects the chord based on the given fingering and bass note.
 *
 * @param {string} fingering - The fingering of the chord in the form x-x-x-x-x-x where x are muted/unplayed notes.
 * @param {string | number} chordBase - (Optional) The chord's value if the chord is inverted (different note)
 *
 * e.g. C/G (chordBase = C or 0), G/B (chordBase = G or 7).
 * @return {string} The detected chord.
 */
function detectChord(fingering, chordBase) {
    let delimiter = "";
    if (fingering.includes("-"))
        delimiter = "-";
    const offsets = fingering.split(delimiter).map(x => x.toLowerCase() == "x" ? x : parseInt(x));
    if (offsets.length != instrument.length)
        throw new Error("fingering must be in the form x-x-x-x-x-x where x are the notes or x for unplayed");
    const playedNotes = [];
    let bassNote = null;
    for (let i = 0; i < instrument.length; i++) {
        const offset = offsets[i];
        if (offset == "x" || offset == "X")
            continue;
        const note = instrument[i].transpose(offset);
        if (bassNote == null) {
            //copying since later i shift all the notes to be centered on the bassNote
            //if it werent copied then the bassNote would be shifted too
            bassNote = note.copy();
        }
        playedNotes.push(note);
    }
    // console.log(bassNote, playedNotes)
    if (chordBase != null) {
        let chordBaseNoteID;
        if (typeof chordBase == 'string') {
            if (!chordBase.match(/.#\|.b/) && chordBase.match(/[#,b]/)) {
                //Comment the thing below out when using manual text inputs
                throw new Error("Uncomment out section for dealing with manual text inputs");
                /* Only used for manual text inputs
                if (['C', , 'D', , 'E', 'F', , 'G', , 'A', , 'B'].indexOf(chordBase[0]) == -1) {
                    throw new Error("chordBase is invalid: Invalid Letter Note")
                }
                else {
                    chordBaseNoteID = ['C', , 'D', , 'E', 'F', , 'G', , 'A', , 'B'].indexOf(chordBase[0])
                    switch (chordBase.slice(0, 1).trim()) {
                        case '#':
                            chordBaseNoteID += 1
                            break;
                        case 'b':
                            chordBaseNoteID -= 1
                            break;
                        default:
                            console.log(chordBase.slice(0, 1).trim())
                            throw new Error("chordBase is invalid: #/b Not Detected")
                    }
                }  */
            }
            chordBaseNoteID = NoteIds[chordBase];
        }
        if (typeof chordBase == 'number') {
            chordBaseNoteID = chordBase;
        }
        if (!playedNotes.map(x => x.noteId).includes(chordBaseNoteID)) {
            throw new Error("Note is not in Chord");
        }
        try {
            let chordBaseNote = new Note(chordBaseNoteID);
            var trueBass = bassNote;
            bassNote = chordBaseNote;
        }
        catch (error) {
            throw new Error("chordBase is invalid: Bassnote assignment failed");
        }
    }
    //console.log(playedNotes.map(x => x.string))
    const centeredNotes = playedNotes.map(x => x.transpose(-bassNote.noteId).noteId);
    const notes = [...new Set(centeredNotes)];
    // console.log(notes)
    let bass = bassNote?.string ?? "";
    let mainChord = "";
    let modifier = "";
    for (const chord of mainChords) {
        if (chord.notes.every(x => notes.includes(x))) {
            mainChord = chord.name;
            break;
        }
    }
    for (const chord of chordModifiers) {
        if (chord.notes.every(x => notes.includes(x))) {
            modifier = chord.name;
            break;
        }
    }
    // console.log(`bass: ${bass} mainChord: ${mainChord} modifier: ${modifier}`)
    let chordOutput;
    switch (mainChord) {
        // Sus Chords
        case chordNotation.Sus2:
        case chordNotation.Sus4:
            chordOutput = bass + modifier + mainChord;
            break;
        // Diminished Chords
        case chordNotation.Diminished:
            switch (modifier) {
                case chordNotation.Dominant7:
                    mainChord = chordNotation.HalfDiminished;
                    chordOutput = bass + mainChord;
                    break;
                case chordNotation.Add6:
                    modifier = chordNotation.Dominant7;
                    chordOutput = bass + mainChord + modifier;
                    break;
                default:
                    chordOutput = bass + mainChord + modifier;
            }
            break;
        case chordNotation.HalfDiminished:
            chordOutput = bass + mainChord;
            break;
        default:
            chordOutput = bass + mainChord + modifier;
    }
    // Check if trueBass is not null
    if (trueBass != null && trueBass.string != bassNote.string) {
        chordOutput = `${chordOutput}/${trueBass}`;
    }
    return chordOutput;
}
function randomChord() {
    let chord = "";
    for (let i = 0; i < 6; i++) {
        if (Random.randomChance(1 / 21))
            chord += "x-";
        else
            chord += Random.randomInteger(0, 20) + "-";
    }
    return chord.slice(0, chord.length - 1);
}
function randomPlayableChord() {
    const maxFingeringDistance = 3;
    const max = Random.randomInteger(maxFingeringDistance - 1, 20);
    let chord = [];
    for (let i = 0; i < 6; i++) {
        //80% chance to add a note (20% for an x)
        if (Random.randomChance(4 / 5))
            chord.push(max - Random.randomInteger(0, maxFingeringDistance - 1));
    }
    while (chord.length < 6) {
        //50% chance to add x to front or back
        if (Random.randomChance(1 / 2))
            chord.push("x");
        else
            chord.unshift("x");
    }
    return chord.join("-");
}
function getChordFingering(chord) {
    let i = 0;
    let max = 1500; //prevent infinite loop from being unlucky or putting in an unsupported chord
    while (i < max) {
        let fingering = randomPlayableChord();
        if (detectChord(fingering) == chord && fingering.split('-').filter(x => x != 'x').length > 3)
            return fingering;
        i++;
    }
    throw new Error("either invalid chord or your unlucky");
}
const fromID = (id) => document.getElementById(id);
const detectChordinput = fromID("detectChordinput");
const detectChordinputForm = {
    fingering: fromID("fingering"),
    bassNote: fromID("choosebassnote"),
    instrument: fromID("changeinstrument")
};
const chordResults = fromID("chordresults");
let bassNoteUsed = detectChordinputForm.bassNote.options[detectChordinputForm.bassNote.selectedIndex].value;
let fingeringUsed = detectChordinputForm.fingering.value;
let xamount = "x-x-x-x-x-x";
detectChordinputForm.bassNote.addEventListener("input", () => {
    bassNoteUsed = detectChordinputForm.bassNote.options[detectChordinputForm.bassNote.selectedIndex].value;
    if (bassNoteUsed.match(/.#\/.b/)) {
        bassNoteUsed = bassNoteUsed.replace(/\//, '|');
    }
    console.log(`bassNoteUsed: ${bassNoteUsed}`);
});
detectChordinputForm.instrument.addEventListener("input", () => {
    const instrumentType = detectChordinputForm.instrument.options[detectChordinputForm.instrument.selectedIndex].parentElement.label;
    const instrumentSelected = detectChordinputForm.instrument.options[detectChordinputForm.instrument.selectedIndex].value;
    instrument = InstrumentPresets[instrumentType][instrumentSelected];
    xamount = [];
    for (let string in instrument) {
        xamount.push("x");
    }
    xamount = xamount.join("-");
    console.log(`instrumentUsed: ${instrumentSelected} (${instrument})`);
});
detectChordinputForm.fingering.addEventListener("input", () => {
    fingeringUsed = detectChordinputForm.fingering.value;
    console.log(`fingeringUsed: ${fingeringUsed}`);
});
detectChordinput.addEventListener('input', () => {
    let chordDetected;
    if (fingeringUsed != null && bassNoteUsed != null && bassNoteUsed != "None") {
        try {
            chordDetected = detectChord(fingeringUsed, bassNoteUsed);
            console.log(chordDetected);
        }
        catch (e) {
            `Fingering Invalid or Bassnote invalid: Fingering must be in the form ${xamount} or Bassnote is not in chord`;
        }
    }
    else if (bassNoteUsed != null) {
        try {
            chordDetected = detectChord(fingeringUsed);
            console.log(chordDetected);
        }
        catch (e) {
            chordResults.innerHTML = `Fingering Invalid: Fingering must be in the form ${xamount}`;
        }
    }
    else { }
    if (chordDetected) {
        chordResults.innerHTML = chordDetected;
    }
    if (fingeringUsed == '') {
        chordResults.innerHTML = "No Input";
    }
});
