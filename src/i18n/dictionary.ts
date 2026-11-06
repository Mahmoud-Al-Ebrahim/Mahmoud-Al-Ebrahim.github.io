import type { Domain, Role } from "@/content/schema";
import type { Locale } from "./config";

/**
 * Interface strings. Content (products, projects, experience, articles) lives
 * in src/content and src/content/ar; this file is only the words around it.
 * The Arabic object must have exactly the English shape (enforced by type).
 */

type Kind = "mobile" | "fullstack" | "backend" | "ml" | "hardware";

const en = {
  skip: "Skip to content",
  homeAria: (name: string) => `${name}, home`,
  nav: { apps: "Apps", projects: "Projects", about: "About", writing: "Writing", contact: "Contact" },
  navAria: { primary: "Primary", footer: "Footer" },
  downloadCv: "Download CV",
  languageSwitch: { label: "العربية", aria: "اقرأ هذه الصفحة بالعربية", lang: "ar" },
  menu: { open: "Open menu", close: "Close menu", dialog: "Site menu" },
  theme: { toLight: "Switch to light theme", toDark: "Switch to dark theme" },
  footer: (name: string) => `${name}, senior Flutter engineer. Static site, no analytics, no cookies.`,

  roles: { led: "Led and architected", built: "Built end to end", contributed: "Core contributor", developed: "Flutter developer" } satisfies Record<Role, string>,
  domains: { delivery: "Delivery", education: "Education", commerce: "Commerce", health: "Health", humanitarian: "Humanitarian", fintech: "Payments" } satisfies Record<Domain, string>,
  kinds: {
    mobile: "Mobile application",
    fullstack: "Full-stack system",
    backend: "Backend API",
    ml: "On-device machine learning",
    hardware: "Hardware integration",
  } satisfies Record<Kind, string>,
  roleFor: (role: string, publisher: string) => `${role} for ${publisher}`,
  and: " and ",
  screen: (name: string) => `${name} screen`,
  screenN: (name: string, n: number) => `${name} screen ${n}`,
  readCaseStudy: (name: string) => `Read the ${name} case study`,
  whatIEngineered: "What I engineered",
  stores: { appStoreEyebrow: "Download on the", playEyebrow: "Get it on", forName: (name: string) => ` for ${name}` },

  hero: {
    aria: "Introduction",
    eyebrow: "Senior Flutter engineer in Aleppo. Currently at KwanX.",
    lede: "I architect and ship mobile products, and build the Node.js and GraphQL backends they run on.",
    body: (apps: number, listings: number) =>
      `${cap(words(apps))} apps across ${words(listings)} App Store and Google Play listings: delivery, exam prep, marketplaces, veterinary care and payments. I led teams on several of them and taught Flutter and algorithms to more than a thousand students along the way.`,
    seeApps: "See the shipped apps",
    onStores: "On the stores now",
    allApps: "All apps and store links",
    shelfAria: "Published apps",
    screens: ["Fahim BAC: the units of a baccalaureate subject", "Sayed: wallet balance and top-up shortcuts", "Min Bayty: handmade products by category"],
  },

  shipped: {
    title: "Shipped to the stores",
    lede: "Real products with real users, built for publishers in Syria. Each one below says what I engineered, not just what the app does, and links to its case study and store pages.",
    captainSeparately: "The captain app ships separately:",
    customerAlt: (name: string) => `${name} customer app: choose pickup and drop-off`,
    captainAlt: (name: string) => `${name} captain app: profile and orders`,
    familyKicker: "Four apps, one platform",
    readPlatform: "Read the platform case study",
    appsInFamily: "Apps in this family",
    ofCount: (i: string, n: string) => `${i} of ${n}`,
    details: (name: string) => `${name} details`,
    alsoShipped: "Also shipped",
  },

  systems: {
    title: "The systems behind the apps",
    lede: "The same architecture in every Flutter codebase since 2024, the APIs I write when a product needs one, and three projects that go deeper than a typical app.",
    backendsTitle: "Backends I have written",
    backends: [
      {
        title: "Foodly API",
        meta: "Node.js, Express, MongoDB",
        body: "The REST API behind four delivery apps: role-based JWT guards for clients, vendors, drivers and admins; an eight-state order model that refuses double driver assignment; FCM fan-out to every driver with stored notification history; Atlas Search for discovery.",
        href: "/projects/foodly",
      },
      {
        title: "Mudhhila API",
        meta: "Node.js, Express, MongoDB aggregation",
        body: "A hall-operations back office: events, instalment payments and expenses, with settlement status derived from the ledger and monthly, weekly and date-range financial reports computed in aggregation pipelines.",
        href: "/projects/mudhhila",
      },
      {
        title: "Labeeny data layer",
        meta: "GraphQL on Hasura",
        body: "Customer and captain apps share one live order state through GraphQL subscriptions, with caching, optimistic updates and structured error handling behind Clean Architecture boundaries.",
        href: "/apps/labeeny",
      },
    ],
    allCaseStudies: "All engineering case studies",
  },

  experience: {
    title: "Experience",
    lede: "Five years shipping Flutter for delivery, commerce, education and health products, three of them leading teams, and eight years of teaching alongside.",
    fullResume: "Full résumé",
    now: "now",
    to: "to",
  },

  growth: {
    title: "Learning and teaching",
    lede: "Every technology here was learned on a live project and is linked to where it shipped. The teaching started in 2018 and never stopped.",
    learned: "What I learned, and where it shipped",
    teaching: "Teaching",
    docs: "Documentation I write",
    writing: "Writing",
    allArticles: "All articles",
    from: (source: string, minutes: number) => `From ${source}, ${minutes} minute read`,
  },

  contactCta: {
    title: "Contact",
    pitch: "Building a Flutter product that has to ship, scale, and be maintained by a team? I would like to hear about it.",
  },

  tradeOffs: { options: "Options considered", choice: "Choice", outcome: "Outcome" },
  competitiveProgramming: "Competitive programming",

  caseStudy: {
    breadcrumb: "Breadcrumb",
    facts: "Facts",
    more: "More case studies",
    previous: "Previous",
    next: "Next",
    screens: "Screens",
    challenge: "Challenge",
    solution: "Solution",
    honesty: "What this project does not do yet",
    steps: ["Problem", "Constraints", "Architecture", "Decisions", "Implementation", "Challenges", "Results", "Lessons learned"],
  },

  app: {
    crumb: "Shipped apps",
    role: "Role",
    publisher: "Publisher",
    platforms: "Platforms",
    year: "Year",
    partOf: "Part of",
    stack: "Stack",
    apps: "Apps",
    overview: "Overview",
    problem: "The problem",
    audience: "Who it serves",
    contribution: "My contribution",
    architecture: "Architecture",
    features: "Features",
    challenges: "Challenges and solutions",
    results: "Results",
    related: "Related",
    roleLine: (role: string, publisher: string, year: number) => `${role} for ${publisher}, ${year}`,
    roleRange: (role: string, publisher: string, from: number, to: number) => `${role} for ${publisher}, ${from} to ${to}`,
    sharedArchitecture: ["This app shares its architecture with the rest of its family; the ", " describes it in full."] as [string, string],
    familyCaseStudy: (name: string) => `${name} case study`,
    builtWith: (stack: string) => `Built with ${stack}.`,
  },

  project: {
    crumb: "Engineering",
    role: "Role",
    context: "Context",
    year: "Year",
    source: "Source",
    stack: "Stack",
    repo: "GitHub repository",
  },

  appsPage: {
    title: "Shipped apps",
    description:
      "Every app Mahmoud AlEbrahim has shipped to Google Play and the App Store: delivery, exam prep, marketplaces, veterinary care, payments and humanitarian search.",
    lede: (apps: number, listings: number) => `${apps} apps across ${listings} store listings, each with the role I played and a link to its case study.`,
    filterAria: "Filter by domain",
    all: "All",
    partOf: "Part of",
  },

  projectsPage: {
    title: "Engineering projects",
    description: "Case studies in on-device machine learning, multi-service mobile architecture, full-stack delivery systems and testing discipline.",
    lede: (n: number) => `${cap(words(n))} systems, each written up from problem to lessons learned, with what they do not do stated plainly.`,
  },

  aboutPage: {
    title: "About",
    description:
      "Background, engineering philosophy, worked trade-offs, teaching and education of Mahmoud AlEbrahim, senior Flutter engineer in Aleppo.",
    lede: "Where the work comes from, how I think about it, and what I have learned teaching it.",
    background: "Background",
    philosophy: "Engineering philosophy",
    philosophyLede: "Six principles, each with a place in the code where it is visible.",
    tradeOffs: "How I solve problems",
    tradeOffsLede: "Three decisions written out the way they were made: the situation, the options, the choice and what it cost.",
    teaching: "Learning and teaching",
    teachingLede:
      "Since 2018 I have taught Flutter, web development, algorithms and data structures to more than a thousand students and mentored the developers I ship with.",
    articlesWord: "articles",
    education: "Education and awards",
    languagesLine: (langs: string, location: string) => `Languages: ${langs}. Based in ${location}.`,
  },

  writingPage: {
    title: "Writing",
    description: "Technical notes on on-device CLIP search, generic repositories, architecture-guard tests and prefetching in Flutter.",
    lede: "Decisions from real codebases, written so another engineer could reproduce them. Each note ends with what I would do differently.",
    minutes: (n: number) => `${n} min`,
  },

  article: {
    eyebrow: "Writing",
    published: "Published",
    readingTime: "Reading time",
    minuteRead: (n: number) => `${n} minute read`,
    source: "Source: ",
    note: null as string | null,
  },

  resumePage: {
    title: "Résumé",
    description: "Résumé of Mahmoud AlEbrahim, senior Flutter engineer and mobile architect, with a downloadable PDF.",
    intro: (name: string, location: string) => `${name}, senior Flutter engineer and mobile architect, ${location}.`,
    download: "Download the PDF",
    pdfNote: null as string | null,
    experience: "Experience",
    skills: "Skills",
    education: "Education",
    awards: "Awards",
    languages: "Languages",
    contact: "Contact",
    present: "Present",
  },

  contactPage: {
    title: "Contact",
    description: "Get in touch with Mahmoud AlEbrahim about senior Flutter and mobile-architecture roles.",
    body: "Email is the fastest way to reach me. Tell me what you are building, the platforms you ship to, and what a good outcome looks like in three months; I reply within two working days. For a quick look at the work first, the apps collection has store links and the projects have case studies.",
    basedIn: "Based in",
    currently: "Currently",
    phone: "Phone",
    resume: "Résumé",
    download: "Download the PDF",
  },

  notFound: {
    eyebrow: "Page not found",
    title: "There is nothing at this address.",
    lede: "The link may be old or mistyped. The most visited pages are below.",
    apps: "Published applications",
    projects: "Engineering projects",
    home: "Back to the home page",
  },

  diagram: {
    hint: "Hover or select a part to read what it does.",
    parts: "Diagram parts",
    region: (title: string) => `${title} diagram, scrolls sideways on small screens`,
  },
};

