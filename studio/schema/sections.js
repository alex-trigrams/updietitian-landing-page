// UP Dietitian's editable sections. This is the per-client file: each entry is
// one item in the editor's sidebar, and its fields are what the client can
// change. The site reads a field as C('<section>.<field>'), e.g.
// C('hero.headline').
import { list, lines, longText, photo, photos, section, tags, text } from './shared.js';

export const sections = [
  section('hero', 'Home: top banner', [
    text('headline', 'Headline', { description: 'Use | to break it into lines, e.g. LEVEL UP | YOUR | PERFORMANCE' }),
    longText('sub', 'Text under the headline'),
    photos('slides', 'Background photos', { description: 'These fade from one to the next. Drag to reorder.' }),
  ]),

  section('about', 'About', [
    photo('photo', 'Main portrait'),
    photo('racePhoto', 'Second photo'),
    lines('bioParagraphs', 'Bio paragraphs', { description: 'The first paragraph also appears on the home page.' }),
    tags('specialtyTags', 'Specialty tags'),
    text('stickerBadge', 'Badge text on the portrait'),
    list('testimonials', 'Testimonials', 'testimonial'),
  ]),

  section('services', 'Services', [
    longText('intro', 'Intro paragraph (under the page heading)'),
    list('heroCards', 'Packages', 'serviceCard'),
    list('tierCards', 'Consultations & coaching', 'serviceCard'),
    longText('footerNote', 'Footer note'),
    // The home page shows two packages plus a third card for consultations and
    // coaching. That third card has no single service behind it.
    text('teaserTag', 'Home page: third card tag (orange line)'),
    longText('teaserCopy', 'Home page: third card summary'),
  ]),

  section('seminars', 'Seminars', [
    text('eyebrow', 'Small label above the heading'),
    longText('intro', 'Intro paragraph'),
    list('audiences', 'Audience cards', 'card'),
    lines('inclusions', "What's included"),
    longText('deckCopy', 'Seminar guide panel text'),
    longText('footerNote', 'Footer note (pricing & availability)'),
  ]),

  section('process', 'How it works', [list('steps', 'Steps', 'step')]),

  section('faq', 'FAQ', [
    list('items', 'Questions & answers', 'faqItem', {
      description: 'Shown on the Services page, and read by Google and AI search.',
    }),
  ]),

  section('clinic', 'Clinic', [
    photo('photo', 'Clinic photo'),
    longText('description', 'Description'),
    text('address', 'Address'),
    longText('bookingNote', 'Booking note'),
  ]),

  section('contact', 'Contact page', [longText('intro', 'Intro paragraph')]),

  section('footer', 'Footer', [
    text('ctaLabel', 'Button wording'),
    longText('subCopy', 'Text under the button'),
    text('email', 'Email', { description: 'Also shown on the Contact page.' }),
    text('instagramHandle', 'Instagram handle', { description: 'Also shown on the Contact page.' }),
  ]),

  section('stickyCta', 'Mobile booking bar', [
    text('mobileLabel', 'Button wording', { description: 'The bar pinned to the bottom of the screen on phones.' }),
  ]),
];
