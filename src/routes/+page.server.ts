import { fail } from "@sveltejs/kit";

export const actions = {
  async create({ request }) {
    const formData = await request.formData();
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      return fail(422, {
        error: "Passwords do not match",
      });
    }

    console.log({ username, email, password, confirmPassword });
  },
};
