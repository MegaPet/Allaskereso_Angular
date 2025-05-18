import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPointer]'
})
export class PointerDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter(){
    this.setMouse("pointer");
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.setMouse('cursor')
  }

  private setMouse(mouse_mode : string){
    this.el.nativeElement.style.cursor = mouse_mode
  }

}
