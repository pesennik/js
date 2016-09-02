import * as $ from "jquery";
import Cookies from "./cookies";

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

const TUNER_COOKIE = "tuner";

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

        $(document).keydown((e: KeyboardEvent) => {
            if (!this.$el.is(":visible")) { // tuner is not visible, do not process keyboard events
                return;
            }
            if (e.which >= 49 && e.which <= 54) { // 1,2,3,4,5,6
                this.$el.find(".tuner-button-s" + String.fromCharCode(e.which)).click();
            } else if (e.which == 37 || e.which == 90 || e.which == 122) { // left arrow or Z
                this.playPrev();
            } else if (e.which == 39 || e.which == 88 || e.which == 120) { // right arrow or X
                this.playNext();
            } else if (e.which == 32 || e.which == 67 || e.which == 99) { // space or C
                this.togglePlay();
            } else if (e.which == 86 || e.which == 118 || e.which == 48 || e.which == 45 || e.which == 96) { // V or 0 (3 forms)
                this.$repeat.click();
            } else if (e.which == 38 || e.which == 40 || e.which == 66 || e.which == 98) { // up/down or B
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
            if (self.$repeat.is(":checked") && !self.stopped && self.$el.is(":visible")) {
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
        Cookies.set(TUNER_COOKIE, cookieVal);
    }

    private readLastState() {
        let cookieVal = Cookies.get(TUNER_COOKIE);
        let state = JSON.parse(cookieVal);
        this.$repeat.prop("checked", state.repeat == true);
        this.$toneTypeSelector.val(state.tone ? state.tone : "c");
    }
}

function init(options: TunerOptions) {
    return new Tuner(options);
}

export default {
    init: init
}