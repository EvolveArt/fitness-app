import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { StopTrainingComponent } from "./stop-training.component";
import { TrainingService } from "../training.service";

@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrls: ["./current-training.component.scss"]
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  trainingName: string;
  private progressTimer: number;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {}

  ngOnInit() {
    this.trainingName = this.trainingService.runningExercise.name;
    this.resumeTimer();
  }

  /**
   * Start or resume the spinning timer.
   * Computes the step with the running exercice's duration.
   */
  resumeTimer() {
    const step = (this.trainingService.runningExercise.duration / 100) * 1000;
    this.progressTimer = window.setInterval(() => {
      this.progress === 100 ? this.trainingComplete() : (this.progress += 1);
    }, step);
  }

  stopTraining() {
    clearInterval(this.progressTimer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      result
        ? this.trainingService.cancelRunningExercice(this.progress)
        : this.resumeTimer();
    });
  }

  trainingComplete() {
    this.trainingService.completeRunningExercice();
    clearInterval(this.progressTimer);
  }
}
