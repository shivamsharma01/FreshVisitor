import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";
import { VisitorService } from "src/app/vms-module/service/visitor.service";
import { VisitorData } from "src/app/model/visitor-form-excel";
import { IMyOptions } from "mydatepicker";

@Component({
  selector: "app-submit-form",
  templateUrl: "./submit-form.component.html",
  styleUrls: ["./submit-form.component.css"]
})
export class SubmitFormComponent implements OnInit {
  @Input() data: VisitorData[];
  bulkForm: FormGroup;
  myDatePickerOptions: IMyOptions;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private visitorService: VisitorService) { }

  ngOnInit() {
    this.bulkForm = this.formBuilder.group({
      approverName: { value: this.authService.user.Name, disabled: true },
      approverEmployeeNo: {
        value: this.authService.user.EmployeeId,
        disabled: true
      },
      dateTimeAllowedFrom: this.formBuilder.control(null, [Validators.required]),
      dateTimeAllowedTo: this.formBuilder.control(null, [Validators.required]),
    });
    this.bulkForm.registerControl("visitors", this.createVisitorArray());
    this.myDatePickerOptions = this.visitorService.configureDatePicker();
  }

  createVisitorArray(): FormArray {
    const formArray = this.formBuilder.array([]);
    this.data.forEach(visitor => {
      formArray.push(
        this.formBuilder.group({
          empMail: this.formBuilder.control(this.authService.user.Email, [Validators.required]),
          name: this.formBuilder.control(visitor.NAME, [
            Validators.required,
            Validators.pattern(/^[A-Za-z][A-Za-z ]{1,}[A-Za-z]$/)
          ]),
          phoneNumber: this.formBuilder.control(visitor.MOBILE, [
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern(/\d{1,}/)
          ]),
          location: this.formBuilder.control(visitor.VISIT_LOCATION, [Validators.required]),
          email: this.formBuilder.control(visitor.EMAIL, [
            Validators.required,
            Validators.email,
            Validators.pattern(
              /^[A-Za-z0-9_.]{3,}@[A-Za-z]+(\.[a-z]{2,}){1,2}$/
            )
          ]),
          accomodationReq: this.formBuilder.control(visitor.ACCOMODATION, [Validators.required]),
          photo: this.formBuilder.control(null),
          idType: this.formBuilder.control(visitor.UNIQUE_TYPE, [Validators.required]),
          govtId: this.formBuilder.control(visitor.UNIQUE_ID, [Validators.required]),
          visitorType: this.formBuilder.control(visitor.VISITOR_TYPE, [Validators.required])
        })
      );
    });
    return formArray;
  }

  submit() {
    this.visitorService.submitBulkForm(this.bulkForm).subscribe(data => {
    });
  }

}				
