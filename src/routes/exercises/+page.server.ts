import { generateFilters } from "$lib/constant";
import { type Exercise } from "$lib/types";
import type { PageServerLoad } from "./$types";
import { EXERCISE_CACHE_DURATION, getValue, setValue } from "$lib/server/redis";

async function generateAndCacheFilters(
  exercises: Exercise[],
  filterFields: readonly ("category" | "level" | "mechanic")[]
): Promise<Map<keyof Exercise, Set<string>>> {
  const filters = generateFilters(exercises, filterFields);
  await setValue("exercises:filters", filters, EXERCISE_CACHE_DURATION);
  return filters;
}

async function filterExercises(
  exercises: Exercise[],
  filterFields: readonly ("category" | "level" | "mechanic")[],
  searchParams: URLSearchParams
): Promise<Exercise[]> {
  return exercises.filter((exercise) => {
    return filterFields.every((field) => {
      const paramValues = searchParams.getAll(field.toString());
      if (paramValues.length === 0) return true;

      const exerciseValue = exercise[field];
      return Array.isArray(exerciseValue)
        ? exerciseValue.some((value) => paramValues.includes(value.toString()))
        : paramValues.includes(exerciseValue.toString());
    });
  });
}

export const load: PageServerLoad = async ({ parent, url }) => {
  const searchParams = new URLSearchParams(url.search);
  const cacheKey = `exercises:filtered:${searchParams.toString()}`;

  const [cachedfilteredExercises, cachedFilters] = await Promise.all([
    getValue<Exercise[]>(cacheKey),
    getValue<Map<keyof Exercise, Set<string>>>("exercises:filters"),
  ]);

  if (cachedfilteredExercises && cachedFilters) {
    console.log("Returning fully cached results");
    return {
      exercises: cachedfilteredExercises,
      filters: cachedFilters,
    };
  }

  const exercises = (await parent()).exercises;
  const filterFields = ["category", "level", "mechanic"] as const;

  const filters = cachedFilters || (await generateAndCacheFilters(exercises, filterFields));

  if (cachedfilteredExercises) {
    return {
      exercises: cachedfilteredExercises,
      filters,
    };
  }

  const filteredExercises = await filterExercises(exercises, filterFields, searchParams);

  await setValue(cacheKey, filteredExercises, EXERCISE_CACHE_DURATION);

  return {
    exercises: filteredExercises,
    filters,
  };
};
