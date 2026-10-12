const encoder = new TextEncoder();

async function getKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRETが設定されていません。");
  }
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function fromHex(hex: string): Uint8Array | null {
  if (!/^[0-9a-f]+$/.test(hex) || hex.length % 2 !== 0) return null;
  const pairs = hex.match(/.{2}/g) ?? [];
  return new Uint8Array(pairs.map((h) => parseInt(h, 16)));
}

export async function sign(value: string): Promise<string> {
  const key = await getKey();
  const signnature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(value)
  );
  return `${value}.${toHex(signnature)}`;
}

export async function unsign(signed: string): Promise<string | null> {
  const dot = signed.lastIndexOf(".");
  if (dot === -1) return null;

  const value = signed.slice(0, dot);
  const signature = fromHex(signed.slice(dot + 1));
  if (!signature) return null;

  const key = await getKey();
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    signature,
    encoder.encode(value)
  );
  return valid ? value : null;
}
