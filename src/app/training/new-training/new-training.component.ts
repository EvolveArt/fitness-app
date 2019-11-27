import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Exercice } from "../exercice.model";
import { TrainingService } from "../training.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.scss"]
})
export class NewTrainingComponent implements OnInit {
  @Output() startTraining = new EventEmitter<void>();
  trainingTypes: Exercice[];

  selectedExercice = new FormControl();

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.trainingTypes = this.trainingService.availableExercices;
  }

  onStartTraining() {
    this.trainingService.startExercice(this.selectedExercice.value);
  }
}
