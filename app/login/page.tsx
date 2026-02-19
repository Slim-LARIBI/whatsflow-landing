// app/login/page.tsx
import { Suspense } from "react";
import LoginClient from "./LoginClient";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24, color: "#EAF0FF" }}>Loading…</div>}>
      <LoginClient />
    </Suspense>
  );
}