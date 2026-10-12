import { cookies } from "next/headers";
import { SESSION_COOKIE } from "./session";
import { findByUserById } from "./users";
import { unsign } from "./sign";

export async function getCurrentUser() {
  const raw = cookies().get(SESSION_COOKIE)?.value;
  if (!raw) return null;

  const userId = await unsign(raw);
  return userId ? findByUserById(userId) : null;
}
