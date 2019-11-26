import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ["", [Validators.email, Validators.required]],
    password: ["", Validators.required]
  });

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit() {}

  onLogin() {
    this.auth.login({
      email: this.email.value,
      password: this.password.value
    });
  }

  public get email(): AbstractControl {
    return this.loginForm.get("email");
  }

  public get password(): AbstractControl {
    return this.loginForm.get("password");
  }
}
