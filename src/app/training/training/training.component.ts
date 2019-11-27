import { Component, OnInit } from "@angular/core";
import { TrainingService } from "../training.service";

import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.scss"]
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.ongoingTraining$ = this.trainingService.exerciseChanged.pipe(
      map(ex => (ex ? true : false))
    );
  }
}
