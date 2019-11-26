import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  // tslint:disable-next-line: variable-name
  private _user: User;
  authChange = new Subject<boolean>();

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this._user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }

  login(authData: AuthData) {
    this._user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }

  logout() {
    this._user = null;
    this.authChange.next(false);
    this.router.navigate(["/login"]);
  }

  public get user(): User {
    return { ...this._user };
  }

  isAuth(): boolean {
    return this._user != null;
  }

  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(["/training"]);
  }
}
