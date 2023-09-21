import { fail } from "@sveltejs/kit";

export const actions = {
  async create({ request }) {
    const formData = await request.formData();
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const pass = formData.get("password") as string;
    const confirmPass = formData.get("confirmPass") as string;

    if (pass !== confirmPass) {
      return fail(422, {
        error: "Passwords do not match",
      });
    }

    console.log({ username, email, pass, confirmPass });
  },
};
