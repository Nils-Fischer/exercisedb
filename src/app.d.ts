import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import type { Exercise, Profile } from "$lib/types";
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      supabase: SupabaseClient;
      safeGetSession: () => Promise<{ session: Session | null; user: User | null }>;
      session: Session | null;
      user: User | null;
      profile: Profile | null;
      exercises: Exercise[];
    }
    interface PageData {
      session: Session | null;
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
