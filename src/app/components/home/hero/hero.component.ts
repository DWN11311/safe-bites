import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  @ViewChild('slider') slider!: ElementRef<HTMLDivElement>;

  private intervalId: any;
  counter = 0;
  private childCount = 0;

  private touchStartX = 0;
  private touchEndX = 0;

  startSlider() {
    this.intervalId = setInterval(() => {
      this.counter++;

      if (this.counter >= this.childCount) {
        this.counter = 0;
      }

      this.goToSlide(this.counter);
    }, 3000);
  }

  goToSlide(index: number): void {
    index *= window.innerWidth;

    this.slider.nativeElement.style.transform = `translate(-${index}px)`;
  }

  ngAfterViewInit() {
    this.startSlider();

    this.slider.nativeElement.addEventListener(
      'touchstart',
      (event: TouchEvent) => this.onTouchStart(event)
    );
    this.slider.nativeElement.addEventListener(
      'touchend',
      (event: TouchEvent) => this.onTouchEnd(event)
    );
    this.childCount = this.slider.nativeElement.children.length;
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }

  handleSwipe() {
    const swipeThreshold = 50;

    if (
      this.touchStartX - this.touchEndX > swipeThreshold &&
      this.counter < this.childCount - 1
    ) {
      this.counter = (this.counter + 1) % this.childCount;
      this.goToSlide(this.counter);
    } else if (
      this.touchEndX - this.touchStartX > swipeThreshold &&
      this.counter > 0
    ) {
      this.counter = (this.counter - 1 + this.childCount) % this.childCount;
      this.goToSlide(this.counter);
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    this.slider.nativeElement.removeEventListener(
      'touchstart',
      this.onTouchStart
    );
    this.slider.nativeElement.removeEventListener('touchend', this.onTouchEnd);
  }

  dotsClick(event: Event) {
    const target = event.target as HTMLDivElement;

    const slideIndex = Number(target.getAttribute('data-index'));
    this.goToSlide(slideIndex);
    this.counter = slideIndex;
  }
}
