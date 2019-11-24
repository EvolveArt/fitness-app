import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { StopTrainingComponent } from "./stop-training.component";

@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrls: ["./current-training.component.scss"]
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter<void>();
  progress = 0;
  private progressTimer: number;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.resumeTimer();
  }

  resumeTimer() {
    this.progressTimer = window.setInterval(() => {
      this.progress === 100 ? this.trainingComplete() : (this.progress += 5);
    }, 1000);
  }

  stopTraining() {
    clearInterval(this.progressTimer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      result ? this.trainingExit.emit() : this.resumeTimer();
    });
  }

  trainingComplete() {
    clearInterval(this.progressTimer);
  }
}
