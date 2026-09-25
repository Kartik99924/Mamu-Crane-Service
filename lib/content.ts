import type { ImageKey } from './image-assets';

/* -------------------------------------------------------------------------- */
/*  Gallery                                                                    */
/* -------------------------------------------------------------------------- */

export type GalleryItem = {
  key: ImageKey;
  alt: string;
  caption: string;
  category: 'Lifting Work' | 'Equipment' | 'On Site';
  /** Masonry span on large screens. */
  span: 'tall' | 'wide' | 'normal';
};

export const GALLERY: GalleryItem[] = [
  {
    key: 'mamu-crane-service-hydra-crane-lifting-concrete-slab-kurukshetra',
    alt: 'Mamu Crane Service hydra crane lifting a precast concrete slab at dusk on a construction site near Kurukshetra',
    caption: 'Precast slab lift at dusk',
    category: 'Lifting Work',
    span: 'wide',
  },
  {
    key: 'hydra-crane-on-hire-vertical-boom-kurukshetra',
    alt: 'Hydra crane with its telescopic boom extended at a construction site in Kurukshetra',
    caption: 'Telescopic boom extended',
    category: 'Equipment',
    span: 'tall',
  },
  {
    key: 'hydra-crane-boom-and-hook-close-up-kurukshetra',
    alt: 'Close-up of a hydra crane boom and hook block during lifting work in Kurukshetra',
    caption: 'Boom and hook block',
    category: 'Equipment',
    span: 'normal',
  },
  {
    key: 'mamu-crane-service-safety-helmet-site-drawings',
    alt: 'Mamu Crane Service safety helmet and gloves resting on site drawings at a lifting job',
    caption: 'Site preparation and planning',
    category: 'On Site',
    span: 'wide',
  },
  {
    key: 'hydra-crane-on-rent-construction-site-kurukshetra',
    alt: 'Orange hydra crane on rent working beside a flyover under construction in Haryana',
    caption: 'Hydra crane on rent, flyover work',
    category: 'Lifting Work',
    span: 'wide',
  },
  {
    key: 'crane-hook-block-lifting-precast-concrete-slab',
    alt: 'Crane hook block and slings carrying a precast concrete slab during a lift',
    caption: 'Slung load under the hook',
    category: 'Lifting Work',
    span: 'tall',
  },
  {
    key: 'hydra-crane-operator-cabin-haryana',
    alt: 'Operator seated in the cabin of a hydra crane during lifting work in Haryana',
    caption: 'Operator at the controls',
    category: 'On Site',
    span: 'normal',
  },
  {
    key: 'construction-crew-at-crane-lifting-site-kurukshetra',
    alt: 'Construction crew in high-visibility vests standing clear during a crane lift in Kurukshetra',
    caption: 'Crew standing clear of the load',
    category: 'On Site',
    span: 'normal',
  },
  {
    key: 'mobile-crane-boom-against-city-skyline-haryana',
    alt: 'Mobile crane boom raised against the skyline at a construction site in Haryana',
    caption: 'Boom against the skyline',
    category: 'Equipment',
    span: 'tall',
  },
  {
    key: 'crane-service-construction-site-pipli-kurukshetra',
    alt: 'Wide view of a construction site served by Mamu Crane Service in Pipli, Kurukshetra',
    caption: 'Site overview at first light',
    category: 'On Site',
    span: 'wide',
  },
];

export const GALLERY_CATEGORIES = ['All', 'Lifting Work', 'Equipment', 'On Site'] as const;
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

/* -------------------------------------------------------------------------- */
/*  Hero feature strip                                                         */
/* -------------------------------------------------------------------------- */

export const HERO_FEATURES = [
  { icon: 'shield', title: 'Safety First', body: 'Lifts planned in advance' },
  { icon: 'clock', title: 'Local Response', body: 'Based in Pipli' },
  { icon: 'settings', title: 'Maintained Fleet', body: 'Checked before each job' },
  { icon: 'users', title: 'Operated Hire', body: 'Operator included' },
] as const;

/* -------------------------------------------------------------------------- */
/*  Why choose us                                                              */
/* -------------------------------------------------------------------------- */

