import {
  type ExerciseWithAlternatives,
  type Exercise,
  type ExerciseDescription,
  type ExercisePlan,
  TrainingGoal,
} from "./types";
import { Level } from "./types";
import { BEINE, GANZKOERPER, OBERKOERPER, PUSH, PULL, UNTERKOERPER } from "$lib/constant";

export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function createSplit(
  exercises: Exercise[],
  daysAWeek: number,
  availableTime: number,
  level: Level,
  goal: TrainingGoal
): ExercisePlan[] {
  switch (daysAWeek) {
    case 1:
      return oneDaySplit(exercises, availableTime, level, goal);
    case 2:
      return twoDaySplit(exercises, availableTime, level, goal);
    case 3:
      return threeDaySplit(exercises, availableTime, level, goal);
    case 4:
      return fourDaySplit(exercises, availableTime, level, goal);
    case 5:
      return fiveDaySplit(exercises, availableTime, level, goal);
    case 6:
      return sixDaySplit(exercises, availableTime, level, goal);
    default:
      return sevenDaySplit(exercises, availableTime, level, goal);
  }
}

function oneDaySplit(exercises: Exercise[], time: number, level: Level, goal: TrainingGoal): ExercisePlan[] {
  const fullBody = selectExercises(exercises, GANZKOERPER, time, level, goal);
  return [{ name: "Ganzkörper", frequency: 1, exercises: fullBody }];
}

function twoDaySplit(exercises: Exercise[], time: number, level: Level, goal: TrainingGoal): ExercisePlan[] {
  const lowerBody = selectExercises(exercises, UNTERKOERPER, time, level, goal);
  const upperBody = selectExercises(exercises, OBERKOERPER, time, level, goal);
  return [
    { name: "Unterkörper", frequency: 2, exercises: lowerBody },
    { name: "Oberkörper", frequency: 2, exercises: upperBody },
  ];
}

function threeDaySplit(exercises: Exercise[], time: number, level: Level, goal: TrainingGoal): ExercisePlan[] {
  const push = selectExercises(exercises, PUSH, time, level, goal);
  const pull = selectExercises(exercises, PULL, time, level, goal);
  const beine = selectExercises(exercises, BEINE, time, level, goal);
  return [
    { name: "Push", frequency: 1, exercises: push },
    { name: "Pull", frequency: 1, exercises: pull },
    { name: "Beine", frequency: 1, exercises: beine },
  ];
}

function fourDaySplit(exercises: Exercise[], time: number, level: Level, goal: TrainingGoal): ExercisePlan[] {
  const lowerBody = selectExercises(exercises, UNTERKOERPER, time, level, goal);
  const upperBody = selectExercises(exercises, OBERKOERPER, time, level, goal);
  return [
    { name: "Unterkörper", frequency: 2, exercises: lowerBody },
    { name: "Oberkörper", frequency: 2, exercises: upperBody },
  ];
}

function fiveDaySplit(exercises: Exercise[], time: number, level: Level, goal: TrainingGoal): ExercisePlan[] {
  const lowerBody = selectExercises(exercises, UNTERKOERPER, time, level, goal);
  const upperBody = selectExercises(exercises, OBERKOERPER, time, level, goal);
  const push = selectExercises(exercises, PUSH, time, level, goal);
  const pull = selectExercises(exercises, PULL, time, level, goal);
  const beine = selectExercises(exercises, BEINE, time, level, goal);
  return [
    { name: "Push", frequency: 1, exercises: push },
    { name: "Pull", frequency: 1, exercises: pull },
    { name: "Beine", frequency: 1, exercises: beine },
    { name: "Unterkörper", frequency: 1, exercises: lowerBody },
    { name: "Oberkörper", frequency: 1, exercises: upperBody },
  ];
}

function sixDaySplit(exercises: Exercise[], time: number, level: Level, goal: TrainingGoal): ExercisePlan[] {
  const push = selectExercises(exercises, PUSH, time, level, goal);
  const pull = selectExercises(exercises, PULL, time, level, goal);
  const beine = selectExercises(exercises, BEINE, time, level, goal);
  return [
    { name: "Push", frequency: 2, exercises: push },
    { name: "Pull", frequency: 2, exercises: pull },
    { name: "Beine", frequency: 2, exercises: beine },
  ];
}

function sevenDaySplit(exercises: Exercise[], time: number, level: Level, goal: TrainingGoal): ExercisePlan[] {
  const push = selectExercises(exercises, PUSH, time, level, goal);
  const pull = selectExercises(exercises, PULL, time, level, goal);
  const beine = selectExercises(exercises, BEINE, time, level, goal);
  const fullBody = selectExercises(exercises, GANZKOERPER, time, level, goal);
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
  level: Level,
  goal: TrainingGoal
): ExerciseWithAlternatives[] {
  const results: [number, ExerciseWithAlternatives][] = split.map((description) => {
    const tags = description.tags;
    const matches = exercises
      .filter((exercise) => tags.every((tag) => exercise.tag.includes(tag)) && levelFromString(exercise.level) <= level)
      .sort((a, b) => a.priority - b.priority);
    const exercise = createExerciseWithAlternatives(
      matches[0],
      matches.slice(1),
      goal,
      description.sets,
      description.warmup
    );
    return [description.priority, exercise];
  });
  let numExercises = 0;
  let timeInGym = 0;
  for (const [_, exercise] of [...results].sort((a, b) => a[0] - b[0])) {
    timeInGym += exercise.totalTime;
    if (timeInGym <= Math.ceil(availableTime)) numExercises++;
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

function createExerciseWithAlternatives(
  exercise: Exercise,
  alternatives: Exercise[],
  goal: TrainingGoal,
  sets: number,
  warmupSet: boolean
): ExerciseWithAlternatives {
  const level = levelFromString(exercise.level);
  const numSets = determineNumSets(exercise, level, goal, sets);
  const reps = determineNumReps(exercise, goal);
  const restTime = determineRestTime(exercise, goal);
  const totalTime = (numSets + (warmupSet ? 1 : 0)) * (restTime + 1);
  return {
    primaryExercise: exercise,
    alternatives,
    sets: numSets,
    warmupSet,
    repetitions: reps,
    restTime,
    totalTime,
  };
}

function determineNumSets(exercise: Exercise, level: Level, goal: TrainingGoal, sets: number): number {
  if (level === Level.Beginner) {
    return Math.max(sets, 3);
  } else if (level === Level.Intermediate) {
    return Math.max(sets, 4);
  } else {
    return goal === TrainingGoal.Strength && exercise.mechanic == "compound" ? sets + 1 : sets;
  }
}

function determineNumReps(exercise: Exercise, goal: TrainingGoal): number[] {
  const isCompound = exercise.mechanic.toLowerCase() === "compound";
  if (goal === TrainingGoal.Hypertrophy) {
    return isCompound ? [8, 10] : [10, 12];
  } else if (goal === TrainingGoal.Strength) {
    return isCompound ? [4, 6] : [8, 10];
  } else return [10, 15];
}

function determineRestTime(exercise: Exercise, goal: TrainingGoal): number {
  const isCompound = exercise.mechanic.toLowerCase() === "compound";
  if (goal === TrainingGoal.Hypertrophy) {
    return isCompound ? 3 : 2.5;
  } else if (goal === TrainingGoal.Strength) {
    return isCompound ? 3.5 : 3;
  } else return isCompound ? 2.5 : 2;
}
