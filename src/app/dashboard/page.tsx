import { SESSION_COOKIE } from "@/lib/session";
import { findByUserById } from "@/lib/users";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const userId = cookies().get(SESSION_COOKIE)?.value;
  const user = userId ? findByUserById(userId) : null;

  if (!user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  return (
    <main>
      <h1>ダッシュボード</h1>
      <p>ログイン中: {user.email}</p>
      <p>ロール: {user.role}</p>

      <form method="POST" action="/api/logout">
        <button type="submit">ログアウト</button>
      </form>
    </main>
  );
}
