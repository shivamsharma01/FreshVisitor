import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "src/app/auth/auth.service";
import { VisitorService } from "src/app/vms-module/service/visitor.service";
import { IMyOptions } from "mydatepicker";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

@Component({
  selector: "app-individual-request",
  templateUrl: "./individual-request.component.html",
  styleUrls: ["./individual-request.component.css"]
})
export class IndividualRequestComponent implements OnInit {
  visitorType: string;
  visitorForm: FormGroup;
  myDatePickerOptions: IMyOptions;
  maxLimit: number = 4;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private visitorService: VisitorService
  ) {}

  ngOnInit() {
    console.log(this.authService.user);
    this.myDatePickerOptions = this.visitorService.configureDatePicker();
    this.createForm();
  }

  createForm() {
    this.visitorForm = this.formBuilder.group({
      approverName: { value: this.authService.user.Name, disabled: true},
      approverEmployeeNo: this.authService.user.EmployeeId,
      visitLocation: this.formBuilder.control('', [Validators.required]),
      visitDate: this.formBuilder.control(null, [Validators.required]),
      visitorType: this.formBuilder.control(''),
      visitors: this.createVisitorArray()
    });
    this.getVisitorType();
  }

  createVisitorArray() {
    return this.formBuilder.array([this.createVisitor()]);
  }

  getVisitorType() {
    this.activatedRoute.params.pipe(map(p => p['visitor-type'])).subscribe(visitorType => this.visitorForm.get('visitorType').setValue(visitorType));
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
    this.visitorService.submitForm(this.visitorForm);
  }

  onSelectFile(event, index) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); 
      this.spinner.show();
      reader.onload = (event) => {
        (<FormArray>this.visitorForm.get('visitors')).at(index).get('visitorPhoto').setValue(event.target['result']);
        this.spinner.hide();
      }
    }
  }

}
