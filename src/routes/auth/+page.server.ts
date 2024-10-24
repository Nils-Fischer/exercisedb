import { fail, redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";
import { AuthApiError, type Provider } from "@supabase/supabase-js";

const OAUTH_PROVIDERS = ["google", "discord", "github"];

export const actions: Actions = {
  signup: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error(error);
      if (error instanceof AuthApiError && error.status === 400) {
        return fail(400, { error: "Invalid email or password" });
      }
      return fail(500, { error: "Something went wrong. Please try again later" });
    }
    return { success: true };
  },
  login: async ({ request, locals: { supabase }, url }) => {
    const provider = url.searchParams.get("provider") as Provider;
    const formData = await request.formData();
    const redirectTo = (formData.get("redirectTo") || url.toString()) as string;
    if (provider) {
      if (!OAUTH_PROVIDERS.includes(provider)) {
        return fail(400, { error: "Provider not supported" });
      }
      const { data, error: err } = await supabase.auth.signInWithOAuth({ provider: provider, options: { redirectTo } });
      if (err) {
        console.log(err);
        return fail(400, { message: `Authentication with ${provider} failed` });
      }
      throw redirect(303, data.url);
    }

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error(error);
      if (error instanceof AuthApiError && error.status === 400) {
        return fail(400, { error: "Invalid email or password" });
      }
      return fail(500, { error: "Something went wrong. Please try again later" });
    }
    return { success: true };
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
  logout: async ({ locals: { supabase } }) => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      return fail(400);
    }
    return { success: true };
  },
};
