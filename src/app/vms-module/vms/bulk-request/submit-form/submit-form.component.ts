import { Component, OnInit, Input } from "@angular/core";
import { TemplateService } from "../template.service";
import { VisitorData } from "src/app/model/visitor-form";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-submit-form",
  templateUrl: "./submit-form.component.html",
  styleUrls: ["./submit-form.component.css"]
})
export class SubmitFormComponent implements OnInit {
  @Input() data: VisitorData[];
  visitorForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private templateService: TemplateService
  ) {}

  ngOnInit() {
    this.visitorForm = this.formBuilder.group({
      approverName: { value: this.authService.user.empName, disabled: true },
      approverEmployeeNo: {
        value: this.authService.user.empNumber,
        disabled: true
      },
      visitLocation: this.formBuilder.control("", [Validators.required]),
      visitDate: this.formBuilder.control(null, [Validators.required]),
      visitorType: this.formBuilder.control("", [Validators.required])
    });
    this.visitorForm.registerControl("visitors", this.createVisitorArray());
  }

  createVisitorArray(): FormArray {
    const formArray = this.formBuilder.array([]);
    this.data.forEach(visitor => {
      formArray.push(
        this.formBuilder.group({
          visitorName: this.formBuilder.control(visitor.NAME, [
            Validators.required,
            Validators.pattern(/^[A-Za-z][A-Za-z ]{1,}[A-Za-z]$/)
          ]),
          visitorMobileNo: this.formBuilder.control(visitor.MOBILE, [
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern(/\d{1,}/)
          ]),
          visitorEmailId: this.formBuilder.control(visitor.Email, [
            Validators.required,
            Validators.email,
            Validators.pattern(
              /^[A-Za-z0-9_.]{3,}@[A-Za-z]+(\.[a-z]{2,}){1,2}$/
            )
          ]),
          visitorUIdType: this.formBuilder.control(visitor.UNIQUE_TYPE, [Validators.required]),
          visitorUId: this.formBuilder.control(visitor.UNIQUE_ID, [Validators.required])
        })
      );
    });
    return formArray;
  }

}
