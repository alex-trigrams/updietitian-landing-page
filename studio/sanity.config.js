// The editor a client sees at /admin on their own site.
//
// This file is the same for every client. What changes per client is:
//   client.config.json  — their name, logo, colours and Sanity project
//   schema/sections.js  — the editable sections of their site
import React from 'react';
import { buildLegacyTheme, defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import client from './client.config.json';
import { sections } from './schema/sections.js';
import { sharedTypes } from './schema/shared.js';

const { brand } = client;
const singletons = new Set(sections.map((s) => s.name));

function Logo() {
  return React.createElement('img', {
    src: client.siteUrl + client.logo,
    alt: client.name,
    style: { height: '1.6em', width: 'auto', objectFit: 'contain', display: 'block' },
  });
}

export default defineConfig({
  name: 'default',
  title: client.name,
  icon: Logo,
  projectId: client.projectId,
  dataset: client.dataset,
  // The /admin prefix is set once, in sanity.cli.js (project.basePath).

  theme: buildLegacyTheme({
    '--black': brand.ink,
    '--white': '#fff',
    '--brand-primary': brand.primary,
    '--focus-color': brand.primary,
    '--default-button-primary-color': brand.primary,
    '--main-navigation-color': brand.ink,
    '--main-navigation-color--inverted': brand.paper,
    '--component-bg': '#fff',
    '--component-text-color': brand.ink,
  }),

  plugins: [
    structureTool({
      title: 'Website',
      // One entry per section of the site, each opening straight into its
      // form. There are no lists of documents for a client to get lost in.
      structure: (S) =>
        S.list()
          .title(client.name)
          .items(
            sections.map((s) =>
              S.listItem()
                .id(s.name)
                .title(s.title)
                .child(S.document().schemaType(s.name).documentId(s.name).title(s.title)),
            ),
          ),
    }),
  ],

  schema: {
    types: [...sharedTypes, ...sections],
    // Each section exists exactly once, so nothing offers to create another.
    templates: (templates) => templates.filter((t) => !singletons.has(t.schemaType)),
  },

  document: {
    // Publish, discard and restore only: a section can't be deleted or copied.
    actions: (actions, { schemaType }) =>
      singletons.has(schemaType)
        ? actions.filter((a) => ['publish', 'discardChanges', 'restore'].includes(a.action))
        : actions,
    newDocumentOptions: (options) => options.filter((o) => !singletons.has(o.templateId)),
  },
});
