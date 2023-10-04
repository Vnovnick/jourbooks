import { fail, error } from "@sveltejs/kit";
import axios from "axios";

export const actions = {
  async register({ request }) {
    const formData = await request.formData();
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // if (password !== confirmPassword) {
    //   return fail(422, {
    //     error: "Passwords do not match",
    //   });
    // }

    const body = {
      username,
      email,
      password,
      confirmPassword,
    };

    const res = await axios.post("http://localhost:3000", body);

    if (res.status === 500) {
      return fail(500, res.data);
    }

    return { success: true };
  },
};
