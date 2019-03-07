import { Directive, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() control: FormControl;
  
  constructor() { }

}
