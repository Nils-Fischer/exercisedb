import fs from "fs";
import path from "path";
import type { Exercise, ExerciseDescription } from "$lib/types";

export function generateFilters(
  exercises: Exercise[],
  filterFields: readonly (keyof Exercise)[]
): Map<keyof Exercise, Set<string>> {
  const setMap: Map<keyof Exercise, Set<string>> = exercises.reduce((map, exercise) => {
    filterFields.forEach((field) => {
      const set = map.get(field);
      const result = exercise[field];
      const values = Array.isArray(result) ? result : [result.toString()];
      if (set !== undefined) {
        values.forEach((str) => set.add(str));
      } else {
        map.set(field, new Set<string>([...values]));
      }
    });
    return map;
  }, new Map<keyof Exercise, Set<string>>());
  return setMap;
}

export function generateExercises(json_file_path: string): Exercise[] {
  const filePath = path.resolve(json_file_path);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent, (_key: string, value: string | null) => {
    return value === null ? "other" : value;
  });
}

export const PUSH: ExerciseDescription[] = [
  { priority: 1, tags: ["brust", "mittlere", "push"], sets: 4, reps: [8, 10], warmup: true, optional: false },
  { priority: 8, tags: ["brust", "mittlere", "abduktion"], sets: 3, reps: [8, 12], warmup: false, optional: true },
  { priority: 3, tags: ["brust", "obere", "push"], sets: 3, reps: [8, 10], warmup: true, optional: false },
  { priority: 7, tags: ["schulter", "vordere", "push"], sets: 3, reps: [8, 10], warmup: false, optional: true },
  { priority: 4, tags: ["brust", "untere", "abduktion"], sets: 3, reps: [10, 12], warmup: false, optional: false },
  { priority: 9, tags: ["brust", "untere", "push"], sets: 3, reps: [8, 10], warmup: false, optional: false },
  { priority: 5, tags: ["schulter", "seitliche", "abduktion"], sets: 4, reps: [10, 12], warmup: true, optional: false },
  { priority: 2, tags: ["trizeps", "groß"], sets: 3, reps: [10, 12], warmup: true, optional: false },
  { priority: 6, tags: ["trizeps", "klein"], sets: 3, reps: [10, 12], warmup: false, optional: false },
  { priority: 10, tags: ["trizeps", "klein"], sets: 2, reps: [10, 12], warmup: false, optional: true },
];

export const PULL: ExerciseDescription[] = [
  { priority: 1, tags: ["rücken", "vertikal", "wide"], sets: 4, reps: [8, 10], warmup: true, optional: false },
  { priority: 3, tags: ["rücken", "horizontal", "close"], sets: 3, reps: [8, 10], warmup: true, optional: false },
  { priority: 7, tags: ["rücken", "vertikal", "close"], sets: 2, reps: [10, 12], warmup: false, optional: true },
  { priority: 8, tags: ["rücken", "horizontal", "wide"], sets: 2, reps: [10, 12], warmup: false, optional: true },
  { priority: 6, tags: ["rücken", "adduktion"], sets: 3, reps: [10, 12], warmup: false, optional: true },
  { priority: 4, tags: ["schulter", "hintere", "abduktion"], sets: 4, reps: [10, 12], warmup: true, optional: false },
  { priority: 2, tags: ["bizeps", "breit"], sets: 3, reps: [8, 12], warmup: true, optional: false },
  { priority: 5, tags: ["bizeps", "eng"], sets: 3, reps: [10, 12], warmup: false, optional: false },
  { priority: 9, tags: ["bizeps", "eng"], sets: 2, reps: [10, 12], warmup: false, optional: true },
];

export const BEINE: ExerciseDescription[] = [
  { priority: 1, tags: ["beine", "push"], sets: 4, reps: [8, 10], warmup: true, optional: false },
  { priority: 5, tags: ["beine", "pull"], sets: 3, reps: [8, 10], warmup: true, optional: false },
  { priority: 2, tags: ["beine", "hamstrings"], sets: 3, reps: [10, 12], warmup: false, optional: false },
  { priority: 3, tags: ["beine", "quadrizeps"], sets: 3, reps: [10, 12], warmup: false, optional: false },
  { priority: 4, tags: ["beine", "waden"], sets: 4, reps: [10, 15], warmup: true, optional: false },
  { priority: 8, tags: ["beine", "push"], sets: 3, reps: [10, 12], warmup: false, optional: true },
  { priority: 6, tags: ["bauch", "unterer"], sets: 4, reps: [10, 15], warmup: false, optional: false },
  { priority: 7, tags: ["bauch", "oberer"], sets: 4, reps: [10, 15], warmup: false, optional: false },
];

