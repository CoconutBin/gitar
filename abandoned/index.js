/*

console.log("Hello, World!");

function getNote(n) {
    switch (n) {
        case 0:
        case 1:
            return "C"


    }
}

const letterNotes = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"] as const

class Note {
    notevalue: number
    originalnoteValue: number
    note: typeof letterNotes[number]
    octave: number
    constructor(notevalue) {
        this.notevalue = notevalue
        this.note = letterNotes[notevalue];
    }

    updateletterNote() {
        this.note = letterNotes[this.notevalue % 12];
    }
    transpose(n: number = 1) {
        this.notevalue += n;
        this.notevalue %= 12;
        this.updateletterNote()
    }
    reset() {
        this.notevalue = this.originalnoteValue
    }
}
type Xnote = "X" | "x"
type validFingering = number | Xnote
type fingering = [validFingering, validFingering, validFingering, validFingering, validFingering, validFingering]

function tellChord(string:string) {
    let chordArray: fingering = string.split('-').map((x):validFingering => {
        return (x.toLowerCase() == "x" ? x : parseInt(x)) as validFingering;
    }) as fingering;
    let guitar = [
        new Note(guitarOffset.E),
        new Note(guitarOffset.A),
        new Note(guitarOffset.D),
        new Note(guitarOffset.G),
        new Note(guitarOffset.B),
        new Note(guitarOffset.E4)
    ];
    let bassNote = null;
    // for (let i = 0; i < guitar.length; i++) {
    //     let string = guitar[i];
    //     let offset = chordArray[i];

    //     //case string is muted
    //     if (typeof offset == 'string') {
    //         //handle muted logic
    //     } else {
    //         if (bassNote == null) bassNote = string;
    //         // ['x','0','2','2','1','0']
    //         //
    //         string.transpose(offset);
    //     }
    // }
    chordArray.forEach((element, index) => {
        if (element.toString().toLowerCase() == 'x') {
            return
        }
        if (bassNote == null) bassNote = guitar[index];

        guitar[index].transpose(element as number);
        console.log(guitar[index])
        
    });
    console.log(guitar)
    return bassNote
    

}

// A [0, 3, 10] [x, x+3, x]

let guitarOffset = {
    E: 4, // Default is 4
    A: 9, // Default is 9
    D: 2, // Default is 2
    G: 7, // Default is 7
    B: 11, // Default is 12
    E4: 4 // Default is 4
}


//a = note1
//b = a
//a.transpose(1)
//function(note) => {//something}

*/ 
