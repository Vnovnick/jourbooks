import { fail, redirect } from "@sveltejs/kit";
import axios from "axios";
import { dev } from "$app/environment";
import { expressServerURL } from "$lib/endpointAssets";

export const actions = {
  login: async ({ request, cookies }) => {
    let formError: string = "Error With User Login";
    const formData = await request.formData();
    const email = formData.get("loginEmail") as string;
    const password = formData.get("loginPassword") as string;

    if (!email || !password) {
      return fail(404, { error: "Email or Password values are missing." });
    }

    const body = {
      email,
      password,
    };

    const res = await axios
      .post(`${expressServerURL}/v1/login`, body)
      .catch((error) => {
        console.log(error);
        formError = error.response.data?.message;
        return fail(500, { error: formError });
      });
    if (res.status === 200) {
      // not tested yet (10/16)
      console.log("User Logged in -", JSON.stringify(res.data));
      cookies.set("session_id", res.data.id, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: !dev,
        maxAge: 60 * 60 * 24 * 7,
      });
      throw redirect(303, "/home");
      // return { success: true, data: "Successfully logged in!" };
    }
    return fail(500, { error: formError });
  },
};
