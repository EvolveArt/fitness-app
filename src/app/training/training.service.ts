import { Injectable } from "@angular/core";
import { Exercice } from "./exercice.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TrainingService {
  // tslint:disable-next-line: variable-name
  private _availableExercices: Exercice[] = [
    { id: "crunches", name: "Crunches", duration: 30, calories: 8 },
    { id: "burpees", name: "Burpees", duration: 60, calories: 8 },
    { id: "touch-toes", name: "Touch Toes", duration: 120, calories: 15 }
  ];

  private runningExercise: Exercice;

  exerciceChanged = new Subject<Exercice>();

  constructor() {}

  public get availableExercices(): Exercice[] {
    return Array.from(this._availableExercices);
  }

  startExercice(selectedId: string) {
    const selectedExercice = this.availableExercices.find(
      ex => ex.id === selectedId
    );
    this.runningExercise = selectedExercice;
    this.exerciceChanged.next({ ...this.runningExercise });
  }

  stopRunningExercice() {
    this.runningExercise = null;
    this.exerciceChanged.next(null);
  }
}
