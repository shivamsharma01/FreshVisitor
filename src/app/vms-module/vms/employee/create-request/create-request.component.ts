import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VisitorService } from 'src/app/vms/service/visitor.service';
import { IMyOptions } from 'mydatepicker';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {
  form: FormGroup;
  public myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    editableDateField: false
  };

  constructor(private formBuilder: FormBuilder, private visitorService: VisitorService) { }

  ngOnInit() {
    this.createForm();
  }

  submitForm() {
    const controls = Object.keys(this.form.controls);
    for (let control of controls) {
      this.form.get(control).markAsTouched()
    }
    this.visitorService.submitForm(this.form);
  }

  createForm() {
    this.form = this.formBuilder.group({
      requesterName: this.formBuilder.control({ value: 'Shivam Sharma', disabled: true }),
      requesterId: this.formBuilder.control({ value: '123133', disabled: true }),
      visitorName: this.formBuilder.control('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]{1,}[A-Za-z]$/)]),
      visitorMobileNo: this.formBuilder.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/\d{1,}/)]),
      visitorEmailId: this.formBuilder.control('', [Validators.required, Validators.email, Validators.pattern(/^[A-Za-z0-9_.]{3,}@[A-Za-z]+(\.[a-z]{2,5}){1,2}$/)]),
      visitorUIdType: this.formBuilder.control('', [Validators.required]),
      visitorUId: this.formBuilder.control('', [Validators.required]),
      visitorFromDate: [null, Validators.required],
      visitorToDate: [null, Validators.required],
      remarks: this.formBuilder.control('', Validators.maxLength(500))
    });
  }
  setDate(): void {
    let date = new Date();
    this.form.patchValue({
      visitorFromDate: {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    });
    this.form.patchValue({
      visitorToDate: {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    });
  }

}
