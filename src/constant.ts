import fs from 'fs';
import path from 'path';
import type { Exercise } from './lib/types';

export function generateFilters(
  exercises: Exercise[],
  filterFields: (keyof Exercise)[]
): Map<keyof Exercise, Set<string>> {
  let setMap: Map<keyof Exercise, Set<string>> = exercises.reduce(
    (map, exercise) => {
      filterFields.forEach((field) => {
        let set = map.get(field);
        const result = exercise[field];
        const values = Array.isArray(result) ? result : [result];
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
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent, (key: string, value: string | null) => {
    return value === null ? 'other' : value;
  });
}
