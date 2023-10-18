import { redirect } from "@sveltejs/kit";

export const actions = {
  logout: async ({ cookies }) => {
    cookies.delete("session_id");
    if (!cookies.get("session_id")) throw redirect(303, "/");
  },
};
