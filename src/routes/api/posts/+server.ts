import { json } from "@sveltejs/kit";
export const GET = async ({ request }) => {
  const authHeader = request.headers.get("Authorization");

  if (authHeader != "myheader") {
    return new Response(JSON.stringify({ message: "invalid header" }), {
      status: 401,
    });
  }

  const res = await fetch("http://localhost:3000/");
  const data = await res.json();

  return new Response(JSON.stringify(data), { status: 200 });
};
