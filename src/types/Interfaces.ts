export interface SetsPerformedDataType {
  index: number;
  reps: number;
  weight: number;
  unit: 'kg' | 'lb';
  rtf?: number;
}
export interface User {
  id: string;
  username: string;
  gender: 'm' | 'f';
  preferences: { unit: 'kg' | 'lb'; standard: 'ratio' | 'percentile' };
  weight: { unit: 'kg' | 'lb'; value: number };
  bodyFatPercentage?: number;
  age: number;
}
export interface GoalType {
  id: string;
  lifts: {
    squats: number | undefined;
    benchPress: number | undefined;
    deadlift: number | undefined;
    pullup: number | undefined;
    shoulderPress: number | undefined;
  };
  weight: number | undefined;
  bodyFatPercentage: number | undefined;
}

export interface Exercise {
  id: string;
  name: string;
}
export interface PerformedExercise {
  // exercise relation id mapped
  exercise: string;
  user: string;
  performedWorkout: string;
  id: string;
  sets: SetsPerformedDataType[];
}
export interface PerformanceFull {
  date: string;
  exercise: Exercise;
  user: string;
  performedWorkout: string;
  id: string;
  sets: SetsPerformedDataType[];
}
export interface Exercise {
  name: string;
  id: string;
  muscleGroups?: MuscleGroup;
  muscleGroupsId: string;
  sets?: number;
  standardized: boolean;
}
export interface PlannedExercise {
  name: string;
  id: string;
  musclesGroup?: MuscleGroup;
  sets: number;
  reps: number;
}
export interface Workout {
  id: string;
  name: string;
  date: Date;
  exercises?: PlannedExercise[];
}
export interface MuscleGroup {
  id: string;
  name: string;
}
export interface PerformedSets {
  index: number;
  weight: number;
  reps: number;
  rtf?: number;
}
export interface StrengthLevels {
  level: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'elite';
}
export interface Note {
  createdAt: string;
  userId: string;
  text: string;
}
