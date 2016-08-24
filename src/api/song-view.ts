import * as $ from "jquery";
import Cookies from "./cookies";

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
    Hidden,
}

const SONG_VIEW_COOKIE = "song-view";
interface SongViewClientSettings {
    zoom?: number;
}
const MIN_ZOOM = 50;
const MAX_ZOOM = 200;

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
    return text == "Hidden" ? ChordsViewMode.Hidden : ChordsViewMode.Inlined;
}

interface RenderSongOptions {
    text: string
    targetSelector: string
    chordsMode: string;
}

const validNotes = {
    'A': true, 'B': true, 'C': true, 'D': true, 'E': true, 'F': true, 'G': true, 'H': true,
    'a': true, 'b': true, 'c': true, 'd': true, 'e': true, 'f': true, 'g': true, 'h': true,
};

function isValidChordName(chord: string) {
    return chord && chord.length > 0 && chord.length <= 7 && validNotes[chord.charAt(0)];
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
        var validChord = isValidChordName(chord.name);
        const color = validChord ? "#2b6e44" : "blue";
        const title = validChord ? "" : "title='Неподдерживаемый тип аккорда: аккорд не будет транспонироваться.'";
        res += `<sup style='color:${color};' ${title}>${chord.name}</sup>`;
        idx = chord.position;
    }
    res += line.text.substring(idx);
    return res;
}

const MAX_LINES_PER_COLUMN = 24;
function applyMultilineModeClass(song: SVSong, $song: JQuery) {
    let linesInSong = 0;
    for (let ic = 0; ic < song.couplets.length; ic++) {
        const couplet = song.couplets[ic];
        linesInSong += couplet.lines.length;
    }
    if (linesInSong > MAX_LINES_PER_COLUMN) {
        $song.addClass("song-text-2-cols");
    }
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
    var $song = $(options.targetSelector);
    $song.html(buf);
    applyMultilineModeClass(song, $song);
    applyStyles($song);

}

function isValidZoom(zoom?: number): boolean {
    return zoom && zoom >= MIN_ZOOM && zoom <= MAX_ZOOM;
}

function applyStyles($song: JQuery) {
    let s = <SongViewClientSettings> JSON.parse(Cookies.get(SONG_VIEW_COOKIE));
    let zoom = isValidZoom(s.zoom) ? s.zoom : 100;
    $song.removeAttr("style");
    $song.attr("style", "font-size: " + zoom + "%;");
}

interface ZoomCommand {
    delta?: number;
    value?: number;
}

function zoom(command: ZoomCommand): void {
    if (!command.delta && !isValidZoom(command.value)) {
        return;
    }
    let s = <SongViewClientSettings> JSON.parse(Cookies.get(SONG_VIEW_COOKIE));
    let currentZoom = isValidZoom(s.zoom) ? s.zoom : 100;
    s.zoom = command.delta ? currentZoom + command.delta : command.value;
    if (!isValidZoom(s.zoom)) {
        return;
    }
    Cookies.set(SONG_VIEW_COOKIE, JSON.stringify(s));
    applyStyles($(".song-text"))
}


export default {
    renderSong: renderSong,
    zoom: zoom,
}