import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-component',
  templateUrl: './error-component.component.html',
  styleUrls: ['./error-component.component.css']
})
export class ErrorComponentComponent implements OnInit {
  @Input() display: string;
  @Input() control: FormControl;
  object = Object;

  constructor() { }

  ngOnInit() {
  }

}
