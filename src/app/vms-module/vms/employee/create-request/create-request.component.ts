import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {
  createForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      requesterName: this.formBuilder.control({value: 'Shivam Sharma', disabled: true}),
      requesterId: this.formBuilder.control({value: '123133', disabled: true}),
      visitorName: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern(/^[A-Za-z][A-Za-z ]+[A-Za-z]$/)]),
      visitorMobileNo: this.formBuilder.control('', [Validators.requiredTrue, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^\\d{10}$/)]),
      visitorEmailId: this.formBuilder.control('', [Validators.requiredTrue, Validators.email, Validators.pattern(/^[A-Za-z][A-Za-z ]+[A-Za-z]$/)]),
      visitorUId: this.formBuilder.control('', [Validators.requiredTrue]),
      visitorUIdType: this.formBuilder.control('', [Validators.requiredTrue]),
      remarks: this.formBuilder.control('', Validators.maxLength(500)),
    })
  }

}
