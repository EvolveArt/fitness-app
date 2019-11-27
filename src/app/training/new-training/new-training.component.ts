import { Component, OnInit } from "@angular/core";
import { Exercise } from "../exercise.model";
import { TrainingService } from "../training.service";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.scss"]
})
export class NewTrainingComponent implements OnInit {
  trainingTypes: Exercise[];

  selectedExercise = new FormControl("", Validators.required);

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.trainingTypes = this.trainingService.availableExercises;
  }

  onStartTraining() {
    this.trainingService.startExercise(this.selectedExercise.value);
  }
}
