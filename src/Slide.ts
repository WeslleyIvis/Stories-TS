export default class Slide {
    container: Element;
    slides: Element[];
    controls: Element;
    timer: number;
    index: number;
    slide: Element;
    constructor(container: Element, slides: Element[], controls: Element, timer: number = 5000) {
        this.container = container;
        this.slides = slides;
        this.controls = controls;
        this.timer = timer;
        
        this.index = 0;
        this.slide = this.slides[this.index];

        this.show(2);
    }

    hide(el: Element) {
        el.classList.remove('active');
    }

    show(index: number) {
        this.index = index;
        this.slide = this.slides[this.index]
        this.slides.forEach(element => this.hide(element));
        this.slide.classList.add('active');
    }
}