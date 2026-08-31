/**
 * Every word of site copy lives here, transcribed from the source proposal
 * (the source proposal PDF, kept locally in docs/).
 *
 * Rule for editors: nothing in this file may assert a statistic, outcome,
 * client name or credential that is not in that document.
 */

export const hero = {
  eyebrow: "30-day trial · UK care homes",
  headlineLead: "30-Day",
  headlineAccent: "Lead",
  headlineTail: "Generation Trial",
  standfirst: "Meta advertising for care homes",
  standfirstAccent: "no agency fee",
  body: "We build care homes a content and ads system. The videos show your home as it really is, so families come to know you and trust you long before they pick up the phone. The ads carry that footage to the right people in your area, and bring it back to the families who've already shown an interest. For 30 days we'll run the whole thing at no agency cost. You pay only for the ads themselves, directly to Meta.",
  primaryCta: "Book a filming date",
  secondaryCta: "See what it costs",
  /**
   * The proof rail beside the headline. Every figure here is stated in the
   * source document — nothing is estimated or extrapolated.
   */
  facts: [
    { value: "£0", label: "Our fee", note: "For the full 30 days" },
    { value: "30", label: "Days", note: "Or until your spend is used" },
    { value: "4", label: "Ad variants", note: "Edited from one filming day" },
    { value: "½", label: "Day of your time", note: "That is the whole ask" },
  ],
  assurances: ["No contract", "No auto-renewal", "Ad account stays in your name"],
} as const;

export const audiences = {
  index: "01",
  heading: "Who the ads can target",
  kicker: "One filming day, four different places to point it.",
  items: [
    {
      title: "Families and private enquiries",
      note: "The people choosing a home for someone they love.",
    },
    {
      title: "Local authority & NHS commissioners",
      note: "The referrers who fill beds at volume.",
    },
    {
      title: "Landlords and operators looking to expand",
      note: "For groups buying, leasing or growing a portfolio.",
    },
    {
      title: "Staff, when recruitment is the tighter constraint",
      note: "Sometimes the bottleneck is carers, not residents.",
    },
  ],
} as const;

export const pricing = {
  index: "02",
  eyebrow: "What it costs",
  title: "What it costs",
  kicker: "Two numbers, and only one of them is a bill.",
  heading: "Our fee is £0. The ad spend is yours, and it stays yours.",
  fee: {
    label: "Our fee",
    value: "£0",
    note: "For the full 30 days. No agency cost.",
  },
  spend: {
    label: "Ad spend",
    value: "£500 – £1,000",
    note: "Recommended. Paid direct to Meta on your own card.",
  },
  assurance:
    "We never handle your ad budget. The account stays in your name, and you can see every penny of it.",
  rationale: {
    heading: "Why we recommend £500 – £1,000",
    body: "Meta's algorithm needs a certain volume of data before it learns who converts. £500 – £1,000 gives it enough room to do that inside 30 days. You can spend less and we'll still run the trial; it just takes longer to find its feet.",
  },
} as const;

export const whyMeta = {
  index: "03",
  heading: "Why Meta",
  kicker: "Care is a few steps behind property on the same curve.",
  body: "Where families look for care is shifting. More of the decision now happens on social: a recommendation in a local group, a video that shows what a home actually feels like inside, a name they've simply seen before. We watched the same thing happen in property, and the agents who moved early are the ones getting the volume now. Care is a few steps behind on that curve, which is why there's still room to get in front of it.",
} as const;

export const craft = [
  {
    heading: "The videos",
    paragraphs: [
      "We film properly: real staff, real spaces, and editing that treats the place with respect. That does two jobs at once. It shows a family your professionalism, and it lets them feel something about the home before they ever visit.",
      "Very few care homes are making content at all, and most that do lean on stock photography or AI-generated footage. Real footage of a real home, and the real people in it, stands out against that instantly.",
    ],
  },
  {
    heading: "The targeting",
    paragraphs: [
      "Meta's targeting is far more precise than most people expect, and it sharpens the longer it runs. Early on the campaign is learning; after that we're working from data on which ad held attention and which audience actually enquired.",
      "Anyone who watched but didn't get in touch is retargeted, so interested families keep seeing you rather than drifting off. That compounding is why a system beats a one-off push.",
    ],
  },
] as const;

export const scope = {
  index: "04",
  title: "What each side does",
  kicker: "A short list on your side. Everything else on ours.",
  included: {
    heading: "What's included",
    items: [
      { text: "One filming day at your home" },
      { text: "4 edited ad variants built from that footage", emphasis: true },
      { text: "Full campaign build, then daily management and optimisation" },
      { text: "Enquiries sent to you live: email, WhatsApp, a Google Sheet or your CRM" },
      { text: "A written report at the end" },
    ],
  },
  required: {
    heading: "What we need from you",
    items: [
      { text: "Half a day for filming, at a time that suits the home" },
      {
        text: "One person from the home happy to appear on camera. Familiar faces outperform polished corporate footage",
      },
      { text: "Your enquiry team ready to take calls once we're live" },
    ],
  },
} as const;

