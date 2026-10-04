import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Cookie認証の学習</h1>
      <Link href="/dashboard">ダッシュボードへ</Link>
    </main>
  );
}
