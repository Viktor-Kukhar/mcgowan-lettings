import { Resend } from "resend";

/**
 * Lazy Resend client.
 *
 * Why lazy
 * --------
 * The Resend SDK doesn't validate the API key at construction; it fails on
 * send with whatever 401 the API returns. If `RESEND_API_KEY` is missing in
 * production we'd silently never email David, while the form still returns
 * success to the user (the DB insert worked).
 *
 * Constructing lazily lets us:
 *   1. Avoid evaluating env at module-load time, which `next build` runs
 *      with potentially-different env than runtime.
 *   2. Throw a clear error at first use, which the form actions already
 *      catch and log around `resend.emails.send()` — David's lead is still
 *      saved to the DB, but now the missing-key cause is obvious in logs
 *      instead of buried in a Resend SDK error.
 */
let cachedClient: Resend | null = null;

export function getResend(): Resend {
  if (cachedClient) return cachedClient;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error(
      "RESEND_API_KEY is not set — email notifications cannot be sent. " +
        "The form submission has still been saved to Supabase."
    );
  }
  cachedClient = new Resend(key);
  return cachedClient;
}
