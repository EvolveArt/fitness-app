import { Component, OnInit } from "@angular/core";
import { Exercice } from "../exercice.model";
import { TrainingService } from "../training.service";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.scss"]
})
export class NewTrainingComponent implements OnInit {
  trainingTypes: Exercice[];

  selectedExercice = new FormControl("", Validators.required);

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.trainingTypes = this.trainingService.availableExercices;
  }

  onStartTraining() {
    this.trainingService.startExercice(this.selectedExercice.value);
  }
}
