/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = $;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function set(key, value) {
    document.cookie = key + '=' + value + ';expires=Fri, 31 Dec 9999 23:59:59 GMT';
}
function get(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : "{}";
}
exports["default"] = {
    set: set,
    get: get
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var $ = __webpack_require__(0);
var Autolinker = __webpack_require__(11);
var links_1 = __webpack_require__(9);
var sidebar_1 = __webpack_require__(10);
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
function scrollToBlock(selector) {
    var $block = $(selector);
    var offset = $block.offset();
    $("html, body").animate({
        scrollTop: offset.top
    });
}
function playChord(chordName) {
    var mediaName = encodeURIComponent(chordName.replace("H", "B"));
    var url = "https://pesennik.online/static/chords/" + mediaName + ".m4a";
    new Audio(url).play();
}
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
    removeServerSideParsleyError: removeServerSideParsleyError,
    scrollToRandomSong: scrollToRandomSong,
    scrollToBlock: scrollToBlock,
    playYoutube: links_1["default"].playYoutube,
    initSidebar: sidebar_1["default"].initSidebar,
    playChord: playChord
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var $ = __webpack_require__(0);
var chords_lib_1 = __webpack_require__(7);
var chords_1 = __webpack_require__(8);
var cookies_1 = __webpack_require__(1);
var SONG_VIEW_COOKIE = "song-view";
var MIN_ZOOM = 50;
var MAX_ZOOM = 200;
function parseSong(text) {
    var song = { couplets: [], chords: [] };
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
            if (song.chords.indexOf(chord) < 0) {
                song.chords.push(chord);
            }
        }
        svLine.text += line.substring(partStartIdx);
    }
    return song;
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
    try {
        var $song = $(options.songViewSelector);
        var text = options.text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var song = parseSong(text);
        var buf = "";
        for (var ic = 0; ic < song.couplets.length; ic++) {
            var couplet = song.couplets[ic];
            for (var il = 0; il < couplet.lines.length; il++) {
                var line = couplet.lines[il];
                buf += renderLineWithInlinedChords(line);
                buf += "\n";
            }
            buf += "\n";
        }
        $song.html(buf);
        applyMultilineModeClass(song, $song);
        applyStyles($song);
        if (options.chordsViewSelector) {
            var $chordsView_1 = $(options.chordsViewSelector);
            $chordsView_1.empty();
            song.chords.forEach(function (chordName) {
                var accord = chords_lib_1["default"].getChord(chordName);
                if (accord != null) {
                    var fingers = accord.fingers.length > 0 ? " fingers=\"" + accord.fingers + "\"" : "";
                    var playJs = "$site.Utils.playChord('" + chordName + "')";
                    var style = "cursor:pointer";
                    var title = chordName + " - \u043F\u0440\u043E\u0438\u0433\u0440\u0430\u0442\u044C";
                    $("<chord name=\"" + accord.name + "\" positions=\"" + accord.positions + "\" " + fingers + " size=\"2\" onclick=\"" + playJs + "\" style=\"" + style + "\" title=\"" + title + "\"/>")
                        .appendTo($chordsView_1);
                }
            });
            chords_1["default"].renderChords($chordsView_1.get(0));
        }
    }
    catch (err) {
        console.log(err);
    }
}
function isValidZoom(zoom) {
    return zoom && zoom >= MIN_ZOOM && zoom <= MAX_ZOOM;
}
function applyStyles($song) {
    var s = JSON.parse(cookies_1["default"].get(SONG_VIEW_COOKIE));
    var zoom = isValidZoom(s.zoom) ? s.zoom : 100;
    $song.removeAttr("style");
    $song.attr("style", "font-size: " + zoom + "%;");
    $song.removeClass("song-text-loading");
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
exports["default"] = {
    renderSong: renderSong,
    zoom: zoom
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var $ = __webpack_require__(0);
var cookies_1 = __webpack_require__(1);
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
        var _loop_1 = function (toneIdx) {
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
        var this_1 = this, $b;
        for (var toneIdx = 1; toneIdx <= 6; toneIdx++) {
            _loop_1(toneIdx);
        }
        this.$toneTypeSelector.change(function () { return _this.updateActiveTone(); });
        this.$repeat.change(function () { return _this.saveState(); });
        $(document).keydown(function (e) {
            if (!_this.$el.is(":visible")) {
                return;
            }
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
            if (self.$repeat.is(":checked") && !self.stopped && self.$el.is(":visible")) {
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
exports["default"] = {
    init: init
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
//noinspection SpellCheckingInspection
var CHORDS = {
    ///////////// Triads /////////////
    // Major
    "A": "x02220&f=--123-",
    "A#": "x13331&f=112341",
    "B": "x24442&f=112341",
    "C": "x32010&f=-32-1-",
    "C#": "x43121&f=112341",
    "D": "xx0232&f=---132",
    "D#": "xx1343",
    "E": "022100&f=-231--",
    "F": "133211&f=134211",
    "F#": "244322&f=134211",
    "G": "320003&f=12--34",
    "G#": "466544&f=134211",
    // Minor
    "Am": "x02210&f=--231-",
    "A#m": "x13321&f=113421",
    "Bm": "x24432&f=113421",
    "Cm": "x35543&f=113421",
    "C#m": "x46654&f=113421",
    "Dm": "xx0231&f=---231",
    "D#m": "x68876",
    "Em": "022000&f=-23---",
    "Fm": "133111&f=134111",
    "F#m": "244222&f=134111",
    "Gm": "355333&f=134111",
    "G#m": "466444&f=134111",
    // Diminished
    "Adim": "x0121x",
    "A#dim": "x12320",
    "Bdim": "x2343x",
    "Cdim": "x3454x",
    "C#dim": "x4565x",
    "Ddim": "xx0131",
    "D#dim": "xx1242",
    "Edim": "0120xx",
    "Fdim": "12310x",
    "F#dim": "2342xx",
    "Gdim": "3453xx",
    "G#dim": "4564xx",
    // Augmented
    "A+": "x02220",
    "A#+": "x13331",
    "B+": "x24442",
    "C+": "x32010",
    "C#+": "x43121",
    "D+": "xx0232",
    "D#+": "xx1343",
    "E+": "022100",
    "F+": "133211",
    "F#+": "244322",
    "G+": "320003",
    "G#+": "466544",
    // Suspended 2nd
    "Asus2": "x02200",
    "A#sus2": "x13311",
    "Bsus2": "x24422",
    "Csus2": "x30033",
    "C#sus2": "x46644",
    "Dsus2": "xx0230",
    "D#sus2": "xx1341",
    "Esus2": "xx2452",
    "Fsus2": "xx3011",
    "F#sus2": "xx4122",
    "Gsus2": "300033",
    "G#sus2": "411144",
    // Major Flat 5th
    "Asus4": "x00230",
    "A#sus4": "x11341",
    "Bsus4": "x22452",
    "Csus4": "x33011",
    "C#sus4": "x44122",
    "Dsus4": "xx0233",
    "D#sus4": "xx1344",
    "Esus4": "002200",
    "Fsus4": "113311",
    "F#sus4": "224422",
    "Gsus4": "330033",
    "G#sus4": "446644",
    ///////////// Seventh Chords /////////////
    // 7th
    "A7": "x02020",
    "A#7": "x13131",
    "B7": "x21202",
    "C7": "x32310",
    "C#7": "x46464",
    "D7": "xx0212",
    "D#7": "xx1023",
    "E7": "020100",
    "F7": "131211",
    "F#7": "242322",
    "G7": "320001",
    "G#7": "464544",
    // Major 7th
    "AM7": "x02120",
    "A#M7": "x13231",
    "BM7": "x24342",
    "CM7": "x32000",
    "C#M7": "x43111",
    "DM7": "xx0222",
    "D#M7": "xx1333",
    "EM7": "021100",
    "FM7": "132211",
    "F#M7": "243322",
    "GM7": "354433",
    "G#M7": "465544",
    // Minor 7th
    "Am7": "x02010",
    "A#m7": "x13121",
    "Bm7": "x20202",
    "Cm7": "x35343",
    "C#m7": "x46454",
    "Dm7": "xx0211",
    "D#m7": "xx1322",
    "Em7": "020000",
    "Fm7": "131111",
    "F#m7": "202220",
    "Gm7": "353333",
    "G#m7": "xxx102",
    // Diminished 7th
    "Adim7": "x01212",
    "A#dim7": "x12020",
    "Bdim7": "x20101",
    "Cdim7": "x34242",
    "C#dim7": "x45353",
    "Ddim7": "xx0101",
    "D#dim7": "xx1212",
    "Edim7": "012020",
    "Fdim7": "123131",
    "F#dim7": "201212",
    "Gdim7": "312020",
    "G#dim7": "456464",
    // Augmented 7th
    "A+7": "x02020",
    "A#+7": "x13131",
    "B+7": "x21202",
    "C+7": "x32310",
    "C#+7": "x46464",
    "D+7": "xx0212",
    "D#+7": "xx1023",
    "E+7": "020100",
    "F+7": "131211",
    "F#+7": "242322",
    "G+7": "320001",
    "G#+7": "464544",
    ///////////// Sixth Chords  /////////////
    // 6th
    "A6": "x02222",
    "A#6": "x13333",
    "B6": "x24444",
    "C6": "x35555",
    "C#6": "x46666",
    "D6": "xx0202",
    "D#6": "xx1013",
    "E6": "022120",
    "F6": "100211",
    "F#6": "21132x",
    "G6": "320000",
    "G#6": "431111",
    // Minor 6th
    "Am6": "x02212",
    "A#m6": "x13021",
    "Bm6": "x20102",
    "Cm6": "x31213",
    "C#m6": "x42324",
    "Dm6": "xx0201",
    "D#m6": "xx1312",
    "Em6": "022020",
    "Fm6": "133131",
    "F#m6": "20122x",
    "Gm6": "310030",
    "G#m6": "xxx101",
    ///////////// 5th /////////////
    "A5": "x022xx&f=--11--",
    "A#5": "x133xx&f=--11--",
    "B5": "x244xx&f=-134--",
    "C5": "x355xx&f=-134--",
    "C#5": "x466xx",
    "D5": "xx023x",
    "D#5": "xx134x",
    "E5": "022xxx&f=-11---",
    "F5": "133xxx&f=134---",
    "F#5": "244xxx",
    "G5": "xxx033",
    "G#5": "xxx144"
};
function getChord(name) {
    if (!name || name.length == 0) {
        return null;
    }
    var note = name.charAt(0).toUpperCase();
    if (note == 'H') {
        note = 'B';
    }
    var key = note + name.substr(1);
    var res = CHORDS[key];
    if (!res) {
        return null;
    }
    var tokens = res.split("&");
    return {
        name: name,
        positions: tokens[0],
        fingers: tokens.length > 1 && tokens[1] ? tokens[1] : ""
    };
}
exports["default"] = {
    getChord: getChord
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Based On "Chord Image Generator" http://einaregilsson.com/2009/07/23/chord-image-generator/
 */

exports.__esModule = true;
var NO_FINGER = '-';
var OPEN = 0;
var MUTED = -1;
var FRET_COUNT = 5;
var FONT_NAME = "Arial";
var FOREGROUND_BRUSH = '#000';
var BACKGROUND_BRUSH = '#FFF';
var PenStyle = (function () {
    function PenStyle(color, size) {
        this.color = color;
        this.size = size;
    }
    PenStyle.prototype.apply = function (ctx) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size;
        ctx.lineCap = 'round';
    };
    return PenStyle;
}());
var FontStyle = (function () {
    function FontStyle(fontName, size) {
        this.fontName = fontName;
        this.size = size;
    }
    FontStyle.prototype.apply = function (ctx) {
        ctx.font = this.size + "px " + this.fontName;
        ctx.textBaseline = "top";
    };
    return FontStyle;
}());
var Painter = (function () {
    function Painter(ctx) {
        this.ctx = ctx;
    }
    Painter.prototype.drawLine = function (style, x1, y1, x2, y2) {
        this.ctx.beginPath();
        style.apply(this.ctx);
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    };
    Painter.prototype.fillRectangle = function (color, x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.rect(x1, y1, x2, y2);
        this.ctx.fill();
    };
    Painter.prototype.drawCircle = function (style, x1, y1, diameter) {
        var radius = diameter / 2;
        this.ctx.beginPath();
        style.apply(this.ctx);
        this.ctx.arc(x1 + radius, y1 + radius, radius, 0, 2 * Math.PI, false);
        this.ctx.stroke();
    };
    Painter.prototype.fillCircle = function (color, x1, y1, diameter) {
        var radius = diameter / 2;
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(x1 + radius, y1 + radius, radius, 0, 2 * Math.PI, false);
        this.ctx.fill();
    };
    Painter.prototype.measureString = function (text, style) {
        style.apply(this.ctx);
        return this.ctx.measureText(text);
    };
    Painter.prototype.drawString = function (text, style, color, x, y) {
        style.apply(this.ctx);
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);
    };
    return Painter;
}());
var Chord = (function () {
    function Chord(name, chord, fingers, size) {
        this.chordPositions = [];
        this.fingers = [NO_FINGER, NO_FINGER, NO_FINGER, NO_FINGER, NO_FINGER, NO_FINGER];
        // parse chord name
        if (name == null || typeof name == 'undefined') {
            this.chordName = "";
        }
        else {
            this.chordName = name.replace(" ", "");
        }
        this.parseChord(chord);
        // parse fingers
        var f = String(fingers).toUpperCase() + '------';
        f = f.replace(/[^\-T1234]/g, '');
        this.fingers = f.substr(0, 6).split('');
        // set up sizes
        this.size = parseFloat(size);
        if (isNaN(this.size)) {
            this.size = 1;
        }
        this.fretWidth = 4 * this.size;
        this.nutHeight = this.fretWidth / 2;
        this.lineWidth = Math.ceil(this.size * 0.31);
        this.dotWidth = Math.ceil(0.9 * this.fretWidth);
        this.markerWidth = 0.7 * this.fretWidth;
        this.boxWidth = 5 * this.fretWidth + 6 * this.lineWidth;
        this.boxHeight = FRET_COUNT * (this.fretWidth + this.lineWidth) + this.lineWidth;
        var percent = 0.8;
        this.fretFontSize = this.fretWidth / percent;
        this.fingerFontSize = this.fretWidth * 0.8;
        this.nameFontSize = this.fretWidth * 2 / percent;
        this.superScriptFontSize = 0.7 * this.nameFontSize;
        if (this.size == 1) {
            this.nameFontSize += 2;
            this.fingerFontSize += 2;
            this.fretFontSize += 2;
            this.superScriptFontSize += 2;
        }
        this.xStart = this.fretWidth;
        this.yStart = Math.round(0.2 * this.superScriptFontSize + this.nameFontSize + this.nutHeight + 1.7 * this.markerWidth);
        this.imageWidth = this.boxWidth + 2 * this.fretWidth; // +2 fret width for borders
        this.imageHeight = this.boxHeight + this.yStart;
        this.signWidth = this.fretWidth * 0.75;
        this.signRadius = this.signWidth / 2;
    }
    Chord.prototype.parseChord = function (chord) {
        if (chord == null || typeof chord == 'undefined' || !chord.match(/[\dxX]{6}|((1|2)?[\dxX]-){5}(1|2)?[\dxX]/)) {
            this.error = true;
            return;
        }
        var parts;
        if (chord.length > 6) {
            parts = chord.split('-');
        }
        else {
            parts = chord.split('');
        }
        var maxFret = 0;
        var minFret = Number.MAX_VALUE;
        for (var i = 0; i < 6; i++) {
            if (parts[i].toUpperCase() == "X") {
                this.chordPositions[i] = MUTED;
            }
            else {
                this.chordPositions[i] = parseInt(parts[i]);
                maxFret = Math.max(maxFret, this.chordPositions[i]);
                if (this.chordPositions[i] != 0) {
                    minFret = Math.min(minFret, this.chordPositions[i]);
                }
            }
        }
        if (maxFret <= 5) {
            this.baseFret = 1;
        }
        else {
            this.baseFret = minFret;
        }
    };
    Chord.prototype.draw = function (ctx) {
        this.graphics = new Painter(ctx);
        this.graphics.fillRectangle(BACKGROUND_BRUSH, 0, 0, this.imageWidth, this.imageHeight);
        if (this.error) {
            //Draw red x
            var errorPen = new PenStyle("red", 3);
            this.graphics.drawLine(errorPen, 0, 0, this.imageWidth, this.imageHeight);
            this.graphics.drawLine(errorPen, 0, this.imageHeight, this.imageWidth, 0);
        }
        else {
            this.drawChordBox();
            this.drawChordPositions();
            this.drawChordName();
            //TODO: make optional: this.drawFingers();
            this.drawBars();
        }
    };
    Chord.prototype.drawChordBox = function () {
        var pen = new PenStyle(FOREGROUND_BRUSH, this.lineWidth);
        var totalFretWidth = this.fretWidth + this.lineWidth;
        for (var i = 0; i <= FRET_COUNT; i++) {
            var y = this.yStart + i * totalFretWidth;
            this.graphics.drawLine(pen, this.xStart, y, this.xStart + this.boxWidth - this.lineWidth, y);
        }
        for (var i = 0; i < 6; i++) {
            var x = this.xStart + (i * totalFretWidth);
            this.graphics.drawLine(pen, x, this.yStart, x, this.yStart + this.boxHeight - this.lineWidth);
        }
        if (this.baseFret == 1) {
            //Need to draw the nut
            var nutHeight = this.fretWidth / 2;
            this.graphics.fillRectangle(FOREGROUND_BRUSH, this.xStart - this.lineWidth / 2, this.yStart - nutHeight, this.boxWidth, nutHeight);
        }
    };
    Chord.prototype.drawBars = function () {
        var bars = {};
        for (var i = 0; i < 5; i++) {
            if (this.chordPositions[i] != MUTED && this.chordPositions[i] != OPEN && this.fingers[i] != NO_FINGER && !bars.hasOwnProperty(this.fingers[i])) {
                var bar = { 'Str': i, 'Pos': this.chordPositions[i], 'Length': 0, 'Finger': this.fingers[i] };
                for (var j = i + 1; j < 6; j++) {
                    if (this.fingers[j] == bar['Finger'] && this.chordPositions[j] == this.chordPositions[i]) {
                        bar['Length'] = j - i;
                    }
                }
                if (bar['Length'] > 0) {
                    bars[bar['Finger']] = bar;
                }
            }
        }
        var totalFretWidth = this.fretWidth + this.lineWidth;
        for (var b in bars) {
            if (bars.hasOwnProperty(b)) {
                var bar = bars[b];
                var xStart = this.xStart + bar['Str'] * totalFretWidth;
                var xEnd = xStart + bar['Length'] * totalFretWidth;
                var y = this.yStart + (bar['Pos'] - this.baseFret + 1) * totalFretWidth - (totalFretWidth / 2);
                var pen = new PenStyle(FOREGROUND_BRUSH, this.dotWidth / 2);
                this.graphics.drawLine(pen, xStart, y, xEnd, y);
            }
        }
    };
    Chord.prototype.drawChordPositions = function () {
        var yOffset = this.yStart - this.fretWidth;
        var totalFretWidth = this.fretWidth + this.lineWidth;
        for (var i = 0; i < this.chordPositions.length; i++) {
            var absolutePos = this.chordPositions[i];
            var relativePos = absolutePos - this.baseFret + 1;
            var xPos = this.xStart - (0.5 * this.fretWidth) + (0.5 * this.lineWidth) + (i * totalFretWidth);
            if (relativePos > 0) {
                var yPos = relativePos * totalFretWidth + yOffset;
                this.graphics.fillCircle(FOREGROUND_BRUSH, xPos, yPos, this.dotWidth);
            }
            else if (absolutePos == OPEN) {
                var pen = new PenStyle(FOREGROUND_BRUSH, this.lineWidth);
                var yPos = this.yStart - this.fretWidth;
                var markerXPos = xPos + ((this.dotWidth - this.markerWidth) / 2);
                if (this.baseFret == 1) {
                    yPos -= this.nutHeight;
                }
                this.graphics.drawCircle(pen, markerXPos, yPos, this.markerWidth);
            }
            else if (absolutePos == MUTED) {
                var pen = new PenStyle(FOREGROUND_BRUSH, this.lineWidth * 1.5);
                var yPos = this.yStart - this.fretWidth;
                var markerXPos = xPos + ((this.dotWidth - this.markerWidth) / 2);
                if (this.baseFret == 1) {
                    yPos -= this.nutHeight;
                }
                this.graphics.drawLine(pen, markerXPos, yPos, markerXPos + this.markerWidth, yPos + this.markerWidth);
                this.graphics.drawLine(pen, markerXPos, yPos + this.markerWidth, markerXPos + this.markerWidth, yPos);
            }
        }
    };
    //noinspection JSUnusedLocalSymbols
    Chord.prototype.drawFingers = function () {
        var xPos = this.xStart + (0.5 * this.lineWidth);
        var yPos = this.yStart + this.boxHeight;
        var fontStyle = new FontStyle(FONT_NAME, this.fingerFontSize);
        for (var f = 0; f < this.fingers.length; f++) {
            var finger = this.fingers[f];
            if (finger != NO_FINGER) {
                var charSize = this.graphics.measureString(finger.toString(), fontStyle);
                this.graphics.drawString(finger.toString(), fontStyle, FOREGROUND_BRUSH, xPos - (0.5 * charSize.width), yPos);
            }
            xPos += (this.fretWidth + this.lineWidth);
        }
    };
    Chord.prototype.drawChordName = function () {
        var nameFontStyle = new FontStyle(FONT_NAME, this.nameFontSize);
        var superFontStyle = new FontStyle(FONT_NAME, this.superScriptFontSize);
        var name;
        var supers;
        if (this.chordName.indexOf('_') == -1) {
            name = this.chordName;
            supers = "";
        }
        else {
            var parts = this.chordName.split('_');
            name = parts[0];
            supers = parts[1];
        }
        var stringSize = this.graphics.measureString(name, nameFontStyle);
        var xTextStart = this.xStart;
        if (stringSize.width < this.boxWidth) {
            xTextStart = this.xStart + ((this.boxWidth - stringSize.width) / 2);
        }
        this.graphics.drawString(name, nameFontStyle, FOREGROUND_BRUSH, xTextStart, 0.2 * this.superScriptFontSize);
        if (supers != "") {
            this.graphics.drawString(supers, superFontStyle, FOREGROUND_BRUSH, xTextStart + 0.8 * stringSize.width, 0);
        }
        if (this.baseFret > 1) {
            var fretFontStyle = new FontStyle(FONT_NAME, this.fretFontSize);
            var offset = (this.fretFontSize - this.fretWidth) / 2;
            this.graphics.drawString(this.baseFret + "fr", fretFontStyle, FOREGROUND_BRUSH, this.xStart + this.boxWidth + 0.4 * this.fretWidth, this.yStart - offset);
        }
    };
    return Chord;
}());
function copyAttributes(from, to, attrNames) {
    attrNames.forEach(function (attr) { return from.getAttribute(attr) != null && to.setAttribute(attr, from.getAttribute(attr)); });
}
//example: <chord name="A" positions="X02220" fingers="--222-" size="7" ></chord>
function renderChords(root) {
    var chords = root.getElementsByTagName("chord");
    for (var i = 0; i < chords.length; ++i) {
        var e = chords[i];
        var name_1 = e.getAttribute("name");
        var positions = e.getAttribute("positions");
        var fingers = e.getAttribute("fingers");
        var size = e.getAttribute("size");
        var chord = new Chord(name_1, positions, fingers, size);
        var canvas = document.createElement("canvas");
        canvas.setAttribute("width", "" + chord.imageWidth);
        canvas.setAttribute("height", "" + chord.imageHeight);
        copyAttributes(e, canvas, ["style", "onclick", "title"]);
        e.parentNode.insertBefore(canvas, e);
        chord.draw(canvas.getContext("2d"));
    }
}
exports["default"] = {
    renderChords: renderChords
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var KnownImageExtensions = {};
KnownImageExtensions["png"] = true;
KnownImageExtensions["jpg"] = true;
KnownImageExtensions["gif"] = true;
var KnownAudioExtensions = {};
KnownAudioExtensions["mp3"] = true;
KnownAudioExtensions["wav"] = true;
KnownAudioExtensions["ogg"] = true;
function playYoutube(el) {
    // Pause any currently playing video first
    var frames = window.document.getElementsByTagName("iframe");
    for (var i = 0; i < frames.length; i++) {
        frames.item(i).contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    }
    // Create an iFrame with autoplay set to true
    var iframeUrl = "https://www.youtube.com/embed/" + el.id + "?autoplay=1&autohide=1&enablejsapi=1&&version=3";
    if ($(el).data('params')) {
        iframeUrl += '&' + $(this).data('params');
    }
    // The height and width of the iFrame should be the same as parent
    var iframe = $('<iframe/>', { 'frameborder': '0', 'src': iframeUrl, 'width': $(el).width(), 'height': $(el).height() });
    iframe.attr("allowfullscreen", "allowfullscreen");
    iframe.attr("allowscriptaccess", "always");
    // Replace the YouTube thumbnail with YouTube HTML5 Player
    $(el).parent().css("paddingTop", 0);
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
    return "<div class=\"youtube-aspect-ratio\"><div id='" + videoId + "' class='youtube' style='" + style + "' onclick='$site.Utils.playYoutube(this);'><div class='play'></div></div></div>";
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
exports["default"] = {
    processMediaLinks: processMediaLinks,
    playYoutube: playYoutube
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var forceShowMenu = false;
function adjustSidebarToWindowSize() {
    var $sidebar = $("#sidebar");
    var $sidebarToggle = $("#sidebar-toggle");
    var $images = $sidebar.find("img");
    var $spacers = $sidebar.find(".sidebar-spacer");
    var $menuText = $sidebar.find(".sidebar-menu-text");
    var $contentBlock = $("#content-block");
    if (window.innerWidth < 800 && !forceShowMenu) {
        $sidebar.fadeOut(700);
        $sidebarToggle.fadeIn();
        $contentBlock.css("padding-left", 0);
        return;
    }
    $sidebar.fadeIn();
    $sidebarToggle.fadeOut();
    $contentBlock.css("padding-left", $sidebar.css("width"));
    var $bottomBlock = $sidebar.find(".sidebar-bottom-block");
    $bottomBlock.removeClass("sidebar-bottom");
    function imagesAreBig() {
        return $images.height() >= 50;
    }
    function getSidebarFreeSpace() {
        var $el = $sidebar.find(".sidebar-nav div").last();
        var lastElementBottom = $el.offset().top + $el.height();
        return $sidebar.offset().top + $sidebar.height() - lastElementBottom;
    }
    // First: show until fit
    if (!imagesAreBig() && getSidebarFreeSpace() >= $images.length * 20) {
        $images.height(50);
        $images.width(50);
        $sidebar.css("width", 80);
        $contentBlock.css("padding-left", 80);
    }
    if (!$menuText.is(":visible") && imagesAreBig() && getSidebarFreeSpace() >= 20 * $sidebar.find("a").length) {
        $menuText.show();
        $sidebar.find("a").css("margin-bottom", "5");
    }
    if (!$spacers.is(":visible") && $menuText.is(":visible") && getSidebarFreeSpace() >= 50 * $spacers.length) {
        $spacers.show();
    }
    if (getSidebarFreeSpace() > 0) {
        $bottomBlock.addClass("sidebar-bottom");
    }
    // Next: hide until does not fit
    if ($spacers.is(":visible") && getSidebarFreeSpace() < 0) {
        $spacers.hide();
    }
    if ($menuText.is(":visible") && getSidebarFreeSpace() < 0) {
        $sidebar.find("a").css("margin-bottom", "0");
        $menuText.hide();
    }
    if (getSidebarFreeSpace() < 0) {
        $bottomBlock.removeClass("sidebar-bottom");
    }
    if (imagesAreBig() && getSidebarFreeSpace() < 0) {
        $images.height(30);
        $images.width(30);
        $sidebar.css("width", 50);
        $contentBlock.css("padding-left", 50);
    }
}
function initSidebar() {
    $(document).ready(adjustSidebarToWindowSize);
    $(window).resize(adjustSidebarToWindowSize);
    $("#sidebar-toggle").click(function (e) {
        forceShowMenu = true;
        adjustSidebarToWindowSize();
        e.originalEvent["forceShowMenuClick"] = true;
    });
    function handleTouchAndClick(e) {
        if (forceShowMenu && !e["forceShowMenuClick"]) {
            forceShowMenu = false;
            adjustSidebarToWindowSize();
        }
    }
    document.body.addEventListener("click", handleTouchAndClick);
    document.body.addEventListener("touchmove", handleTouchAndClick);
}
exports["default"] = {
    initSidebar: initSidebar
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = window.Autolinker;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var site_def_1 = __webpack_require__(3);
__webpack_require__(2);
var site_utils_1 = __webpack_require__(4);
var song_view_1 = __webpack_require__(5);
var tuner_1 = __webpack_require__(6);
site_def_1["default"].Tuner = tuner_1["default"];
site_def_1["default"].Utils = site_utils_1["default"];
site_def_1["default"].SongView = song_view_1["default"];
window.$site = site_def_1["default"];


/***/ })
/******/ ]);