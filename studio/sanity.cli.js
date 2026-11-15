import { defineCliConfig } from 'sanity/cli';
import client from './client.config.json' with { type: 'json' };

export default defineCliConfig({
  api: { projectId: client.projectId, dataset: client.dataset },
  // Served from /admin on the client's site, not from the domain root.
  project: { basePath: '/admin' },
  // The editor is built into the client's own site at /admin on each deploy,
  // so it is pinned to the version in package-lock.json rather than
  // auto-updating underneath them.
  deployment: { autoUpdates: false },
});
