export interface SetsPerformedDataType {
  setIndex: number;
  reps: number;
  rtf?: number;
}
export interface User {
  id: string;
  username: string;
  gender: 'm' | 'f';
  preferences: { units: 'kg' | 'lb'; standards: 'ratio' | 'percentile' };
  weight: number;
  age: number;
}
/*   id                String              @id @default(uuid())
  googleId          String?
  githubId          String?
  username          String              @unique @default(uuid())
  accountId         String?
  password          String?
  age               Int
  weight            Int
  level             String?
  email             String?
  preferences       Json?
  createdAt         DateTime            @default(now())
  updatedAt         DateTime            @updatedAt
  workouts          Workout[]
  performedWorkouts PerformedWorkout[]
  performedExercise PerformedExercise[]
  gender            String */
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
