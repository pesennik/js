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
    $el: JQuery;
    $repeat: JQuery;
    $toneTypeSelector: JQuery;
    buttons: Array<ToneButton> = [];

    private stopped = false;

    constructor(options: TunerOptions) {
        this.$el = $(options.selector);
        this.$repeat = this.$el.find(".tuner-repeat-checkbox");
        this.$toneTypeSelector = this.$el.find(".tuner-tone-type-selector");
        this.readLastState();

        let toneType = this.$toneTypeSelector.val();
        let tonesPath = options.tonesPath ? options.tonesPath : "/tones";
        for (let toneIdx = 1; toneIdx <= 6; toneIdx++) {
            var $b = this.$el.find(".tuner-button-s" + toneIdx);
            if ($b.length <= 0) {
                continue;
            }
            let b: ToneButton = {$el: $b, audio: document.createElement('audio'), toneIdx: toneIdx};
            b.audio.setAttribute("src", tonesPath + "/" + toneType + toneIdx + ".mp3");
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
        }
        this.$toneTypeSelector.change(()=> {
            let toneType = this.$toneTypeSelector.val();
            for (let i = 0; i < this.buttons.length; i++) {
                let b = this.buttons[i];
                b.audio.remove();
                b.audio = document.createElement('audio');
                b.audio.setAttribute("src", tonesPath + "/" + toneType + b.toneIdx + ".mp3");
                this.registerAudio(b);
            }
            this.saveState();
        });

        this.$repeat.change(()=> {
            this.saveState();
        });

        $(document).keypress((e: KeyboardEvent) => {
            if (e.which >= 49 && e.which <= 54) { // 1,2,3,4,5,6
                this.$el.find(".tuner-button-s" + String.fromCharCode(e.which)).click();
            } else if (e.which == 90 || e.which == 122) { // 'Z' or 'z'
                this.$repeat.click();
            }
        });
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