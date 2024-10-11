import { supabase } from "$lib/server/supabaseClient";
import type { Exercise } from "$lib/types";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
  console.log("Layout server load function started");
  const { session } = await safeGetSession();

  try {
    const { data, error } = await supabase.from("exercises").select("*");
    let exercises: Exercise[] = [];
    if (error) {
      console.error("Error fetching exercises:", error);
    } else {
      console.log("Successfully imported Exercises. Count:", data.length);
      exercises = data as Exercise[];
    }

    return {
      session,
      cookies: cookies.getAll(),
      exercises,
    };
  } catch (e) {
    console.error("Unexpected error in layout load function:", e);
    throw e;
  }
};
