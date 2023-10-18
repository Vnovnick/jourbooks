import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies }) => {
  const userSessionCookie = cookies.get("session_id");
  if (!userSessionCookie) {
    throw redirect(303, "/");
  }
};
