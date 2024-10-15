/* eslint-disable no-unused-vars */
export interface FilterableItem {
  [key: string]: string | string[] | number;
}

export interface Exercise extends FilterableItem {
  id: number;
  name: string;
  level: string;
  mechanic: string;
  equipment: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
  images: string[];
  tag: string[];
  priority: number;
}

export interface Filters {
  [key: string]: string | null;
}

export type MediaType = "image" | "video";

export interface MediaItem {
  type: MediaType;
  src: string;
}

export interface ExerciseDescription {
  priority: number;
  tags: string[];
  sets: number;
  reps: [number, number];
  warmup: boolean;
  optional: boolean;
}

export enum Level {
  Beginner = 1,
  Intermediate = 2,
  Expert = 3,
}

export enum TrainingGoal {
  Endurance,
  Hypertrophy,
  Strength,
}

export interface ExercisePlan {
  name: string;
  frequency: number;
  exercises: ExerciseWithAlternatives[];
}

export interface ExerciseWithAlternatives {
  primaryExercise: Exercise;
  alternatives: Exercise[];
  sets: number;
  warmupSet: boolean;
  repetitions: number[];
  restTime: number;
  totalTime: number;
}

export type AuthModal = "resetPassword" | "signIn" | "register" | "forgotPassword" | null;

export interface Profile {
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
}

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}
