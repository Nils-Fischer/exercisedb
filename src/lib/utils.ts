import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ExerciseWithAlternatives, Exercise, ExerciseDescription, ExercisePlan } from "./types";
import { Level } from "./types";
import { BEINE, GANZKOERPER, OBERKOERPER, PUSH, PULL, UNTERKOERPER } from "../constant";

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
): ExercisePlan[] {
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

function oneDaySplit(exercises: Exercise[], time: number, level: Level): ExercisePlan[] {
  const fullBody = selectExercises(exercises, GANZKOERPER, time, level);
  return [{ name: "Ganzkörper", frequency: 1, exercises: fullBody }];
}

function twoDaySplit(exercises: Exercise[], time: number, level: Level): ExercisePlan[] {
  const lowerBody = selectExercises(exercises, UNTERKOERPER, time, level);
  const upperBody = selectExercises(exercises, OBERKOERPER, time, level);
  return [
    { name: "Unterkörper", frequency: 2, exercises: lowerBody },
    { name: "Oberkörper", frequency: 2, exercises: upperBody },
  ];
}

function threeDaySplit(exercises: Exercise[], time: number, level: Level): ExercisePlan[] {
  const push = selectExercises(exercises, PUSH, time, level);
  const pull = selectExercises(exercises, PULL, time, level);
  const beine = selectExercises(exercises, BEINE, time, level);
  return [
    { name: "Push", frequency: 1, exercises: push },
    { name: "Pull", frequency: 1, exercises: pull },
    { name: "Beine", frequency: 1, exercises: beine },
  ];
}

function fourDaySplit(exercises: Exercise[], time: number, level: Level): ExercisePlan[] {
  const lowerBody = selectExercises(exercises, UNTERKOERPER, time, level);
  const upperBody = selectExercises(exercises, OBERKOERPER, time, level);
  return [
    { name: "Unterkörper", frequency: 2, exercises: lowerBody },
    { name: "Oberkörper", frequency: 2, exercises: upperBody },
  ];
}

function fiveDaySplit(exercises: Exercise[], time: number, level: Level): ExercisePlan[] {
  const lowerBody = selectExercises(exercises, UNTERKOERPER, time, level);
  const upperBody = selectExercises(exercises, OBERKOERPER, time, level);
  const push = selectExercises(exercises, PUSH, time, level);
  const pull = selectExercises(exercises, PULL, time, level);
  const beine = selectExercises(exercises, BEINE, time, level);
  return [
    { name: "Push", frequency: 1, exercises: push },
    { name: "Pull", frequency: 1, exercises: pull },
    { name: "Beine", frequency: 1, exercises: beine },
    { name: "Unterkörper", frequency: 1, exercises: lowerBody },
    { name: "Oberkörper", frequency: 1, exercises: upperBody },
  ];
}

function sixDaySplit(exercises: Exercise[], time: number, level: Level): ExercisePlan[] {
  const push = selectExercises(exercises, PUSH, time, level);
  const pull = selectExercises(exercises, PULL, time, level);
  const beine = selectExercises(exercises, BEINE, time, level);
  return [
    { name: "Push", frequency: 2, exercises: push },
    { name: "Pull", frequency: 2, exercises: pull },
    { name: "Beine", frequency: 2, exercises: beine },
  ];
}

function sevenDaySplit(exercises: Exercise[], time: number, level: Level): ExercisePlan[] {
  const push = selectExercises(exercises, PUSH, time, level);
  const pull = selectExercises(exercises, PULL, time, level);
  const beine = selectExercises(exercises, BEINE, time, level);
  const fullBody = selectExercises(exercises, GANZKOERPER, time, level);
  return [
    { name: "Push", frequency: 2, exercises: push },
    { name: "Pull", frequency: 2, exercises: pull },
    { name: "Beine", frequency: 2, exercises: beine },
    { name: "Ganzkörper", frequency: 1, exercises: fullBody },
  ];
}

function selectExercises(
  exercises: Exercise[],
  split: ExerciseDescription[],
  availableTime: number,
  level: Level
): ExerciseWithAlternatives[] {
  const results: [number, ExerciseWithAlternatives][] = split.map((description) => {
    const tags = description.tags;
    const matches = exercises
      .filter((exercise) => tags.every((tag) => exercise.tag.includes(tag)) && levelFromString(exercise.level) <= level)
      .sort((a, b) => a.priority - b.priority);
    const exercise: ExerciseWithAlternatives = {
      primaryExercise: matches[0],
      alternatives: matches.slice(1),
    };
    return [description.priority, exercise];
  });
  let numExercises = 0;
  let timeInGym = 0;
  for (const [_, exercise] of results.sort((a, b) => a[0] - b[0])) {
    const restTime = exercise.primaryExercise.mechanic == "Isolation" ? 3 : 4;
    timeInGym += restTime + 1;
    if (timeInGym <= availableTime) numExercises++;
    else break;
  }
  const selectedExercises = results.filter(([prio, _]) => prio <= numExercises).map(([_, exercises]) => exercises);
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
