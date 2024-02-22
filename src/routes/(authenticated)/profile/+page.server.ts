import { expressServerURL } from "$lib/endpointAssets.js";
import { redirect } from "@sveltejs/kit";
import axios from "axios";

export const load = async ({ cookies }) => {
  const userSessionCookie = cookies.get("session_id");
  let journalEntries;

  if (!userSessionCookie) {
    throw redirect(303, "/");
  }

  try {
    const journalRes = await axios
      .get(
        `${expressServerURL}/v1/book/shelved/journal/all/${userSessionCookie}`
      )
      .then((res) => res.data);
    journalEntries = journalRes;
  } catch (error) {
    console.log(`failure to load journal entries`, error);
  }

  return { journalEntries };
};
