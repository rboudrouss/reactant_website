/*
 * The three superscripts the notes beside the live example refer to, dropped
 * into the analyzer's real output after the token each note explains: the
 * file, the severity word, the trace step.
 *
 * Used twice: at build time on the first example, and in the browser after
 * every re-run, so the marks survive the visitor's edits. Each insertion is
 * skipped rather than guessed when the output has no such token (a clean run
 * has neither a severity nor a step) or a release moves it, so the output
 * stays verbatim and at worst a note loses its mark.
 */
export function annotate(html: string): string {
  const once = (re: RegExp, sup: number) => {
    html = html.replace(re, (m) => `${m}<sup>${sup}</sup>`);
  };
  // The file, on the component line. The class span, when there is one,
  // closes right after the path; the mark goes outside it.
  once(/src\/\w+\.tsx?(?:<\/span>)?/, 1);
  // The severity word. The reporter pads `warn` to the width of `error`, so
  // the padding rides along inside the span and the mark lands after it.
  once(/(?:error|warn)\s*(?:<\/span>)?/, 2);
  // The first trace step: the line the arrow opens.
  once(/^.*→.*$/m, 3);
  return html;
}
