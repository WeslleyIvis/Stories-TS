import Timeout from "./Timout.js";
export default class Slide {
    container: Element;
    slides: Element[];
    controls: Element;
    timer: number;
    index: number;
    slide: Element;
    timeout: Timeout | null;
    pauseTimeout: Timeout | null;
    paused: boolean;
    constructor(container: Element, slides: Element[], controls: Element, timer: number = 5000) {
        this.container = container;
        this.slides = slides;
        this.controls = controls;
        this.timer = timer;
        this.timeout = null;
        this.pauseTimeout = null;
        this.index = 0;
        this.slide = this.slides[this.index];
        this.paused = false;
        this.init();        
    }

    hide(el: Element) {
        el.classList.remove('active');
    }

    show(index: number) {
        this.index = index;
        this.slide = this.slides[this.index]
        this.slides.forEach(element => this.hide(element));
        this.slide.classList.add('active');
        this.auto(this.timer)
    }

    auto(time: number) {
        this.timeout?.clear();
        this.timeout = new Timeout(() => this.next(), time);
    }

    next() {
        if (this.paused) return;
        const next = this.index + 1 < this.slides.length ? this.index + 1 : 0;
        this.show(next)
    }

    prev() {
        if (this.paused) return;
        const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1;
        this.show(prev)
    }

    pause() {
        this.pauseTimeout = new Timeout(() => {
            this.timeout?.pause();
            this.paused = true;
        }, 300)
    }

    continue() {
        
        this.pauseTimeout?.clear();
        if (this.paused) {
            this.paused = false;
            this.timeout?.continue();
        }
    }

    private addControls() {
        const prevButton = document.createElement("button");
        const nextButton = document.createElement("button");
        prevButton.innerText = "Slide Anterior"
        nextButton.innerText = "Próximo Slide"
        this.controls.appendChild(prevButton);
        this.controls.appendChild(nextButton);

        this.controls.addEventListener("pointerdown", () => this.pause());
        this.controls.addEventListener("pointerup", () => this.continue())

        prevButton.addEventListener("pointerup", () => this.prev());
        nextButton.addEventListener("pointerup", () => this.next());
    }

    private init() {
        this.addControls();
        this.show(this.index);
    }
}