export const WHY_US = [
  {
    icon: 'map-pin',
    title: 'Genuinely local',
    body: 'We are based in Pipli, not dispatching from another district. Shorter travel means faster response and less cost added to the job before any lifting happens.',
  },
  {
    icon: 'wrench',
    title: 'Machines kept ready',
    body: 'Equipment is checked and maintained between jobs. A breakdown mid-lift costs you a day, so keeping machines serviceable is part of the service, not an extra.',
  },
  {
    icon: 'shield-check',
    title: 'Safety-focused operations',
    body: 'Load weight, radius, ground conditions and overhead clearances are confirmed before a lift begins. If something on site is not safe, we say so.',
  },
  {
    icon: 'calendar-check',
    title: 'Flexible hire terms',
    body: 'Hourly, daily or across a project phase. You pay for the work the machine actually does rather than a package that does not fit the job.',
  },
  {
    icon: 'message-square',
    title: 'Straight answers',
    body: 'If a machine is not available, or a different capacity suits your lift better, we will tell you directly instead of sending the wrong equipment.',
  },
  {
    icon: 'user-check',
    title: 'Experienced operators',
    body: 'Cranes are supplied operated by people who handle these machines daily and understand how loads behave on a live site.',
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Trust section — factual work categories, not fabricated testimonials       */
/* -------------------------------------------------------------------------- */

export const TRUST_CATEGORIES = [
  {
    title: 'Builders and contractors',
    body: 'Material placement, precast handling and deliveries unloaded through the build programme.',
  },
  {
    title: 'Factories and workshops',
    body: 'Machinery installed, repositioned or removed during maintenance and plant changes.',
  },
  {
    title: 'Transport and logistics',
    body: 'Loads lifted on and off trucks and trailers where a forklift cannot do the job.',
  },
  {
    title: 'Homeowners and individuals',
    body: 'Single lifts such as water tanks, heavy fittings and awkward items moved safely.',
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  How it works                                                               */
/* -------------------------------------------------------------------------- */

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Tell us about the lift',
    body: 'Call or send an enquiry with what needs moving, where it is and when. A rough weight is enough to start.',
  },
  {
    step: '02',
    title: 'We match the machine',
    body: 'Weight, reach and site access decide the crane. We confirm what is suitable and what is available on your date.',
  },
  {
    step: '03',
    title: 'You get a quotation',
    body: 'A price based on the machine, the time required and the distance, so there are no surprises on the day.',
  },
  {
    step: '04',
    title: 'The crane arrives operated',
    body: 'The machine reaches site with its operator, sets up on firm ground and carries out the lift.',
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  General FAQs (home + contact)                                              */
/* -------------------------------------------------------------------------- */

export const GENERAL_FAQS = [
  {
    question: 'Which areas does Mamu Crane Service cover?',
    answer:
      'We are based in Pipli and work across Kurukshetra and the surrounding parts of Haryana, including Thanesar, Shahabad Markanda, Ladwa, Babain, Pehowa and Ismailabad. For sites further away, call and describe the job so we can confirm whether we can reach you.',
  },
  {
    question: 'What type of crane services do you provide?',
    answer:
      'Crane services and crane rental for construction, industrial and general lifting work, including hydra cranes on hire and higher-capacity machines such as the 10 ton class. Machines are supplied with an operator.',
  },
  {
    question: 'How do I request a crane service quotation?',
    answer:
      'Call us, send a WhatsApp message or use the enquiry form. Tell us what is being lifted, roughly how heavy it is, where the site is and when you need the machine. With those details we can give you an accurate figure rather than a rough guess.',
  },
  {
    question: 'How far in advance should I book?',
    answer:
      'A day or two of notice is usually enough, though during busy construction periods earlier is better. Urgent same-day requests are worth a call, since it depends entirely on what is free at that moment.',
  },
  {
    question: 'Do I need to provide anything on site?',
    answer:
      'Firm, level ground for the machine to set up on and a clear approach to the load. Tell us in advance about narrow lanes, soft ground or overhead electrical lines, as these decide whether a lift can go ahead safely.',
  },
  {
    question: 'How is the cost of a crane worked out?',
    answer:
      'Three things: which machine the job needs, how long it is needed for, and how far it has to travel. That is why we ask about the load and the site before quoting rather than publishing a single rate.',
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Planning guidance (local content, used on the services index)              */
/* -------------------------------------------------------------------------- */

export const PLANNING_NOTES = [
  {
    title: 'Weight is only half the question',
    body: 'A crane rated for ten tons lifts that much only with the load close to the machine. Extend the boom and the safe working load drops sharply. Knowing the radius, not just the weight, is what allows the correct machine to be sent the first time.',
  },
  {
    title: 'Check what is overhead',
    body: 'Overhead electrical lines are the most common reason a lift has to be stopped or repositioned on arrival. A quick look upward at the intended setup position while planning saves considerable time on the day.',
  },
  {
    title: 'Ground carries the whole load',
    body: 'Everything the crane lifts goes down through its wheels or outriggers into the ground. Recently filled earth, soft soil after rain and the edges of trenches are all worth mentioning when you book.',
  },
  {
    title: 'Plan where the load lands',
    body: 'Lifts get held up more often by an unprepared landing area than by the lift itself. Knowing exactly where the item is going, and clearing that space beforehand, keeps the machine working.',
  },
] as const;
