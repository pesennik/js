import * as $ from "jquery";

// SV (SongView) models

interface SVChord {
    name: string
    position: number
}

interface SVLine {
    text: string,
    chords: Array<SVChord>
}
interface SVCouplet {
    lines: Array<SVLine>;
}

interface SVSong {
    couplets: Array<SVCouplet>;
}

enum ChordsViewMode {
    Inlined,
    NoChords,
}

function parseSong(text: string): SVSong {
    const song: SVSong = {couplets: []};
    let couplet: SVCouplet = null;
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().length == 0) {
            couplet = null;
            continue;
        }
        if (couplet == null) {
            couplet = {lines: []};
            song.couplets.push(couplet);
        }
        const svLine: SVLine = {text: "", chords: []};
        couplet.lines.push(svLine);

        let partStartIdx = 0;
        let idx = 0;
        while ((idx = line.indexOf("(", partStartIdx)) >= 0) {
            let endIdx = line.indexOf(")", idx + 1);
            if (endIdx < 0) {
                break;
            }
            let chord = line.substring(idx + 1, endIdx);
            svLine.text += line.substring(partStartIdx, idx);
            svLine.chords.push({name: chord, position: svLine.text.length});
            partStartIdx = endIdx + 1;
        }
        svLine.text += line.substring(partStartIdx);
    }
    return song;
}

function parseChordsViewMode(text: string): ChordsViewMode {
    return text == "NoChords" ? ChordsViewMode.NoChords : ChordsViewMode.Inlined;
}

interface RenderSongOptions {
    text: string
    targetSelector: string
    chordsMode: string;
}

function renderLineWithInlinedChords(line: SVLine): string {
    if (line.chords.length == 0) {
        return line.text;
    }
    var res = "";
    let idx = 0;
    for (let i = 0; i < line.chords.length; i++) {
        let chord = line.chords[i];
        res += line.text.substring(idx, chord.position);
        res += `<sup style='color:#2b6e44'>${chord.name}</sup>`;
        idx = chord.position;
    }
    res += line.text.substring(idx);
    return res;
}

function renderSong(options: RenderSongOptions) {
    const text = options.text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var chordsViewMode = parseChordsViewMode(options.chordsMode);
    const showChords = chordsViewMode == ChordsViewMode.Inlined;
    const song = parseSong(text);
    let buf = "";

    for (let ic = 0; ic < song.couplets.length; ic++) {
        const couplet = song.couplets[ic];
        for (let il = 0; il < couplet.lines.length; il++) {
            const line = couplet.lines[il];
            if (showChords) {
                buf += renderLineWithInlinedChords(line);
            } else {
                buf += line.text;
            }
            buf += "\n";
        }
        buf += "\n";
    }
    $(options.targetSelector).html(buf);
}

export default {
    renderSong: renderSong
}