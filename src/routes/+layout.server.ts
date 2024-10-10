import { supabase } from "$lib/server/supabaseClient";
import type { Exercise } from "$lib/types";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
  console.log("Layout server load function started");

  try {
    const { data, error } = await supabase.from("exercises").select("*");

    if (error) {
      console.error("Error fetching exercises:", error);
      return {
        exercises: [],
      };
    }

    console.log("Successfully imported Exercises. Count:", data.length);
    const exercises = data as Exercise[];

    return {
      exercises,
    };
  } catch (e) {
    console.error("Unexpected error in layout load function:", e);
    throw e;
  }
};
