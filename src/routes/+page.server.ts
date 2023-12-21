import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies }) => {
  const userSessionCookie = cookies.get("session_id");

  // let userSessionId: string;
  if (userSessionCookie) {
    throw redirect(303, "/home");
  }
};

export const actions = {
  logout: async ({ cookies }) => {
    cookies.delete("session_id");
    if (!cookies.get("session_id")) throw redirect(303, "/");
  },
};
