import { expressServerURL } from "$lib/endpointAssets.js";
import { redirect } from "@sveltejs/kit";
import axios from "axios";

export const load = async ({ cookies }) => {
  const userSessionCookie = cookies.get("session_id");
  let userData;
  let bookData;

  if (!userSessionCookie) {
    throw redirect(303, "/");
  }

  try {
    const userRes = await axios
      .get(`${expressServerURL}/v1/user/${userSessionCookie}`)
      .then((res) => res.data);
    userData = userRes;
  } catch (error) {
    console.log(`failure to load user data`, error);
  }

  try {
    const bookRes = await axios
      .get(`${expressServerURL}/v1/book/shelved/all/${userData.id}`)
      .then((res) => res.data);
    bookData = bookRes;
  } catch (error) {
    console.log(`failure to user book data`, error);
  }

  return { userData, bookData };
};
