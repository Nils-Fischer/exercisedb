import { fail } from "@sveltejs/kit";

import type { Actions } from "./$types";

export const actions: Actions = {
  signup: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error(error);
      return fail(400);
    } else {
      return { success: true };
    }
  },
  login: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error(error);
      return fail(400);
    } else {
      return { success: true };
    }
  },
  resetPassword: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const redirectTo = (formData.get("redirectTo") || "/") as string;

    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) {
      console.log(error);
      return fail(400);
    } else {
      return { success: true };
    }
  },
  updatePassword: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const newPassword = formData.get("newPassword") as string;
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error && error.code !== "same_password") {
      console.log(error);
      return fail(400);
    } else {
      return { success: true };
    }
  },
};
