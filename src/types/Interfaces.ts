export interface SetsPerformedDataType {
  setIndex: number;
  reps: number;
  rtf?: number;
}
export interface User {
  id: string;
  email: string;
  username: string;
}
export interface Exercise {
  id: string;
  name: string;
}
export interface PerformedExercise {
  // exercise relation id mapped
  name: string;
  id: string;
  sets: SetsPerformedDataType[];
}
export interface PlannedExercise {
  name: string;
  id: string;
  musclesGroup?: MuscleGroup[];
  volume: {
    sets: number;
    reps: number;
  };
}
export interface Workout {
  id: string;
  name: string;
  date: Date;
}
export interface MuscleGroup {
  id: string;
  name: string;
}
