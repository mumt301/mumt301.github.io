"use strict";

function playNotes1() {
    //create a synth and connect it to the main output (your speakers)
    const synth = new Tone.Synth().toDestination();

    // define a list of notes
    let notes = ["C4", "D4", "D#4", "F4", "G4", "Bb4", "C5", "D5", "Ab4", "Ab3"];

    let i = 0;
    const loop = new Tone.Loop(function (time) {
        // every single loop iteration, pick a new pitch from the list and play it
        synth.triggerAttackRelease(notes[i % notes.length], '8n', time);
        i++;
    }, "8n").start(0);

    Tone.Transport.start();   
    return loop;
}

function playNotes2() {
    const synth = new Tone.Synth().toDestination();

    // this time also define a list of durations
    let notes = ["C4", "D4", "D#4", "F4", "G4", "Bb4", "C5", "D5", "Ab4", "Ab3"];
    let durations = ["8n", "8n", "8n", "16n", "16n"];

    //
    let i = 0;
    const loop = new Tone.Loop(function (time) {
        // every single loop iteration, pick a new duration from the list and set the loop's timer to it
        this.interval = durations[i % durations.length];
        synth.triggerAttackRelease(notes[i % notes.length], '8n', time);
        i++;
    }, "8n").start(0);

    Tone.Transport.start();   
    return loop;

}

// shuffles an array in-place
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function playNotes3() {
    const synth = new Tone.Synth().toDestination();

    let notes = ["C4", "D4", "D#4", "F4", "G4", "Bb4", "C5", "D5", "Ab4", "Ab3"];
    let durations = ["8n", "8n", "8n", "16n", "16n"];

    let i = 0;
    const loop = new Tone.Loop(function (time) {
        synth.triggerAttackRelease(notes[i % notes.length], '8n', time);
        this.interval = durations[i % durations.length];
        i++;

        // every time we go through the list of notes four times, shuffle the list of notes
        if ((i > 0) && (i % (notes.length * 4)) == 0){shuffleArray(notes);};
    }, "8n").start(0);

    Tone.Transport.start();   
    return loop;

}

// given an object containing keys whose values are probabilities that sum to 1, returns a weighted random key
function weightedRandom(prob) {
    let i, sum=0, r=Math.random();
    for (i in prob) {
      sum += prob[i];
      if (r <= sum) return i;
    }
}

function playNotes4() {
    //create a synth and connect it to the main output (your speakers)
    const synth = new Tone.Synth().toDestination();

    let current_note = 'C4'
    let previous_note = 'C4'

    // create matrix of probabilities for markov chain. every entry in this object contains another object
    // that defines what notes are most likely to come -after- that note.
    let probabilities = {
        C4:{C4: 0.25,   D4: 0.25,   E4: 0.25,   F4:0.25,    G4:0},
        D4:{C4: 0.25,   D4: 0,      E4: 0.25,   F4:0.25,    G4:0.25},
        E4:{C4: 0,      D4: 0,      E4: 0.5,    F4:0,       G4:0.5},
        F4:{C4: 0.05,   D4: 0.05,   E4: 0.1,    F4:0.80,    G4:0},
        G4:{C4: 0,      D4: 0.4,    E4: 0.2,    F4:0.00,    G4:0.4},
    }; 

    let durations = ["8n", "8n", "8n", "16n", "16n"];

    let i = 0;
    const loop = new Tone.Loop(function (time) {
        previous_note = current_note;
        current_note = weightedRandom(probabilities[previous_note]);
        synth.triggerAttackRelease(current_note, '8n', time);

        this.interval = durations[i % durations.length];
        i++;
    }, "8n").start(0);

    Tone.Transport.start();   
    return loop;

}

function runAfterLoadingPage() {
    
    // Get all relevant divs from the html
    const clickZone1 = document.getElementById("clickZone1");
    const clickZone2 = document.getElementById("clickZone2");
    const clickZone3 = document.getElementById("clickZone3");
    const clickZone4 = document.getElementById("clickZone4");
    const stopZone = document.getElementById("stopAll");
    let loop = null;

    clickZone1.addEventListener('click', async () => {
        await Tone.start();
        // clickZone1.innerHTML = (clickZone1.innerHTML + " playing...");
        loop = playNotes1();
    })

    clickZone2.addEventListener('click', async () => {
        await Tone.start();
        // clickZone2.innerHTML = (clickZone2.innerHTML + " playing...");
        loop = playNotes2();
    })

    clickZone3.addEventListener('click', async () => {
        await Tone.start();
        // clickZone3.innerHTML = (clickZone3.innerHTML + " playing...");
        loop = playNotes3();
    })

    clickZone4.addEventListener('click', async () => {
        await Tone.start();
        // clickZone4.innerHTML = (clickZone4.innerHTML + " playing...");
        loop = playNotes4();
    })

    stopZone.addEventListener('click', async () => {
        loop.stop();
    })
}

window.onload = runAfterLoadingPage;
