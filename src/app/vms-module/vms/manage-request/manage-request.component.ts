import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { VisitorService } from '../../service/visitor.service';
@Component({
  selector: 'app-manage-request',
  templateUrl: './manage-request.component.html',
  styleUrls: ['./manage-request.component.css']
})
export class ManageRequestComponent implements OnInit {
  visitorForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private visitorService: VisitorService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.visitorForm = this.formBuilder.group({
      visitLocation: this.formBuilder.control('', [Validators.required]),
      visitDate: this.formBuilder.control(null, [Validators.required]),
      visitorType: this.formBuilder.control(''),
      visitors: this.createVisitorArray()
    });}
    createVisitorArray() {
      return this.formBuilder.array([this.createVisitor()]);
    
  }
  createVisitor(): FormGroup {
    return this.formBuilder.group({
      visitorName: this.formBuilder.control(null, [
        Validators.required,
        Validators.pattern(/^[A-Za-z][A-Za-z ]{1,}[A-Za-z]$/)
      ]),
      visitorMobileNo: this.formBuilder.control(null, [
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/\d{1,}/)
      ]),
      visitorEmailId: this.formBuilder.control(null, [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[A-Za-z0-9_.]{3,}@[A-Za-z]+(\.[a-z]{2,}){1,2}$/)
      ]),
      visitorUIdType: this.formBuilder.control('', [Validators.required]),
      visitorUId: this.formBuilder.control(null, [Validators.required]),
      visitorPhoto: this.formBuilder.control(null)
    });
  }
  
}
