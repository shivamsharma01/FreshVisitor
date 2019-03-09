import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, FormControl, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMyOptions } from 'mydatepicker';
import { VisitorForm } from 'src/app/model/visitor-form';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  submitUrl: string = 'https://visitor-management-svc.cfapps.io/api/v1/submitRequest';
  multipleSubmitUrl: string = 'https://visitor-management-svc.cfapps.io/api/v1/submitRequests';
  getSubmitted: string = 'https://dataservice.cfapps.io/dataSvc/api/v1/visitorsByEmpMail?empMail=';

  constructor(private restClient: HttpClient) { }

  submitForm(formGroup: FormGroup): Observable<string> {
    if (formGroup.valid) {
      const obj = this.objectMapper(formGroup.getRawValue());
      if (obj.length > 1) {
        return this.postMultiple(obj);
      }
      return this.post(obj[0]);
    } else {
      this.validateForm(formGroup);
      return of('invalid');
    }
  }

  submitBulkForm(formGroup: FormGroup): Observable<string> {
    if (formGroup.valid) {
      return this.postMultiple(this.objectMapperBulk(formGroup.getRawValue()));
    } else {
      return of('invalid');
    }
  }

  postMultiple(data: VisitorForm[]): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.restClient.post<string>(this.multipleSubmitUrl, data, httpOptions);
  }

  post(data: VisitorForm): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.restClient.post<string>(this.submitUrl, data);
  }

  objectMapper(data: any) {
    const obj = (<Array<any>>data.visitors).map(visitorObj => {
      const visitor: VisitorForm = Object.assign({}, visitorObj);
      visitor.photo = visitorObj.name + '.jpg';
      visitor.empMail= data.empMail;
      visitor.dateTimeAllowedFrom = this.myDataPickerToDate(data.dateTimeAllowedFrom);
      visitor.dateTimeAllowedTo = this.myDataPickerToDate(data.dateTimeAllowedTo);
      visitor.accomodationReq = this.stringFalseToBoolean(visitorObj.accomodationReq);
      return visitor;
    });
    return obj;
  }

  objectMapperBulk(data: any) {
    const obj = (<Array<any>>data.visitors).map(visitorObj => {
      const visitor: VisitorForm = new VisitorForm();
      visitor.visitorType = data.visitorType;
      visitor.name = visitorObj.name;
      visitor.photo = visitorObj.name + '.jpg';
      visitor.dateTimeAllowedFrom = this.myDataPickerToDate(data.dateTimeAllowedFrom);
      visitor.dateTimeAllowedTo = this.myDataPickerToDate(data.dateTimeAllowedTo);
      visitor.idType = visitorObj.idType;
      visitor.govtId = visitorObj.govtId;
      visitor.phoneNumber = visitorObj.phoneNumber;
      visitor.email = visitorObj.email;
      visitor.accomodationReq = this.stringFalseToBooleanExcel(visitorObj.accomodationReq);
      visitor.empMail = data.empMail;
      visitor.location = data.location;
      return visitor;
    });
    return obj;
  }

  myDataPickerToDate(obj: any) {
    var utcSeconds = obj.epoc;
    var d = new Date(0);
    d.setUTCSeconds(utcSeconds);
    // console.log();
    // console.log(d.toJSON());
    // console.log(d.toLocaleDateString());
    // console.log(d.toLocaleString());
    // console.log(d.toLocaleTimeString());
    // console.log(d.toTimeString());
    // console.log(d.toUTCString());
    // console.log(d.toDateString());
    return d.toISOString();
  }

  stringFalseToBoolean(value: string): boolean {
    return value === 'true' ? true : false;
  }

  stringFalseToBooleanExcel(value: string): boolean {
    return value && value.toLocaleLowerCase() === 'yes' ? true : false;
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

  getRequestedForms(empId: string): Observable<VisitorForm[]> {
    return this.restClient.get<VisitorForm[]>(this.getSubmitted + empId);
  }
}

class CustomDate {
  constructor(public year: number, public month: number, public day: number) { }
}