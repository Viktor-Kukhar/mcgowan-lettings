/**
 * Safely serialise JSON data for embedding in an inline <script> tag.
 *
 * `JSON.stringify` doesn't escape `<` or `</script>`. A property title or
 * blog post description containing the literal sequence `</script>` would
 * break out of the script element and execute as HTML. Today the only
 * input is admin-controlled, but the failure mode is destructive enough
 * (XSS) that escaping here is cheaper than auditing every JSON-LD source.
 *
 * Also escapes U+2028 (LINE SEPARATOR) and U+2029 (PARAGRAPH SEPARATOR).
 * JSON.parse accepts them, but they were historically illegal inside
 * JavaScript string literals (the spec was relaxed in ES2019); defence
 * in depth for any consumer that still pre-dates that update.
 */
const LINE_SEP = String.fromCharCode(0x2028);
const PARA_SEP = String.fromCharCode(0x2029);

export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replaceAll(LINE_SEP, "\\u2028")
    .replaceAll(PARA_SEP, "\\u2029");
}
