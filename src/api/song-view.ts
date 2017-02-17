import * as $ from "jquery";
import ChordsLib from "./chords-lib";
import Chords from "./chords";
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
    chords: Array<string>
}

const SONG_VIEW_COOKIE = "song-view";
interface SongViewClientSettings {
    zoom?: number;
}
const MIN_ZOOM = 50;
const MAX_ZOOM = 200;

function parseSong(text: string): SVSong {
    const song: SVSong = {couplets: [], chords: []};
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
            if (song.chords.indexOf(chord) < 0) {
                song.chords.push(chord);
            }
        }
        svLine.text += line.substring(partStartIdx);
    }
    return song;
}

interface RenderSongOptions {
    text: string
    songViewSelector: string
    chordsViewSelector?: string
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
    let res = "";
    let idx = 0;
    for (let i = 0; i < line.chords.length; i++) {
        let chord = line.chords[i];
        res += line.text.substring(idx, chord.position);
        const validChord = isValidChordName(chord.name);
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

function renderSong(options: RenderSongOptions): void {
    try {
        const $song = $(options.songViewSelector);
        const text = options.text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const song = parseSong(text);
        let buf = "";

        for (let ic = 0; ic < song.couplets.length; ic++) {
            const couplet = song.couplets[ic];
            for (let il = 0; il < couplet.lines.length; il++) {
                const line = couplet.lines[il];
                buf += renderLineWithInlinedChords(line);
                buf += "\n";
            }
            buf += "\n";
        }
        $song.html(buf);
        applyMultilineModeClass(song, $song);
        applyStyles($song);

        if (options.chordsViewSelector) {
            const $chordsView = $(options.chordsViewSelector);
            song.chords.forEach(chordName => {
                let accord = ChordsLib.getChord(chordName);
                if (accord != null) {
                    let fingers = accord.fingers.length > 0 ? ` fingers="${accord.fingers}"` : "";
                    let playJs = `$site.Utils.playChord('${chordName}')`;
                    let style = "cursor:pointer";
                    let title = `${chordName} - проиграть`;
                    $(`<chord name="${accord.name}" positions="${accord.positions}" ${fingers} size="2" onclick="${playJs}" style="${style}" title="${title}"/>`)
                        .appendTo($chordsView);
                }
            });
            Chords.renderChords($chordsView.get(0));
        }
    } catch (err) {
        console.log(err);
    }
}

function isValidZoom(zoom?: number): boolean {
    return zoom && zoom >= MIN_ZOOM && zoom <= MAX_ZOOM;
}

function applyStyles($song: JQuery) {
    let s = <SongViewClientSettings> JSON.parse(Cookies.get(SONG_VIEW_COOKIE));
    let zoom = isValidZoom(s.zoom) ? s.zoom : 100;
    $song.removeAttr("style");
    $song.attr("style", "font-size: " + zoom + "%;");
    $song.removeClass("song-text-loading");
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