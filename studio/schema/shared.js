// Building blocks shared by every client's site. A client's own sections
// (schema/sections.js) are assembled from these.
import { defineArrayMember, defineField, defineType } from 'sanity';

// A section of the site that exists once, e.g. "About". The document id is the
// section name, which is also the key the site reads it under.
export function section(name, title, fields) {
  return defineType({ name, title, type: 'document', fields, preview: { prepare: () => ({ title }) } });
}

export const text = (name, title, extra = {}) => defineField({ name, title, type: 'string', ...extra });
export const longText = (name, title, extra = {}) => defineField({ name, title, type: 'text', rows: 4, ...extra });

// A list of short lines (bullet points, paragraphs).
export const lines = (name, title, extra = {}) =>
  defineField({ name, title, type: 'array', of: [defineArrayMember({ type: 'text', rows: 3 })], ...extra });

// Short labels shown as chips.
export const tags = (name, title, extra = {}) =>
  defineField({ name, title, type: 'array', of: [defineArrayMember({ type: 'string' })], options: { layout: 'tags' }, ...extra });

export const photo = (name, title, extra = {}) => defineField({ name, title, type: 'photo', ...extra });

export const photos = (name, title, extra = {}) =>
  defineField({ name, title, type: 'array', of: [defineArrayMember({ type: 'photo' })], options: { layout: 'grid' }, ...extra });

// A list of repeated items (cards, steps, questions).
export const list = (name, title, itemType, extra = {}) =>
  defineField({ name, title, type: 'array', of: [defineArrayMember({ type: itemType })], ...extra });

// Kept on items that shipped with the site so links to them (e.g.
// /services#initial-consultation) survive a retitle. Never shown.
const stableId = defineField({ name: 'id', type: 'string', hidden: true });

export const sharedTypes = [
  defineType({
    name: 'photo',
    title: 'Photo',
    type: 'image',
    // Hotspot lets the client choose the crop and the part of the photo that
    // must stay in view when it is trimmed to fit.
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        title: 'Description',
        type: 'string',
        description: 'A few words describing the photo, for screen readers and Google.',
      }),
    ],
  }),

  defineType({
    name: 'card',
    title: 'Card',
    type: 'object',
    fields: [
      stableId,
      text('title', 'Title', { validation: (r) => r.required() }),
      text('eyebrow', 'Small label above the title'),
      tags('tags', 'Tags'),
      longText('body', 'Description', { rows: 6 }),
      lines('bullets', "What's included"),
      photo('image', 'Photo (optional)'),
    ],
    preview: { select: { title: 'title', subtitle: 'eyebrow', media: 'image' } },
  }),

  defineType({
    name: 'serviceCard',
    title: 'Service',
    type: 'object',
    fields: [
      stableId,
      text('title', 'Title', { validation: (r) => r.required() }),
      text('eyebrow', 'Small label above the title'),
      defineField({ name: 'popular', title: 'Show the "Most popular" badge', type: 'boolean', initialValue: false }),
      tags('tags', 'Tags'),
      longText('body', 'Description', { rows: 6 }),
      lines('bullets', "What's included"),
      photo('image', 'Photo (optional)'),
      defineField({
        name: 'bookingUrl',
        title: 'Booking link (optional)',
        type: 'url',
        description: 'Leave empty to send people to the free discovery call.',
      }),
      text('bookingLabel', 'Booking button wording (optional)'),
    ],
    preview: { select: { title: 'title', subtitle: 'eyebrow', media: 'image' } },
  }),

  defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'object',
    fields: [
      stableId,
      text('name', 'Name', { validation: (r) => r.required() }),
      text('sport', 'Sport or role'),
      longText('quote', 'Quote', { rows: 8 }),
      photo('photo', 'Photo'),
    ],
    preview: { select: { title: 'name', subtitle: 'sport', media: 'photo' } },
  }),

  defineType({
    name: 'step',
    title: 'Step',
    type: 'object',
    fields: [stableId, text('title', 'Title', { validation: (r) => r.required() }), longText('desc', 'Description')],
    preview: { select: { title: 'title', subtitle: 'desc' } },
  }),

  defineType({
    name: 'faqItem',
    title: 'Question',
    type: 'object',
    fields: [stableId, text('question', 'Question', { validation: (r) => r.required() }), longText('answer', 'Answer', { rows: 6 })],
    preview: { select: { title: 'question', subtitle: 'answer' } },
  }),
];
