import * as $ from "jquery";

interface RenderSongOptions {
    text: string
    targetSelector: string
}
function renderSong(options: RenderSongOptions) {
    const text = options.text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const lines = text.split("\n");
    let buf = "";
    for (let i = 0; i < lines.length; i++, buf += "\n") {
        const line = lines[i];
        let partStartIdx = 0;
        let idx = 0;
        while ((idx = line.indexOf("(", partStartIdx)) >= 0) {
            let endIdx = line.indexOf(")", idx + 1);
            if (endIdx < 0) {
                break;
            }
            let note = line.substring(idx + 1, endIdx);
            buf += line.substring(partStartIdx, idx);
            buf += `<sup style='color:#2b6e44'>${note}</sup>`;
            partStartIdx = endIdx + 1;
        }
        buf += line.substring(partStartIdx);
    }
    $(options.targetSelector).html(buf);
}

export default {
    renderSong: renderSong
}