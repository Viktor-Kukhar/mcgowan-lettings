"use client";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: "120px 24px 80px", maxWidth: 800, margin: "0 auto", fontFamily: "monospace" }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Blog post error (debug)</h1>
      <p style={{ marginBottom: 8 }}><strong>message:</strong> {error.message || "(no message)"}</p>
      <p style={{ marginBottom: 8 }}><strong>name:</strong> {error.name}</p>
      <p style={{ marginBottom: 8 }}><strong>digest:</strong> {error.digest || "(none)"}</p>
      <pre style={{ whiteSpace: "pre-wrap", background: "#f5f5f5", padding: 12, fontSize: 12, marginTop: 16 }}>
        {error.stack || "(no stack)"}
      </pre>
      <button onClick={() => reset()} style={{ marginTop: 16, padding: "8px 16px" }}>Retry</button>
    </div>
  );
}
