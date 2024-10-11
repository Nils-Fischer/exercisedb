import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const { exercises } = await parent();
  return { exercises };
};
