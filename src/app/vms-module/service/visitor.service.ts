import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CreateForm } from 'src/app/model/new-form';
import { IMyOptions } from 'mydatepicker';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  constructor(private restClient: HttpClient) { }

  submitForm(formGroup: FormGroup) {
    console.log(formGroup.value);
    if (formGroup.valid) {
      const createDate: CreateForm = Object.assign({}, formGroup.value, { submissionDate: new Date()});
    } else {
      this.validateForm(formGroup);
    }
  }
  
  validateForm(form: AbstractControl) {
    if (form instanceof FormControl) {
      form.markAsTouched();
    } else if (form instanceof FormGroup || form instanceof FormArray) {
      Object.keys(form.controls).forEach(key => {
        this.validateForm(form.get(key));
      });
    }
  }

  configureDatePicker(): IMyOptions {
    let date = new Date();
    return {
      dateFormat: "dd/mm/yyyy",
      editableDateField: false,
      disableUntil: new CustomDate(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate() - 1
      ),
      disableSince: new CustomDate(
        date.getFullYear(),
        date.getMonth() + 2,
        date.getDate()
      )
    };
  }

  setDate() {
    const date = new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }

}

class CustomDate {
  constructor(public year: number, public month: number, public day: number) {}
}