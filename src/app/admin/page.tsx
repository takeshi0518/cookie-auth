import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function Admin() {
  const user = getCurrentUser();

  if (!user) {
    redirect("/login?callbackUrl=/admin");
  }

  if (user.role !== "ADMIN") {
    return (
      <main>
        <h1>403</h1>
        <p>このページを表示する権限がありません</p>
      </main>
    );
  }

  return (
    <main>
      <h1>管理画面</h1>
      <p>管理者: {user.email}</p>
    </main>
  );
}
