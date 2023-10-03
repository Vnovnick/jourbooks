import { json } from "@sveltejs/kit";
import axios from "axios";
export const GET = async ({ request }) => {
  const authHeader = request.headers.get("Authorization");

  if (authHeader != "myheader") {
    return new Response(JSON.stringify({ message: "invalid auth" }), {
      status: 401,
    });
  }

  const res = await axios.get("http://localhost:3000/");

  return new Response(JSON.stringify(res.data), { status: 200 });
};

export const POST = async ({ request }) => {
  const body = await request.json();
  const authHeader = request.headers.get("Authorization");

  if (authHeader != "myheader") {
    return new Response(JSON.stringify({ message: "invalid auth" }), {
      status: 401,
    });
  }
  // const res = await fetch("http://localhost:3000/", {
  //   method: "POST",
  //   mode: "cors", // this cannot be 'no-cors'
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(body),
  // }).then((res) => res.json());
  const res = await axios.post("http://localhost:3000/", body);
  console.log(res.data);

  return new Response(JSON.stringify(res.data), { status: 201 });
};
