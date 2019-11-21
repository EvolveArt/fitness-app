import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  passMinLength = 5;

  signupForm = this.fb.group({
    email: ["", [Validators.email, Validators.required]],
    password: [
      "",
      [Validators.minLength(this.passMinLength), Validators.required]
    ]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  onSignUp() {
    console.log(this.signupForm.get("email"));
  }

  public get currentPassLength(): number {
    return this.signupForm.get("password").value.length;
  }

  public get email(): AbstractControl {
    return this.signupForm.get("email");
  }
}
