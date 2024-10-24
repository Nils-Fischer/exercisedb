import { type Exercise, type Filters } from "$lib/types";
import type { PageServerLoad } from "./$types";

function generateFilters(exercises: Exercise[]): Filters {
  return {
    category: [...new Set(exercises.map((e) => e.category))],
    level: [...new Set(exercises.map((e) => e.level))],
    mechanic: [...new Set(exercises.map((e) => e.mechanic))],
  };
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

  const exercises = (await parent()).exercises;

  const filters = await generateFilters(exercises);

  const filteredExercises = await filterExercises(exercises, searchParams);

  return {
    exercises: filteredExercises,
    filters,
  };
};
