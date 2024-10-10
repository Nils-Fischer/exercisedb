import { generateFilters } from "$lib/constant";
import type { Exercise } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const { exercises } = await parent();

  const filter_fields: (keyof Exercise)[] = ["category", "level", "mechanic"];
  const filters: Map<keyof Exercise, Set<string>> = generateFilters(exercises, filter_fields);

  console.log("Filters were generated.");

  return {
    exercises,
    filters,
  };
};
