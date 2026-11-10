/*
 * Copyright (c) 2026 Linus-Alexander Maximilian Gubenis
 * All rights reserved. Use is permitted under the terms in LICENSE at the
 * repository root; modifying or redistributing a changed copy is not.
 */

// After `write_artifact` or `patch_artifact`: if the compiler found an ERROR in what was written,
// hand it back to Claude (exit 2, stderr) so the next step is fixing it, not
// building on a broken artifact. Warnings and a clean write pass silently.
// Self-contained on purpose: an installed plugin is copied out of the repo.

interface Diagnostic {
  severity: string;
  code: string;
  message: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** The tool's answer as text, whichever shape the hook input carries it in. */
function textOf(response: unknown): string {
  if (typeof response === 'string') return response;
  const blocks = isRecord(response) ? response.content : response;
  if (!Array.isArray(blocks)) return '';
  return blocks
    .map((b: unknown) =>
      isRecord(b) && typeof b.text === 'string' ? b.text : ''
    )
    .join('');
}

/** A tool refusal reads `HTTP <status>: ...` and already reached Claude. */
const REFUSAL = /^HTTP \d{3}: /;

function errorsIn(text: string): Diagnostic[] {
  if (REFUSAL.test(text)) return [];
  // Anything else is the JSON a write answers with; if that shape ever
  // changes, this hook says so (it throws) instead of passing in silence.
  const parsed: unknown = JSON.parse(text);
  const items =
    isRecord(parsed) && isRecord(parsed.diagnostics)
      ? parsed.diagnostics.items
      : undefined;
  if (!Array.isArray(items)) {
    throw new Error('the artifact write answered without diagnostics.items');
  }
  return items.filter(
    (d): d is Diagnostic =>
      isRecord(d) &&
      d.severity === 'error' &&
      typeof d.code === 'string' &&
      typeof d.message === 'string'
  );
}

function report(input: unknown): void {
  const response = isRecord(input) ? input.tool_response : undefined;
  // A refusal (the API's, or a patch that wrote nothing) already reached
  // Claude with its reason; there are no diagnostics to add.
  if (isRecord(response) && response.isError === true) return;
  const errors = errorsIn(textOf(response));
  if (errors.length === 0) return;
  const lines = errors.map((d) => `- ${d.code}: ${d.message}`).join('\n');
  console.error(
    `The artifact was saved, but the compiler found ${String(errors.length)} error(s). Fix them before publishing:\n${lines}`
  );
  process.exit(2);
}

Bun.stdin
  .json()
  .then(report)
  .catch((error: unknown) => {
    console.error(`wasabi diagnostics hook: ${String(error)}`);
    process.exit(1);
  });
