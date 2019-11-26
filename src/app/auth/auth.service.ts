import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  // tslint:disable-next-line: variable-name
  private _user: User;
  authChange = new Subject<boolean>();

  constructor() {}

  registerUser(authData: AuthData) {
    this._user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
  }

  login(authData: AuthData) {
    this._user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
  }

  logout() {
    this._user = null;
    this.authChange.next(true);
  }

  public get user(): User {
    return { ...this._user };
  }

  isAuth(): boolean {
    return this._user != null;
  }
}
