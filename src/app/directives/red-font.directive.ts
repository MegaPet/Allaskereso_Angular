import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRedFont]'
})
export class RedFontDirective {

  constructor(private el : ElementRef) {

    el.nativeElement.style.color = '#EF233C';
   }

}
