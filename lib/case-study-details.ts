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
  /** `src` = a real screenshot we own; without it the tile renders the
      on-brand MockScreen for its `kind`. */
  gallery: { label: string; kind: GalleryKind; src?: string }[];
}

export const CASE_STUDY_DETAILS: Record<string, CaseStudyDetail> = {
  "drivman": {
    "slug": "drivman",
    "clientType": "Premium automotive accessories brand",
    "liveDomain": "drivman.com",
    "overview": "DRIVMAN makes premium, vehicle-specific car and bike accessories — verified-fit gear engineered for exact models, not one-size-fits-all. The problem was the shelf it sat on: universal-fit marketplace listings where buyers can never be sure a part will fit, and where the platform owns the customer. We built drivman.com as the brand's own storefront, engineered around one promise — find parts that fit, exactly — and wrapped it in an identity that earns the premium: two-year warranty on every part, most orders dispatched within 24 hours.",
    "requirements": [
      "An owned e-commerce storefront, off the marketplaces",
      "Exact-fit discovery by brand, model and generation",
      "A premium identity that justifies premium pricing",
      "Trust signals up front: warranty, dispatch, installation",
      "A content and social engine for the builds community"
    ],
    "challenges": [
      {
        "title": "Universal-fit noise, exact-fit product",
        "body": "Marketplaces flatten every accessory into the same listing format. A precision-cut dash mat for one model generation looked identical to a ₹300 universal one — the fit story never survived the shelf."
      },
      {
        "title": "No owned storefront, no owned customer",
        "body": "Selling through platforms meant renting demand: no brand surface, no customer relationship, and margin lost to fees on every order."
      },
      {
        "title": "Fitment anxiety kills conversion",
        "body": "The single biggest reason accessory carts get abandoned is doubt: will this actually fit my car? Answering that had to be the storefront's first job, not a footnote."
      },
      {
        "title": "Premium claim, unproven brand",
        "body": "\"Premium isn't a price tag. It's a standard\" only works if the site looks and behaves like it — warranty, dispatch speed and installation support had to be visible before the price was."
      }
    ],
    "solutionPoints": [
      "Built the storefront around a brand → model → generation fitment selector",
      "Product pages lead with verified fitment, warranty and dispatch",
      "Brand identity tuned to the 'built different' positioning",
      "Launch campaigns on Google and Meta against model-specific searches",
      "A journal and social rhythm around real customer builds"
    ],
    "keyFeatures": [
      {
        "title": "Exact-fit vehicle selector",
        "body": "Pick your brand, model and generation once — the whole catalogue filters to parts verified to fit. 'Find parts that fit — exactly' became the interface, not just the tagline."
      },
      {
        "title": "Conversion-first product pages",
        "body": "Fitment confirmation, two-year warranty and 24-hour dispatch sit above the fold, so the premium price arrives after the trust, not before it."
      },
      {
        "title": "Premium brand system",
        "body": "A logo, palette and product-photography style that carry 'Engineered for the drive that matters' from the storefront to the packaging."
      },
      {
        "title": "Launch offers engine",
        "body": "Limited-time drops with live countdowns and a best-sellers rail — urgency mechanics that fit the brand instead of cheapening it."
      },
      {
        "title": "Installer & support network",
        "body": "Installation guidance and a partner-installer network built into the post-purchase flow, closing the loop that marketplaces leave open."
      },
      {
        "title": "Builds community loop",
        "body": "'Tag us. We repost the best builds' — a social rhythm that turns customer cars into the brand's content engine, feeding Reels and the journal."
      }
    ],
    "extraImpact": [
      {
        "metric": "Warranty on every part",
        "value": "2 years"
      },
      {
        "metric": "Orders dispatched",
        "value": "< 24 hrs"
      }
    ],
    "timeline": [
      {
        "phase": "Discovery",
        "detail": "Mapped the catalogue to vehicle data and audited how buyers search for exact-fit parts."
      },
      {
        "phase": "Brand & Identity",
        "detail": "Built the DRIVMAN identity — logo, palette and the premium product-page language."
      },
      {
        "phase": "Storefront Build",
        "detail": "Shipped the e-commerce build around the brand/model/generation fitment selector."
      },
      {
        "phase": "Content & Social",
        "detail": "Launched the journal and the builds-repost rhythm across Instagram and Reels."
      },
      {
        "phase": "Paid Launch",
        "detail": "Turned on Google and Meta campaigns against model-specific accessory searches."
      },
      {
        "phase": "Optimise & Scale",
        "detail": "Tuned drops, best-sellers and campaigns on live conversion data."
      }
    ],
    "gallery": [
      {
        "label": "Storefront home & fitment selector",
        "kind": "desktop",
        "src": "/images/driv1.webp"
      },
      {
        "label": "Shop — verified-fit catalogue",
        "kind": "desktop",
        "src": "/images/driv2.webp"
      },
      {
        "label": "Cart & checkout",
        "kind": "desktop",
        "src": "/images/driv3.webp"
      },
      {
        "label": "Footer & brand system",
        "kind": "desktop",
        "src": "/images/driv4.webp"
      }
    ]
  },
  "batra-cloth-house": {
    "slug": "batra-cloth-house",
    "clientType": "Heritage ethnic-wear e-commerce house",
    "liveDomain": "batraclothhouse.com",
    "overview": "Batra Cloth House had what most fashion brands spend fortunes chasing: decades of trust, master-weaver relationships, and India's finest handwoven sarees, silk lehengas and artisan ethnic wear. What it didn't have was a storefront that reached beyond its own doorstep. We built the BCH online store around the way women actually shop ethnic wear — by occasion, fabric and style — wrapped it in the 'Ethnic · Elegance · Heritage' identity, and turned festive and bridal seasons into launch events. Today the house sells 2,000+ authentic handwoven styles to shoppers across India.",
    "requirements": [
      "A full e-commerce store for sarees, suits and lehengas",
      "Discovery by occasion, fabric and style — the way buyers think",
      "Bridal and festive collections told as editorial stories",
      "An offers engine for festive drops and first-order codes",
      "WhatsApp woven into the buying and support journey"
    ],
    "challenges": [
      {
        "title": "A heritage brand locked in one store",
        "body": "Fifty thousand happy customers had walked through the doors over the years — but every new one still had to. The finest pieces sold only to whoever happened to see them."
      },
      {
        "title": "Ethnic wear is shopped by occasion, not category",
        "body": "A bride searching 'Banarasi bridal' and a shopper browsing daily cotton sarees need entirely different journeys. A flat product grid serves neither."
      },
      {
        "title": "Festive demand, compressed into weeks",
        "body": "Wedding and festive seasons carry the year. Without launch moments, drops and offers, that surge had nowhere to land online."
      },
      {
        "title": "Handwoven authenticity is the premium — and invisible online",
        "body": "Pure silk, real zari and master-weaver provenance justify the price. A thumbnail can't carry that story without the brand around it."
      }
    ],
    "solutionPoints": [
      "Built the BCH store with discovery by occasion, fabric and style",
      "Bridal 2025 Edit and festive collections as editorial stories",
      "Offers engine: WELCOME10, FESTIVE40 and free-shipping thresholds",
      "WhatsApp built into the journey for queries and order support",
      "The 'Ethnic · Elegance · Heritage' identity across every touchpoint"
    ],
    "keyFeatures": [
      {
        "title": "Occasion-first discovery",
        "body": "Wedding, bridal, festive, party and daily wear as first-class journeys — plus fabric (Banarasi, Kanjivaram, Chanderi) and style (zari, embroidered, handloom) axes for the connoisseur."
      },
      {
        "title": "Editorial collection storytelling",
        "body": "The Banarasi Bridal Collection and festive edits presented as stories — 'handwoven with pure gold zari, for the bride who deserves nothing less' — not just filtered grids."
      },
      {
        "title": "Festive offers engine",
        "body": "First-order codes, festive sale campaigns with countdowns, and free-delivery thresholds — urgency mechanics that fit a heritage brand."
      },
      {
        "title": "WhatsApp commerce layer",
        "body": "One tap from any page to a human who knows the inventory — the trust of the shop counter, carried into the online store."
      },
      {
        "title": "Authenticity as a brand system",
        "body": "100% handwoven provenance, weaver stories and the gold-monogram BCH identity presented so the premium is understood before the price is seen."
      },
      {
        "title": "Newsletter and drops list",
        "body": "New arrivals, festive collections and secret sales delivered to the inbox — an owned audience the house controls, off the marketplaces."
      }
    ],
    "extraImpact": [
      {
        "metric": "Styles available online",
        "value": "2,000+"
      },
      {
        "metric": "Free delivery threshold",
        "value": "₹2,999+"
      }
    ],
    "timeline": [
      {
        "phase": "Discovery",
        "detail": "Mapped the catalogue, the occasions it serves, and how buyers actually search for ethnic wear."
      },
      {
        "phase": "Brand & Identity",
        "detail": "Built the BCH monogram, palette and 'Ethnic · Elegance · Heritage' brand language."
      },
      {
        "phase": "Store Build",
        "detail": "Shipped the e-commerce store with occasion, fabric and style discovery."
      },
      {
        "phase": "Collections & Content",
        "detail": "Launched the Bridal Edit and festive collections as editorial stories."
      },
      {
        "phase": "Offers & CRM",
        "detail": "Turned on the offers engine, WhatsApp support and the newsletter list."
      },
      {
        "phase": "Optimise & Scale",
        "detail": "Tuned drops and campaigns around the festive calendar."
      }
    ],
    "gallery": [
      {
        "label": "Storefront — Where Tradition Meets Elegance",
        "kind": "desktop",
        "src": "/images/bch1.webp"
      },
      {
        "label": "Bridal collection & festive sale",
        "kind": "desktop",
        "src": "/images/bch2.webp"
      },
      {
        "label": "Occasion, fabric & style discovery",
        "kind": "desktop",
        "src": "/images/bch3.webp"
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
  "foodies": {
    "slug": "foodies",
    "clientType": "Fresh-food kitchen — online ordering & function catering",
    "liveDomain": "foodies.com",
    "overview": "Foodies made everything by hand with the best ingredients — and sold almost all of it through phone calls and commission-hungry aggregator apps. Regulars had no menu to browse, and the most valuable enquiries of all — catering for weddings, corporate events and big family functions — arrived as missed calls and notebook entries. We built the Foodies website around its two real jobs: order food now, and book the big function. A live menu with prices and prep times feeds one-tap ordering, and a function-booking flow turns catering enquiries into confirmed consultation appointments with the date, guest count and menu already captured.",
    "requirements": [
      "A live menu with prices, prep times and photos",
      "Direct online ordering, off the aggregator commissions",
      "An appointment flow for big-function and event catering",
      "Offers and a newsletter that bring regulars back",
      "Reviews and the kitchen's handmade story up front"
    ],
    "challenges": [
      {
        "title": "A menu nobody could see",
        "body": "The kitchen's range lived on paper and in the owner's memory. Every order started with 'what do you have?' — a call the staff answered dozens of times a day."
      },
      {
        "title": "Aggregators owned the customer",
        "body": "App orders came with steep commissions and no customer relationship. Foodies was paying rent on demand its own food had earned."
      },
      {
        "title": "Function catering ran on missed calls",
        "body": "Wedding and corporate catering — the highest-value orders of the year — depended on someone catching the phone. Details lived in a notebook; follow-ups slipped."
      },
      {
        "title": "No reason to come back directly",
        "body": "With no offers, no newsletter and no direct channel, even loyal customers defaulted to whichever app pinged them last."
      }
    ],
    "solutionPoints": [
      "Built the site around two jobs: order now, book the function",
      "Live menu with prices, prep times and one-tap ordering",
      "Function booking as a structured appointment flow",
      "Offers engine and newsletter for repeat orders",
      "Reviews and the handmade-kitchen story front and centre"
    ],
    "keyFeatures": [
      {
        "title": "Live menu & one-tap ordering",
        "body": "Every dish with its photo, price, serving size and prep time — order in a tap, no phone call, no aggregator commission on the kitchen's own demand."
      },
      {
        "title": "Big-function booking flow",
        "body": "Weddings, corporate events and parties book as appointments: date, guest count, cuisine preferences and budget captured up front, with a confirmed consultation slot instead of a call-back promise."
      },
      {
        "title": "Handmade-kitchen storytelling",
        "body": "'We make everything by hand with the best possible ingredients' — the sourcing and kitchen story presented with the food photography that earns the claim."
      },
      {
        "title": "Offers & newsletter engine",
        "body": "First-order discounts and subscriber-only offers build a direct list, so the kitchen can fill quiet days without renting reach from the apps."
      },
      {
        "title": "Reviews as social proof",
        "body": "Real customer reviews surfaced beside the menu and the function-booking flow — the word of mouth that fills weddings, working online."
      },
      {
        "title": "Click-to-call and WhatsApp",
        "body": "For the customers who still want a human, one tap rings the kitchen — and function enquiries land with their details already structured."
      }
    ],
    "extraImpact": [
      {
        "metric": "Commission saved per direct order",
        "value": "~30%"
      },
      {
        "metric": "Function details captured up front",
        "value": "100%"
      }
    ],
    "timeline": [
      {
        "phase": "Discovery",
        "detail": "Mapped the menu, the order flow and how function enquiries actually arrived."
      },
      {
        "phase": "Brand & Identity",
        "detail": "Sharpened the Foodies identity and the handmade-kitchen story."
      },
      {
        "phase": "Build",
        "detail": "Shipped the site around the live menu, ordering and the function-booking flow."
      },
      {
        "phase": "Content & Photography",
        "detail": "Menu photography and the kitchen story, shot to earn the handmade claim."
      },
      {
        "phase": "Offers & CRM",
        "detail": "Turned on first-order codes, the newsletter and review collection."
      },
      {
        "phase": "Launch & optimise",
        "detail": "Went live and tuned the menu, offers and booking flow on real order data."
      }
    ],
    "gallery": [
      {
        "label": "Storefront — order in a tap",
        "kind": "desktop",
        "src": "/images/food1.webp"
      },
      {
        "label": "The handmade kitchen story",
        "kind": "desktop",
        "src": "/images/food2.webp"
      },
      {
        "label": "Live menu with prices & prep times",
        "kind": "desktop",
        "src": "/images/food3.webp"
      },
      {
        "label": "Offers & newsletter",
        "kind": "desktop",
        "src": "/images/food4.webp"
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
  "lc-luxe-interiors": {
    "slug": "lc-luxe-interiors",
    "clientType": "Luxury interior design & build studio",
    "liveDomain": "lcluxe.in",
    "overview": "LC Luxe Interiors crafts luxury living spaces — residential interiors, commercial fit-outs, bespoke villas and turnkey builds — and its whole catalogue lived where luxury usually does: in showrooms and PDFs. A homeowner couldn't browse wall panels against wallpapers, compare flooring finishes, or shortlist anything for their own rooms without booking a visit first. We built the LC Luxe platform around the act of choosing: eight product categories with search, Enquire and Quote on every product, the services laid out from a single room to a full villa, and consultation booking that turns a shortlist into a site visit.",
    "requirements": [
      "A browsable catalogue across every product category",
      "Let homeowners shortlist finishes for their own home",
      "Enquire and Quote actions on every single product",
      "Showcase services from one room to turnkey villas",
      "Consultation booking with the choices attached"
    ],
    "challenges": [
      {
        "title": "A catalogue locked in showrooms",
        "body": "Wall panels, flooring, wallpapers, soft furnishings — hundreds of finishes, none of them browsable. Every choice required a visit, so every project started slower than it needed to."
      },
      {
        "title": "Homeowners choose by room, not by SKU",
        "body": "People don't shop 'WPC 3D wall panels' — they shop 'something for the living-room wall'. The catalogue had to be organised the way homeowners actually decide."
      },
      {
        "title": "Luxury has to look luxury online",
        "body": "A premium studio can't present villa-grade work in a generic template. The platform had to carry the same restraint and finish as the interiors themselves."
      },
      {
        "title": "Enquiries arrived without context",
        "body": "Calls came in as 'I saw something in your showroom' — no product, no room, no budget. Every conversation restarted from zero."
      }
    ],
    "solutionPoints": [
      "Eight-category product explorer with search",
      "Enquire & Quote on every product card",
      "Services from residential rooms to turnkey villas",
      "3D visualization and consultation booking",
      "An identity that carries the luxury from screen to site"
    ],
    "keyFeatures": [
      {
        "title": "Category-first product explorer",
        "body": "Wall panels, flooring, wallpapers, surfaces, outdoor, window and soft furnishings — searchable, filterable, and organised the way a homeowner walks through their own house."
      },
      {
        "title": "Enquire & Quote on every product",
        "body": "Each finish carries its own one-tap Enquire and Quote actions — by form, email or WhatsApp — so interest lands with the exact product attached."
      },
      {
        "title": "Services for every scale",
        "body": "Residential, commercial, luxury villas, turnkey execution, renovation, space planning, custom furniture and 3D visualization — each presented as its own explorable service."
      },
      {
        "title": "3D visualization before commitment",
        "body": "Photorealistic renders let clients see every detail of their space before a single panel is ordered — confidence that closes premium projects."
      },
      {
        "title": "Projects, gallery & testimonials",
        "body": "Completed homes and commercial spaces presented as a browsable gallery with client words beside them — the showroom, carried online."
      },
      {
        "title": "Consultation booking & WhatsApp",
        "body": "Book a consultation with the shortlist attached, or tap straight into WhatsApp — the site's job is to start the project conversation, not just display it."
      }
    ],
    "extraImpact": [
      {
        "metric": "Product categories to explore",
        "value": "8"
      },
      {
        "metric": "Enquiries with product attached",
        "value": "100%"
      }
    ],
    "timeline": [
      {
        "phase": "Discovery",
        "detail": "Mapped the catalogue, the services and how homeowners actually choose finishes."
      },
      {
        "phase": "Brand & Identity",
        "detail": "Built the gold-on-ink LC Luxe identity and the editorial typography."
      },
      {
        "phase": "Platform Build",
        "detail": "Shipped the category explorer, product search and Enquire/Quote flows."
      },
      {
        "phase": "Services & Projects",
        "detail": "Laid out the eight services and the projects gallery with testimonials."
      },
      {
        "phase": "Booking & CRM",
        "detail": "Wired consultation booking, quote requests and WhatsApp into one funnel."
      },
      {
        "phase": "SEO & Launch",
        "detail": "Launched with search structure across categories, products and services."
      }
    ],
    "gallery": [
      {
        "label": "Crafting luxury living spaces",
        "kind": "desktop",
        "src": "/images/inter1.webp"
      },
      {
        "label": "Premium services — room to villa",
        "kind": "desktop",
        "src": "/images/inter6.webp"
      },
      {
        "label": "Category-first product explorer",
        "kind": "desktop",
        "src": "/images/inter3.webp"
      },
      {
        "label": "Enquire & Quote on every product",
        "kind": "desktop",
        "src": "/images/inter4.webp"
      },
      {
        "label": "The LC Luxe story",
        "kind": "desktop",
        "src": "/images/inter2.webp"
      },
      {
        "label": "Brand system & footer",
        "kind": "desktop",
        "src": "/images/inter5.webp"
      }
    ]
  }
};

export function getCaseStudyDetail(slug: string): CaseStudyDetail | undefined {
  return CASE_STUDY_DETAILS[slug];
}
