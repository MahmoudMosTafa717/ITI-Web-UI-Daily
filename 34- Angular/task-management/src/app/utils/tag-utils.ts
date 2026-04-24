export function formatTags(raw: string): string {
  if (!raw) return '';
  const parts = raw
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((s) => (s.startsWith('#') ? s.slice(1).trim() : s))
    .filter((s) => s.length > 0);

  const seen = new Set<string>();
  const tags: string[] = [];
  for (const name of parts) {
    const key = name.toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    tags.push('#' + name);
  }
  return tags.join(' ');
}
