import * as $ from "jquery";

/**
 * Tuner layout
 * - Buttons must have class: '.tuner-button-sN' where N is a string number: 1..6
 * - Repeat checkbox must have class '.tuner-repeat-checkbox'
 * - Selector with tone types: '.tuner-tone-type-selector'
 *
 * Tuner sets classes for buttons: tuner-button-off, tuner-button-on
 */

interface TunerOptions {
    selector: string
    tonesPath?: string
}

interface ToneButton {
    $el: JQuery,
    audio: HTMLAudioElement,
    toneIdx: number
}

class Tuner {
    private $el: JQuery;
    private $repeat: JQuery;
    private $toneTypeSelector: JQuery;
    private buttons: Array<ToneButton> = [];
    private lastPlayed: ToneButton;
    private tonesPath: string;

    private stopped = false;

    constructor(options: TunerOptions) {
        this.$el = $(options.selector);
        this.$repeat = this.$el.find(".tuner-repeat-checkbox");
        this.$toneTypeSelector = this.$el.find(".tuner-tone-type-selector");
        this.readLastState();

        let toneType = this.$toneTypeSelector.val();
        this.tonesPath = options.tonesPath ? options.tonesPath : "/tones";
        for (let toneIdx = 1; toneIdx <= 6; toneIdx++) {
            var $b = this.$el.find(".tuner-button-s" + toneIdx);
            if ($b.length <= 0) {
                continue;
            }
            let b: ToneButton = {$el: $b, audio: document.createElement('audio'), toneIdx: toneIdx};
            b.audio.setAttribute("src", this.tonesPath + "/" + toneType + toneIdx + ".mp3");
            b.$el.click(() => {
                if (b.audio.paused) {
                    this.play(b);
                } else {
                    this.stop();
                }
            });
            this.registerAudio(b);
            this.buttons.push(b);
            Tuner.updateButtonUI(b);

            this.lastPlayed = this.lastPlayed ? this.lastPlayed : b;
        }
        this.$toneTypeSelector.change(() => this.updateActiveTone());
        this.$repeat.change(()=> this.saveState());

        $(document).keypress((e: KeyboardEvent) => {
            if (e.which >= 49 && e.which <= 54) { // 1,2,3,4,5,6
                this.$el.find(".tuner-button-s" + String.fromCharCode(e.which)).click();
            } else if (e.which == 90 || e.which == 122) { // 'Z' or 'z'
                this.$repeat.click();
            } else if (e.which == 32 || e.which == 67 || e.which == 99) { // space or 'C' or 'c'
                this.togglePlay();
            } else if (e.which == 65 || e.which == 97) { // 'A' or 'a'
                this.playPrev();
            } else if (e.which == 83 || e.which == 115) { // 'S' or 's'
                this.playNext();
            } else if (e.which == 88 || e.which == 120) { // 'X' or 'x'
                this.nextTone();
            }
        });
    }

    private updateActiveTone() {
        let toneType = this.$toneTypeSelector.val();
        for (let i = 0; i < this.buttons.length; i++) {
            let b = this.buttons[i];
            b.audio.remove();
            b.audio = document.createElement('audio');
            b.audio.setAttribute("src", this.tonesPath + "/" + toneType + b.toneIdx + ".mp3");
            this.registerAudio(b);
        }
        this.saveState();
    }


    private registerAudio(b: ToneButton) {
        let self = this;
        b.audio.addEventListener("pause", () => {
            Tuner.updateButtonUI(b);
        });

        b.audio.addEventListener("playing", () => {
            Tuner.updateButtonUI(b);
        });

        b.audio.addEventListener("ended", () => {
            if (self.$repeat.is(":checked") && !self.stopped) {
                self.play(b);
                return;
            }
            Tuner.updateButtonUI(b);
        });
    }

    public stop() {
        this.stopped = true;
        this.pauseAll();
    }

    private pauseAll() {
        for (let i = 0; i < this.buttons.length; i++) {
            let b = this.buttons[i];
            b.audio.pause();
        }
    }

    public play(b: ToneButton) {
        this.pauseAll();
        b.audio.currentTime = 0;
        this.stopped = false;
        b.audio.play();
        this.lastPlayed = b;
    }

    public togglePlay() {
        if (this.lastPlayed.audio.paused) {
            this.play(this.lastPlayed)
        } else {
            this.stop();
        }
    }

    public playPrev() {
        let currentToneIdx = this.lastPlayed.toneIdx;
        let prev: ToneButton;
        for (var i = 0; i < this.buttons.length; i++) {
            let b = this.buttons[i];
            if (b.toneIdx < currentToneIdx) {
                if (!prev || b.toneIdx > prev.toneIdx) {
                    prev = b;
                }
            }
        }
        prev = prev ? prev : this.buttons[this.buttons.length - 1];
        this.play(prev)
    }

    public playNext() {
        let currentToneIdx = this.lastPlayed.toneIdx;
        let next: ToneButton;
        for (var i = 0; i < this.buttons.length; i++) {
            let b = this.buttons[i];
            if (b.toneIdx > currentToneIdx) {
                if (!next || b.toneIdx < next.toneIdx) {
                    next = b;
                }
            }
        }
        next = next ? next : this.buttons[0];
        this.play(next)
    }

    public nextTone() {
        var $selected = this.$toneTypeSelector.find("option:selected");
        let $next = $selected.next();
        if ($next.length == 0) {
            $next = this.$toneTypeSelector.find("option").first();
        }
        $selected.prop("selected", false);
        $next.prop("selected", true);
        this.updateActiveTone()
    }

    private static updateButtonUI(b: ToneButton) {
        b.$el.removeClass(b.audio.paused ? "tuner-button-on" : "tuner-button-off");
        b.$el.addClass(b.audio.paused ? "tuner-button-off" : "tuner-button-on");
    }

    private saveState() {
        let state = {
            tone: this.$toneTypeSelector.val(),
            repeat: this.$repeat.prop("checked")
        };
        var cookieVal = JSON.stringify(state);
        setCookie("tuner", cookieVal);
    }

    private readLastState() {
        let cookieVal = getCookie("tuner");
        let state = JSON.parse(cookieVal);
        this.$repeat.prop("checked", state.repeat == true);
        this.$toneTypeSelector.val(state.tone ? state.tone : "c");
    }
}

function setCookie(key: string, value: string) {
    document.cookie = key + '=' + value + ';expires=Fri, 31 Dec 9999 23:59:59 GMT';
}

function getCookie(key: string): string {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : "{}";
}

function init(options: TunerOptions) {
    return new Tuner(options);
}

export default {
    init: init
}