export default class Slide {
    container;
    slides;
    controls;
    timer;
    index;
    slide;
    constructor(container, slides, controls, timer = 5000) {
        this.container = container;
        this.slides = slides;
        this.controls = controls;
        this.timer = timer;
        this.index = 0;
        this.slide = this.slides[this.index];
        this.show(2);
    }
    hide(el) {
        el.classList.remove('active');
    }
    show(index) {
        this.index = index;
        this.slide = this.slides[this.index];
        this.slides.forEach(element => this.hide(element));
        this.slide.classList.add('active');
    }
}
//# sourceMappingURL=Slide.js.map