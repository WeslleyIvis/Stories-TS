import Timeout from "./Timout.js";
export default class Slide {
    container;
    slides;
    controls;
    timer;
    index;
    slide;
    timeout;
    constructor(container, slides, controls, timer = 5000) {
        this.container = container;
        this.slides = slides;
        this.controls = controls;
        this.timer = timer;
        this.timeout = null;
        this.index = 0;
        this.slide = this.slides[this.index];
        this.init();
    }
    hide(el) {
        el.classList.remove('active');
    }
    show(index) {
        this.index = index;
        this.slide = this.slides[this.index];
        this.slides.forEach(element => this.hide(element));
        this.slide.classList.add('active');
        this.auto(this.timer);
    }
    auto(time) {
        this.timeout?.clear();
        this.timeout = new Timeout(() => this.next(), time);
    }
    next() {
        const next = this.index + 1 < this.slides.length ? this.index + 1 : 0;
        this.show(next);
    }
    prev() {
        const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1;
        this.show(prev);
    }
    addControls() {
        const prevButton = document.createElement("button");
        const nextButton = document.createElement("button");
        prevButton.innerText = "Slide Anterior";
        nextButton.innerText = "Próximo Slide";
        this.controls.appendChild(prevButton);
        this.controls.appendChild(nextButton);
        prevButton.addEventListener("pointerup", () => this.prev());
        nextButton.addEventListener("pointerup", () => this.next());
    }
    init() {
        this.addControls();
        this.show(this.index);
    }
}
//# sourceMappingURL=Slide.js.map