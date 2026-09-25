import type { ImageKey } from './image-assets';

export type ServiceFaq = { question: string; answer: string };

export type Service = {
  slug: string;
  /** Short label used in cards and navigation. */
  title: string;
  /** H1 on the detail page. */
  heading: string;
  /** One-line summary used on cards. */
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  icon: 'crane' | 'truck' | 'hardhat' | 'weight';
  image: ImageKey;
  imageAlt: string;
  /** Opening paragraphs of the detail page. */
  intro: string[];
  /** Typical jobs this service suits. */
  applications: { title: string; body: string }[];
  /** Practical notes about the equipment and how the job runs. */
  details: { title: string; body: string }[];
  /** What the customer should tell us to get an accurate quotation. */
  requirements: string[];
  faqs: ServiceFaq[];
  related: string[];
};

export const SERVICES: Service[] = [
  {
    slug: 'crane-service-pipli',
    title: 'Crane Service Providers',
    heading: 'Crane Service in Pipli, Kurukshetra',
    excerpt:
      'On-site crane support for construction, industrial and one-off lifting work across Pipli and Kurukshetra.',
    metaTitle: 'Crane Service in Pipli, Kurukshetra',
    metaDescription:
      'Mamu Crane Service provides crane services in Pipli and Kurukshetra for construction, industrial and general lifting work. Call for availability and a quotation.',
    icon: 'crane',
    image: 'mamu-crane-service-hydra-crane-lifting-concrete-slab-kurukshetra',
    imageAlt:
      'Mamu Crane Service hydra crane lifting a precast concrete slab at a construction site near Kurukshetra',
    intro: [
      'Mamu Crane Service is based in Pipli, Kurukshetra, and provides crane support to builders, contractors, factories, workshops and individual customers across the surrounding parts of Haryana. Work ranges from a single short lift to day-after-day support on an active construction site.',
      'Every job starts the same way: we talk through what has to be moved, how heavy it is, where it has to go and how much room the machine will have. That conversation decides which machine turns up and how long it needs to be on site, so the quotation you receive reflects the actual job rather than a generic rate.',
    ],
    applications: [
      {
        title: 'Construction sites',
        body: 'Placing precast slabs, beams, shuttering material, steel sections and reinforcement bundles where a manual lift is impractical or unsafe.',
      },
      {
        title: 'Industrial and workshop work',
        body: 'Positioning machinery, transformers, tanks, generators and heavy equipment during installation, servicing or relocation.',
      },
      {
        title: 'Loading and unloading',
        body: 'Moving material on and off trucks and trailers where a forklift cannot reach or the load is beyond its capacity.',
      },
      {
        title: 'One-off lifts',
        body: 'Short jobs such as lifting a water tank onto a roof, setting a pole or shifting an awkward load between two points on a property.',
      },
    ],
    details: [
      {
        title: 'The machine is matched to the lift',
        body: 'Weight alone does not decide the crane. Radius, meaning how far the load sits from the machine, matters just as much, because lifting capacity falls as the boom reaches further out. We ask about both before committing to a machine.',
      },
      {
        title: 'Access is checked before the day',
        body: 'Approach road width, overhead electrical lines, ground firmness and the space available to set up all affect whether a lift can go ahead. Raising these early avoids a wasted visit.',
      },
      {
        title: 'The crane comes with an operator',
        body: 'Machines are supplied operated. You do not need to arrange a driver or hold any particular licence to book a crane.',
      },
    ],
    requirements: [
      'What is being lifted, and roughly how much it weighs',
      'The site location and the nearest landmark',
      'How far the load must travel, and to what height',
      'Whether a truck or trailer is involved in loading or unloading',
      'The date and approximate time you need the machine',
      'Any access limits such as narrow lanes, soft ground or overhead cables',
    ],
    faqs: [
      {
        question: 'Do you provide crane services in Pipli?',
        answer:
          'Yes. Pipli is our base, so it is the area we cover most often and usually the quickest to reach. We also serve Kurukshetra and the nearby towns around it.',
      },
      {
        question: 'How far from Kurukshetra will you travel?',
        answer:
          'We regularly work across Kurukshetra district, including Thanesar, Shahabad Markanda, Ladwa, Babain, Pehowa and Ismailabad. For work further out, call and describe the job, since distance affects travel time and cost and is better discussed directly.',
      },
      {
        question: 'Can you handle a small job, or only large contracts?',
        answer:
          'Both. A great deal of our work is short, single-lift jobs for individual customers. There is no minimum contract size and a one-hour lift is a normal booking.',
      },
      {
        question: 'Do I need to arrange anything before the crane arrives?',
        answer:
          'Clear, firm space for the machine to set up on, and a clear path to the load. If the ground is soft or the approach is tight, tell us in advance so we can plan for it.',
      },
    ],
    related: ['crane-rental-kurukshetra', 'hydra-crane-on-hire'],
  },
  {
    slug: 'crane-rental-kurukshetra',
    title: 'Crane on Rent',
    heading: 'Crane on Rent in Kurukshetra',
    excerpt:
      'Cranes on rent by the hour, the day or for the length of a project, with the operator included.',
    metaTitle: 'Crane on Rent in Kurukshetra | Crane Rental',
    metaDescription:
      'Cranes on rent in Kurukshetra and Pipli with hourly, daily or project-length hire and an operator included. Contact Mamu Crane Service for rates and availability.',
    icon: 'truck',
    image: 'hydra-crane-on-rent-construction-site-kurukshetra',
    imageAlt: 'Orange hydra crane on rent positioned beside a flyover under construction in Haryana',
    intro: [
      'Renting is the practical option for most lifting work. Buying and maintaining a crane only makes sense for companies lifting every day; for everyone else, hiring a machine for the hours it is genuinely needed keeps the cost tied to the work.',
      'We rent cranes across Kurukshetra and Pipli on the basis that suits the job: a couple of hours for a single lift, a full day for a busy site, or a longer arrangement where a contractor needs a machine available through a phase of construction.',
    ],
    applications: [
      {
        title: 'Short hire',
        body: 'A few hours for a specific lift, such as a tank onto a roof, a machine into a workshop, or a single heavy item repositioned.',
      },
      {
        title: 'Full-day hire',
        body: 'A machine on site for the working day when there is a sequence of lifts, such as unloading several truckloads of material.',
      },
      {
        title: 'Project hire',
        body: 'Repeat or extended availability through a construction phase, arranged in advance so the machine is scheduled around your programme.',
      },
      {
        title: 'Standby and scheduled lifts',
        body: 'Booked slots where the crane is needed at a fixed time, such as a delivery window, a shutdown, or a planned installation.',
      },
    ],
    details: [
      {
        title: 'What a rental includes',
        body: 'The machine and its operator. You supply the site, safe access and the people handling and rigging the load at your end.',
      },
      {
        title: 'How rates are worked out',
        body: 'Rental cost depends on the machine, how long it is needed and the distance to the site. We quote once we know those three things rather than publishing a flat rate that would be wrong for most jobs.',
      },
      {
        title: 'Booking ahead helps',
        body: 'Availability is finite, particularly during busy construction periods. A day or two of notice makes it far more likely the machine you need is free when you need it.',
      },
    ],
    requirements: [
      'The type of work and what will be lifted',
      'How long you expect to need the machine',
      'Site location in or around Kurukshetra',
      'Preferred date and start time',
      'The heaviest single load involved',
      'How far out from the machine that load must be placed',
    ],
    faqs: [
      {
        question: 'Can I rent a crane for construction work?',
        answer:
          'Yes. Construction is the most common reason customers hire from us, whether that is placing material, unloading deliveries or lifting sections into position during a build.',
      },
      {
        question: 'Is the crane rented with an operator?',
        answer:
          'Yes, every machine is supplied with its operator. You do not need to provide a driver.',
      },
      {
        question: 'Can I hire a crane for just a few hours?',
        answer:
          'Yes. Short hires are normal. Tell us what the lift involves and we will advise how long it is likely to take.',
      },
      {
        question: 'How do I get a rental rate?',
        answer:
          'Call or send an enquiry with the machine you think you need, the site location and the dates. Rates depend on the machine, the duration and the travel distance, so a short conversation gives you an accurate figure.',
      },
    ],
    related: ['hydra-crane-on-hire', '10-ton-hydra-crane'],
  },
  {
    slug: 'hydra-crane-on-hire',
    title: 'Hydra Cranes on Hire',
    heading: 'Hydra Crane on Hire in Kurukshetra',
    excerpt:
      'Mobile hydra cranes that drive onto site under their own power, well suited to tight and busy locations.',
    metaTitle: 'Hydra Crane on Hire in Kurukshetra and Pipli',
    metaDescription:
      'Hydra cranes on hire in Kurukshetra and Pipli for construction, loading and equipment shifting. Mobile machines suited to tight sites. Call for availability.',
    icon: 'hardhat',
    image: 'hydra-crane-boom-and-hook-close-up-kurukshetra',
    imageAlt: 'Close-up of a hydra crane boom and hook block at a lifting site in Kurukshetra',
    intro: [
      'A hydra crane is a wheeled, self-propelled mobile crane with a hydraulic telescopic boom. It drives to the site on its own wheels, sets up quickly and can reposition between lifts without being dismantled, which is exactly why it suits the majority of local lifting work.',
      'For sites with limited room, mixed traffic or several lifting points across a plot, a hydra is usually the sensible choice. It is the machine most often requested by our customers in Kurukshetra and Pipli.',
    ],
    applications: [
      {
        title: 'Tight or congested sites',
        body: 'Plots with narrow approaches, or work in built-up areas where a larger machine could not set up.',
      },
      {
        title: 'Moving between lift points',
        body: 'Jobs where the load has to be placed in several positions across a site during the same visit.',
      },
      {
        title: 'Truck loading and unloading',
        body: 'Transferring machinery, pipes, steel and building material between vehicles and the ground.',
      },
      {
        title: 'Equipment shifting',
        body: 'Relocating machines within a factory yard, workshop or warehouse during installation or maintenance.',
      },
    ],
    details: [
      {
        title: 'Why mobility matters',
        body: 'Setup time is part of the cost. A machine that arrives, levels up and starts lifting saves hours against one that needs assembly, and that difference shows in the final bill on short jobs.',
      },
      {
        title: 'Capacity changes with reach',
        body: 'A hydra rated for a given load at close radius will lift considerably less with the boom extended. When you tell us the distance as well as the weight, we can confirm the machine is right before it leaves the yard.',
      },
      {
        title: 'Ground conditions count',
        body: 'Hydras work on wheels and need reasonably firm, level ground. Loose fill, soft soil after rain, or unsupported edges near a trench all need to be flagged in advance.',
      },
    ],
    requirements: [
      'Weight of the heaviest load',
      'Working radius, meaning how far the load sits from the machine',
      'Lift height required',
      'Site location and approach road width',
      'Ground surface and condition',
      'Date and expected duration',
    ],
    faqs: [
      {
        question: 'Do you provide hydra cranes on hire?',
        answer:
          'Yes. Hydra cranes are a core part of what we do and the machine we are asked for most often in and around Kurukshetra.',
      },
      {
        question: 'What is the difference between a hydra crane and other cranes?',
        answer:
          'A hydra is a wheeled mobile crane with a hydraulic telescopic boom. It drives itself to and around the site and needs little setup, which makes it faster and more flexible than larger cranes that must be transported and assembled.',
      },
      {
        question: 'Can a hydra crane work inside a factory or narrow plot?',
        answer:
          'Often, yes, and that is one of its advantages. The limits are the approach width, the headroom and the ground surface. Describe the space when you call and we will tell you whether it will fit.',
      },
      {
        question: 'How much can a hydra crane lift?',
        answer:
          'It depends on the machine and, critically, on the radius. Rated capacity applies close to the machine and reduces as the boom extends. Give us the weight and the distance and we will confirm the right machine.',
      },
    ],
    related: ['10-ton-hydra-crane', 'crane-rental-kurukshetra'],
  },
  {
    slug: '10-ton-hydra-crane',
    title: '10 Ton Hydra Crane',
    heading: '10 Ton Hydra Crane on Rent',
    excerpt:
      'A widely used capacity class for construction and industrial lifting where a smaller machine is not enough.',
    metaTitle: '10 Ton Hydra Crane on Rent in Kurukshetra',
    metaDescription:
      '10 ton hydra cranes on rent in Kurukshetra and Pipli for construction, machinery shifting and heavy loading work. Call to check availability.',
    icon: 'weight',
    image: 'hydra-crane-on-hire-vertical-boom-kurukshetra',
    imageAlt: 'Hydra crane with extended boom on hire at a construction site in Kurukshetra',
    intro: [
      'The 10 ton class is the capacity customers ask for most when a light machine will not do the job but a large crane would be excessive. It covers a broad middle ground of construction and industrial lifting, which is why it is a common specification on local sites.',
      'If you have been told to arrange a 10 ton hydra, or you have worked out that your load needs roughly that capacity, get in touch with the weight and the reach and we will confirm what is suitable and available.',
    ],
    applications: [
      {
        title: 'Structural and precast placement',
        body: 'Setting beams, slabs and heavy shuttering components during building work.',
      },
      {
        title: 'Machinery installation',
        body: 'Positioning industrial machines, transformers, compressors and generators onto foundations or platforms.',
      },
      {
        title: 'Heavy loading work',
        body: 'Unloading steel, pipe sections and bulk material from trailers where lighter equipment is not rated for the weight.',
      },
      {
        title: 'Plant and equipment shifting',
        body: 'Moving heavy items between locations within a site, factory or yard.',
      },
    ],
    details: [
      {
        title: 'What the 10 ton rating actually means',
        body: 'It is the maximum rated capacity at minimum radius, with the boom short and the load close in. At longer reach the safe working load is significantly lower. This is the single most common source of confusion when booking, and it is worth getting right before the day.',
      },
      {
        title: 'Working out what you need',
        body: 'If you are unsure of the weight, describe the item, including material, rough dimensions and what it is, and we can usually estimate closely enough to select the machine.',
      },
      {
        title: 'Setup requirements',
        body: 'Heavier lifts place more load through the machine into the ground. Firm, level standing and clearance from overhead lines matter more, not less, as capacity goes up.',
      },
    ],
    requirements: [
      'Exact or estimated weight of the load',
      'Radius at which it must be placed',
      'Required lift height',
      'Whether the lift is a single item or repeated through the day',
      'Site location and ground conditions',
      'Date and time the machine is needed',
    ],
    faqs: [
      {
        question: 'Do you have 10 ton hydra cranes on rent?',
        answer:
          'Yes, the 10 ton class is one we are regularly asked for. Call with your dates to check what is free, as availability varies with how busy the season is.',
      },
      {
        question: 'Will a 10 ton crane lift 10 tons anywhere on site?',
        answer:
          'No, and this is important. The rating applies at minimum radius, close to the machine. As the boom extends, safe capacity drops. Tell us the distance as well as the weight so the correct machine is sent.',
      },
      {
        question: 'How do I know whether I need a 10 ton machine?',
        answer:
          'Describe the load and where it has to go. In many cases the weight matters less than the reach required, and we will recommend the appropriate capacity rather than the largest machine.',
      },
      {
        question: 'Can I book a 10 ton hydra for more than one day?',
        answer:
          'Yes. Multi-day and project-length hire can be arranged. Book ahead so the machine can be scheduled around your programme.',
      },
    ],
    related: ['hydra-crane-on-hire', 'crane-service-pipli'],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const serviceSlugs = SERVICES.map((s) => s.slug);
