import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Exercise, ExerciseDescription } from "./types";
import { Level } from "./types";
import {
  BEINE,
  GANZKOERPER,
  OBERKOERPER,
  PUSH,
  PULL,
  UNTERKOERPER,
} from "../constant";

export async function generateRandomSHA256Hash(): Promise<string> {
  // Generate a random array of bytes
  const randomBytes = new Uint8Array(32);
  crypto.getRandomValues(randomBytes);

  // Hash the random bytes
  const hashBuffer = await crypto.subtle.digest("SHA-256", randomBytes);

  // Convert the hash to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function createSplit(
  exercises: Exercise[],
  daysAWeek: number,
  availableTime: number,
  level: string
): [number, Exercise[][]][] {
  const lvl = levelFromString(level);
  switch (daysAWeek) {
    case 1:
      return oneDaySplit(exercises, availableTime, lvl);
    case 2:
      return twoDaySplit(exercises, availableTime, lvl);
    case 3:
      return threeDaySplit(exercises, availableTime, lvl);
    case 4:
      return fourDaySplit(exercises, availableTime, lvl);
    case 5:
      return fiveDaySplit(exercises, availableTime, lvl);
    case 6:
      return sixDaySplit(exercises, availableTime, lvl);
    default:
      return sevenDaySplit(exercises, availableTime, lvl);
  }
}

function oneDaySplit(
  exercises: Exercise[],
  time: number,
  level: Level
): [number, Exercise[][]][] {
  const fullBody = selectExercises(exercises, GANZKOERPER, time, level);
  return [[1, fullBody]];
}

function twoDaySplit(
  exercises: Exercise[],
  time: number,
  level: Level
): [number, Exercise[][]][] {
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
  level: Level
): [number, Exercise[][]][] {
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
  level: Level
): [number, Exercise[][]][] {
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
  level: Level
): [number, Exercise[][]][] {
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
  level: Level
): [number, Exercise[][]][] {
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
  level: Level
): [number, Exercise[][]][] {
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
  level: Level
): Exercise[][] {
  const results: [number, Exercise[]][] = split.map((description) => {
    const tags = description.tags;
    const matches = exercises
      .filter(
        (exercise) =>
          tags.every((tag) => exercise.tag.includes(tag)) &&
          levelFromString(exercise.level) <= level
      )
      .sort((a, b) => a.priority - b.priority);
    return [description.priority, matches];
  });
  let numExercises = 0;
  let timeInGym = 0;
  for (const [_, exercise] of results.sort((a, b) => a[0] - b[0])) {
    const restTime = exercise[0].mechanic == "Isolation" ? 3 : 4;
    timeInGym += restTime + 1;
    if (timeInGym <= availableTime) numExercises++;
    else break;
  }
  const selectedExercises = results
    .filter(([prio, _]) => prio <= numExercises)
    .map(([_, exercises]) => exercises);
  return selectedExercises;
}

function levelFromString(level: string): Level {
  switch (level.toLowerCase()) {
    case "beginner":
    case "anfänger":
      return Level.Beginner;
    case "intermediate":
    case "fortgeschritten":
      return Level.Intermediate;
    case "expert":
    case "experte":
      return Level.Expert;
    default:
      throw new Error(`level: ${level}, is not defined`);
  }
}