export const OBERKOERPER: ExerciseDescription[] = [
  { priority: 1, tags: ["brust", "mittlere", "push"], sets: 3, reps: [8, 10], warmup: true, optional: false },
  { priority: 2, tags: ["rücken", "vertikal", "wide"], sets: 3, reps: [8, 10], warmup: true, optional: false },
  { priority: 4, tags: ["brust", "obere", "push"], sets: 3, reps: [8, 12], warmup: true, optional: false },
  { priority: 8, tags: ["rücken", "horizontal", "close"], sets: 3, reps: [8, 12], warmup: false, optional: false },
  { priority: 9, tags: ["brust", "untere", "abduktion"], sets: 3, reps: [10, 12], warmup: false, optional: false },
  { priority: 12, tags: ["rücken", "adduktion"], sets: 3, reps: [10, 12], warmup: false, optional: true },
  { priority: 13, tags: ["schulter", "vordere", "push"], sets: 3, reps: [10, 12], warmup: false, optional: true },
  {
    priority: 3,
    tags: ["schulter", "seitliche", "abduktion"],
    sets: 4,
    reps: [10, 12],
    warmup: false,
    optional: false,
  },
  { priority: 5, tags: ["schulter", "hintere", "abduktion"], sets: 3, reps: [10, 12], warmup: false, optional: false },
  { priority: 6, tags: ["bizeps", "breit"], sets: 3, reps: [10, 12], warmup: false, optional: false },
  { priority: 7, tags: ["trizeps", "groß"], sets: 3, reps: [10, 12], warmup: false, optional: false },
  { priority: 10, tags: ["bizeps", "eng"], sets: 2, reps: [10, 12], warmup: false, optional: false },
  { priority: 11, tags: ["trizeps", "klein"], sets: 2, reps: [10, 12], warmup: false, optional: true },
];

export const UNTERKOERPER: ExerciseDescription[] = [
  { priority: 1, tags: ["beine", "push"], sets: 3, reps: [8, 10], warmup: true, optional: false },
  { priority: 2, tags: ["beine", "pull"], sets: 3, reps: [8, 10], warmup: true, optional: false },
  { priority: 3, tags: ["beine", "hamstrings"], sets: 3, reps: [10, 12], warmup: false, optional: false },
  { priority: 4, tags: ["beine", "quadrizeps"], sets: 3, reps: [10, 12], warmup: false, optional: false },
  { priority: 5, tags: ["waden"], sets: 4, reps: [10, 12], warmup: false, optional: false },
  { priority: 9, tags: ["beine", "hamstrings"], sets: 2, reps: [10, 12], warmup: false, optional: true },
  { priority: 10, tags: ["beine", "quadrizeps"], sets: 2, reps: [10, 12], warmup: false, optional: true },
  { priority: 7, tags: ["beine", "push"], sets: 3, reps: [10, 12], warmup: false, optional: true },
  { priority: 6, tags: ["bauch", "unterer"], sets: 3, reps: [10, 15], warmup: false, optional: false },
  { priority: 8, tags: ["bauch", "oberer"], sets: 3, reps: [10, 15], warmup: false, optional: false },
];

export const GANZKOERPER: ExerciseDescription[] = [
  { priority: 1, tags: ["beine", "push"], sets: 3, reps: [8, 10], warmup: true, optional: false },
  { priority: 11, tags: ["beine", "pull"], sets: 3, reps: [8, 10], warmup: true, optional: false },
  { priority: 13, tags: ["beine", "quadrizeps"], sets: 3, reps: [10, 12], warmup: false, optional: false },
  { priority: 14, tags: ["beine", "hamstrings"], sets: 3, reps: [10, 12], warmup: false, optional: false },
  { priority: 15, tags: ["waden"], sets: 3, reps: [10, 12], warmup: false, optional: false },
  { priority: 2, tags: ["brust", "mittlere", "push"], sets: 3, reps: [8, 10], warmup: true, optional: false },
  { priority: 4, tags: ["brust", "obere", "brust"], sets: 3, reps: [10, 12], warmup: true, optional: false },
  { priority: 3, tags: ["rücken", "vertikal", "wide"], sets: 3, reps: [8, 10], warmup: true, optional: false },
  { priority: 6, tags: ["rücken", "horizontal", "close"], sets: 3, reps: [10, 12], warmup: false, optional: false },
  { priority: 10, tags: ["brust", "untere", "abduktion"], sets: 3, reps: [10, 12], warmup: false, optional: false },
  { priority: 16, tags: ["rücken", "adduktion"], sets: 3, reps: [10, 12], warmup: false, optional: true },
  { priority: 17, tags: ["schulter", "vordere", "push"], sets: 3, reps: [10, 12], warmup: false, optional: true },
  {
    priority: 5,
    tags: ["schulter", "seitliche", "abduktion"],
    sets: 3,
    reps: [10, 12],
    warmup: false,
    optional: false,
  },
  { priority: 9, tags: ["schulter", "hintere", "abduktion"], sets: 3, reps: [10, 12], warmup: false, optional: false },
  { priority: 7, tags: ["bizeps", "breit"], sets: 3, reps: [10, 12], warmup: false, optional: false },
  { priority: 8, tags: ["trizeps", "groß"], sets: 3, reps: [10, 12], warmup: false, optional: false },
  { priority: 19, tags: ["bizeps", "eng"], sets: 3, reps: [10, 12], warmup: false, optional: true },
  { priority: 20, tags: ["trizeps", "klein"], sets: 3, reps: [10, 12], warmup: false, optional: true },
  { priority: 18, tags: ["bauch", "unterer"], sets: 3, reps: [10, 12], warmup: false, optional: false },
];
