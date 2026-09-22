/*
 * The reporter's ANSI, rendered as HTML.
 *
 * Used twice: at build time for the static run on the cross-file example, and
 * in the browser for the live demo. Both paint into a `pre.out`, whose
 * stylesheet holds the shades for the classes below.
 *
 * The human reporter emits six SGR codes and nothing else: reset, bold, dim
 * and red/green/yellow. Rather than pull in a converter, map those onto
 * classes and let the stylesheet pick the shades.
 */

const ANSI_CLASS: Record<string, string> = {
  "1": "b",
  "2": "d",
  "31": "red",
  "32": "green",
  "33": "yellow",
};

const escape = (part: string) =>
  part.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Escape, then reopen a span for whatever the current SGR state is. */
export function ansiToHtml(text: string): string {
  let html = "";
  let open = false;
  let last = 0;

  for (const match of text.matchAll(/\u001b\[([0-9;]*)m/g)) {
    html += escape(text.slice(last, match.index));
    last = match.index + match[0].length;

    if (open) {
      html += "</span>";
      open = false;
    }
    // `0` (and a bare `[m`) resets; anything else we know opens a span.
    const classes = match[1]
      .split(";")
      .map((code) => ANSI_CLASS[code])
      .filter(Boolean);
    if (classes.length > 0) {
      html += `<span class="${classes.join(" ")}">`;
      open = true;
    }
  }

  html += escape(text.slice(last));
  return open ? html + "</span>" : html;
}
