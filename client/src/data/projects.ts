export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectGalleryItem {
  src: string;
  alt: string;
}

export interface ProjectCodeBlock {
  title?: string;
  language?: string;
  code: string;
}

export interface ProjectSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  orderedBullets?: string[];
  codeBlocks?: ProjectCodeBlock[];
  note?: string;
}

export interface ProjectContent {
  overview: string[];
  problem?: string[];
  solution?: string[];
  impact?: string[];
  tools?: string[];
  highlights?: string[];
  sections?: ProjectSection[];
  note?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  bullets: string[];
  chips: string[];
  links: ProjectLink[];
  gallery: ProjectGalleryItem[];
  content: ProjectContent;
  accessNote?: string;
}

export const FEATURED_PROJECT_IDS = [
  "transit",
  "icmmp",
  "niabi",
  "quad-cities",
] as const;

export const PROJECTS: Project[] = [
  {
    id: "transit",
    title: "MetroLINK Transit Automation",
    tagline: "Operational dashboards | GTFS workflows | transit automation",
    bullets: [
      "Built dashboards, GTFS workflows, and kiosk automation for finance, operations, and rider-facing transit systems.",
      "Integrated SQL Server, IoT, and ERP data into repeatable Python and PowerShell workflows, reducing manual reporting work.",
    ],
    chips: ["Python", "PowerShell", "SQL", "Selenium", "Tableau", "GTFS", "APIs"],
    links: [],
    gallery: [
      { src: "/transit_pipeline.svg", alt: "Transit ETL pipeline diagram" },
      { src: "/kiosk1.png", alt: "Transit kiosk automation screen" },
      { src: "/kiosk3.png", alt: "Transit kiosk map interface" },
      { src: "/auto.png", alt: "Transit automation workflow visual" },
      { src: "/3Dproject.png", alt: "3D transit visualization in Blender" },
      { src: "/ridership_table1.png", alt: "Ridership dashboard in Tableau" },
    ],
    accessNote: "Private internal system - public demo not available.",
    content: {
      overview: [
        "MetroLINK combined reporting, automation, and transit data workflows into one operational layer.",
        "The work supported finance, operations, and rider-facing systems through dashboards, ETL workflows, GTFS updates, and kiosk automation.",
      ],
      problem: [
        "Transit reporting and rider-facing workflows relied on multiple systems, repeated manual steps, and separate tools for data prep, public map behavior, and performance analysis.",
        "The challenge was to make those workflows more reliable, more repeatable, and easier to run in day-to-day operations.",
      ],
      solution: [
        "I built Python and PowerShell workflows for ETL, validation, and scheduled data prep, paired them with Selenium-based kiosk automation, and supported analytical outputs through dashboards and reporting views.",
        "That created a more connected workflow across operational data, public-facing map behavior, and decision-support reporting.",
      ],
      impact: [
        "Built dashboards and KPI reporting for finance, operations, and service-facing transit workflows.",
        "Reduced manual reporting effort through repeatable automation across operational data sources.",
        "Connected automation, visualization, and reporting into a system that was easier to run and maintain.",
      ],
      tools: [
        "Python and PowerShell for ETL, validation, automation, and scheduled workflows.",
        "SQL Server and operational source systems for reporting and analysis.",
        "Selenium, GTFS tools, Tableau, Google Earth Pro, Blender, and API-connected outputs for rider-facing and analytical use.",
      ],
      highlights: [
        "Automated GTFS-style feed generation and route validation.",
        "Built kiosk scripts that keep public map displays centered on moving buses.",
        "Supported real-time visualization and route-level reporting workflows.",
        "Connected multiple operational data flows into a more usable reporting system.",
      ],
      sections: [
        {
          title: "ETL and Validation",
          paragraphs: [
            "Python and PowerShell jobs generated GTFS-style feeds and validated geometry using GTFS-Builder and Google Earth Pro.",
            "Scheduled runs handled routine refresh and quality control so the workflow stayed repeatable.",
          ],
          codeBlocks: [
            {
              title: "etl_gtfs.py",
              language: "python",
              code: `import pandas as pd

bbox = (-90.70, 41.40, -90.30, 41.60)
stops = pd.read_csv("source/stops.csv").dropna(subset=["lat", "lon"])
stops = stops[
    stops["lon"].between(bbox[0], bbox[2])
    & stops["lat"].between(bbox[1], bbox[3])
]
assert stops["stop_id"].is_unique, "stop_id must be unique"
stops.to_csv("gtfs_out/stops.txt", index=False)`,
            },
            {
              title: "run_etl.ps1",
              language: "powershell",
              code: `$venv = "C:\\Transit\\.venv\\Scripts\\python.exe"
& $venv "C:\\Transit\\etl_gtfs.py" *>&1 |
  Tee-Object -FilePath "C:\\Transit\\logs\\etl.log"
Compress-Archive -Path "C:\\Transit\\gtfs_out\\*" `
  + `-DestinationPath "C:\\Transit\\archive\\gtfs_$(Get-Date -Format yyyyMMdd_HHmm).zip"`,
            },
          ],
        },
        {
          title: "Kiosk Automation",
          paragraphs: [
            "HTML and Selenium scripts kept public kiosk maps centered on moving buses, with scheduled tasks maintaining refresh and zoom behavior.",
          ],
          codeBlocks: [
            {
              title: "kiosk_focus.py",
              language: "python",
              code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from time import sleep

driver = webdriver.Chrome()
driver.get("https://kiosk-map.example.com")
sleep(5)
marker = driver.find_element(By.CSS_SELECTOR, "[data-bus-id='42']")
ActionChains(driver).move_to_element(marker).click().perform()
for _ in range(3):
    driver.find_element(By.CSS_SELECTOR, ".map-control-zoom-in").click()
    sleep(0.5)`,
            },
          ],
        },
        {
          title: "Visualization and Reporting",
          paragraphs: [
            "Real-time 3D support in Blender used OSM and Google 3D Tiles together with live JSON feeds to animate buses along routes.",
            "Ridership dashboards tracked route and time-based patterns to support service analysis and operational reporting.",
          ],
          codeBlocks: [
            {
              title: "v_ridership_by_hour_week.sql",
              language: "sql",
              code: `CREATE OR ALTER VIEW dbo.v_ridership_by_hour_week AS
SELECT route_id,
       DATEPART(ISO_WEEK, ride_time) AS iso_week,
       DATENAME(WEEKDAY, ride_time) AS weekday_name,
       DATEPART(HOUR, ride_time) AS hour_of_day,
       SUM(passenger_on) AS riders
FROM dbo.rides
GROUP BY route_id,
         DATEPART(ISO_WEEK, ride_time),
         DATENAME(WEEKDAY, ride_time),
         DATEPART(HOUR, ride_time);`,
            },
          ],
          note: "All visuals and examples are synthetic or anonymized. No proprietary datasets or vendor systems are exposed.",
        },
      ],
    },
  },
  {
    id: "icmmp",
    title: "ICMMP 2026 Conference Platform",
    tagline: "Conference website | archive migration | registration workflow",
    bullets: [
      "Built and shipped the public conference platform for ICMMP 2026, including content structure, archive pages, and registration flow.",
      "Added organizer notifications, attendee confirmations, and form hardening for a real event workflow.",
    ],
    chips: ["Next.js", "TypeScript", "Tailwind", "SMTP", "Content Architecture", "Workflow"],
    links: [
      {
        label: "Live Website",
        href: "https://icmmp26.com",
      },
    ],
    gallery: [
      { src: "/icmmp26.png", alt: "ICMMP 2026 homepage" },
      { src: "/icmmp26 2.png", alt: "ICMMP 2026 legacy gallery page" },
      { src: "/icmmp26 3.png", alt: "ICMMP 2026 registration form" },
    ],
    content: {
      overview: [
        "ICMMP 2026 is a public-facing conference platform built for a real academic event in Marrakech.",
        "The project combined visual presentation, structured content, archive migration, and registration workflow support into one production website.",
      ],
      problem: [
        "The conference needed more than a simple landing page. It needed a polished public site, a clear content structure for the current edition, continuity with past editions, and a usable registration workflow.",
        "It also needed communication support around participant registration without relying on fragile manual handling.",
      ],
      solution: [
        "I built the conference website around a structured edition model, created pages for current and past editions, and implemented a registration flow that sends organizer notifications and attendee confirmations.",
        "I also supported the workflow with validation and abuse-protection measures so the public-facing form could serve a real event process more reliably.",
      ],
      impact: [
        "Delivered a production conference site that balanced branding, usability, and operational usefulness.",
        "Created archive continuity across 2019, 2023, and 2026 editions.",
        "Supported registration and communication workflows through structured form handling and email delivery.",
      ],
      tools: [
        "Next.js and TypeScript for the application structure and page delivery.",
        "Tailwind CSS for the interface system and visual presentation.",
        "SMTP-based email workflow for organizer notifications and attendee confirmation messages.",
        "Structured content models and workflow hardening for public registration handling.",
      ],
      highlights: [
        "Built the public conference website for ICMMP 2026.",
        "Added archive and legacy continuity for earlier conference editions.",
        "Implemented a registration workflow tied to real participant communication.",
        "Shipped a polished event-oriented product with both content and operational value.",
      ],
      sections: [
        {
          title: "Platform Scope",
          paragraphs: [
            "The site covers the current conference edition, legacy/archive content, organizer and speaker presentation, logistics, proceedings, and participation flows.",
            "It was built to function as both an information platform and a lightweight event-operations layer.",
          ],
        },
        {
          title: "Registration Workflow",
          paragraphs: [
            "The registration form supports real participant submissions and routes confirmations and organizer notifications through email automation.",
            "The implementation was shaped around practical event needs rather than static brochure behavior.",
          ],
        },
        {
          title: "Why It Matters",
          paragraphs: [
            "This project shows public-facing product delivery, structured content design, and operational workflow thinking in the same build.",
            "It is not just a visual redesign; it is a working system that supports a real conference process.",
          ],
        },
      ],
      note: "Public live site available.",
    },
  },
  {
    id: "niabi",
    title: "Niabi Zoo Prairie Dog Habitat System",
    tagline: "Internal habitat system | observations | blueprint workflow",
    bullets: [
      "Designed a stakeholder-driven internal tool for logging habitat observations, burrows, zones, and behavior data.",
      "Built a blueprint-based workflow that turns field notes and habitat changes into structured records for day-to-day operational use.",
    ],
    chips: ["React", "Vite", "Supabase", "Internal Tool", "Observations", "Habitat Data"],
    links: [],
    gallery: [
      { src: "/niabi app.png", alt: "Niabi Zoo dashboard overview" },
      { src: "/niabi app 2.png", alt: "Niabi Zoo habitat blueprint sandbox" },
      { src: "/niabi supabase.png", alt: "Niabi Zoo structured behavior data in Supabase" },
    ],
    accessNote: "Private internal system - public demo not available.",
    content: {
      overview: [
        "Niabi is a private internal system for prairie dog habitat tracking, observations, and structured operational records.",
        "The project was shaped through direct stakeholder feedback and focuses on turning a messy real-world workflow into a usable internal tool.",
      ],
      problem: [
        "The zoo needed a clearer way to manage habitat information, observations, burrow records, and behavior tracking without relying on disconnected notes and ad hoc updates.",
        "The challenge was not just data entry. It was creating a structure the team could actually use in ongoing day-to-day work.",
      ],
      solution: [
        "I designed the system around habitat zones, burrows, observations, and behavior records, with a blueprint-style interface for interacting with the physical habitat layout.",
        "The result is an internal workflow that supports structured records, faster updates, and a clearer operational picture of the habitat.",
      ],
      impact: [
        "Turned habitat observations and map changes into a more structured internal workflow.",
        "Created a system design shaped around real stakeholder input rather than a generic template.",
        "Combined interface clarity, domain structure, and operational recordkeeping in one private tool.",
      ],
      tools: [
        "React and Vite for the internal application interface.",
        "Supabase for structured records and data-backed workflows.",
        "Blueprint-style habitat views, observation flows, and operational tracking patterns shaped around real use.",
      ],
      highlights: [
        "Built a dashboard for burrows, behaviors, and observations across habitat zones.",
        "Created a sandbox workflow for interacting with the blueprint and placing or updating habitat elements.",
        "Structured behavior and observation data for more consistent internal records.",
        "Developed the system iteratively with real stakeholder direction.",
      ],
      sections: [
        {
          title: "System Focus",
          paragraphs: [
            "The project centers on operational habitat tracking: burrows, zones, observations, and behavior records.",
            "It is designed as an internal system first, with usability for non-technical staff kept in view.",
          ],
        },
        {
          title: "Blueprint Workflow",
          paragraphs: [
            "One of the core interaction patterns is the habitat blueprint view, where map-based actions can be translated into structured records.",
            "That makes the tool more than a form system; it becomes a usable operational interface for the habitat itself.",
          ],
        },
        {
          title: "Why It Matters",
          paragraphs: [
            "This project shows systems thinking, stakeholder-driven product design, and internal-tool execution.",
            "It is strong proof of translating real operational needs into software that people can actually use.",
          ],
        },
      ],
      note: "Private internal system - public demo not available.",
    },
  },
  {
    id: "marketsim",
    title: "MarketSim Trading App",
    tagline: "Flutter + Firebase | Android/Web enablement | News integration",
    bullets: [
      "Unblocked Android builds and added Web target.",
      "Configured Firebase and improved build hygiene.",
      "Integrated news API and polished the user-facing experience.",
    ],
    chips: ["Flutter", "Dart", "Firebase", "Gradle", "REST API"],
    links: [
      { label: "Project Site", href: "https://sites.google.com/view/marketsim" },
      { label: "GitHub Link", href: "https://github.com/AugustanaCSC490Spring2024/Quetzal" },
    ],
    gallery: [
      { src: "/msim_home.png", alt: "MarketSim home screen" },
      { src: "/msim_speedrun.png", alt: "MarketSim speedrun mode" },
      { src: "/msim_speedrun_tips.png", alt: "MarketSim speedrun tips overlay" },
      { src: "/msim_quiz.png", alt: "MarketSim quiz mode" },
      { src: "/msim_login.png", alt: "MarketSim login screen" },
      { src: "/msim_game_center.png", alt: "MarketSim game center" },
      { src: "/msim_logo.png", alt: "MarketSim logo and branding" },
      { src: "/msim_game_old.png", alt: "Earlier MarketSim game screen" },
    ],
    content: {
      overview: [
        "MarketSim is a cross-platform trading simulator built with Flutter and Firebase.",
        "My contribution focused on making the product feel more production-ready across Android, iOS, and Web by improving authentication, build stability, branding, and content depth.",
      ],
      problem: [
        "The app needed a more stable release path, better first-use experience, and stronger product polish across platforms.",
        "It also needed richer content so users could do more than basic browsing inside the app.",
      ],
      solution: [
        "I improved authentication flows, stabilized platform configuration, added branded startup assets, and integrated a news API plus in-app game features.",
        "That work pushed the app closer to a complete product experience rather than a bare functional prototype.",
      ],
      impact: [
        "Unblocked Android builds and enabled the Web target.",
        "Improved authentication UX, recovery flow, and platform setup.",
        "Added richer discovery and learning features through news and game modes.",
      ],
      tools: [
        "Flutter and Dart for the product UI and cross-platform execution.",
        "Firebase for authentication and platform-specific configuration.",
        "REST API integration for ticker-based news content.",
        "Gradle and build configuration cleanup for Android stability.",
      ],
      highlights: [
        "Redesigned sign-in and sign-up with clearer validation and error states.",
        "Strengthened forgot-password handling and app startup polish.",
        "Added a curated stock list, news integration, and a Game Center experience.",
      ],
      sections: [
        {
          title: "What I Built",
          bullets: [
            "Redesigned sign-in and sign-up with validators, confirm-password, visibility toggle, and clearer error text.",
            "Strengthened the forgot-password flow with better guards and messaging.",
            "Added splash screen, platform icons, and cleaner visual consistency.",
            "Configured Firebase options and Gradle setup to unblock Android builds.",
            "Seeded a curated popular stocks list for better first-time search behavior.",
            "Connected ticker-based headlines and built SpeedRun, Quiz, and leaderboard features.",
          ],
        },
        {
          title: "Game Center",
          bullets: [
            "SpeedRun lets users buy at multiple price points and sell for best profit before the chart completes.",
            "Quiz Challenge adds short investing knowledge checks with points for correct answers.",
            "Leaderboard ranks users by total points across games.",
          ],
        },
        {
          title: "Tech and Architecture",
          bullets: [
            "Flutter and Dart using common responsive patterns.",
            "Firebase Auth plus per-platform options and configuration files.",
            "REST API integration for financial news enrichment.",
            "Gradle cleanup for Android build stability and multi-platform readiness.",
          ],
        },
        {
          title: "Illustrative Snippets",
          codeBlocks: [
            {
              title: "Validator example",
              language: "dart",
              code: `String? validatePassword(String? value) {
  if (value == null || value.isEmpty) return 'Password required';
  if (value.length < 8) return 'Use at least 8 characters';
  return null;
}`,
            },
            {
              title: "Ticker to headlines",
              language: "dart",
              code: `Future<List<NewsItem>> fetchNews(String symbol) async {
  final uri = Uri.parse('https://api.example.com/news?ticker=$symbol');
  final res = await http.get(uri);
  if (res.statusCode != 200) throw Exception('News fetch failed');
  final data = jsonDecode(res.body) as List;
  return data.map((item) => NewsItem.fromJson(item)).toList();
}`,
            },
          ],
          note: "Screenshots are illustrative and do not expose secrets or private API keys.",
        },
      ],
    },
  },
  {
    id: "ml-education",
    title: "Exam Performance Prediction",
    tagline: "Regression + KNN modeling | Feature engineering in Python",
    bullets: [
      "Developed regression and KNN models in Python to predict student performance, reaching about 86% accuracy on evaluation data.",
      "Performed feature engineering and statistical analysis to identify the factors most tied to exam outcomes.",
    ],
    chips: ["Python", "Pandas", "scikit-learn", "EDA", "Evaluation"],
    links: [
      {
        label: "Google Colab",
        href: "https://colab.research.google.com/drive/1jfZU-GxeTEwBWaa_NkcynCdIcq47AFnw?usp=sharing",
      },
      {
        label: "Project Writeup",
        href: "https://drive.google.com/file/d/10R2Yo3raE8ljEI9W0xePd0ZKIiqhz3E7/view?usp=sharing.",
      },
    ],
    gallery: [
      { src: "/ml_pipeline.svg", alt: "Machine learning pipeline diagram" },
      { src: "/lm.png", alt: "Linear model output chart" },
      { src: "/ml_coefficients.png", alt: "Model coefficient chart" },
      { src: "/ml_pred_vs_actual.png", alt: "Predicted versus actual results chart" },
      { src: "/ml_survey_form.png", alt: "Survey form used for data collection" },
      { src: "/ml_citi_cert.png", alt: "CITI certification image" },
    ],
    content: {
      overview: [
        "What Makes Exam Prep Work? was a semester-long, IRB-approved study on how study habits, mindset, and behavior relate to student performance.",
        "I helped design the survey, handled feature engineering, and built regression and classification models to turn the responses into interpretable results.",
      ],
      problem: [
        "The project asked which study behaviors actually matter most for exam outcomes and whether small, transparent models could still produce useful predictions.",
      ],
      solution: [
        "We collected survey data, engineered features, and compared regression and KNN approaches using a reproducible Python workflow.",
        "The goal was not only predictive performance but also interpretability and practical insight.",
      ],
      impact: [
        "KNN reached about 86 percent accuracy on held-out data.",
        "A compact model matched the error of a larger feature set, improving interpretability.",
        "The results highlighted confidence, attendance, and early preparation as strong signals.",
      ],
      tools: [
        "Python with pandas, scikit-learn, and matplotlib.",
        "Feature engineering, evaluation, and statistical interpretation in a reproducible notebook workflow.",
      ],
      highlights: [
        "IRB-compliant data collection with CITI Human Subjects Research certification.",
        "Regression baselines and tuned KNN classification in the same pipeline.",
        "Model outputs were framed for actionable advising and future student support use.",
      ],
      sections: [
        {
          title: "Dataset and Ethics",
          bullets: [
            "Google Forms survey of Augustana students with anonymous participation.",
            "Signals included days before studying, study hours, breaks, sleep, attendance, confidence, stress, and GPA.",
            "PII was removed before modeling and the workflow followed IRB requirements.",
          ],
        },
        {
          title: "Modeling",
          bullets: [
            "Linear and Ridge Regression were used for numeric grade prediction.",
            "KNN Classification was used for high versus low performer classification.",
            "The stack centered on pandas, scikit-learn, and matplotlib.",
          ],
        },
        {
          title: "Key Results",
          bullets: [
            "MSE of 0.86 with 11 features, with the same error retained using the top 4 only.",
            "KNN accuracy of about 86 percent on held-out data.",
            "Confidence, class attendance, and early start were the strongest positive signals.",
            "Stress was the strongest negative signal in the interpretable model view.",
          ],
        },
        {
          title: "Illustrative Code",
          codeBlocks: [
            {
              title: "Ridge with selected features",
              language: "python",
              code: `from sklearn.linear_model import Ridge

ridge = Ridge(alpha=0.5).fit(
    X_train[["Confidence", "DaysBefore", "ClassAttendance", "Stress"]],
    y_train,
)
predictions = ridge.predict(
    X_test[["Confidence", "DaysBefore", "ClassAttendance", "Stress"]]
)`,
            },
            {
              title: "KNN classifier",
              language: "python",
              code: `from sklearn.neighbors import KNeighborsClassifier

knn = KNeighborsClassifier(n_neighbors=5).fit(X_train, y_train_clf)
accuracy = knn.score(X_test, y_test_clf)`,
            },
          ],
        },
      ],
      note: "Supporting materials include the survey form, writeup, slides, and certification artifacts.",
    },
  },
  {
    id: "quad-cities",
    title: "Quad Cities Demographics Analysis",
    tagline: "Census API pipeline | GEOID joins | Tableau mapping",
    bullets: [
      "Built a reproducible Python pipeline that pulled, cleaned, and joined tract-level ACS data for the Quad Cities.",
      "Produced Tableau-ready outputs for community analysis across income, education, tenure, and foreign-born patterns.",
    ],
    chips: ["Python", "Requests", "Pandas", "Tableau", "GEOID", "ACS"],
    links: [
      {
        label: "Presentation Slides",
        href: "https://drive.google.com/file/d/1oC3CNB3iY-UMovu2EDCRpMOzFq5N64t1/view?usp=sharing",
      },
      {
        label: "Full Report (PDF)",
        href: "https://drive.google.com/file/d/1W4_ryrtzT9iWBmwNoFjGtUa9svRL1LlG/view?usp=sharing",
      },
    ],
    gallery: [
      { src: "/qc.png", alt: "Quad Cities dashboard overview" },
      { src: "/qc2.png", alt: "Quad Cities income map" },
      { src: "/qc3.png", alt: "Quad Cities housing chart" },
      { src: "/qc4.png", alt: "Quad Cities education comparison chart" },
      { src: "/qc5.png", alt: "Quad Cities demographic analysis chart" },
      { src: "/qc6.png", alt: "Quad Cities pipeline output visualization" },
    ],
    content: {
      overview: [
        "This project analyzed tract-level demographic patterns across the Quad Cities using public census data and a reproducible Python workflow.",
        "The result was a cleaner analytical pipeline that fed Tableau outputs for community-facing geographic insight.",
      ],
      problem: [
        "The work needed to compare foreign-born and native-born demographic patterns across income, education, and housing while staying precise enough for tract-level analysis.",
        "Manual downloads and one-off spreadsheet work would have made the process harder to repeat, audit, or extend.",
      ],
      solution: [
        "I built a Census API pipeline, constructed stable GEOID joins, added tract-level geospatial enrichment, and exported a clean dataset for Tableau analysis.",
        "That turned a scattered data-prep process into a reusable workflow that could be adapted for other places and future updates.",
      ],
      impact: [
        "Created a repeatable analytical pipeline instead of a one-off data pull.",
        "Produced Tableau-ready outputs for tract-level community analysis.",
        "Combined data extraction, geospatial joins, and presentation support in one reproducible workflow.",
      ],
      tools: [
        "Python, requests, and pandas for extraction, cleaning, joins, and export.",
        "ACS and GEOID-based tract joins for stable geography-aware analysis.",
        "Tableau for mapping and comparison views across demographic patterns.",
      ],
      highlights: [
        "Pulled tract-level census data through the Census API.",
        "Constructed reliable GEOID joins for mapping and analysis.",
        "Prepared Tableau outputs for geographic and comparison views.",
        "Kept the workflow reusable for other metros and future updates.",
      ],
      sections: [
        {
          title: "Data Sources and Scope",
          bullets: [
            "ACS 5-Year 2023 data from the U.S. Census Bureau.",
            "Metrics included foreign-born share, median household income, Bachelor's attainment, and housing tenure.",
            "Coverage focused on Scott County, Iowa and Rock Island County, Illinois tracts across the Quad Cities area.",
            "Only public, aggregated statistics were used.",
          ],
        },
        {
          title: "Pipeline Overview",
          orderedBullets: [
            "Pull ACS tables for selected variables through the Census API.",
            "Normalize naming and units, then compute rates and percentages consistently.",
            "Construct tract GEOIDs to serve as stable join keys.",
            "Join centroid latitude and longitude for mapping support.",
            "Export a tidy dataset for Tableau dashboards.",
          ],
        },
        {
          title: "Key Engineering Details",
          bullets: [
            "GEOID was built from zero-padded state, county, and tract FIPS values.",
            "TIGER centroids were joined for clean point-based map rendering and labeling.",
            "Rates and denominators were handled explicitly for foreign-born share, Bachelor's attainment, and tenure splits.",
            "Intermediate outputs were kept in versioned form for auditability and repeatability.",
          ],
        },
        {
          title: "Illustrative Snippets",
          codeBlocks: [
            {
              title: "ACS pull by tract",
              language: "python",
              code: `import requests
import pandas as pd

BASE = "https://api.census.gov/data/2023/acs/acs5"
vars_to_pull = [
    "NAME",
    "B05012_011E",
    "B05012_001E",
    "B19013_001E",
    "DP02_0068P",
]

params = {
    "get": ",".join(vars_to_pull),
    "for": "tract:*",
    "in": "state:17 county:161",
}

response = requests.get(BASE, params=params)
response.raise_for_status()
rows = response.json()
df_il = pd.DataFrame(rows[1:], columns=rows[0])`,
            },
            {
              title: "Rate and GEOID construction",
              language: "python",
              code: `df_il = df_il.assign(
    foreign_born=lambda d: d["B05012_011E"].astype(float),
    total_pop=lambda d: d["B05012_001E"].astype(float),
    pct_foreign=lambda d: 100 * d["foreign_born"] / d["total_pop"],
    median_income=lambda d: d["B19013_001E"].astype(float),
    pct_bachelors=lambda d: d["DP02_0068P"].astype(float),
    GEOID=lambda d: d["state"].str.zfill(2)
    + d["county"].str.zfill(3)
    + d["tract"].str.zfill(6),
)`,
            },
            {
              title: "Centroid enrichment and export",
              language: "python",
              code: `centroids = pd.read_csv("tiger_tract_centroids.csv")
final = (
    df_all.merge(centroids, on="GEOID", how="left")
    .rename(columns={"lat": "Latitude", "lon": "Longitude"})
)
final.to_csv("quad_cities_tracts_2023.csv", index=False)`,
            },
          ],
        },
        {
          title: "Geospatial Presentation",
          bullets: [
            "Point map by tract with color for foreign-born share and size for median income.",
            "Side-by-side bars for foreign-born versus native-born median income.",
            "Stacked homeownership comparison by nativity.",
            "Education comparison views plus filters for county and tract exploration.",
          ],
        },
        {
          title: "Findings",
          bullets: [
            "Foreign-born clustering appeared around Rock Island, Moline, East Moline, and selected Davenport tracts.",
            "Sample averages showed a Bachelor's attainment gap between native-born and foreign-born populations.",
            "Some tracts showed large income variation across neighboring areas.",
            "Homeownership rates for foreign-born populations were frequently much lower than native-born rates in the same area.",
          ],
        },
        {
          title: "Limitations",
          bullets: [
            "ACS estimates carry margins of error, especially for smaller tracts.",
            "This was a cross-sectional analysis rather than a causal study.",
            "Centroid mapping approximates tract location rather than full polygon coverage.",
          ],
        },
      ],
      note: "Artifacts available include ETL scripts, GEOID join tables, export CSVs, Tableau outputs, slides, and the full written report.",
    },
  },
];
