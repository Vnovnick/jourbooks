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
  const res = await axios.post("http://localhost:3000/", body);

  return new Response(JSON.stringify(res.data), { status: 201 });
};
