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
