import { expressServerURL } from "$lib/endpointAssets.js";
import { fail, redirect } from "@sveltejs/kit";
import axios from "axios";

export const load = async ({ cookies }) => {
  const userSessionCookie = cookies.get("session_id");

  if (!userSessionCookie) {
    throw redirect(303, "/");
  }
  const userRes = await axios
    .get(`${expressServerURL}/v1/user/${userSessionCookie}`)
    .catch((error) => {
      console.log(error);
      return fail(500, { error: "Error retrieving user" });
    });

  const shelvedBooks = await axios.get(
    `${expressServerURL}/v1/book/read/${userSessionCookie}`
  );

  console.log(shelvedBooks.data);

  return { userData: userRes.data, bookData: shelvedBooks.data };
};
