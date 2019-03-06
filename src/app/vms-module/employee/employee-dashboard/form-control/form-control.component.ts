import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {
  @Input() name: string;
  @Input() display: string;
  @Input() control: FormControl;

  constructor() { }

  ngOnInit() {
  }

}
