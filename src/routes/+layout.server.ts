import { getAllExercises } from "$lib/server/exerciseCache";
import { getValue, setValue } from "$lib/server/redis";
import { supabase } from "$lib/server/supabaseClient";
import { type Gender, type Profile } from "$lib/types";
import type { LayoutServerLoad } from "./$types";

async function getProfileById(id: string | undefined): Promise<Profile | null> {
  if (id === undefined) return null;
  const cachedProfile = await getValue<Profile>(`profile:${id}`);
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
  setValue(`profile:${id}`, profile, 300);
  return profile;
}

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
  console.log("Layout server load function started");
  const { session } = await safeGetSession();

  return {
    session,
    cookies: cookies.getAll(),
    exercises: (await getAllExercises(supabase)) || [],
    profile: await getProfileById(session?.user.id),
  };
};
