import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getCurrentUser();

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
