import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { VisitorService } from "src/app/vms/service/visitor.service";
import { IMyOptions } from "mydatepicker";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-create-request",
  templateUrl: "./create-request.component.html",
  styleUrls: ["./create-request.component.css"]
})
export class CreateRequestComponent implements OnInit {
  form: FormGroup;
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

  submitForm() {
    const controls = Object.keys(this.form.controls);
    for (let control of controls) {
      this.form.get(control).markAsTouched();
    }
    this.visitorService.submitForm(this.form);
  }

  createForm() {
    this.form = this.formBuilder.group({
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
      visitorFromDate: [new Date(), Validators.required],
      visitorToDate: [null, Validators.required],
      remarks: this.formBuilder.control("", Validators.maxLength(500))
    });
    this.setDate();
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
      visitorFromDate: {
        date: new CustomDate(
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        )
      },
      visitorToDate: {
        date: new CustomDate(
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        )
      }
    });
  }
}

class CustomDate {
  constructor(public year: number, public month: number, public day: number) {}
}
