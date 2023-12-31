import axios from "axios";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  register: async ({ request }) => {
    let formError: string = "Error Creating New User";
    const formData = await request.formData();
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!username || !email || !password || !confirmPassword) {
      return fail(404, { error: "Please fill out all values." });
    }

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
      .post("http://localhost:3000/v1/register", body)
      .catch((error) => {
        console.log(error);
        formError = error.response.data.message;
        return fail(500, { error: formError });
      });
    if (res.status === 201) throw redirect(303, "/home");
    return fail(500, { error: formError });
  },
};
