import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { VisitorService } from '../../service/visitor.service';
import { AuthService } from 'src/app/auth/auth.service';
import { VisitorForm } from 'src/app/model/visitor-form';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-manage-request',
  templateUrl: './manage-request.component.html',
  styleUrls: ['./manage-request.component.css']
})
export class ManageRequestComponent implements OnInit {
  visitorData: VisitorForm[];
  bulkForm: FormGroup;
  noData: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private visitorService: VisitorService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.visitorService.getRequestedForms(this.authService.user.Email).subscribe(data => {
      if (data && data.length > 0) {
        this.visitorData = data;
        this.createForm();
      } else {
        this.noData = 'Nothing to Show';
      }
      this.spinner.hide();
    }), error => {
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    }
  }

  createForm() {
    this.bulkForm = this.formBuilder.group({
      visitors: this.createVisitorArray()
    });

  }

  createVisitorArray(): FormArray {
    const formArray = this.formBuilder.array([]);
    this.visitorData.forEach(visitor => {
      formArray.push(
        this.formBuilder.group({
          visitorId: this.formBuilder.control(visitor.visitorId),
          empMail: this.formBuilder.control(visitor.empMail),
          visitorType: this.formBuilder.control(visitor.visitorType),
          name: this.formBuilder.control(visitor.name),
          photo: this.formBuilder.control(visitor.photo),
          dateTimeAllowedFrom: this.formBuilder.control(visitor.dateTimeAllowedFrom),
          dateTimeAllowedTo: this.formBuilder.control(visitor.dateTimeAllowedTo),
          idType: this.formBuilder.control(visitor.idType),
          govtId: this.formBuilder.control(visitor.govtId),
          phoneNumber: this.formBuilder.control(visitor.phoneNumber),
          email: this.formBuilder.control(visitor.email),
          status: this.formBuilder.control(visitor.status),
          accomodationReq: this.formBuilder.control(visitor.accomodationReq),
          location: this.formBuilder.control(visitor.location),
        })
      );
    });
    return formArray;
  }

}
