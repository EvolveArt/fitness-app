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

  // tslint:disable-next-line: variable-name
  private _runningExercise: Exercice;

  exerciceChanged = new Subject<Exercice>();
  exercices: Exercice[] = [];

  constructor() {}

  public get availableExercices(): Exercice[] {
    return Array.from(this._availableExercices);
  }

  startExercice(selectedId: string) {
    const selectedExercice = this.availableExercices.find(
      ex => ex.id === selectedId
    );
    this._runningExercise = selectedExercice;
    this.exerciceChanged.next({ ...this._runningExercise });
  }

  completeRunningExercice() {
    this.exercices.push({
      ...this.runningExercise,
      date: new Date(),
      state: "completed"
    });
    this.stopRunningExercice();
  }

  cancelRunningExercice(progress: number) {
    const pctCompleted = progress / 100;
    this.exercices.push({
      ...this._runningExercise,
      date: new Date(),
      state: "cancelled",
      calories: this._runningExercise.calories * pctCompleted,
      duration: this._runningExercise.duration * pctCompleted
    });
    this.stopRunningExercice();
  }

  stopRunningExercice() {
    this._runningExercise = null;
    this.exerciceChanged.next(null);
  }

  public get runningExercise(): Exercice {
    return { ...this._runningExercise };
  }
}
