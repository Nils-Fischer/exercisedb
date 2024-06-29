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

const PUSH2 = [
  [1, ['brust', 'mittlere', 'push']],
  [8, ['brust', 'mittlere', 'abduktion']],
  [3, ['brust', 'obere', 'push']],
  [7, ['schulter', 'vordere', 'push']],
  [4, ['brust', 'untere', 'abduktion']],
  [9, ['brust', 'untere', 'push']],
  [5, ['schulter', 'seitliche', 'abduktion']],
  [2, ['trizeps', 'großer', 'push']],
  [6, ['trizeps', 'kleiner', 'push']],
  [10, ['trizeps', 'kleiner', 'push']],
];
const PULL2 = [
  [1, ['rücken', 'vertikal', 'wide']],
  [3, ['rücken', 'horizontal', 'close']],
  [7, ['rücken', 'vertikal', 'close']],
  [8, ['rücken', 'horizontal', 'wide']],
  [6, ['rücken', 'adduktion']],
  [4, ['schulter', 'hintere', 'abduktion']],
  [2, ['bizeps', 'breiter']],
  [5, ['bizeps', 'enger']],
  [9, ['bizeps', 'enger']],
];

const BEINE2 = [
  [1, ['beine', 'push']],
  [5, ['beine', 'pull']],
  [2, ['beine', 'abduktion']],
  [3, ['beine', 'adduktion']],
  [4, ['beine', 'waden']],
  [7, ['beine', 'push']],
  [6, ['bauch', 'unterer']],
  [8, ['rücken', 'unterer']],
  [9, ['bauch', 'ober']],
];

const OBERKOERPER2 = [
  [1, ['brust', 'mittlere', 'push']],
  [2, ['rücken', 'vertikal', 'pull']],
  [4, ['brust', 'obere', 'push']],
  [8, ['rücken', 'horizontal', 'pull']],
  [9, ['brust', 'untere', 'abduktion']],
  [12, ['rücken', 'abduktion']],
  [13, ['schulter', 'vordere', 'push']],
  [3, ['schulter', 'seitliche', 'abduktion']],
  [5, ['schulter', 'hintere', 'abduktion']],
  [6, ['bizeps', 'breiter']],
  [7, ['trizeps', 'großer']],
  [10, ['bizeps', 'enger']],
  [11, ['trizeps', 'enger']],
];

const UNTERKOERPER2 = [
  [1, ['beine', 'push']],
  [2, ['beine', 'pull']],
  [3, ['beine', 'abduktion']],
  [4, ['beine', 'adduktion']],
  [5, ['waden']],
  [9, ['beine', 'abduktion']],
  [10, ['beine', 'adduktion']],
  [7, ['beine', 'push']],
  [6, ['bauch', 'unter']],
  [8, ['bauch', 'ober']],
];

const GANZKOERPER2 = [
  [1, ['beine', 'push']],
  [11, ['beine', 'pull']],
  [13, ['beine', 'adduktoren']],
  [14, ['beine', 'abduktoren']],
  [15, ['waden']],
  [2, ['brust', 'mittlere', 'push']],
  [4, ['brust', 'obere', 'brust']],
  [3, ['rücken', 'vertikal', 'wide']],
  [6, ['rücken', 'horizontal', 'close']],
  [10, ['brust', 'untere', 'abduktoren']],
  [16, ['rücken', 'abduktoren']],
  [17, ['schulter', 'vordere', 'push']],
  [5, ['schulter', 'seitliche', 'abduktoren']],
  [9, ['schulter', 'hintere', 'abduktoren']],
  [7, ['bizeps', 'breit']],
  [8, ['trizeps', 'groß']],
  [19, ['bizeps', 'eng']],
  [20, ['trizeps', 'klein']],
  [18, ['bauch', 'untere']],
];
