import { type Exercise, type Filters } from "$lib/types";
import type { PageServerLoad } from "./$types";
import { EXERCISE_CACHE_DURATION, getValue, setValue } from "$lib/server/redis";

function generateFilters(exercises: Exercise[]): Filters {
  return {
    category: [...new Set(exercises.map((e) => e.category))],
    level: [...new Set(exercises.map((e) => e.level))],
    mechanic: [...new Set(exercises.map((e) => e.mechanic))],
  };
}

async function generateAndCacheFilters(exercises: Exercise[]): Promise<Filters> {
  const filters = generateFilters(exercises);
  await setValue("exercises:filters", filters, EXERCISE_CACHE_DURATION);
  return filters;
}

async function filterExercises(exercises: Exercise[], searchParams: URLSearchParams): Promise<Exercise[]> {
  return exercises.filter((exercise) => {
    const filterFields = ["category", "level", "mechanic"];
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
    getValue<Filters>("exercises:filters"),
  ]);

  if (cachedfilteredExercises && cachedFilters) {
    console.log("Returning fully cached results");
    return {
      exercises: cachedfilteredExercises,
      filters: cachedFilters,
    };
  }

  const exercises = (await parent()).exercises;

  const filters = cachedFilters || (await generateAndCacheFilters(exercises));

  if (cachedfilteredExercises) {
    return {
      exercises: cachedfilteredExercises,
      filters,
    };
  }

  const filteredExercises = await filterExercises(exercises, searchParams);

  await setValue(cacheKey, filteredExercises, EXERCISE_CACHE_DURATION);

  return {
    exercises: filteredExercises,
    filters,
  };
};
