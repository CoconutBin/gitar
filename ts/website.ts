const fromID = (id) => document.getElementById(id)

const detectChordinput = fromID("detectChordinput")
const detectChordinputForm = {
    fingering: fromID("fingering") as HTMLInputElement,
    bassNote: fromID("choosebassnote") as HTMLSelectElement,
    instrument: fromID("changeinstrument") as HTMLSelectElement
}
const chordResults = fromID("chordresults")

let bassNoteUsed = detectChordinputForm.bassNote.options[detectChordinputForm.bassNote.selectedIndex].value
let fingeringUsed = detectChordinputForm.fingering.value
let xamount:string|string[] = "x-x-x-x-x-x"

detectChordinputForm.bassNote.addEventListener("input", () => {
    bassNoteUsed = detectChordinputForm.bassNote.options[detectChordinputForm.bassNote.selectedIndex].value
    if(bassNoteUsed.match(/.#\/.b/)){
        bassNoteUsed = bassNoteUsed.replace(/\//,'|')
    }
    console.log(`bassNoteUsed: ${bassNoteUsed}`)
})

detectChordinputForm.instrument.addEventListener("input", () => {
    const instrumentType = (detectChordinputForm.instrument.options[detectChordinputForm.instrument.selectedIndex].parentElement as HTMLOptGroupElement).label
    const instrumentSelected = detectChordinputForm.instrument.options[detectChordinputForm.instrument.selectedIndex].value
    instrument = InstrumentPresets[instrumentType][instrumentSelected]
    xamount = []
    for(let string in instrument) {
        (xamount as string[]).push("x")
    }
    xamount = xamount.join("-")
    console.log(`instrumentUsed: ${instrumentSelected} (${instrument})`)
})

detectChordinputForm.fingering.addEventListener("input", () => {
    fingeringUsed = detectChordinputForm.fingering.value
    console.log(`fingeringUsed: ${fingeringUsed}`)
})

detectChordinput.addEventListener('input', () => {
    let chordDetected:string

    if(fingeringUsed != null && bassNoteUsed != null && bassNoteUsed != "None"){
        try{chordDetected = detectChord(fingeringUsed, bassNoteUsed)
            console.log(chordDetected)}
        catch(e){`Fingering Invalid or Bassnote invalid: Fingering must be in the form ${xamount} or Bassnote is not in chord`}
    }
    else if(bassNoteUsed != null){
        try{chordDetected = detectChord(fingeringUsed) 
            console.log(chordDetected)}
        catch(e){chordResults.innerHTML = `Fingering Invalid: Fingering must be in the form ${xamount}`}
    }
    else{}

    if(chordDetected){
        chordResults.innerHTML = chordDetected
    }
    if(fingeringUsed == ''){
        chordResults.innerHTML = "No Input"
    }
})
