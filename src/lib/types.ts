export interface FilterableItem {
  [key: string]: string | string[] | number;
}

export interface Exercise extends FilterableItem {
  name: string;
  level: string;
  mechanic: string;
  equipment: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
  images: string[];
  id: string;
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
}

export enum Level {
  Beginner = 1,
  Intermediate = 2,
  Expert = 3,
}
