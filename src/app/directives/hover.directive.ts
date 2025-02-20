import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective {
  @Input('appHover') hoverSrc!: string;
  private originalSrc!: string;

  constructor(public myRef: ElementRef) {}
  @HostListener('mouseover') mouseOver() {
    const imgElement = this.myRef.nativeElement as HTMLImageElement;
    this.originalSrc = imgElement.src;
    imgElement.src = this.hoverSrc;
  }

  @HostListener('mouseleave') mouseLeave() {
    const imgElement = this.myRef.nativeElement as HTMLImageElement;
    imgElement.src = this.originalSrc;
  }
}
