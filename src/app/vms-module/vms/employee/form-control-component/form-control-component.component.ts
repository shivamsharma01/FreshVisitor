import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-control-component',
  templateUrl: './form-control-component.component.html',
  styleUrls: ['./form-control-component.component.css']
})
export class FormControlComponentComponent implements OnInit {
  @Input() name: string;
  @Input() display: string;
  @Input() control: FormControl;

  constructor() { }

  ngOnInit() {
  }

}
