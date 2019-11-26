import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { AuthService } from "src/app/auth/auth.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Subject<boolean>;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.isAuth$ = this.auth.authChange;
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.auth.logout();
  }
}
