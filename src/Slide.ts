import Timeout from "./Timout.js";
export default class Slide {
    container: Element;
    slides: Element[];
    controls: Element;
    timer: number;
    index: number;
    slide: Element;
    timeout: Timeout | null;
    constructor(container: Element, slides: Element[], controls: Element, timer: number = 5000) {
        this.container = container;
        this.slides = slides;
        this.controls = controls;
        this.timer = timer;
        this.timeout = null;
        this.index = 0;
        this.slide = this.slides[this.index];

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
        const next = this.index + 1 < this.slides.length ? this.index + 1 : 0;
        this.show(next)
    }

    prev() {
        const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1;
        this.show(prev)
    }


    private addControls() {
        const prevButton = document.createElement("button");
        const nextButton = document.createElement("button");
        prevButton.innerText = "Slide Anterior"
        nextButton.innerText = "Próximo Slide"

        this.controls.appendChild(prevButton);
        this.controls.appendChild(nextButton);

        prevButton.addEventListener("pointerup", () => this.prev());
        nextButton.addEventListener("pointerup", () => this.next());
    }

    private init() {
        this.addControls();
        this.show(this.index);
    }
}