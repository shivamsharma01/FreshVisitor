import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CreateForm } from 'src/app/model/new-form';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  constructor(private restClient: HttpClient) { }

  submitForm(formGroup: FormGroup) {
    if (this.validateForm(formGroup)) {
      const createDate: CreateForm = Object.assign({}, formGroup.value, { submissionDate: new Date()}) 
      console.log(createDate);
    }
  }

  validateForm(formGroup: FormGroup) {
    formGroup.updateValueAndValidity();
    return formGroup.valid;
  }
}
