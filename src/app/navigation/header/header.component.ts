import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { MatSidenav } from "@angular/material";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  toggleSidenav() {
    this.sidenavToggle.emit();
  }
}
