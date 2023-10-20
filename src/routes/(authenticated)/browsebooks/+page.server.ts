import axios from "axios";

export const actions = {
  search: async ({ request }) => {
    const formData = await request.formData();
    const search = formData.get("book-search") as string;
    console.log(search);
  },
};