export const reassurance = [
  {
    heading: "Already at full occupancy?",
    body: "Not a problem. We'd build a waiting list instead, so the next room fills quickly when it comes free. Or we point the ads somewhere else entirely: commissioners, staff, or expansion opportunities.",
  },
  {
    heading: "After the trial",
    body: "No contract and no auto-renewal. If it's worked and you'd like to keep the enquiries coming, get in touch and we'll plan what's next. If not, we part on good terms and you've lost nothing but a morning's filming.",
  },
] as const;

export const qualification = {
  index: "05",
  heading: "How we qualify the leads",
  kicker: "The funnel narrows before anything reaches your team.",
  body: "Every ad sends people into a funnel we build for your home: a short set of questions rather than a form. Browsers get filtered out before they reach you, and the enquiries that do come through arrive with the answers your team would otherwise spend a call asking for.",
  steps: [
    {
      number: "01",
      title: "They see the ad",
      detail: "your footage, shown to the audience you've chosen",
    },
    {
      number: "02",
      title: "They answer a few questions",
      detail: "the answers that show who's genuinely ready",
    },
    {
      number: "03",
      title: "We filter",
      detail: "out-of-area and early browsers drop away",
    },
    {
      number: "04",
      title: "You get a qualified enquiry",
      detail: "details and answers, sent to you live",
    },
  ],
} as const;

export const founders = {
  index: "06",
  heading: "Who you'll be working with",
  kicker: "Two people. You will deal with both of us directly.",
  people: [
    {
      name: "Kian Heneghan",
      role: "Co-founder",
      credentials: [
        {
          text: "Content work for Apple, Samsung, TikTok, BYD, Maplins and Black Market",
        },
        { text: "Built ad systems and optimised content for over 10 construction companies" },
        { text: "Grew his own TikTok page to 140,000+ followers and 80 million views" },
      ],
    },
    {
      name: "Harman Walia",
      role: "Co-founder",
      credentials: [
        {
          text: "Content strategist driving organic growth for clients including Santa Cruz Medicinals, a leading US wellness e-commerce brand",
        },
        {
          text: "BSc Sport, Health & Exercise Science, University of Birmingham",
          sub: "Professional dissertation placement with British Airways, optimising health content and curating a scoping review",
        },
      ],
    },
  ],
} as const;

export const terms =
  "The trial runs for 30 days or until your allocated spend is used, whichever comes first.";

export const closing = {
  eyebrow: "Next step",
  heading: "Tell us two or three dates that work for filming.",
  body: "We'll confirm the slot, film at a time that suits the home, and get you live within the week.",
  cta: "Start your enquiry",
} as const;

/**
 * Home page.
 *
 * Positioning for both sectors. The proof line is the only figure on the page
 * and it is carried through to /property, where it is evidenced — proof sits
 * beside the claim it supports rather than being asserted once and dropped.
 */
export const home = {
  eyebrow: "Care homes · Property",
  headlineLead: "Growth systems for",
  headlineAccent: "care homes",
  headlineTail: "and property",
  standfirst:
    "Bespoke funnels that filter out browsers and send your team people who are ready to talk.",
  body: "Vantiq implements growth systems end to end. We film the content, build the funnel, run the paid social, and qualify every enquiry before it reaches you. You take the calls; everything in front of that is ours.",
  proof: {
    figure: "69",
    text: "qualified landlord leads in 33 active ad days, for a property leasing company with a portfolio over £450m.",
    href: "/property",
    cta: "See how that campaign ran",
  },
  primaryCta: "See the care home trial",
  secondaryCta: "See the property results",

  /** The tagline moment: the argument in one sentence, set large. */
  tagline: "Most leads are lists. Ours arrive already qualified, already in your area, and already expecting your call.",

  routes: [
    {
      index: "01",
      title: "Care homes",
      href: "/care-homes",
      note: "A 30 day Meta advertising trial. We film your home, build and run the campaign, and send qualified enquiries to your team. Our fee is £0.",
      cta: "Read the trial offer",
    },
    {
      index: "02",
      title: "Property",
      href: "/property",
      note: "Paid social for letting and management businesses. We bring in landlords who already own property, sorted by portfolio size and area.",
      cta: "See the property results",
    },
  ],

  /** Outcome first, mechanism second. */
  benefits: [
    {
      title: "Leads that answer the phone",
      note: "Every enquiry passes a question set before it reaches you, so out of area and early browsers drop away rather than filling your team's morning.",
    },
    {
      title: "Content that does the convincing",
      note: "We film the real place and the real people. Families and landlords decide long before they call, and stock photography does not survive that decision.",
    },
    {
      title: "A system, not a burst",
      note: "Anyone who watched but did not enquire gets retargeted. The campaign sharpens on its own data instead of restarting from nothing each month.",
    },
    {
      title: "You keep the account",
      note: "The ad account stays in your name and you see every penny of spend. We never hold your budget.",
    },
  ],
} as const;

/**
 * Property page.
 *
 * The offer and the audience come first, the evidence second. Everything in
 * `results` is transcribed from the client's own lead generation export, with
 * one exception noted on `portfolioValue`.
 */
