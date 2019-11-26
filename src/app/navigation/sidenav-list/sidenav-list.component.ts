import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.scss"]
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenavEvent = new EventEmitter<void>();
  authStatus$: Subject<boolean>;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.authStatus$ = this.auth.authChange;
  }

  closeSidenav() {
    this.closeSidenavEvent.emit();
  }
}
