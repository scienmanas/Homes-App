import { RenderMode, ServerRoute } from '@angular/ssr';
import { readFile } from 'fs/promises';
import { join } from 'path';

async function getPrerenderParams() {
  // Read the local db.json to produce a list of ids to prerender.
  const dbPath = join(process.cwd(), 'src', 'app', 'db.json');
  const raw = await readFile(dbPath, 'utf-8');
  const parsed = JSON.parse(raw) as { locations?: Array<{ id: number }> };
  const ids = (parsed.locations || []).map((l) => ({ id: String(l.id) }));
  return ids;
}

export const serverRoutes: ServerRoute[] = [
  {
    // Provide explicit prerendering parameters for the details route which uses a route param.
    path: 'details/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams
  },
  {
    // Fallback: prerender other static routes by default.
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
