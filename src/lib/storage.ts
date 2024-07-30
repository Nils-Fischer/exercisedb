import type { Exercise } from "./types";

const storage = new Map<string, [number, Exercise[][]][]>();

export function setWorkoutSplit(id: string, split: [number, Exercise[][]][]) {
  storage.set(id, split);
  console.log(`Setting workout split for id: ${id}`);
  console.log(storage.get(id));
}

export function getWorkoutSplit(
  id: string
): [number, Exercise[][]][] | undefined {
  console.log(`Getting workout split for id: ${id}`);
  return storage.get(id);
}
