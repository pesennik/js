import * as $ from "jquery";
import * as Autolinker from "autolinker";
import links from "./links";

function setTitle(selector:string, title:string, root?:HTMLElement):void {
    root = root ? root : window.document.body;
    $(root).find(selector).each(function () {
        if (!$(this).attr("title")) {
            $(this).attr("title", title);
        }
    });
}

interface LinkifyOptions {
    skipMediaLinks:boolean;
}

function linkify(text:string, options:LinkifyOptions):string {
    var autolinker = new Autolinker({
        urls: {
            schemeMatches: true,
            wwwMatches: true,
            tldMatches: true
        },
        email: true,
        phone: true,
        twitter: false,
        hashtag: false,

        stripPrefix: true,
        newWindow: true,

        truncate: {
            length: 60,
            location: "end"
        },

        className: ""
    });

    var res = autolinker.link(text);
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

function focusOnEnter(event:KeyboardEvent, id:string):void {
    if (event.which === 13) {
        $(id).focus();
        event.preventDefault();
    }
}
function clickOnEnter(event:KeyboardEvent, id:number):void {
    let keyCode = (event.which ? event.which : event.keyCode);
    if ((keyCode === 10 || keyCode === 13) && !event.ctrlKey) {
        $(id).click();
        event.preventDefault();
    }
}

function clickOnCtrlEnter(event:KeyboardEvent, id:number):void {
    let keyCode = (event.which ? event.which : event.keyCode);
    if ((keyCode === 10 || keyCode === 13) && event.ctrlKey) {
        $(id).click();
        event.preventDefault();
    }
}

function showMenuByClick(e:Event, id:string):boolean {
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


function getURLParameter(name:string):string {
    let regExp = new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)");
    return decodeURIComponent((regExp.exec(location.search) || [undefined, ""])[1].replace(/\+/g, "%20")) || undefined;
}

function limitTextArea($textArea:JQuery, $feedback:JQuery, $button:JQuery, maxTextLen:number, minRemainingToShow:number):void {
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


function enableScrollTop():void {
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

function moveCaretToEnd(el:HTMLTextAreaElement):void {
    if (typeof el.selectionStart === "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange !== "undefined") {
        el.focus();
        const range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}

function countdown(refreshSeconds:number, formatter:Function, timeBlockId:string, timeLeftBlockId:string, completionCallback:Function):void {
    let timeBlock = document.getElementById(timeBlockId);
    if (!timeBlock) {
        return;
    }
    let timeString = timeBlock.getAttribute("utc-date");
    if (!timeString) {
        return;
    }
    let targetTime = Date.parse(timeString);
    if (!targetTime) {
        return;
    }
    let timeLeftBlock = document.getElementById(timeLeftBlockId);
    let millisLeft = targetTime - new Date().getTime();
    if (millisLeft <= 0) {
        timeLeftBlock.innerHTML = formatter(0, 0);
        if (completionCallback) {
            //TODO: add min callback period before enabling. completionCallback();
        }
        return;
    }
    let millisPerMinute = 60 * 1000;
    let millisPerHour = 60 * millisPerMinute;
    let hoursLeft = parseInt("" + (millisLeft / millisPerHour), 10);
    let minutesLeft = parseInt("" + Math.round((millisLeft - hoursLeft * millisPerHour) / millisPerMinute), 10);
    timeLeftBlock.innerHTML = formatter(hoursLeft, minutesLeft);

    setTimeout(() => {
        countdown(refreshSeconds, formatter, timeBlockId, timeLeftBlockId, completionCallback);
    }, refreshSeconds * 1000);
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
    moveCaretToEnd: moveCaretToEnd,
    countdown: countdown
}
