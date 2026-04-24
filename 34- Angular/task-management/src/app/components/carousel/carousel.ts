import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel {
  currentIndex = 0;

  slides: { src: string; alt: string }[] = [
    { src: '3.jpg', alt: 'carousel image 1' },
    { src: '2.jpg', alt: 'carousel image 2' },
    { src: '1.jpg', alt: 'carousel image 3' },
  ];

  next(): void {
    const n = this.slides.length;
    if (n === 0) {
      return;
    }
    this.currentIndex = (this.currentIndex + 1) % n;
  }

  prev(): void {
    const n = this.slides.length;
    if (n === 0) {
      return;
    }
    this.currentIndex = (this.currentIndex - 1 + n) % n;
  }

  goTo(index: number): void {
    this.currentIndex = index;
  }
}
