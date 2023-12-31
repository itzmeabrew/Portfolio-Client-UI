import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appParellax]'
})
export class ParellaxDirective implements OnInit
{
  @Input() opacity = 1;
  @Input() inversion = false;
  @Input() movement = 0.025;
  public newX;
  public newY;
  constructor(private eleRef: ElementRef) {}

  ngOnInit(): void {
    this.eleRef.nativeElement.style.position = 'relative';
    this.eleRef.nativeElement.style.opacity = this.opacity;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    this.movement = this.movement ? this.movement : 0.025;

    const cursorX = e.pageX;
    const cursorY = e.pageY;

    if (!this.inversion) {
      this.newX = cursorX * this.movement;
      this.newY = cursorY * this.movement;
    } else {
      this.newX = -(cursorX * this.movement);
      this.newY = -(cursorY * this.movement);
    }

    this.eleRef.nativeElement.style.transform = `translate(${ this.newX }px, ${ this.newY }px)`;
  }
}
