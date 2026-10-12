type Props = {
  searchParams: { callbackUrl?: string; error?: string };
};

export default function LoginPage({ searchParams }: Props) {
  const callbackUrl = searchParams.callbackUrl ?? "/dashboard";

  return (
    <main>
      <h1>ログイン</h1>
      {searchParams.error && <p>メールアドレスまたはパスワードが違います</p>}
      <form method="post" action="/api/login">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div>
          <label>
            メールアドレス
            <input type="email" name="email" required />
          </label>
        </div>

        <div>
          <label>
            パスワード
            <input type="password" name="password" required />
          </label>
        </div>
        <button type="submit">ログイン</button>
      </form>
    </main>
  );
}
