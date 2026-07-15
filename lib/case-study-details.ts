/**
 * Rich case-study detail content — the data behind each /portfolio/[slug] page.
 *
 * Card-level facts (title, challenge, solution, outcome, results, tech, image,
 * duration) live on `CaseStudy` in lib/constants.ts. This is the long-form
 * layer, keyed by the CaseStudy `slug`. Authored + adversarially verified from
 * each project's real data. `gallery[].kind` drives a branded mock-screen
 * visual (tasteful brand mockups, not client screenshots we do not own — real
 * screenshots drop into these frames later).
 */
export type GalleryKind =
  | "desktop"
  | "mobile"
  | "dashboard"
  | "analytics"
  | "feature";

export interface CaseStudyDetail {
  slug: string;
  clientType: string;
  /** Display-only domain shown in the browser chrome — not a live external link. */
  liveDomain: string;
  overview: string;
  requirements: string[];
  challenges: { title: string; body: string }[];
  solutionPoints: string[];
  keyFeatures: { title: string; body: string }[];
  /** Additional to the three headline results on the CaseStudy. */
  extraImpact: { metric: string; value: string }[];
  timeline: { phase: string; detail: string }[];
  gallery: { label: string; kind: GalleryKind }[];
}

export const CASE_STUDY_DETAILS: Record<string, CaseStudyDetail> = {
  "freshbite": {
    "slug": "freshbite",
    "clientType": "Independent farm-to-table restaurant",
    "liveDomain": "freshbite.in",
    "overview": "FreshBite cooked the kind of food people photograph before they eat, but almost none of that ever reached a screen. Walk-ins were unpredictable, weeknights sat half-empty, and delivery aggregators skimmed close to a third off every order. We rebuilt the digital presence around a single job: get the table booked directly, and move demand off the aggregators and onto FreshBite's own platform.",
    "requirements": [
      "A booking-first website that loads fast on mobile",
      "A recognisable brand identity and logo",
      "Direct orders that skip aggregator commissions",
      "Steady weeknight footfall, not just weekend spikes",
      "Local reach through Reels and Google Ads"
    ],
    "challenges": [
      {
        "title": "Great food, invisible online",
        "body": "The kitchen had a loyal following and dishes worth sharing, but no owned presence to capture it. Search turned up an aggregator listing, not FreshBite."
      },
      {
        "title": "A third of every order lost to aggregators",
        "body": "Delivery platforms took close to a third in commission on every order and owned the customer relationship. FreshBite was paying to rent demand it should have owned."
      },
      {
        "title": "Weeknights ran dead",
        "body": "Revenue leaned hard on Friday and Saturday. Tuesday through Thursday the dining room sat half-empty while fixed costs stayed the same."
      },
      {
        "title": "Unpredictable walk-ins, no way to plan",
        "body": "With no booking data, the kitchen prepped blind. Some nights over-ordered produce, others turned guests away at the door."
      }
    ],
    "solutionPoints": [
      "Rebuilt the site around one job: book the table",
      "Built a brand identity that matched the plating",
      "Ran Reels against the dishes guests already photographed",
      "Local Google Ads on nearby high-intent searches",
      "Moved orders on-platform, off the aggregators"
    ],
    "keyFeatures": [
      {
        "title": "One-tap table booking",
        "body": "A Next.js site built around a single primary action. Date, party size, and slot in three taps, with instant confirmation and no app download."
      },
      {
        "title": "Direct-order flow",
        "body": "On-platform ordering that keeps every ₹ in-house instead of handing close to a third to the aggregators on each sale."
      },
      {
        "title": "Brand identity and logo",
        "body": "A logo, colour system, and menu typography that carry from the plate to the packaging to the profile grid."
      },
      {
        "title": "Reels engine for signature dishes",
        "body": "A repeatable shoot-and-post rhythm built around the plates guests were already filming, tuned for local discovery."
      },
      {
        "title": "Local Google & Meta Ads",
        "body": "Geo-fenced campaigns against nearby high-intent searches and interest audiences, pointed straight at the booking page."
      },
      {
        "title": "Google Business Profile tune-up",
        "body": "An optimised Maps listing with fresh photos and review prompts that lifted the rating and made FreshBite the obvious local pick."
      }
    ],
    "extraImpact": [
      {
        "metric": "Commission saved per direct order",
        "value": "~30%"
      },
      {
        "metric": "Weeknight waitlist",
        "value": "2 weeks"
      }
    ],
    "timeline": [
      {
        "phase": "Discovery",
        "detail": "Audited walk-in patterns, aggregator costs, and what guests were already posting."
      },
      {
        "phase": "Brand & Identity",
        "detail": "Built the logo, colour system, and menu type that anchor the new look."
      },
      {
        "phase": "Website Build",
        "detail": "Shipped a fast Next.js site engineered around direct booking."
      },
      {
        "phase": "Content & Social",
        "detail": "Started the Reels rhythm around signature dishes and local hashtags."
      },
      {
        "phase": "Paid Launch",
        "detail": "Turned on geo-targeted Google and Meta Ads into the booking flow."
      },
      {
        "phase": "Optimise & Scale",
        "detail": "Tuned campaigns and the Maps profile until weeknights filled."
      }
    ],
    "gallery": [
      {
        "label": "Homepage & menu",
        "kind": "desktop"
      },
      {
        "label": "Bookings dashboard",
        "kind": "dashboard"
      },
      {
        "label": "Ads performance",
        "kind": "analytics"
      },
      {
        "label": "Signature-dish Reels",
        "kind": "feature"
      },
      {
        "label": "Brand & logo system",
        "kind": "feature"
      },
      {
        "label": "Booking flow",
        "kind": "mobile"
      }
    ]
  },
  "glowskin": {
    "slug": "glowskin",
    "clientType": "Premium dermatology and skin clinic",
    "liveDomain": "glowskin.in",
    "overview": "GlowSkin Derma Clinic was paying premium search prices for traffic that stalled the moment it landed. An eleven-field form and a page that opened with the pitch instead of the proof meant clicks rarely became booked consultations, and ad spend was returning roughly a rupee for every rupee in. We rebuilt the funnel end to end, from keyword intent through to a two-field booking form, then tuned it on live conversion data until spend returned 6.4× and the calendar stayed full.",
    "requirements": [
      "Turn paid clicks into booked consultations",
      "Make ad spend measurably profitable",
      "Cut friction out of the booking flow",
      "Lead with clinical credibility, not discounts",
      "Keep the consultation calendar consistently full"
    ],
    "challenges": [
      {
        "title": "A form that asked before it earned",
        "body": "The landing page demanded eleven fields before offering a single reason to trust the clinic. Most visitors left before the first input."
      },
      {
        "title": "Spend stuck at break-even",
        "body": "Every rupee in Google and Meta Ads was coming back as roughly a rupee. The account was busy, but it was not profitable."
      },
      {
        "title": "Broad keywords, thin intent",
        "body": "Budget was spread across generic skincare terms that pulled browsers instead of patients ready to book a consultation."
      },
      {
        "title": "Proof buried below the pitch",
        "body": "Doctor credentials and real treatment outcomes sat far down the page, past the point most visitors ever scrolled."
      }
    ],
    "solutionPoints": [
      "Rebuilt targeting around high-intent search terms",
      "Landing page that opens with credentials and outcomes",
      "Two-field booking form: name and phone",
      "Weekly keyword pruning on live conversion data",
      "Unified Google and Meta Ads tracking"
    ],
    "keyFeatures": [
      {
        "title": "Intent-first keyword strategy",
        "body": "Rebuilt the Google Ads account around high-intent treatment and consultation searches, cutting spend on browse-level queries that never converted."
      },
      {
        "title": "Credibility-led landing page",
        "body": "A Next.js page that leads with doctor credentials, real outcomes, and treatment proof before it makes any ask of the visitor."
      },
      {
        "title": "Two-field booking form",
        "body": "Replaced the eleven-field form with name and phone, collapsing the booking barrier to a single fast step."
      },
      {
        "title": "End-to-end conversion tracking",
        "body": "Wired tracking across Google and Meta Ads so every booking traced back to the exact keyword and creative that produced it."
      },
      {
        "title": "Data-driven keyword pruning",
        "body": "A weekly review that let conversion data cut non-performing keywords and move budget toward the terms that booked consultations."
      },
      {
        "title": "Meta retargeting for warm visitors",
        "body": "Retargeting sequences that brought back people who viewed treatments but left before booking, at a lower cost per consultation."
      }
    ],
    "extraImpact": [
      {
        "metric": "Cost per booking",
        "value": "-68%"
      },
      {
        "metric": "Form completion",
        "value": "3.4×"
      }
    ],
    "timeline": [
      {
        "phase": "Discovery",
        "detail": "Audited the ad accounts and funnel and found spend leaking at a break-even landing page."
      },
      {
        "phase": "Strategy",
        "detail": "Mapped high-intent keywords and rewrote the funnel around booking, not browsing."
      },
      {
        "phase": "Build",
        "detail": "Developed the Next.js landing page, leading with credentials and a two-field form."
      },
      {
        "phase": "Launch",
        "detail": "Went live across Google and Meta Ads with full conversion tracking in place."
      },
      {
        "phase": "Optimize",
        "detail": "Pruned keywords weekly and shifted budget toward booking-ready terms."
      },
      {
        "phase": "Scale",
        "detail": "Held ROAS at 6.4× while keeping the consultation calendar full."
      }
    ],
    "gallery": [
      {
        "label": "Credibility-led landing page",
        "kind": "desktop"
      },
      {
        "label": "Google Ads campaign structure",
        "kind": "dashboard"
      },
      {
        "label": "ROAS and booking analytics",
        "kind": "analytics"
      },
      {
        "label": "Keyword pruning workflow",
        "kind": "feature"
      },
      {
        "label": "Two-field booking form",
        "kind": "mobile"
      },
      {
        "label": "Meta retargeting creative",
        "kind": "mobile"
      }
    ]
  },
  "buildnest": {
    "slug": "buildnest",
    "clientType": "Regional residential real estate developer",
    "liveDomain": "buildnest.in",
    "overview": "BuildNest had a portfolio of well-built residential projects and almost no visibility for the searches that actually drive property buyers. They ranked for their own name and little else, so every inquiry had to be bought through paid ads. We rebuilt the technical SEO foundation, created landing pages structured around how people search by city and budget, and used paid media only where organic could not yet reach, turning search into a pipeline they own rather than one they rent.",
    "requirements": [
      "Rank for high-intent property searches, not just the brand name",
      "Reduce dependence on paid lead buying",
      "Fast, crawlable site built for property listings",
      "Landing pages matched to city and budget searches",
      "Clear attribution from search query to inquiry"
    ],
    "challenges": [
      {
        "title": "Invisible beyond the brand",
        "body": "BuildNest ranked for \"BuildNest\" and nothing else. Buyers searching for a 3 BHK in a specific city under a set budget never saw them, so genuine demand went entirely to competitors."
      },
      {
        "title": "Every lead was rented",
        "body": "The pipeline ran on paid ads. The day spend paused, inquiries stopped. Growth was capped by ad budget rather than by the quality of the properties on offer."
      },
      {
        "title": "A site search engines could not read",
        "body": "Thin technical foundations, no structured data, and slow listing pages meant Google struggled to crawl and understand the inventory. Good properties simply were not indexed for the right terms."
      },
      {
        "title": "Content spoke to the company, not the buyer",
        "body": "Pages described the developer and its philosophy. Nobody searches that way. There was nothing built around \"2 BHK in [city] under ₹60L,\" which is exactly how buyers look."
      }
    ],
    "solutionPoints": [
      "Technical SEO rebuild on Next.js with clean, crawlable page structure",
      "Schema.org markup for listings, prices, and locations",
      "City-and-budget landing pages mapped to real search demand",
      "Paid layer scoped only to gaps organic could not yet win",
      "Search-to-inquiry tracking to prove where pipeline comes from"
    ],
    "keyFeatures": [
      {
        "title": "Next.js listing rebuild",
        "body": "Server-rendered property pages that load fast and crawl cleanly, replacing the slow, thin templates that kept inventory out of the index."
      },
      {
        "title": "Structured data layer",
        "body": "Schema.org markup for listings, price bands, and locations so search engines understand each property and can show rich results."
      },
      {
        "title": "City + budget page system",
        "body": "Templated landing pages for patterns like \"[BHK] in [city] under [budget],\" built to match the exact phrasing buyers type into search."
      },
      {
        "title": "Micro-market SEO foundation",
        "body": "Location pages, map integration, and internal linking organised by neighbourhood and budget so authority builds where demand actually sits."
      },
      {
        "title": "Paid gap coverage on Google Ads",
        "body": "Paid campaigns run only on high-intent terms organic had not yet captured, so ad spend fills gaps instead of paying for traffic SEO can earn free."
      },
      {
        "title": "Inquiry attribution",
        "body": "Tracking that ties every lead back to its search entry point, so it is clear which pages and queries turn into booked sales."
      }
    ],
    "extraImpact": [
      {
        "metric": "Cost per inquiry",
        "value": "-58%"
      },
      {
        "metric": "Non-brand keywords ranking",
        "value": "340+"
      }
    ],
    "timeline": [
      {
        "phase": "Discovery",
        "detail": "Search-demand audit and a full technical crawl to map what buyers search and why the site was invisible."
      },
      {
        "phase": "Architecture",
        "detail": "Next.js rebuild plan with a URL, schema, and internal-linking structure designed around real search patterns."
      },
      {
        "phase": "Build",
        "detail": "Server-rendered listing templates, the Schema.org layer, and the city-and-budget page system."
      },
      {
        "phase": "Content & SEO",
        "detail": "Pages targeted by micro-market and budget band, matched to how buyers actually phrase their searches."
      },
      {
        "phase": "Paid layer",
        "detail": "Google Ads scoped only to high-intent gaps organic had not yet reached."
      },
      {
        "phase": "Launch & scale",
        "detail": "Measure, attribute inquiries to source, and expand the pages proving out real pipeline."
      }
    ],
    "gallery": [
      {
        "label": "City + budget landing page",
        "kind": "desktop"
      },
      {
        "label": "Property listing detail",
        "kind": "desktop"
      },
      {
        "label": "Inquiry attribution dashboard",
        "kind": "dashboard"
      },
      {
        "label": "Organic traffic growth",
        "kind": "analytics"
      },
      {
        "label": "Schema-rich search result",
        "kind": "feature"
      },
      {
        "label": "Mobile property search",
        "kind": "mobile"
      }
    ]
  },
  "fitlife": {
    "slug": "fitlife",
    "clientType": "Multi-location fitness chain — five gyms across one metro",
    "liveDomain": "fitlife.in",
    "overview": "FitLife ran five gyms in the same city, all pointed at one website and one set of ad campaigns. The branches bid on identical keywords, so the chain was effectively buying the same click twice and pushing up its own cost per membership. Over seven months we rebuilt the funnel branch by branch, with separate landing pages, geo-fenced campaigns, and content shot inside each gym, so every rupee worked for one location instead of against another.",
    "requirements": [
      "Stop the five branches bidding against each other on paid search",
      "One conversion-focused landing page per gym, not a shared brand page",
      "Lower cost per membership without slowing down sign-ups",
      "Local search visibility for each neighbourhood the gyms sit in",
      "Social content that shows the real training floors, not stock footage"
    ],
    "challenges": [
      {
        "title": "Five branches, one auction",
        "body": "Every gym targeted the same city and the same fitness keywords, so FitLife's own campaigns competed in the same Google auction. The chain paid a premium to outbid itself, and cost per join crept up every month."
      },
      {
        "title": "A single site with no local intent",
        "body": "One website served all five locations. Someone searching for a gym in their specific area landed on a generic homepage, had to hunt for the nearest branch, and often left before finding it."
      },
      {
        "title": "Leads with no home branch",
        "body": "Sign-ups came in without a clean signal of which gym they belonged to, so the team couldn't tell which locations were profitable and which were quietly burning budget."
      },
      {
        "title": "Content that could have been any gym",
        "body": "Ads and social ran on generic fitness visuals. Prospects couldn't see the actual rooms, equipment, or floor they'd be training on, so the creative did little to pull walk-ins from a specific neighbourhood."
      }
    ],
    "solutionPoints": [
      "Split the map: geo-fenced campaigns so each branch owns its own catchment",
      "A dedicated landing page per gym with local business schema and address-level intent",
      "Location exclusions and shared negative-keyword lists so branches never overlap in the auction",
      "Reels shot inside each gym's real training rooms, matched to the nearest branch",
      "Per-branch tracking so every membership maps back to the location that earned it"
    ],
    "keyFeatures": [
      {
        "title": "Five per-location landing pages",
        "body": "One page per gym, each leading with its address, hours, floor, and a single call to action: book a trial at that branch. Local schema markup made each page eligible for its own neighbourhood searches."
      },
      {
        "title": "Geo-fenced campaign structure",
        "body": "Google and Meta campaigns split by branch catchment, so ads for each gym only served in the area that gym could realistically convert, with no metro-wide overlap."
      },
      {
        "title": "Anti-cannibalisation keyword architecture",
        "body": "Location exclusions plus shared negative-keyword lists across all five accounts, engineered so two FitLife branches can never bid on the same impression."
      },
      {
        "title": "Local SEO across all five branches",
        "body": "Google Business Profiles cleaned up and optimised per location — categories, photos, service areas — to push each gym into the local pack for its own neighbourhood."
      },
      {
        "title": "Reels shot on the training floor",
        "body": "Short-form video filmed inside each gym showing the rooms, classes, and equipment members would actually use, then routed to the campaigns for that specific branch."
      },
      {
        "title": "Per-branch performance dashboard",
        "body": "A single view tracking cost per join, sign-ups, and spend for each of the five locations, so budget could shift toward the branches returning the best cost per membership."
      }
    ],
    "extraImpact": [
      {
        "metric": "Local pack ranking",
        "value": "Top 3"
      },
      {
        "metric": "Reel views",
        "value": "18L+"
      }
    ],
    "timeline": [
      {
        "phase": "Discovery",
        "detail": "Audited all five accounts and mapped where branches were bidding against each other."
      },
      {
        "phase": "Territory mapping",
        "detail": "Drew catchment areas per gym and defined the geo-fence for each campaign."
      },
      {
        "phase": "Build",
        "detail": "Shipped five per-location landing pages with local schema and single-action booking."
      },
      {
        "phase": "Campaign restructure",
        "detail": "Rebuilt Google and Meta campaigns with location exclusions and shared negatives."
      },
      {
        "phase": "Content",
        "detail": "Shot Reels inside each gym's real rooms and matched them to the right branch."
      },
      {
        "phase": "Launch & optimise",
        "detail": "Went live, tracked cost per join per branch, and shifted budget to the winners."
      }
    ],
    "gallery": [
      {
        "label": "Per-location landing page",
        "kind": "desktop"
      },
      {
        "label": "Geo-fenced campaign map",
        "kind": "dashboard"
      },
      {
        "label": "Cost-per-join by branch",
        "kind": "analytics"
      },
      {
        "label": "Reels shot on the training floor",
        "kind": "feature"
      },
      {
        "label": "Google Business Profiles — 5 branches",
        "kind": "feature"
      },
      {
        "label": "Branch trial booking flow",
        "kind": "mobile"
      }
    ]
  },
  "lawpoint": {
    "slug": "lawpoint",
    "clientType": "Established multi-practice advocacy firm (30 years)",
    "liveDomain": "lawpointadvocates.in",
    "overview": "LawPoint Advocates had thirty years of case history and a client roster built almost entirely on referral. The problem showed up the moment anyone checked them out online: a dated website that read as smaller and less serious than the practice actually was, so first-time searchers quietly chose a competitor. We rebuilt the brand and site to lead with track record, then ran narrow search campaigns only on the practice areas that turn a click into a paying matter.",
    "requirements": [
      "A brand and site that match a thirty-year reputation",
      "Rank on high-value practice areas, not vanity terms",
      "Enquiries that arrive qualified, not merely curious",
      "A clear path from search to booked consultation",
      "Proof of track record visible without scrolling"
    ],
    "challenges": [
      {
        "title": "The site contradicted the CV",
        "body": "Three decades of wins sat behind a template that looked a decade past its prime. Referred clients trusted it anyway; strangers read the design as the verdict and left before the first paragraph."
      },
      {
        "title": "Strong on referral, invisible on search",
        "body": "Word of mouth kept the calendar ticking, but anyone who Googled a legal problem first never found LawPoint. The pipeline had no top of funnel it didn't already know personally."
      },
      {
        "title": "Curious clicks, not qualified callers",
        "body": "The few enquiries that did come in were scattered across matters the firm doesn't take. Partners were spending billable time triaging leads that were never going to convert."
      },
      {
        "title": "Track record buried",
        "body": "The one thing that closes a legal client, a credible history of outcomes, was three clicks deep. Nothing above the fold told a visitor why this firm over the next one."
      }
    ],
    "solutionPoints": [
      "Rebrand that leads with standing and outcomes, not stock imagery",
      "Next.js site structured around distinct practice areas",
      "Credentials, years and case history placed above the fold",
      "Google Ads scoped only to practice areas that convert",
      "Two-step intake that qualifies before it books"
    ],
    "keyFeatures": [
      {
        "title": "Practice-area landing pages",
        "body": "A dedicated, indexable page for each area the firm wants to grow, written the way clients describe their problem rather than the way statutes name it. These pages carry both the rankings and the ad traffic."
      },
      {
        "title": "Track-record module",
        "body": "A credibility block at the top of every key page: years in practice, matters handled and representative outcomes. It gives a first-time visitor the same confidence a referral would."
      },
      {
        "title": "Qualifying consultation intake",
        "body": "A short two-step form that captures matter type and urgency before it offers a slot. Off-scope enquiries are routed politely elsewhere, so partners only see consultations worth their time."
      },
      {
        "title": "Brand identity system",
        "body": "A restrained wordmark, typography and colour system that reads as senior and trustworthy. Applied across the site, email signatures and consultation collateral for one consistent impression."
      },
      {
        "title": "Technical SEO on Next.js",
        "body": "Fast, server-rendered pages with clean structure and legal-service schema, so each practice area could climb the rankings on its own merit rather than paid rent."
      },
      {
        "title": "Scoped search campaigns",
        "body": "Tightly-themed Google Ads groups mapped one-to-one with practice areas, negative-keyword lists to block off-scope terms, and weekly pruning against which clicks actually became consultations."
      }
    ],
    "extraImpact": [
      {
        "metric": "Cost per qualified enquiry",
        "value": "−43%"
      },
      {
        "metric": "Consultation show-rate",
        "value": "84%"
      }
    ],
    "timeline": [
      {
        "phase": "Discovery",
        "detail": "Audited the old site, interviewed partners and mapped which practice areas earn the firm its living."
      },
      {
        "phase": "Brand",
        "detail": "Built an identity system that reads as senior, credible and unmistakably established."
      },
      {
        "phase": "Build",
        "detail": "Shipped a Next.js site around practice-area pages, with track record and intake at its centre."
      },
      {
        "phase": "SEO",
        "detail": "Technical and on-page work plus legal schema to earn the top spot organically."
      },
      {
        "phase": "Ads",
        "detail": "Launched scoped Google Ads on converting practice areas, with negatives blocking off-scope terms."
      },
      {
        "phase": "Launch & optimise",
        "detail": "Went live, then pruned keywords weekly against consultations booked, not clicks bought."
      }
    ],
    "gallery": [
      {
        "label": "Homepage, rebuilt",
        "kind": "desktop"
      },
      {
        "label": "Practice-area page",
        "kind": "desktop"
      },
      {
        "label": "Search campaign console",
        "kind": "dashboard"
      },
      {
        "label": "Rankings & enquiries",
        "kind": "analytics"
      },
      {
        "label": "Track-record module",
        "kind": "feature"
      },
      {
        "label": "Consultation intake",
        "kind": "mobile"
      }
    ]
  },
  "edureach": {
    "slug": "edureach",
    "clientType": "Online exam-prep and skilling academy",
    "liveDomain": "edureach.in",
    "overview": "EduReach Academy had strong course content and a paid-ads engine that filled seats, but most learners drifted after the first few lessons and never came back. Each new cohort had to be bought from scratch, so spend kept climbing while lifetime value stayed flat. We rebuilt the learning experience as a native mobile app, wired lifecycle campaigns that pull students back to the exact lesson they left, and rebuilt search around the outcomes people actually enrol for.",
    "requirements": [
      "A mobile-first learning experience students would open daily",
      "Retention mechanics that recover abandoned lessons, not just new leads",
      "Search and discovery built around exam and career outcomes",
      "Lower cost per enrolment from Meta Ads without dropping volume",
      "Clear view of cohort behaviour from signup through completion"
    ],
    "challenges": [
      {
        "title": "Acquisition worked, retention didn't",
        "body": "Ads reliably filled every cohort, but drop-off after the first lessons meant almost no compounding. The academy was renting an audience, not building one."
      },
      {
        "title": "Learning lived on the wrong surface",
        "body": "Courses ran through a desktop-heavy web flow that students rarely returned to. Without a daily habit loop, momentum died between sessions."
      },
      {
        "title": "Every cohort bought from scratch",
        "body": "With weak lifetime value, growth depended entirely on fresh spend. Rising CAC quietly capped how far marketing could push enrolments."
      },
      {
        "title": "Discovery didn't match intent",
        "body": "Students searched for outcomes like a specific exam or skill, but course discovery was organised by internal catalogue structure, so the right course was hard to find."
      }
    ],
    "solutionPoints": [
      "Built a React Native app so the lessons themselves live where students already are",
      "Added lifecycle campaigns that return people to the exact lesson they abandoned",
      "Rebuilt search and discovery around exam and career outcomes",
      "Rebuilt the Next.js marketing and enrolment funnel for SEO and speed",
      "Restructured Meta Ads spend toward audiences that retain, not just convert"
    ],
    "keyFeatures": [
      {
        "title": "Native learning app",
        "body": "A React Native app for iOS and Android where lessons, progress and streaks live together, with offline access so a weak connection doesn't break a study session."
      },
      {
        "title": "Resume-the-lesson lifecycle flows",
        "body": "Automated email, push and WhatsApp nudges that detect an abandoned lesson and bring the student straight back to it, not to a generic homepage."
      },
      {
        "title": "Outcome-based search",
        "body": "Discovery organised around goals like a target exam or role, so a query returns the course and path that gets there rather than a catalogue list."
      },
      {
        "title": "Progress and streak system",
        "body": "Daily goals, streaks and completion milestones that turn a one-off signup into a returning habit and feed the retention loop."
      },
      {
        "title": "SEO-tuned Next.js funnel",
        "body": "A fast, server-rendered marketing and enrolment site built for organic outcome-led queries, cutting reliance on paid traffic for every seat."
      },
      {
        "title": "Cohort analytics dashboard",
        "body": "A single view of signup, activation, lesson completion and revenue by cohort, so spend follows the segments that actually stay."
      }
    ],
    "extraImpact": [
      {
        "metric": "Enrolments",
        "value": "2x"
      },
      {
        "metric": "Lesson completion",
        "value": "+61%"
      }
    ],
    "timeline": [
      {
        "phase": "Discovery",
        "detail": "Mapped where cohorts dropped off and what outcomes they were really chasing."
      },
      {
        "phase": "Architecture",
        "detail": "Designed the React Native app and the Next.js funnel around retention, not just signups."
      },
      {
        "phase": "Build",
        "detail": "Shipped lessons, progress, streaks and offline access into the mobile app."
      },
      {
        "phase": "Lifecycle & search",
        "detail": "Wired resume-the-lesson campaigns and rebuilt discovery around outcomes."
      },
      {
        "phase": "Ads rework",
        "detail": "Reallocated Meta Ads spend toward audiences that retain and lowered cost per enrolment."
      },
      {
        "phase": "Launch & scale",
        "detail": "Rolled out to all cohorts and let the retained base fund further growth."
      }
    ],
    "gallery": [
      {
        "label": "SEO enrolment landing",
        "kind": "desktop"
      },
      {
        "label": "Cohort retention dashboard",
        "kind": "dashboard"
      },
      {
        "label": "Enrolment & GMV analytics",
        "kind": "analytics"
      },
      {
        "label": "Resume-the-lesson push flow",
        "kind": "feature"
      },
      {
        "label": "Lesson player & streaks",
        "kind": "mobile"
      },
      {
        "label": "Outcome-based search",
        "kind": "mobile"
      }
    ]
  },
  "nova": {
    "slug": "nova",
    "clientType": "Growing logistics SaaS platform",
    "liveDomain": "novalogistics.in",
    "overview": "Nova Logistics runs a shipment platform used by a growing roster of shippers, and its ops team was fielding the same questions every day: where is my shipment, when does it arrive, where is the paperwork. We connected an AI assistant directly to their live shipment data and document store so those answers land instantly, and the paperwork drafts itself. What is left for the ops team is the small share of cases that actually need judgment, handed over with the context already gathered.",
    "requirements": [
      "Deflect repetitive status, ETA, and paperwork tickets",
      "Answer from live shipment data, not stale copies",
      "Auto-draft shipping documents for review",
      "Hand complex cases to ops with full context",
      "Fit inside the existing support workflow"
    ],
    "challenges": [
      {
        "title": "Support scaling faster than the team",
        "body": "Ticket volume climbed with the platform, and nearly every status or ETA request pulled an ops person off real work. Roughly 40 hours a week went to questions that only needed a lookup."
      },
      {
        "title": "Answers had to be live",
        "body": "A shipment's status changes by the hour. A generic bot reading static FAQs would quote wrong ETAs, so the assistant had to read the same real-time data the ops team relied on."
      },
      {
        "title": "Paperwork was manual and repetitive",
        "body": "The team hand-drafted the same documents over and over from shipment details, a slow, error-prone step sitting on top of the ticket load."
      },
      {
        "title": "Not everything should be automated",
        "body": "The genuinely tricky cases still needed a human. Handing them over cold, without the shipment and conversation attached, would just move the work around instead of removing it."
      }
    ],
    "solutionPoints": [
      "RAG over live shipment data and the document library",
      "Instant answers on status, ETA, and paperwork",
      "Auto-drafted documents ready for a quick human check",
      "Context-rich escalation straight into the ops queue",
      "Embedded in the existing support channels"
    ],
    "keyFeatures": [
      {
        "title": "Live shipment retrieval",
        "body": "A Python service queries current shipment records, so every status and ETA answer reflects the platform's real-time state rather than a cached snapshot."
      },
      {
        "title": "RAG document engine",
        "body": "A retrieval layer over Nova's paperwork templates and policy docs answers from their own source material and points back to what it used."
      },
      {
        "title": "Paperwork drafting",
        "body": "Generates shipping documents pre-filled from shipment data and formatted, so ops reviews a draft in seconds instead of writing one from scratch."
      },
      {
        "title": "Smart escalation",
        "body": "Flags cases outside its confidence and routes them to ops with the shipment, the full conversation, and the gathered context already attached."
      },
      {
        "title": "Ops handoff console",
        "body": "A Next.js interface where the team picks up escalated tickets with everything assembled, so they act on exceptions instead of hunting for details."
      },
      {
        "title": "Resolution analytics",
        "body": "A dashboard tracking auto-resolution rate, deflected volume, and hours saved, showing Nova exactly where the assistant is carrying load."
      }
    ],
    "extraImpact": [
      {
        "metric": "Support cost saved / month",
        "value": "₹1.5L"
      },
      {
        "metric": "Cases escalated with full context",
        "value": "100%"
      }
    ],
    "timeline": [
      {
        "phase": "Discovery",
        "detail": "Audited three months of tickets and tagged the repeat questions worth automating."
      },
      {
        "phase": "Data foundation",
        "detail": "Wired the assistant into live shipment data and built the RAG layer over Nova's document library."
      },
      {
        "phase": "Assistant build",
        "detail": "Built the Python answer engine for status, ETA, and paperwork queries."
      },
      {
        "phase": "Workflow & handoff",
        "detail": "Added auto-drafting and context-rich escalation into the ops workflow."
      },
      {
        "phase": "Pilot",
        "detail": "Ran the assistant on a slice of live traffic with ops reviewing every handoff."
      },
      {
        "phase": "Launch",
        "detail": "Rolled out across all support channels and tuned confidence thresholds."
      }
    ],
    "gallery": [
      {
        "label": "AI support console",
        "kind": "desktop"
      },
      {
        "label": "Ops handoff queue",
        "kind": "dashboard"
      },
      {
        "label": "Resolution analytics",
        "kind": "analytics"
      },
      {
        "label": "Shipment status & ETA lookup",
        "kind": "feature"
      },
      {
        "label": "Auto-drafted paperwork",
        "kind": "feature"
      },
      {
        "label": "Mobile agent view",
        "kind": "mobile"
      }
    ]
  }
};

export function getCaseStudyDetail(slug: string): CaseStudyDetail | undefined {
  return CASE_STUDY_DETAILS[slug];
}
