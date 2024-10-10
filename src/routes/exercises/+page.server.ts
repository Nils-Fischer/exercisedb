import { generateFilters } from "$lib/constant";
import type { Exercise } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent, url }) => {
  const { exercises } = await parent();

  const filter_fields: (keyof Exercise)[] = ["category", "level", "mechanic"];
  const filters: Map<keyof Exercise, Set<string>> = generateFilters(exercises, filter_fields);

  // Apply filters based on URL parameters
  const filteredExercises = exercises.filter((exercise) => {
    return filter_fields.every((field) => {
      const paramValues = url.searchParams.getAll(field.toString());
      if (paramValues.length === 0) return true;
      const exerciseValue = exercise[field];
      return Array.isArray(exerciseValue)
        ? exerciseValue.some((value) => paramValues.includes(value.toString()))
        : paramValues.includes(exerciseValue.toString());
    });
  });

  // Apply search filter if present
  const searchQuery = url.searchParams.get("search");
  const searchFilteredExercises = searchQuery
    ? filteredExercises.filter((exercise) => exercise.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : filteredExercises;

  console.log("Filters applied. Filtered exercises count:", searchFilteredExercises.length);

  return {
    exercises: searchFilteredExercises,
    filters,
  };
};
