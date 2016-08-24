(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
function set(key, value) {
    document.cookie = key + '=' + value + ';expires=Fri, 31 Dec 9999 23:59:59 GMT';
}
function get(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : "{}";
}
exports.__esModule = true;
exports["default"] = {
    set: set,
    get: get
};

},{}],2:[function(require,module,exports){
"use strict";
var KnownImageExtensions = {};
KnownImageExtensions["png"] = true;
KnownImageExtensions["jpg"] = true;
KnownImageExtensions["gif"] = true;
var KnownAudioExtensions = {};
KnownAudioExtensions["mp3"] = true;
KnownAudioExtensions["wav"] = true;
KnownAudioExtensions["ogg"] = true;
function playYoutube(el) {
    // Create an iFrame with autoplay set to true
    var iframeUrl = "https://www.youtube.com/embed/" + el.id + "?autoplay=1&autohide=1";
    if ($(el).data('params')) {
        iframeUrl += '&' + $(this).data('params');
    }
    // The height and width of the iFrame should be the same as parent
    var iframe = $('<iframe/>', { 'frameborder': '0', 'src': iframeUrl, 'width': $(el).width(), 'height': $(el).height() });
    iframe.attr("allowfullscreen", "allowfullscreen");
    // Replace the YouTube thumbnail with YouTube HTML5 Player
    $(el).replaceWith(iframe);
}
function getYoutubeVideoId(url) {
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url.match(p)) ? RegExp.$1 : null;
}
function replaceWithYoutubeEmbed(url, fallback) {
    var videoId = getYoutubeVideoId(url);
    if (!videoId) {
        return fallback;
    }
    var style = "background-image: url(https://img.youtube.com/vi/" + videoId + "/mqdefault.jpg);";
    return "<div id='" + videoId + "' class='youtube' style='" + style + "' onclick='$site.Utils.playYoutube(this);'><div class='play'></div></div>";
}
function getLinkReplacement(link) {
    var lcLink = link.toLocaleLowerCase();
    var url = link;
    if (lcLink.indexOf("http://") == 0) {
        url = link.substr(7);
    }
    else if (lcLink.indexOf("https://") == 0) {
        url = link.substr(8);
    }
    var lcUrl = url.toLocaleLowerCase();
    var ext = lcUrl.split('.').pop();
    if (ext in KnownImageExtensions) {
        return "<a href='" + link + "' target='_blank'><img src='" + link + "' style='max-width: 400px; max-height: 300px;'></a>";
    }
    if (ext in KnownAudioExtensions) {
        return "<audio controls><source src='" + link + "'></audio>";
    }
    if (getYoutubeVideoId(url) != null) {
        return replaceWithYoutubeEmbed(url, null);
    }
    return null;
}
function processMediaLinks(text) {
    var res = text;
    var startIdx = res.indexOf("<a href=");
    while (startIdx >= 0) {
        var endIdx = res.indexOf("</a>", startIdx);
        if (endIdx < 0) {
            break;
        }
        var hrefStartIdx = startIdx + 9;
        var hrefEndIdx = res.indexOf('"', hrefStartIdx + 1);
        if (hrefEndIdx > 0) {
            var link = res.substring(hrefStartIdx, hrefEndIdx);
            var replacement = getLinkReplacement(link);
            if (replacement != null) {
                res = res.substring(0, startIdx) + replacement + res.substring(endIdx + 4);
                endIdx = startIdx + replacement.length;
            }
        }
        startIdx = res.indexOf("<a href=", endIdx);
    }
    return res;
}
exports.__esModule = true;
exports["default"] = {
    processMediaLinks: processMediaLinks,
    playYoutube: playYoutube
};

},{}],3:[function(require,module,exports){
if (window.Parsley) {
    window.Parsley.addMessages("ru", {
        defaultMessage: "Некорректное значение.",
        type: {
            email: "Введите адрес электронной почты.",
            url: "Введите URL адрес.",
            number: "Введите число.",
            integer: "Введите целое число.",
            digits: "Введите только цифры.",
            alphanum: "Введите буквенно-цифровое значение."
        },
        notblank: "Это поле должно быть заполнено.",
        required: "Обязательное поле.",
        pattern: "Это значение некорректно.",
        min: "Это значение должно быть не менее чем %s.",
        max: "Это значение должно быть не более чем %s.",
        range: "Это значение должно быть от %s до %s.",
        minlength: "Это значение должно содержать не менее %s символов.",
        maxlength: "Это значение должно содержать не более %s символов.",
        length: "Это значение должно содержать от %s до %s символов.",
        mincheck: "Выберите не менее %s значений.",
        maxcheck: "Выберите не более %s значений.",
        check: "Выберите от %s до %s значений.",
        equalto: "Это значение должно совпадать."
    });
    window.Parsley.setLocale("ru");
}

},{}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports["default"] = {
    /** Guitar Tuner API */
    Tuner: undefined,
    /** Set of utility functions */
    Utils: undefined,
    /** Song rendering engine */
    SongView: undefined
};

},{}],5:[function(require,module,exports){
(function (global){
"use strict";
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var Autolinker = (typeof window !== "undefined" ? window['Autolinker'] : typeof global !== "undefined" ? global['Autolinker'] : null);
var links_1 = require("./links");
function setTitle(selector, title, root) {
    root = root ? root : window.document.body;
    $(root).find(selector).each(function () {
        if (!$(this).attr("title")) {
            $(this).attr("title", title);
        }
    });
}
function linkify(text, options) {
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
        return links_1["default"].processMediaLinks(res);
    }
    catch (err) {
        log.error(err);
        return res;
    }
}
function focusOnEnter(event, id) {
    if (event.which === 13) {
        $(id).focus();
        event.preventDefault();
    }
}
function clickOnEnter(event, id) {
    var keyCode = (event.which ? event.which : event.keyCode);
    if ((keyCode === 10 || keyCode === 13) && !event.ctrlKey) {
        $(id).click();
        event.preventDefault();
    }
}
function clickOnCtrlEnter(event, id) {
    var keyCode = (event.which ? event.which : event.keyCode);
    if ((keyCode === 10 || keyCode === 13) && event.ctrlKey) {
        $(id).click();
        event.preventDefault();
    }
}
function showMenuByClick(e, id) {
    var evt = e ? e : window.event;
    if (evt && evt.stopPropagation) {
        evt.stopPropagation();
    }
    if (evt && evt.cancelBubble) {
        evt.cancelBubble = true;
    }
    $("#" + id).dropdown("toggle");
    return false;
}
function getURLParameter(name) {
    var regExp = new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)");
    return decodeURIComponent((regExp.exec(location.search) || [undefined, ""])[1].replace(/\+/g, "%20")) || undefined;
}
function limitTextArea($textArea, $feedback, $button, maxTextLen, minRemainingToShow) {
    var f = function () {
        var remaining = maxTextLen - $textArea.val().length;
        if (remaining <= minRemainingToShow) {
            $feedback.html("" + remaining);
        }
        else {
            $feedback.html("");
        }
        if (remaining < 0) {
            $feedback.css("color", "red");
            if ($button) {
                $button.attr("disabled", "");
            }
        }
        else {
            $feedback.css("color", "inherit");
            if ($button) {
                $button.removeAttr("disabled");
            }
        }
    };
    $textArea.keyup(f);
    f();
}
function enableScrollTop() {
    $(document).ready(function () {
        var $backTop = $("#back-top");
        if (!$backTop) {
            return;
        }
        $backTop.hide(); // hide #back-top first
        $(function () {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 100) {
                    $("#back-top").fadeIn();
                }
                else {
                    $("#back-top").fadeOut();
                }
            });
            $("#back-top").find("a").click(function () {
                $("body,html").animate({
                    scrollTop: 0
                }, 500);
                return false;
            });
        });
    });
}
function moveCaretToEnd(el) {
    if (typeof el.selectionStart === "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    }
    else if (typeof el.createTextRange !== "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}
function removeServerSideParsleyError(el) {
    var p = $(el).parsley();
    p.removeError("server-side-parsley-error");
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
var randomSongsStack = [];
function scrollToRandomSong() {
    var $songs = $(".song-block");
    if ($songs.length == 0) {
        return;
    }
    if (randomSongsStack.length == 0) {
        for (var i = 0; i < $songs.length; i++) {
            randomSongsStack.push(i);
        }
        shuffleArray(randomSongsStack);
    }
    var idx = randomSongsStack.pop();
    var $song = $($songs.get(idx));
    var offset = $song.offset();
    $("html, body").animate({
        scrollTop: offset.top
    });
}
exports.__esModule = true;
exports["default"] = {
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
    removeServerSideParsleyError: removeServerSideParsleyError,
    scrollToRandomSong: scrollToRandomSong,
    playYoutube: links_1["default"].playYoutube
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./links":2}],6:[function(require,module,exports){
(function (global){
"use strict";
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var cookies_1 = require("./cookies");
var ChordsViewMode;
(function (ChordsViewMode) {
    ChordsViewMode[ChordsViewMode["Inlined"] = 0] = "Inlined";
    ChordsViewMode[ChordsViewMode["Hidden"] = 1] = "Hidden";
})(ChordsViewMode || (ChordsViewMode = {}));
var SONG_VIEW_COOKIE = "song-view";
var MIN_ZOOM = 50;
var MAX_ZOOM = 200;
function parseSong(text) {
    var song = { couplets: [] };
    var couplet = null;
    var lines = text.split("\n");
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line.trim().length == 0) {
            couplet = null;
            continue;
        }
        if (couplet == null) {
            couplet = { lines: [] };
            song.couplets.push(couplet);
        }
        var svLine = { text: "", chords: [] };
        couplet.lines.push(svLine);
        var partStartIdx = 0;
        var idx = 0;
        while ((idx = line.indexOf("(", partStartIdx)) >= 0) {
            var endIdx = line.indexOf(")", idx + 1);
            if (endIdx < 0) {
                break;
            }
            var chord = line.substring(idx + 1, endIdx);
            svLine.text += line.substring(partStartIdx, idx);
            svLine.chords.push({ name: chord, position: svLine.text.length });
            partStartIdx = endIdx + 1;
        }
        svLine.text += line.substring(partStartIdx);
    }
    return song;
}
function parseChordsViewMode(text) {
    return text == "Hidden" ? ChordsViewMode.Hidden : ChordsViewMode.Inlined;
}
var validNotes = {
    'A': true, 'B': true, 'C': true, 'D': true, 'E': true, 'F': true, 'G': true, 'H': true,
    'a': true, 'b': true, 'c': true, 'd': true, 'e': true, 'f': true, 'g': true, 'h': true
};
function isValidChordName(chord) {
    return chord && chord.length > 0 && chord.length <= 7 && validNotes[chord.charAt(0)];
}
function renderLineWithInlinedChords(line) {
    if (line.chords.length == 0) {
        return line.text;
    }
    var res = "";
    var idx = 0;
    for (var i = 0; i < line.chords.length; i++) {
        var chord = line.chords[i];
        res += line.text.substring(idx, chord.position);
        var validChord = isValidChordName(chord.name);
        var color = validChord ? "#2b6e44" : "blue";
        var title = validChord ? "" : "title='Неподдерживаемый тип аккорда: аккорд не будет транспонироваться.'";
        res += "<sup style='color:" + color + ";' " + title + ">" + chord.name + "</sup>";
        idx = chord.position;
    }
    res += line.text.substring(idx);
    return res;
}
var MAX_LINES_PER_COLUMN = 24;
function applyMultilineModeClass(song, $song) {
    var linesInSong = 0;
    for (var ic = 0; ic < song.couplets.length; ic++) {
        var couplet = song.couplets[ic];
        linesInSong += couplet.lines.length;
    }
    if (linesInSong > MAX_LINES_PER_COLUMN) {
        $song.addClass("song-text-2-cols");
    }
}
function renderSong(options) {
    var text = options.text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var chordsViewMode = parseChordsViewMode(options.chordsMode);
    var showChords = chordsViewMode == ChordsViewMode.Inlined;
    var song = parseSong(text);
    var buf = "";
    for (var ic = 0; ic < song.couplets.length; ic++) {
        var couplet = song.couplets[ic];
        for (var il = 0; il < couplet.lines.length; il++) {
            var line = couplet.lines[il];
            if (showChords) {
                buf += renderLineWithInlinedChords(line);
            }
            else {
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
function isValidZoom(zoom) {
    return zoom && zoom >= MIN_ZOOM && zoom <= MAX_ZOOM;
}
function applyStyles($song) {
    var s = JSON.parse(cookies_1["default"].get(SONG_VIEW_COOKIE));
    var zoom = isValidZoom(s.zoom) ? s.zoom : 100;
    $song.removeAttr("style");
    $song.attr("style", "font-size: " + zoom + "%;");
}
function zoom(command) {
    if (!command.delta && !isValidZoom(command.value)) {
        return;
    }
    var s = JSON.parse(cookies_1["default"].get(SONG_VIEW_COOKIE));
    var currentZoom = isValidZoom(s.zoom) ? s.zoom : 100;
    s.zoom = command.delta ? currentZoom + command.delta : command.value;
    if (!isValidZoom(s.zoom)) {
        return;
    }
    cookies_1["default"].set(SONG_VIEW_COOKIE, JSON.stringify(s));
    applyStyles($(".song-text"));
}
exports.__esModule = true;
exports["default"] = {
    renderSong: renderSong,
    zoom: zoom
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./cookies":1}],7:[function(require,module,exports){
(function (global){
"use strict";
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var cookies_1 = require("./cookies");
var TUNER_COOKIE = "tuner";
var Tuner = (function () {
    function Tuner(options) {
        var _this = this;
        this.buttons = [];
        this.stopped = false;
        this.$el = $(options.selector);
        this.$repeat = this.$el.find(".tuner-repeat-checkbox");
        this.$toneTypeSelector = this.$el.find(".tuner-tone-type-selector");
        this.readLastState();
        var toneType = this.$toneTypeSelector.val();
        this.tonesPath = options.tonesPath ? options.tonesPath : "/tones";
        var _loop_1 = function(toneIdx) {
            $b = this_1.$el.find(".tuner-button-s" + toneIdx);
            if ($b.length <= 0) {
                return "continue";
            }
            var b = { $el: $b, audio: document.createElement('audio'), toneIdx: toneIdx };
            b.audio.setAttribute("src", this_1.tonesPath + "/" + toneType + toneIdx + ".mp3");
            b.$el.click(function () {
                if (b.audio.paused) {
                    _this.play(b);
                }
                else {
                    _this.stop();
                }
            });
            this_1.registerAudio(b);
            this_1.buttons.push(b);
            Tuner.updateButtonUI(b);
            this_1.lastPlayed = this_1.lastPlayed ? this_1.lastPlayed : b;
        };
        var this_1 = this;
        var $b;
        for (var toneIdx = 1; toneIdx <= 6; toneIdx++) {
            var state_1 = _loop_1(toneIdx);
            if (state_1 === "continue") continue;
        }
        this.$toneTypeSelector.change(function () { return _this.updateActiveTone(); });
        this.$repeat.change(function () { return _this.saveState(); });
        $(document).keydown(function (e) {
            if (e.which >= 49 && e.which <= 54) {
                _this.$el.find(".tuner-button-s" + String.fromCharCode(e.which)).click();
            }
            else if (e.which == 37 || e.which == 90 || e.which == 122) {
                _this.playPrev();
            }
            else if (e.which == 39 || e.which == 88 || e.which == 120) {
                _this.playNext();
            }
            else if (e.which == 32 || e.which == 67 || e.which == 99) {
                _this.togglePlay();
            }
            else if (e.which == 86 || e.which == 118 || e.which == 48 || e.which == 45 || e.which == 96) {
                _this.$repeat.click();
            }
            else if (e.which == 38 || e.which == 40 || e.which == 66 || e.which == 98) {
                _this.nextTone();
            }
        });
    }
    Tuner.prototype.updateActiveTone = function () {
        var toneType = this.$toneTypeSelector.val();
        for (var i = 0; i < this.buttons.length; i++) {
            var b = this.buttons[i];
            b.audio.remove();
            b.audio = document.createElement('audio');
            b.audio.setAttribute("src", this.tonesPath + "/" + toneType + b.toneIdx + ".mp3");
            this.registerAudio(b);
        }
        this.saveState();
    };
    Tuner.prototype.registerAudio = function (b) {
        var self = this;
        b.audio.addEventListener("pause", function () {
            Tuner.updateButtonUI(b);
        });
        b.audio.addEventListener("playing", function () {
            Tuner.updateButtonUI(b);
        });
        b.audio.addEventListener("ended", function () {
            if (self.$repeat.is(":checked") && !self.stopped) {
                self.play(b);
                return;
            }
            Tuner.updateButtonUI(b);
        });
    };
    Tuner.prototype.stop = function () {
        this.stopped = true;
        this.pauseAll();
    };
    Tuner.prototype.pauseAll = function () {
        for (var i = 0; i < this.buttons.length; i++) {
            var b = this.buttons[i];
            b.audio.pause();
        }
    };
    Tuner.prototype.play = function (b) {
        this.pauseAll();
        b.audio.currentTime = 0;
        this.stopped = false;
        b.audio.play();
        this.lastPlayed = b;
    };
    Tuner.prototype.togglePlay = function () {
        if (this.lastPlayed.audio.paused) {
            this.play(this.lastPlayed);
        }
        else {
            this.stop();
        }
    };
    Tuner.prototype.playPrev = function () {
        var currentToneIdx = this.lastPlayed.toneIdx;
        var prev;
        for (var i = 0; i < this.buttons.length; i++) {
            var b = this.buttons[i];
            if (b.toneIdx < currentToneIdx) {
                if (!prev || b.toneIdx > prev.toneIdx) {
                    prev = b;
                }
            }
        }
        prev = prev ? prev : this.buttons[this.buttons.length - 1];
        this.play(prev);
    };
    Tuner.prototype.playNext = function () {
        var currentToneIdx = this.lastPlayed.toneIdx;
        var next;
        for (var i = 0; i < this.buttons.length; i++) {
            var b = this.buttons[i];
            if (b.toneIdx > currentToneIdx) {
                if (!next || b.toneIdx < next.toneIdx) {
                    next = b;
                }
            }
        }
        next = next ? next : this.buttons[0];
        this.play(next);
    };
    Tuner.prototype.nextTone = function () {
        var $selected = this.$toneTypeSelector.find("option:selected");
        var $next = $selected.next();
        if ($next.length == 0) {
            $next = this.$toneTypeSelector.find("option").first();
        }
        $selected.prop("selected", false);
        $next.prop("selected", true);
        this.updateActiveTone();
    };
    Tuner.updateButtonUI = function (b) {
        b.$el.removeClass(b.audio.paused ? "tuner-button-on" : "tuner-button-off");
        b.$el.addClass(b.audio.paused ? "tuner-button-off" : "tuner-button-on");
    };
    Tuner.prototype.saveState = function () {
        var state = {
            tone: this.$toneTypeSelector.val(),
            repeat: this.$repeat.prop("checked")
        };
        var cookieVal = JSON.stringify(state);
        cookies_1["default"].set(TUNER_COOKIE, cookieVal);
    };
    Tuner.prototype.readLastState = function () {
        var cookieVal = cookies_1["default"].get(TUNER_COOKIE);
        var state = JSON.parse(cookieVal);
        this.$repeat.prop("checked", state.repeat == true);
        this.$toneTypeSelector.val(state.tone ? state.tone : "c");
    };
    return Tuner;
}());
function init(options) {
    return new Tuner(options);
}
exports.__esModule = true;
exports["default"] = {
    init: init
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./cookies":1}],8:[function(require,module,exports){
"use strict";
var site_def_1 = require("./api/site-def");
require("./api/parsley-translations");
var site_utils_1 = require("./api/site-utils");
var song_view_1 = require("./api/song-view");
var tuner_1 = require("./api/tuner");
site_def_1["default"].Tuner = tuner_1["default"];
site_def_1["default"].Utils = site_utils_1["default"];
site_def_1["default"].SongView = song_view_1["default"];
window.$site = site_def_1["default"];

},{"./api/parsley-translations":3,"./api/site-def":4,"./api/site-utils":5,"./api/song-view":6,"./api/tuner":7}],9:[function(require,module,exports){

},{}]},{},[8,9]);
