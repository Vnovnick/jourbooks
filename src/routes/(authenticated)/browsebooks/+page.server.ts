import { expressServerURL } from "$lib/endpointAssets.js";
import { fail, redirect } from "@sveltejs/kit";
import axios from "axios";

export const load = async ({ cookies }) => {
  const userSessionCookie = cookies.get("session_id");

  if (!userSessionCookie) {
    throw redirect(303, "/");
  }
  const res = await axios
    .get(`${expressServerURL}/v1/user/${userSessionCookie}`)
    .catch((error) => {
      console.log(error);
      return fail(500, { error: "Error retrieving user" });
    });

  return res.data;
};

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
