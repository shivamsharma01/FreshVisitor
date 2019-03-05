import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { VisitorService } from "src/app/vms/service/visitor.service";
import { IMyOptions } from "mydatepicker";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-create-request",
  templateUrl: "./create-request.component.html",
  styleUrls: ["./create-request.component.css"]
})
export class CreateRequestComponent implements OnInit {
  visitorForm: FormGroup;
  visitorFormArray: FormArray;
  public myDatePickerOptions: IMyOptions;

  constructor(
    private formBuilder: FormBuilder,
    private visitorService: VisitorService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.configureDatePicker();
    this.createForm();
    // this.spinner.show();
  }

  createForm() {
    this.visitorFormArray = this.formBuilder.array([this.createItem()]);
    this.visitorForm = this.formBuilder.group({
      visitors: this.visitorFormArray
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      requesterName: this.formBuilder.control({
        value: "Shivam Sharma",
        disabled: true
      }),
      requesterId: this.formBuilder.control({
        value: "123133",
        disabled: true
      }),
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
        Validators.pattern(/^[A-Za-z0-9_.]{3,}@[A-Za-z]+(\.[a-z]{2,5}){1,2}$/)
      ]),
      visitorUIdType: this.formBuilder.control("", [Validators.required]),
      visitorUId: this.formBuilder.control("", [Validators.required]),
      visitLocation: this.formBuilder.control("", [Validators.required]),
      visitorFromDate: [this.setDate(), Validators.required],
      visitorToDate: [this.setDate(), Validators.required],
      remarks: this.formBuilder.control("", Validators.maxLength(500))
    });
  }
  
  addItem(): void {
    this.visitorFormArray.push(this.createItem());
  }

  submitForm() {
    const controls = Object.keys(this.visitorForm.controls);
    for (let control of controls) {
      this.visitorForm.get(control).markAsTouched();
    }
    this.visitorService.submitForm(this.visitorForm);
  }

  configureDatePicker() {
    let date = new Date();
    this.myDatePickerOptions = {
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
