import { fail, redirect } from "@sveltejs/kit";
import axios from "axios";
import { dev } from "$app/environment";

export const actions = {
  login: async ({ request, cookies }) => {
    let formError: string = "Error With User Login";
    const formData = await request.formData();
    const email = formData.get("loginEmail") as string;
    const password = formData.get("loginPassword") as string;
    const body = {
      email,
      password,
    };

    const res = await axios
      .post("http://localhost:3000/login", body)
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

  register: async ({ request }) => {
    let formError: string = "Error Creating New User";
    const formData = await request.formData();
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const body = {
      username,
      email,
      password,
      confirmPassword,
    };
    if (password.length < 6) {
      return fail(400, {
        error: "Password must be at least 6 characters",
      });
    } else if (password !== confirmPassword) {
      return fail(400, {
        error: "Passwords do not match",
      });
    }

    const res = await axios
      .post("http://localhost:3000/register", body)
      .catch((error) => {
        console.log(error);
        formError = error.response.data.message;
        return fail(500, { error: formError });
      });
    if (res.status === 201) return { success: true };
    return fail(500, { error: formError });
  },
};
