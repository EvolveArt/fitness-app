import { Injectable } from "@angular/core";
import { Exercise } from "./exercise.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TrainingService {
  // tslint:disable-next-line: variable-name
  private _availableExercises: Exercise[] = [
    { id: "crunches", name: "Crunches", duration: 30, calories: 8 },
    { id: "burpees", name: "Burpees", duration: 60, calories: 8 },
    { id: "touch-toes", name: "Touch Toes", duration: 120, calories: 15 }
  ];

  // tslint:disable-next-line: variable-name
  private _runningExercise: Exercise;

  exerciseChanged = new Subject<Exercise>();
  exercises: Exercise[] = [];

  constructor() {}

  public get availableExercises(): Exercise[] {
    return Array.from(this._availableExercises);
  }

  startExercise(selectedId: string) {
    const selectedExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this._runningExercise = selectedExercise;
    this.exerciseChanged.next({ ...this._runningExercise });
  }

  completeRunningExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: "completed"
    });
    this.stopRunningExercise();
  }

  cancelRunningExercise(progress: number) {
    const pctCompleted = progress / 100;
    this.exercises.push({
      ...this._runningExercise,
      date: new Date(),
      state: "cancelled",
      calories: this._runningExercise.calories * pctCompleted,
      duration: this._runningExercise.duration * pctCompleted
    });
    this.stopRunningExercise();
  }

  stopRunningExercise() {
    this._runningExercise = null;
    this.exerciseChanged.next(null);
  }

  public get runningExercise(): Exercise {
    return { ...this._runningExercise };
  }
}
