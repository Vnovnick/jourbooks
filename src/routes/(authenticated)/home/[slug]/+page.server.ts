import { expressServerURL } from "$lib/endpointAssets.js";
import { redirect } from "@sveltejs/kit";
import axios from "axios";

export const load = async ({ params, cookies }) => {
  const { slug } = params;
  const userSessionCookie = cookies.get("session_id");
  let userData;
  let bookData;
  let olData;

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
      .get(`${expressServerURL}/v1/book/shelved/${slug}:${userData.id}`)
      .then((res) => res.data);
    bookData = bookRes;
  } catch (error) {
    console.log(`failure to load data for book ${slug}`, error);
  }

  try {
    const olRes = await axios
      .get(`https://openlibrary.org/works/${bookData.olid}.json`)
      .then((res) => res.data);
    olData = olRes;
  } catch (error) {
    console.log("error fetching OL book", error);
  }

  return {
    slug,
    userData,
    bookData,
    olData,
  };
};
