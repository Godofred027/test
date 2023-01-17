import { url } from "./urlFecth";

export default async function getToken() {
  let token;
  const res = await fetch(`${url}/auth/refresh`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (res.status === 200) {
    token = await res.json();
  }

  return token;
}
