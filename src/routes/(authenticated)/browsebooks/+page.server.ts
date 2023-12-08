import { redirect } from "@sveltejs/kit";

export const actions = {
  search: async ({ request }) => {
    const formData = await request.formData();
    const search = formData.get("book-search") as string;
    console.log(search);
  },
  logout: async ({ cookies }) => {
    cookies.delete("session_id");
    if (!cookies.get("session_id")) throw redirect(303, "/");
  },
};