export type Dictionary = typeof en;

const ar: Dictionary = {
  skip: "تخطَّ إلى المحتوى",
  homeAria: (name) => `${name}، الصفحة الرئيسية`,
  nav: { apps: "التطبيقات", projects: "المشاريع", about: "نبذة عني", writing: "مقالات", contact: "تواصل" },
  navAria: { primary: "التنقل الرئيسي", footer: "روابط التذييل" },
  downloadCv: "تحميل السيرة الذاتية",
  languageSwitch: { label: "English", aria: "Read this page in English", lang: "en" },
  menu: { open: "فتح القائمة", close: "إغلاق القائمة", dialog: "قائمة الموقع" },
  theme: { toLight: "التبديل إلى الوضع الفاتح", toDark: "التبديل إلى الوضع الداكن" },
  footer: (name) => `${name}، مهندس Flutter أول. موقع ثابت، بلا أدوات تحليل وبلا ملفات تعريف ارتباط.`,

  roles: { led: "قيادة وتصميم المعمارية", built: "بناء كامل من البداية إلى النهاية", contributed: "مساهم أساسي", developed: "مطور Flutter" },
  domains: { delivery: "التوصيل", education: "التعليم", commerce: "التجارة", health: "الصحة", humanitarian: "إنساني", fintech: "المدفوعات" },
  kinds: {
    mobile: "تطبيق هاتف",
    fullstack: "نظام متكامل (Full-stack)",
    backend: "واجهة خلفية (API)",
    ml: "تعلّم آلي على الجهاز",
    hardware: "تكامل مع العتاد",
  },
  roleFor: (role, publisher) => `${role} لصالح ${publisher}`,
  and: " و",
  screen: (name) => `شاشة من ${name}`,
  screenN: (name, n) => `شاشة ${n} من ${name}`,
  readCaseStudy: (name) => `اقرأ دراسة حالة ${name}`,
  whatIEngineered: "ما الذي بنيته هندسيًا",
  stores: { appStoreEyebrow: "حمّله من", playEyebrow: "احصل عليه من", forName: (name) => ` لتطبيق ${name}` },

  hero: {
    aria: "مقدمة",
    eyebrow: "مهندس Flutter أول في حلب. أعمل حاليًا في KwanX.",
    lede: "أصمّم معمارية تطبيقات الهاتف وأطلقها، وأبني الواجهات الخلفية التي تعمل عليها باستخدام Node.js وGraphQL.",
    body: (apps, listings) =>
      `أطلقتُ ${arCount(apps, "تطبيقات", "تطبيقًا")} عبر ${arCount(listings, "صفحات", "صفحة")} في App Store وGoogle Play: توصيل، وتحضير للامتحانات، وأسواق إلكترونية، ورعاية بيطرية، ومدفوعات. قدتُ الفرق في عدد منها، ودرّستُ Flutter والخوارزميات لأكثر من ألف طالب خلال ذلك.`,
    seeApps: "تصفّح التطبيقات المنشورة",
    onStores: "على المتاجر الآن",
    allApps: "كل التطبيقات وروابط المتاجر",
    shelfAria: "التطبيقات المنشورة",
    screens: ["فهيم bac: وحدات مادة من مواد البكالوريا", "سيِّد: رصيد المحفظة واختصارات الشحن", "من بيتي: منتجات يدوية حسب الفئة"],
  },

  shipped: {
    title: "منشورة على المتاجر",
    lede: "منتجات حقيقية لمستخدمين حقيقيين، بنيتها لناشرين في سوريا. يذكر كل منها أدناه ما بنيته هندسيًا، لا ما يفعله التطبيق فحسب، مع روابط إلى دراسة الحالة وصفحات المتاجر.",
    captainSeparately: "تطبيق الكابتن منشور بشكل منفصل:",
    customerAlt: (name) => `تطبيق العملاء في ${name}: اختيار نقطتي الاستلام والتسليم`,
    captainAlt: (name) => `تطبيق ${name}: الملف الشخصي والطلبات`,
    familyKicker: "أربعة تطبيقات، منصة واحدة",
    readPlatform: "اقرأ دراسة حالة المنصة",
    appsInFamily: "تطبيقات هذه العائلة",
    ofCount: (i, n) => `${i} من ${n}`,
    details: (name) => `تفاصيل ${name}`,
    alsoShipped: "تطبيقات منشورة أخرى",
  },

  systems: {
    title: "الأنظمة التي تقف خلف التطبيقات",
    lede: "المعمارية نفسها في كل مشروع Flutter منذ 2024، والواجهات الخلفية التي أكتبها حين يحتاج المنتج إليها، وثلاثة مشاريع تتعمق أكثر من أي تطبيق معتاد.",
    backendsTitle: "واجهات خلفية كتبتها",
    backends: [
      {
        title: "Foodly API",
        meta: "Node.js وExpress وMongoDB",
        body: "واجهة REST تخدم أربعة تطبيقات توصيل: حمايات JWT حسب الدور للعملاء والمتاجر والسائقين والمشرفين؛ ونموذج طلب بثماني حالات يرفض إسناد الطلب لسائقَين؛ وإرسال إشعارات FCM إلى كل السائقين مع حفظ سجلها؛ وAtlas Search للبحث والاستكشاف.",
        href: "/projects/foodly",
      },
      {
        title: "Mudhhila API",
        meta: "Node.js وExpress وتجميعات MongoDB",
        body: "نظام إدارة لصالات المناسبات: الحفلات والدفعات بالتقسيط والمصاريف، مع حالة تسوية مشتقة من السجل المالي، وتقارير مالية شهرية وأسبوعية ولفترات محددة تُحسب في خطوط تجميع (aggregation pipelines).",
        href: "/projects/mudhhila",
      },
      {
        title: "طبقة بيانات لبيني",
        meta: "GraphQL على Hasura",
        body: "يتشارك تطبيقا العملاء والكابتن حالة طلب حية واحدة عبر اشتراكات GraphQL، مع تخزين مؤقت وتحديثات تفاؤلية ومعالجة منظمة للأخطاء خلف حدود المعمارية النظيفة.",
        href: "/apps/labeeny",
      },
    ],
    allCaseStudies: "كل دراسات الحالة الهندسية",
  },

  experience: {
    title: "الخبرة",
    lede: "خمس سنوات من إطلاق تطبيقات Flutter للتوصيل والتجارة والتعليم والصحة، ثلاث منها في قيادة الفرق، وثماني سنوات من التدريس بالتوازي.",
    fullResume: "السيرة الذاتية كاملة",
    now: "الآن",
    to: "إلى",
  },

  growth: {
    title: "التعلّم والتدريس",
    lede: "تعلّمت كل تقنية هنا على مشروع حي، وكل منها مرتبطة بالمكان الذي أُطلقت فيه. بدأ التدريس عام 2018 ولم يتوقف.",
    learned: "ما تعلّمته، وأين أطلقته",
    teaching: "التدريس",
    docs: "توثيق أكتبه",
    writing: "مقالات",
    allArticles: "كل المقالات",
    from: (source, minutes) => `من ⁨${source}⁩، قراءة في ${arCount(minutes, "دقائق", "دقيقة")}`,
  },

  contactCta: {
    title: "تواصل",
    pitch: "تبني منتج Flutter يجب أن يُطلق ويتوسع ويصونه فريق؟ يسعدني أن أسمع عنه.",
  },

  tradeOffs: { options: "الخيارات المطروحة", choice: "القرار", outcome: "النتيجة" },
  competitiveProgramming: "البرمجة التنافسية",

  caseStudy: {
    breadcrumb: "مسار التنقل",
    facts: "معلومات أساسية",
    more: "دراسات حالة أخرى",
    previous: "السابق",
    next: "التالي",
    screens: "الشاشات",
    challenge: "التحدي",
    solution: "الحل",
    honesty: "ما لا يفعله هذا المشروع بعد",
    steps: ["المشكلة", "القيود", "المعمارية", "القرارات", "التنفيذ", "التحديات", "النتائج", "الدروس المستفادة"],
  },

  app: {
    crumb: "التطبيقات المنشورة",
    role: "الدور",
    publisher: "الناشر",
    platforms: "المنصات",
    year: "السنة",
    partOf: "جزء من",
    stack: "التقنيات",
    apps: "التطبيقات",
    overview: "نظرة عامة",
    problem: "المشكلة",
    audience: "لمن صُمّم",
    contribution: "مساهمتي",
    architecture: "المعمارية",
    features: "الميزات",
    challenges: "التحديات والحلول",
    results: "النتائج",
    related: "ذو صلة",
    roleLine: (role, publisher, year) => `${role} لصالح ${publisher}، ${year}`,
    roleRange: (role, publisher, from, to) => `${role} لصالح ${publisher}، من ${from} إلى ${to}`,
    sharedArchitecture: ["يشارك هذا التطبيق بقيةَ عائلته المعماريةَ نفسها، وتشرحها ", " بالتفصيل."],
    familyCaseStudy: (name) => `دراسة حالة ${name}`,
    builtWith: (stack) => `بُني باستخدام ${stack}.`,
  },

  project: {
    crumb: "المشاريع الهندسية",
    role: "الدور",
    context: "السياق",
    year: "السنة",
    source: "الكود المصدري",
    stack: "التقنيات",
    repo: "المستودع على GitHub",
  },

  appsPage: {
    title: "التطبيقات المنشورة",
    description:
      "كل تطبيق أطلقه Mahmoud AlEbrahim على Google Play وApp Store: التوصيل، والتحضير للامتحانات، والأسواق الإلكترونية، والرعاية البيطرية، والمدفوعات، والبحث الإنساني.",
    lede: (apps, listings) =>
      `${arCount(apps, "تطبيقات", "تطبيقًا")} في ${arCount(listings, "صفحات", "صفحة")} على المتاجر، ولكل منها الدور الذي أدّيته ورابط إلى دراسة حالته.`,
    filterAria: "التصفية حسب المجال",
    all: "الكل",
    partOf: "جزء من",
  },

  projectsPage: {
    title: "المشاريع الهندسية",
    description: "دراسات حالة في التعلّم الآلي على الجهاز، ومعمارية تطبيقات الهاتف متعددة الخدمات، وأنظمة التوصيل المتكاملة، وانضباط الاختبارات.",
    lede: (n) => `${arCount(n, "أنظمة", "نظامًا")}، كُتب كل منها من المشكلة إلى الدروس المستفادة، مع ذكر ما لا تفعله بوضوح.`,
  },

  aboutPage: {
    title: "نبذة عني",
    description: "الخلفية والفلسفة الهندسية والمفاضلات العملية والتدريس والتعليم لـ Mahmoud AlEbrahim، مهندس Flutter أول في حلب.",
    lede: "من أين يأتي العمل، وكيف أفكر فيه، وما الذي تعلمته من تدريسه.",
    background: "الخلفية",
    philosophy: "الفلسفة الهندسية",
    philosophyLede: "ستة مبادئ، لكل منها موضع في الكود يظهر فيه.",
    tradeOffs: "كيف أحل المشكلات",
    tradeOffsLede: "ثلاثة قرارات مكتوبة كما اتُّخذت: الموقف، والخيارات، والقرار، وما كلّفه.",
    teaching: "التعلّم والتدريس",
    teachingLede: "منذ 2018 درّست Flutter وتطوير الويب والخوارزميات وبنى المعطيات لأكثر من ألف طالب، وأرشدت المطورين الذين أعمل معهم.",
    articlesWord: "المقالات",
    education: "التعليم والجوائز",
    languagesLine: (langs, location) => `اللغات: ${langs}. مقيم في ${location}.`,
  },

  writingPage: {
    title: "مقالات",
    description: "ملاحظات تقنية عن البحث بـ CLIP على الجهاز، والمستودعات العامة، واختبارات تحرس المعمارية، والجلب المسبق في Flutter.",
    lede: "قرارات من مشاريع حقيقية، مكتوبة بحيث يستطيع مهندس آخر تكرارها. تنتهي كل مقالة بما كنت سأفعله بشكل مختلف.",
    minutes: (n) => arCount(n, "دقائق", "دقيقة"),
  },

  article: {
    eyebrow: "مقالات",
    published: "تاريخ النشر",
    readingTime: "مدة القراءة",
    minuteRead: (n) => `قراءة في ${arCount(n, "دقائق", "دقيقة")}`,
    source: "المصدر: ",
    note: "مقتطفات الكود بالإنجليزية كما هي في المستودع.",
  },

  resumePage: {
    title: "السيرة الذاتية",
    description: "السيرة الذاتية لـ Mahmoud AlEbrahim، مهندس Flutter أول ومصمم معمارية تطبيقات الهاتف، مع ملف PDF للتحميل.",
    intro: (name, location) => `${name}، مهندس Flutter أول ومصمم معمارية تطبيقات الهاتف، ${location}.`,
    download: "تحميل ملف PDF",
    pdfNote: "ملف PDF باللغة الإنجليزية.",
    experience: "الخبرة",
    skills: "المهارات",
    education: "التعليم",
    awards: "الجوائز",
    languages: "اللغات",
    contact: "التواصل",
    present: "الآن",
  },

  contactPage: {
    title: "تواصل",
    description: "تواصل مع Mahmoud AlEbrahim بخصوص أدوار Senior في Flutter ومعمارية تطبيقات الهاتف.",
    body: "البريد الإلكتروني أسرع طريقة للوصول إليّ. أخبرني بما تبنيه، والمنصات التي تستهدفها، وكيف تبدو النتيجة الجيدة بعد ثلاثة أشهر؛ أرد خلال يومَي عمل. وإن أردت إلقاء نظرة على العمل أولًا، ففي صفحة التطبيقات روابط المتاجر، وفي المشاريع دراسات الحالة.",
    basedIn: "مقيم في",
    currently: "حاليًا",
    phone: "الهاتف",
    resume: "السيرة الذاتية",
    download: "تحميل ملف PDF (بالإنجليزية)",
  },

  notFound: {
    eyebrow: "الصفحة غير موجودة",
    title: "لا يوجد شيء على هذا العنوان.",
    lede: "ربما يكون الرابط قديمًا أو فيه خطأ. هذه أكثر الصفحات زيارة.",
    apps: "التطبيقات المنشورة",
    projects: "المشاريع الهندسية",
    home: "العودة إلى الصفحة الرئيسية",
  },

  diagram: {
    hint: "مرّر المؤشر فوق جزء أو اختره لتقرأ ما يفعله.",
    parts: "أجزاء المخطط",
    region: (title) => `مخطط ${title}، يمكن تمريره أفقيًا على الشاشات الصغيرة`,
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];

function words(n: number): string {
  return NUMBER_WORDS[n] ?? String(n);
}

function cap(s: string): string {
  return s.replace(/^./, (c) => c.toUpperCase());
}

/**
 * Arabic counted nouns: 3 to 10 take the plural, 11 to 99 the singular
 * accusative. Callers pass both forms; digits stay Latin.
 */
export function arCount(n: number, plural: string, singularAcc: string): string {
  const r = n % 100;
  return `${n} ${r >= 3 && r <= 10 ? plural : singularAcc}`;
}
