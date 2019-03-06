import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "src/app/auth/auth.service";
import { VisitorService } from "src/app/vms-module/service/visitor.service";
import { IMyOptions } from "mydatepicker";

@Component({
  selector: "app-create-request",
  templateUrl: "./create-request.component.html",
  styleUrls: ["./create-request.component.css"]
})
export class CreateRequestComponent implements OnInit {
  visitorType: string;
  visitorForm: FormGroup;
  myDatePickerOptions: IMyOptions;
  maxLimit: number = 4;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private visitorService: VisitorService
  ) {}

  ngOnInit() {
    this.myDatePickerOptions = this.visitorService.configureDatePicker();
    this.createForm();
  }
  createForm() {
    this.visitorForm = this.formBuilder.group({
      approverName: this.authService.user.empName,
      approverEmployeeNo: this.authService.user.empNumber,
      visitLocation: this.formBuilder.control("", [Validators.required]),
      visitDate: [this.visitorService.setDate(), Validators.required],
      visitorType: null,
      visitors: this.createVisitorArray()
    });
    this.visitorForm.removeControl
    this.getVisitorType();
  }

  createVisitorArray() {
    return this.formBuilder.array([this.createVisitor()]);
  }

  createVisitor(): FormGroup {
    return this.formBuilder.group({
      visitorName: this.formBuilder.control("", [
        Validators.required,
        Validators.pattern(/^[A-Za-z][A-Za-z ]{1,}[A-Za-z]$/)
      ]),
      visitorMobileNo: this.formBuilder.control("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/\d{1,}/)
      ]),
      visitorEmailId: this.formBuilder.control("", [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[A-Za-z0-9_.]{3,}@[A-Za-z]+(\.[a-z]{2,}){1,2}$/)
      ]),
      visitorUIdType: this.formBuilder.control("", [Validators.required]),
      visitorUId: this.formBuilder.control("", [Validators.required])
    });
  }

  addItem(): void {
    (<FormArray>this.visitorForm.get('visitors')).push(this.createVisitor());
  }
  
  removeItem(i): void {
    (<FormArray>this.visitorForm.get('visitors')).removeAt(i);
  }

  resetForm() {
    this.createForm();
  }

  submitForm() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000)
    this.visitorService.submitForm(this.visitorForm);
  }
  
  getVisitorType() {
    this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      this.visitorForm.patchValue({visitorType: params.get('type')});
      return params.get('type');
    }))
    .subscribe();
  }

}

