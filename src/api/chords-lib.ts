interface  Chord {
    positions: string,
    fingers: string
}

const CHORDS = {

    // Majors
    "A": "002220&f=--123-",
    "A#": "113331&f=112341",
    "B": "224442&f=112341",
    "C": "x32010&f=-32-1-",
    "C#": "446664&f=112341",
    "D": "xx0232&f=---132",
    "D#": null,
    "E": "022100&f=-231--",
    "F": "133211&f=134211",
    "F#": "244322&f=134211",
    "G": "320033&f=12--34",
    "G#": "466544&f=134211",

    // Minors
    "Am": "002210&f=--231-",
    "Am#": "113321&f=113421",
    "Bm": "224432&f=113421",
    "Cm": "335543&f=113421",
    "Cm#": "446654&f=113421",
    "Dm": "xx0231&f=---231",
    "Dm#": null,
    "Em": "022000&f=-23---",
    "Fm": "133111&f=134111",
    "Fm#": "244222&f=134111",
    "Gm": "355333&f=134111",
    "Gm#": "466444&f=134111",

    // Power
    "A5": "x022xx&f=--11--",
    "A5#": "x133xx&f=--11--",
    "B5": "x244xx&f=-134--",
    "C5": "x355xx&f=-134--",
    "C5#": null,
    "D5": "x577xx&f=-134--",
    "D5#": null,
    "E5": "022xxx&f=-11---",
    "F5": "133xxx&f=134---",
    "F5#": null,
    "G5": "355xxx&f=134---",
    "G5#": null
};

function getChord(name: string): Chord {
    if (!name || name.length == 0) {
        return null;
    }
    let note = name.charAt(0).toUpperCase();
    if (note == 'H') {
        note = 'B';
    }
    const key = note + name.substr(1).toLocaleLowerCase();
    const res = CHORDS[key];
    if (!res) {
        return null;
    }
    const tokens = res.split("&");
    return {
        positions: tokens[0],
        fingers: tokens[1]
    };
}
export default {
    getChord: getChord
}
