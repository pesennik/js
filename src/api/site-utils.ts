import * as $ from "jquery";
import * as Autolinker from "autolinker";
import * as Parsley from "parsleyjs";
import links from "./links";
import sidebar from "./sidebar";

function setTitle(selector: string, title: string, root?: HTMLElement): void {
    root = root ? root : window.document.body;
    $(root).find(selector).each(function () {
        if (!$(this).attr("title")) {
            $(this).attr("title", title);
        }
    });
}

interface LinkifyOptions {
    skipMediaLinks: boolean;
}

function linkify(text: string, options: LinkifyOptions): string {
    const autolinker = new Autolinker({
        urls: {
            schemeMatches: true,
            wwwMatches: true,
            tldMatches: true
        },
        email: true,
        phone: true,
        hashtag: false,

        stripPrefix: true,
        newWindow: true,

        truncate: {
            length: 60,
            location: "end"
        },

        className: ""
    });

    const res = autolinker.link(text);
    if (options && options.skipMediaLinks) {
        return res;
    }
    try {
        return links.processMediaLinks(res);
    } catch (err) {
        log.error(err);
        return res;
    }
}

function focusOnEnter(event: KeyboardEvent, id: string): void {
    if (event.which === 13) {
        $(id).focus();
        event.preventDefault();
    }
}
function clickOnEnter(event: KeyboardEvent, id: number): void {
    let keyCode = (event.which ? event.which : event.keyCode);
    if ((keyCode === 10 || keyCode === 13) && !event.ctrlKey) {
        $(id).click();
        event.preventDefault();
    }
}

function clickOnCtrlEnter(event: KeyboardEvent, id: number): void {
    let keyCode = (event.which ? event.which : event.keyCode);
    if ((keyCode === 10 || keyCode === 13) && event.ctrlKey) {
        $(id).click();
        event.preventDefault();
    }
}

function showMenuByClick(e: Event, id: string): boolean {
    let evt = e ? e : window.event;
    if (evt && evt.stopPropagation) {
        evt.stopPropagation();
    }
    if (evt && evt.cancelBubble) {
        evt.cancelBubble = true;
    }
    $("#" + id).dropdown("toggle");
    return false;
}


function getURLParameter(name: string): string {
    let regExp = new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)");
    return decodeURIComponent((regExp.exec(location.search) || [undefined, ""])[1].replace(/\+/g, "%20")) || undefined;
}

function limitTextArea($textArea: JQuery, $feedback: JQuery, $button: JQuery, maxTextLen: number, minRemainingToShow: number): void {
    let f = function () {
        let remaining = maxTextLen - $textArea.val().length;
        if (remaining <= minRemainingToShow) {
            $feedback.html("" + remaining);
        } else {
            $feedback.html("");
        }
        if (remaining < 0) {
            $feedback.css("color", "red");
            if ($button) {
                $button.attr("disabled", "");
            }
        } else {
            $feedback.css("color", "inherit");
            if ($button) {
                $button.removeAttr("disabled");
            }
        }
    };
    $textArea.keyup(f);
    f();
}


function enableScrollTop(): void {
    $(document).ready(() => {
        let $backTop = $("#back-top");
        if (!$backTop) {
            return;
        }
        $backTop.hide(); // hide #back-top first
        $(() => { // fade in #back-top
            $(window).scroll(function () {
                if ($(this).scrollTop() > 100) {
                    $("#back-top").fadeIn();
                } else {
                    $("#back-top").fadeOut();
                }
            });
            $("#back-top").find("a").click(() => { // scroll body to 0px on click
                $("body,html").animate({
                    scrollTop: 0
                }, 500);
                return false;
            });
        });
    });
}

function removeServerSideParsleyError(el: HTMLElement) {
    const p: Parsley = $(el).parsley();
    p.removeError("server-side-parsley-error");
}

function shuffleArray(array: Array<any>): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

let randomSongsStack: Array<number> = [];
function scrollToRandomSong() {
    const $songs = $(".song-block");
    if ($songs.length == 0) {
        return;
    }
    if (randomSongsStack.length == 0) {
        for (let i = 0; i < $songs.length; i++) {
            randomSongsStack.push(i);
        }
        shuffleArray(randomSongsStack);
    }
    let idx = randomSongsStack.pop();
    const $song = $($songs.get(idx));
    const offset = $song.offset();
    $("html, body").animate({
        scrollTop: offset.top,
    });
}

function scrollToBlock(selector: string): void {
    const $block = $(selector);
    const offset = $block.offset();
    $("html, body").animate({
        scrollTop: offset.top,
    });
}

function playChord(chordName: string) {
    let mediaName = encodeURIComponent(chordName.replace("H", "B"));
    let url = `https://pesennik.online/static/chords/${mediaName}.m4a`;
    new Audio(url).play();
}

export default {
    setTitle: setTitle,
    linkify: linkify,
    focusOnEnter: focusOnEnter,
    clickOnEnter: clickOnEnter,
    clickOnCtrlEnter: clickOnCtrlEnter,
    showMenuByClick: showMenuByClick,
    getURLParameter: getURLParameter,
    limitTextArea: limitTextArea,
    enableScrollTop: enableScrollTop,
    removeServerSideParsleyError: removeServerSideParsleyError,
    scrollToRandomSong: scrollToRandomSong,
    scrollToBlock: scrollToBlock,
    playYoutube: links.playYoutube,
    initSidebar: sidebar.initSidebar,
    playChord: playChord
}
