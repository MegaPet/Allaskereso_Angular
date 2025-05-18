import { Directive, Input, ElementRef, Renderer2, OnChanges, inject, SimpleChanges } from '@angular/core';


@Directive({
  selector: '[appShow]'
})
export class ShowDirective implements OnChanges{
  private el = inject(ElementRef);
  @Input() appShow = false;

  constructor() { 
    this.el.nativeElement.style.display = 'none';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( this.appShow){
        this.el.nativeElement.style.display = "block";
      }else{
        this.el.nativeElement.style.display = "none";
      }
  }

}
