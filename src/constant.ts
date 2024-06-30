import fs from "fs";
import path from "path";
import type { Exercise, ExerciseDescription } from "./lib/types";

export function generateFilters(
  exercises: Exercise[],
  filterFields: (keyof Exercise)[]
): Map<keyof Exercise, Set<string>> {
  let setMap: Map<keyof Exercise, Set<string>> = exercises.reduce(
    (map, exercise) => {
      filterFields.forEach((field) => {
        let set = map.get(field);
        const result = exercise[field];
        const values = Array.isArray(result) ? result : [result.toString()];
        if (set !== undefined) {
          values.forEach((str) => set.add(str));
        } else {
          map.set(field, new Set<string>([...values]));
        }
      });
      return map;
    },
    new Map<keyof Exercise, Set<string>>()
  );
  return setMap;
}

export function generateExercises(json_file_path: string): Exercise[] {
  const filePath = path.resolve(json_file_path);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent, (key: string, value: string | null) => {
    return value === null ? "other" : value;
  });
}

export const PUSH: ExerciseDescription[] = [
  { priority: 1, tags: ["brust", "mittlere", "push"] },
  { priority: 8, tags: ["brust", "mittlere", "abduktion"] },
  { priority: 3, tags: ["brust", "obere", "push"] },
  { priority: 7, tags: ["schulter", "vordere", "push"] },
  { priority: 4, tags: ["brust", "untere", "abduktion"] },
  { priority: 9, tags: ["brust", "untere", "push"] },
  { priority: 5, tags: ["schulter", "seitliche", "abduktion"] },
  { priority: 2, tags: ["trizeps", "groß"] },
  { priority: 6, tags: ["trizeps", "klein"] },
  { priority: 10, tags: ["trizeps", "klein"] },
];

export const PULL: ExerciseDescription[] = [
  { priority: 1, tags: ["rücken", "vertikal", "wide"] },
  { priority: 3, tags: ["rücken", "horizontal", "close"] },
  { priority: 7, tags: ["rücken", "vertikal", "close"] },
  { priority: 8, tags: ["rücken", "horizontal", "wide"] },
  { priority: 6, tags: ["rücken", "adduktion"] },
  { priority: 4, tags: ["schulter", "hintere", "abduktion"] },
  { priority: 2, tags: ["bizeps", "breit"] },
  { priority: 5, tags: ["bizeps", "eng"] },
  { priority: 9, tags: ["bizeps", "eng"] },
];

export const BEINE: ExerciseDescription[] = [
  { priority: 1, tags: ["beine", "push"] },
  { priority: 5, tags: ["beine", "pull"] },
  { priority: 2, tags: ["beine", "hamstrings"] },
  { priority: 3, tags: ["beine", "quadrizeps"] },
  { priority: 4, tags: ["beine", "waden"] },
  { priority: 7, tags: ["beine", "push"] },
  { priority: 6, tags: ["bauch", "unterer"] },
  { priority: 8, tags: ["bauch", "oberer"] },
];

export const OBERKOERPER: ExerciseDescription[] = [
  { priority: 1, tags: ["brust", "mittlere", "push"] },
  { priority: 2, tags: ["rücken", "vertikal", "pull"] },
  { priority: 4, tags: ["brust", "obere", "push"] },
  { priority: 8, tags: ["rücken", "horizontal", "pull"] },
  { priority: 9, tags: ["brust", "untere", "abduktion"] },
  { priority: 12, tags: ["rücken", "abduktion"] },
  { priority: 13, tags: ["schulter", "vordere", "push"] },
  { priority: 3, tags: ["schulter", "seitliche", "abduktion"] },
  { priority: 5, tags: ["schulter", "hintere", "abduktion"] },
  { priority: 6, tags: ["bizeps", "breit"] },
  { priority: 7, tags: ["trizeps", "groß"] },
  { priority: 10, tags: ["bizeps", "eng"] },
  { priority: 11, tags: ["trizeps", "klein"] },
];

export const UNTERKOERPER: ExerciseDescription[] = [
  { priority: 1, tags: ["beine", "push"] },
  { priority: 2, tags: ["beine", "pull"] },
  { priority: 3, tags: ["beine", "hamstrings"] },
  { priority: 4, tags: ["beine", "quadrizeps"] },
  { priority: 5, tags: ["waden"] },
  { priority: 9, tags: ["beine", "hamstrings"] },
  { priority: 10, tags: ["beine", "quadrizeps"] },
  { priority: 7, tags: ["beine", "push"] },
  { priority: 6, tags: ["bauch", "unter"] },
  { priority: 8, tags: ["bauch", "oberer"] },
];

export const GANZKOERPER: ExerciseDescription[] = [
  { priority: 1, tags: ["beine", "push"] },
  { priority: 11, tags: ["beine", "pull"] },
  { priority: 13, tags: ["beine", "quadrizeps"] },
  { priority: 14, tags: ["beine", "hamstrings"] },
  { priority: 15, tags: ["waden"] },
  { priority: 2, tags: ["brust", "mittlere", "push"] },
  { priority: 4, tags: ["brust", "obere", "brust"] },
  { priority: 3, tags: ["rücken", "vertikal", "wide"] },
  { priority: 6, tags: ["rücken", "horizontal", "close"] },
  { priority: 10, tags: ["brust", "untere", "abduktion"] },
  { priority: 16, tags: ["rücken", "abduktoren"] },
  { priority: 17, tags: ["schulter", "vordere", "push"] },
  { priority: 5, tags: ["schulter", "seitliche", "abduktion"] },
  { priority: 9, tags: ["schulter", "hintere", "abduktion"] },
  { priority: 7, tags: ["bizeps", "breit"] },
  { priority: 8, tags: ["trizeps", "groß"] },
  { priority: 19, tags: ["bizeps", "eng"] },
  { priority: 20, tags: ["trizeps", "klein"] },
  { priority: 18, tags: ["bauch", "untere"] },
];