export const property = {
  eyebrow: "Property · letting and management",
  headlineLead: "Landlords who already",
  headlineAccent: "own property",
  headlineTail: "sent to you every week",
  standfirst: "Paid social for letting and management businesses",
  standfirstAccent: "built around the portfolio you want",
  body: "Most property lead generation sells the same scraped list to everyone on it. We run paid social into a funnel built for your business, ask the questions that separate a portfolio landlord from a curious one, and send you the answers with the contact details.",
  primaryCta: "Talk to us about property",

  /** What the funnel is pointed at. */
  audiences: [
    {
      title: "Portfolio landlords",
      note: "Owners with four or more units, where one relationship is worth years of management fees rather than a single let.",
    },
    {
      title: "Accidental and first time landlords",
      note: "One or two properties, usually inherited or previously lived in, and usually looking for someone to take the work off them.",
    },
    {
      title: "Landlords in a specific borough",
      note: "Targeting is set to the areas you actually cover, so you are not paying to reach owners two hours outside your patch.",
    },
    {
      title: "Owners with a live problem",
      note: "Void periods, late rent, a tenant who has stopped answering. The angle that wins is the one naming the problem they already have.",
    },
  ],

  steps: [
    {
      number: "01",
      title: "We build the angle",
      detail: "the message is written against the problem, not the service",
    },
    {
      number: "02",
      title: "Paid social carries it",
      detail: "Facebook and Instagram, aimed at your boroughs",
    },
    {
      number: "03",
      title: "The funnel qualifies",
      detail: "portfolio size, property type and area, before you see it",
    },
    {
      number: "04",
      title: "You get the enquiry",
      detail: "contact details and every answer, sent live",
    },
  ],
} as const;

/**
 * The client campaign, presented as evidence for the page above.
 *
 * Every figure is transcribed from the client's lead generation overview
 * (25 May to 3 Aug 2026) with one exception: `portfolioValue` is the client's
 * own stated portfolio size, supplied separately.
 *
 * The underlying export is a row per lead and carries names, emails, phone
 * numbers and addresses. None of that is here, and none of it belongs on a
 * public page: only counts and shares.
 *
 * The client is deliberately not named. If they give written permission to be
 * credited, add the name here and in the results heading.
 *
 * `minimumUnits` is arithmetic, not an estimate: it is the floor of the stated
 * portfolio bands (34x1 + 20x4 + 9x10 + 6x20). The real figure is higher,
 * because every band except the first is open at the top.
 */
export const results = {
  client: "a property leasing company",
  portfolioValue: "£450m+",
  source:
    "Client lead generation overview · 69 leads · 25 May to 3 Aug 2026 · Facebook and Instagram",

  headline: { value: "69", label: "Qualified landlord leads", note: "Every one a self-identified property owner." },

  /** The three numbers that frame the rest. */
  frame: [
    {
      value: "33",
      label: "Active ad days",
      note: "The days the ads actually ran. That is the number the 69 should be read against.",
    },
    {
      value: "2.1",
      label: "High quality leads per active day",
      note: "Not raw volume. All 69 stated the size of their portfolio, and half of them hold four or more properties.",
    },
    { value: "93%", label: "Form completion rate", note: "Reached the end of the question set." },
  ],

  portfolio: {
    heading: "Who they turned out to be",
    kicker: "Portfolio size, as a share of the 69.",
    rows: [
      { label: "1 to 3 properties", count: 34, share: 49 },
      { label: "4 to 9 properties", count: 20, share: 29 },
      { label: "10 to 20 properties", count: 9, share: 13 },
      { label: "20+ properties", count: 6, share: 9 },
    ],
    note: "Half the list (35 of 69) manages four or more properties, and 15 of them manage ten or more. That is the half where one relationship is worth years of fees, and it is the half most lead sources never reach.",
  },

  pipeline: {
    heading: "What that represents",
    value: "324",
    unit: "rental units, at minimum",
    note: "Counting every lead at the bottom of their stated band. Each band except the first is open at the top, so the true figure is higher. Apply your own management fee per unit to size the pipeline.",
  },

  propertyType: {
    heading: "What they own",
    kicker: "Of the 69, eight did not specify.",
    rows: [
      { label: "Flats and apartments", count: 30 },
      { label: "Houses", count: 28 },
      { label: "Mixed portfolio", count: 2 },
      { label: "Commercial", count: 1 },
    ],
  },

  source_split: {
    heading: "Where they came from",
    platforms: [
      { name: "Facebook", count: "48", share: "70%" },
      { name: "Instagram", count: "19", share: "28%" },
    ],
    note: "A further two came through other placements. Facebook carried the campaign, but Instagram was not a rounding error either.",
  },

  painPoints: {
    heading: "What they said they were struggling with",
    kicker: "Self-reported, and 33 of the 69 did not specify.",
    rows: [
      { label: "Multiple compounding issues", count: 12 },
      { label: "Tenant management", count: 10 },
      { label: "Void periods", count: 10 },
    ],
  },
} as const;
