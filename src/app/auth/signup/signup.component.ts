import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";

import * as moment from "moment";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  passMinLength = 5;
  maxDate: moment.Moment;

  signupForm = this.fb.group({
    email: ["", [Validators.email, Validators.required]],
    password: [
      "",
      [Validators.minLength(this.passMinLength), Validators.required]
    ],
    birthdate: ["", Validators.required],
    agree: ["", Validators.requiredTrue]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.maxDate = moment().subtract(18, "years");
  }

  onSignUp() {
    console.log(this.signupForm);
  }

  public get currentPassLength(): number {
    return this.signupForm.get("password").value.length;
  }

  public get email(): AbstractControl {
    return this.signupForm.get("email");
  }
}
