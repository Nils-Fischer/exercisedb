import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Exercise, ExerciseDescription } from './types';
import {
  BEINE,
  GANZKOERPER,
  OBERKOERPER,
  PUSH,
  PULL,
  UNTERKOERPER,
} from '../constant';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function createSplit(
  exercises: Exercise[],
  daysAWeek: number,
  availableTime: number,
  level: string
): [number, Exercise[]][] {
  switch (daysAWeek) {
    case 1:
      return oneDaySplit(exercises, availableTime, level);
    case 2:
      return twoDaySplit(exercises, availableTime, level);
    case 3:
      return threeDaySplit(exercises, availableTime, level);
    case 4:
      return fourDaySplit(exercises, availableTime, level);
    case 5:
      return fiveDaySplit(exercises, availableTime, level);
    case 6:
      return sixDaySplit(exercises, availableTime, level);
    default:
      return sevenDaySplit(exercises, availableTime, level);
  }
}

function oneDaySplit(
  exercises: Exercise[],
  time: number,
  level: string
): [number, Exercise[]][] {
  const fullBody = selectExercises(exercises, GANZKOERPER, time, level);
  return [[1, fullBody]];
}

function twoDaySplit(
  exercises: Exercise[],
  time: number,
  level: string
): [number, Exercise[]][] {
  const lowerBody = selectExercises(exercises, UNTERKOERPER, time, level);
  const upperBody = selectExercises(exercises, OBERKOERPER, time, level);
  return [
    [1, lowerBody],
    [1, upperBody],
  ];
}

function threeDaySplit(
  exercises: Exercise[],
  time: number,
  level: string
): [number, Exercise[]][] {
  const push = selectExercises(exercises, PUSH, time, level);
  const pull = selectExercises(exercises, PULL, time, level);
  const beine = selectExercises(exercises, BEINE, time, level);
  return [
    [1, push],
    [1, pull],
    [1, beine],
  ];
}

function fourDaySplit(
  exercises: Exercise[],
  time: number,
  level: string
): [number, Exercise[]][] {
  const lowerBody = selectExercises(exercises, UNTERKOERPER, time, level);
  const upperBody = selectExercises(exercises, OBERKOERPER, time, level);
  return [
    [2, lowerBody],
    [2, upperBody],
  ];
}

function fiveDaySplit(
  exercises: Exercise[],
  time: number,
  level: string
): [number, Exercise[]][] {
  const lowerBody = selectExercises(exercises, UNTERKOERPER, time, level);
  const upperBody = selectExercises(exercises, OBERKOERPER, time, level);
  const push = selectExercises(exercises, PUSH, time, level);
  const pull = selectExercises(exercises, PULL, time, level);
  const beine = selectExercises(exercises, BEINE, time, level);
  return [
    [1, push],
    [1, pull],
    [1, beine],
    [1, lowerBody],
    [1, upperBody],
  ];
}

function sixDaySplit(
  exercises: Exercise[],
  time: number,
  level: string
): [number, Exercise[]][] {
  const push = selectExercises(exercises, PUSH, time, level);
  const pull = selectExercises(exercises, PULL, time, level);
  const beine = selectExercises(exercises, BEINE, time, level);
  return [
    [2, push],
    [2, pull],
    [2, beine],
  ];
}

function sevenDaySplit(
  exercises: Exercise[],
  time: number,
  level: string
): [number, Exercise[]][] {
  const push = selectExercises(exercises, PUSH, time, level);
  const pull = selectExercises(exercises, PULL, time, level);
  const beine = selectExercises(exercises, BEINE, time, level);
  const fullBody = selectExercises(exercises, GANZKOERPER, time, level);
  return [
    [2, push],
    [2, pull],
    [2, beine],
    [1, fullBody],
    [1, fullBody],
  ];
}

function selectExercises(
  exercises: Exercise[],
  split: ExerciseDescription[],
  availableTime: number,
  level: string
): Exercise[] {
  const results: [number, Exercise][] = split.map((description) => {
    const tags = description.tags;
    const matches = exercises
      .filter(
        (exercise) =>
          tags.every((tag) => exercise.tag.includes(tag)) &&
          exercise.level == level
      )
      .sort((a, b) => b.priority - a.priority);
    return [description.priority, matches[0]];
  });
  let numExercises = 0;
  let timeInGym = 0;
  for (const [_, exercise] of results.sort((a, b) => b[0] - a[0])) {
    const restTime = exercise.mechanic == 'Isolation' ? 3 : 4;
    timeInGym += restTime + 1;
    if (timeInGym <= availableTime) numExercises++;
    else break;
  }
  const selectedExercises = results
    .filter(([prio, _]) => prio <= numExercises)
    .map(([_, exercises]) => exercises);
  return selectedExercises;
}
