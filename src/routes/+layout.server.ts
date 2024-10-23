import { getValue, setValue } from "$lib/server/redis";
import { supabase } from "$lib/server/supabaseClient";
import type { Exercise, Gender, Profile } from "$lib/types";
import type { LayoutServerLoad } from "./$types";

async function getProfileById(id: string | undefined): Promise<Profile | null> {
  if (id === undefined) return null;
  const cachedProfile = await getValue<Profile>(`profile_${id}`);
  if (cachedProfile) return cachedProfile;

  const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
  if (!data) return null;

  const profile: Profile = {
    firstName: data.first_name,
    lastName: data.last_name,
    age: data.age,
    gender: data.gender as Gender,
  };
  // cache for 5 minutes
  setValue(`profile_${id}`, profile, 300);
  return profile;
}

async function getAllExercises(): Promise<Exercise[] | null> {
  const cachedExercises = await getValue<Exercise[]>("exercises");
  if (cachedExercises) {
    console.log("Exercises recovered from cache");
    return cachedExercises;
  }
  const { data, error } = await supabase.from("exercises").select("*");
  if (error) {
    console.error("Error fetching exercises:", error);
    return null;
  } else if (!data) return null;

  console.log("Successfully imported Exercises. Count:", data.length);
  const exercises = data as Exercise[];
  // cache for one day
  console.log("Caching results...");
  await setValue("exercises", exercises, 86400);
  return exercises;
}

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
  console.log("Layout server load function started");
  const { session } = await safeGetSession();

  return {
    session,
    cookies: cookies.getAll(),
    exercises: (await getAllExercises()) || [],
    profile: await getProfileById(session?.user.id),
  };
};
