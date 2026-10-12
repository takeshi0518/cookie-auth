import { cookies } from "next/headers";
import { SESSION_COOKIE } from "./session";
import { findByUserById } from "./users";

export function getCurrentUser() {
  const userId = cookies().get(SESSION_COOKIE)?.value;
  return userId ? findByUserById(userId) : null;
}
