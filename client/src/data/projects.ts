export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  bullets: string[];
  chips: string[];
  links: ProjectLink[];
  media: string[];
  modal: {
    html: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: "transit",
    title: "Public Transit Automation Internship",
    tagline: "Automation • Real-time visualization • Analytics integration",
    bullets: [
      "Automated GTFS feeds and validated route geometry with Google Earth + GTFS-Builder.",
      "Built Selenium + HTML kiosk automation that auto-centers and zooms to buses in motion.",
      "Created real-time 3D Blender visualization using live vehicle-position APIs and OSM/Google 3D tiles.",
      "Designed Tableau dashboards for ridership trends with route/week filters."
    ],
    chips: ["Python","PowerShell","SQL","Selenium","Tableau","Blender","GTFS","APIs"],
    links: [{ label: "GTFS-Builder Tool", href: "https://www.nationalrtap.org/Technology-Tools/GTFS-Builder" }],
    media: ["/transit_pipeline.svg","/kiosk1.png","/kiosk3.png", "/auto.png",
            "/3Dproject.png",
            "/ridership_table1.png"],
    modal: {
      html: `
        <h4>Overview</h4>
        <p>Unified automation + visualization stack for public-transit ops spanning data engineering, UI automation, and analytics.</p>

        <div class="modal__media">
          <img src="/transit_pipeline.svg" alt="ETL pipeline diagram"/>
        </div>
        <p><strong>ETL.</strong> Python/PowerShell jobs generate GTFS‐style feeds and validate geometry using <em>GTFS-Builder</em> + <em>Google Earth Pro</em>. Windows Task Scheduler/cron handle daily refresh and QC.</p>

        <h4>Kiosk Automation</h4>
        <p>HTML + Selenium scripts keep public kiosk maps centered on moving buses; scheduled tasks ensure continual refresh and zoom control.</p>
        <div class="modal__media">
          <img src="/kiosk1.png" alt="Kiosk automation sample"/>
          <img src="/kiosk3.png" alt="Kiosk map interface"/>
        </div>
        <pre><code>// kiosk_focus.py (illustrative)
    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from selenium.webdriver.common.action_chains import ActionChains
    from time import sleep

    driver = webdriver.Chrome()
    driver.get("https://kiosk-map.example.com")
    sleep(5)
    marker = driver.find_element(By.CSS_SELECTOR, "[data-bus-id='42']")
    ActionChains(driver).move_to_element(marker).click().perform()
    for _ in range(3):
        driver.find_element(By.CSS_SELECTOR, ".map-control-zoom-in").click(); sleep(0.5)
    </code></pre>

        <h4>3D Visualization</h4>
        <p>Real-time 3D view in Blender using OSM + Google 3D Tiles. Integrated live JSON feeds (<code>vehicle_positions.json</code>) to animate buses along routes.</p>
        <div class="modal__media">
          <img src="/3Dproject.png" alt="3D bus visualization in Blender"/>
        </div>

        <h4>Ridership Analytics</h4>
        <p>Tableau dashboards by ISO week/month/route to track ridership patterns and service efficiency.</p>
        <div class="modal__media">
          <img src="/ridership_table1.png" alt="Tableau ridership dashboard"/>
        </div>

        <h4>Code (Illustrative)</h4>
        <pre><code># etl_gtfs.py — extract → validate → export GTFS-like CSVs
    import pandas as pd
    bbox = (-90.70, 41.40, -90.30, 41.60)
    stops = pd.read_csv("source/stops.csv").dropna(subset=["lat","lon"])
    stops = stops[stops["lon"].between(bbox[0], bbox[2]) & stops["lat"].between(bbox[1], bbox[3])]
    assert stops["stop_id"].is_unique, "stop_id must be unique"
    stops.to_csv("gtfs_out/stops.txt", index=False)
    </code></pre>

        <pre><code># run_etl.ps1 — schedule & archive (illustrative)
    $venv = "C:\\Transit\\.venv\\Scripts\\python.exe"
    & $venv "C:\\Transit\\etl_gtfs.py" *>&1 | Tee-Object -FilePath "C:\\Transit\\logs\\etl.log"
    Compress-Archive -Path "C:\\Transit\\gtfs_out\\*" -DestinationPath "C:\\Transit\\archive\\gtfs_$(Get-Date -Format yyyyMMdd_HHmm).zip"
    </code></pre>

        <pre><code>-- v_ridership_by_hour_week (illustrative)
    CREATE OR ALTER VIEW dbo.v_ridership_by_hour_week AS
    SELECT route_id,
           DATEPART(ISO_WEEK, ride_time) AS iso_week,
           DATENAME(WEEKDAY, ride_time)  AS weekday_name,
           DATEPART(HOUR, ride_time)     AS hour_of_day,
           SUM(passenger_on)             AS riders
    FROM dbo.rides
    GROUP BY route_id, DATEPART(ISO_WEEK, ride_time), DATENAME(WEEKDAY, ride_time), DATEPART(HOUR, ride_time);
    </code></pre>

        <h4>Synthetic GTFS Snippet</h4>
        <pre><code>stop_id,stop_name,stop_lat,stop_lon
    S1001,Main & 1st,41.5203,-90.5746
    S1002,Main & 3rd,41.5211,-90.5719
    </code></pre>

        <p><em>All visuals are synthetic/anonymized; no proprietary datasets or vendor systems are exposed.</em></p>
      `
    }

  },
  {
    id: "marketsim",
    title: "MarketSim Trading App",
    tagline: "Flutter + Firebase • Android/Web enablement • News integration",
    bullets: [
      "Unblocked Android builds and added Web target.",
      "Configured Firebase and improved build hygiene.",
      "Integrated news API + branding polish for web."
    ],
    chips: ["Flutter","Dart","Firebase","Gradle","REST API"],
    links: [{ label: "Project Site", href: "https://sites.google.com/view/marketsim" },
            { label: "Github Link", href: "https://github.com/AugustanaCSC490Spring2024/Quetzal" }],
    
    media: [
      "/msim_home.png",
      "/msim_speedrun.png",
      "/msim_speedrun_tips.png",
      "/msim_quiz.png",
      "/msim_login.png",
      "/msim_game_center.png",
      "/msim_logo.png",
      "/msim_game_old.png"
    ],
    modal: {
      html: `
        <h4>Overview</h4>
        <p><strong>MarketSim</strong> is a cross-platform trading simulator built with Flutter + Firebase. I focused on shipping a production-feeling experience across Android/iOS/Web: authentication UX, visual polish, stable builds, and richer content via a news API and in-app games.</p>

        <h4>What I Built</h4>
        <ul>
          <li><strong>Auth refont:</strong> redesigned Sign-in/Sign-up with field validators, confirm-password, visibility toggle, and actionable error text.</li>
          <li><strong>Password recovery:</strong> strengthened the Forgot-Password flow with additional guards and clearer messaging.</li>
          <li><strong>Branding & startup:</strong> added a splash screen and platform app icons; cleaned theme and layout for consistency.</li>
          <li><strong>Build stability:</strong> set up per-platform Firebase options/json and fixed Gradle configuration to unblock Android builds.</li>
          <li><strong>Discovery:</strong> seeded a curated “popular stocks” list to improve first-time search UX.</li>
          <li><strong>News integration:</strong> connected ticker → headlines to enrich instrument details.</li>
          <li><strong>Game Center:</strong> added <em>SpeedRun</em> and <em>Quiz</em> modes with a leaderboard to reinforce learning.</li>
        </ul>

        <h4>Game Center</h4>
        <ul>
          <li><strong>SpeedRun:</strong> buy up to <em>5 times</em> at different price points, then <em>Sell All</em> for maximum profit before the simulated chart completes.</li>
          <li><strong>Quiz Challenge:</strong> short investing knowledge checks; earn points per correct answer.</li>
          <li><strong>Leaderboard:</strong> ranks users by total points across games.</li>
        </ul>

        <h4>Selected Screens (see Gallery)</h4>
        <ul>
          <li>Home with portfolio chart, <em>Buying Power</em>, and positions list.</li>
          <li>SpeedRun trading screen + rules overlay.</li>
          <li>Quiz start and question flow.</li>
          <li>Login redesign and app icon/splash branding.</li>
        </ul>

        <h4>Tech & Architecture</h4>
        <ul>
          <li><strong>Flutter/Dart</strong> (State management via common Flutter patterns, responsive widgets).</li>
          <li><strong>Firebase</strong> (Auth + platform configs; options/json per target).</li>
          <li><strong>REST</strong> news API for ticker-based headlines.</li>
          <li><strong>Build/Release:</strong> Gradle hygiene for Android, multi-platform readiness.</li>
        </ul>

        <h4>Illustrative Snippets</h4>
        <pre><code class="language-dart">// Validator example (simplified)
    String? validatePassword(String? v) {
      if (v == null || v.isEmpty) return 'Password required';
      if (v.length &lt; 8) return 'Use at least 8 characters';
      return null;
    }</code></pre>

        <pre><code class="language-dart">// Ticker → headlines (simplified)
    Future&lt;List&lt;NewsItem&gt;&gt; fetchNews(String symbol) async {
      final uri = Uri.parse('https://api.example.com/news?ticker=$symbol');
      final res = await http.get(uri);
      if (res.statusCode != 200) throw Exception('News fetch failed');
      final data = jsonDecode(res.body) as List;
      return data.map((e) =&gt; NewsItem.fromJson(e)).toList();
    }</code></pre>

        <p><em>Notes:</em> Screenshots are illustrative; no secrets or private API keys are exposed.</p>
      `
    }

  },
  {
    id: "ml-education",
    title: "Machine Learning Education Survey",
    tagline: "Regression baselines + tuned KNN • Reproducible pipeline",
    bullets: [
      "Survey → feature engineering → model selection.",
      "Baselines (Linear/Ridge) + tuned KNN; R²/MAE/accuracy evaluation.",
      "Plots: confusion matrix, actual-vs-predicted."
    ],
    chips: ["Python","Pandas","scikit-learn","EDA","Evaluation"],
    links: [{label: "Google Collab", href: "https://colab.research.google.com/drive/1jfZU-GxeTEwBWaa_NkcynCdIcq47AFnw?usp=sharing" },
            { label: "Project Writeup", href: "https://drive.google.com/file/d/10R2Yo3raE8ljEI9W0xePd0ZKIiqhz3E7/view?usp=sharing." }],
    media: [
      "/ml_pipeline.svg",
      "/lm.png",
      "/ml_coefficients.png",
      "/ml_pred_vs_actual.png",
      "/ml_survey_form.png",
      "/ml_citi_cert.png"
    ],

    modal: {
      html: `
        <h4>Overview</h4>
        <p><strong>What Makes Exam Prep Work?</strong> A semester-long, IRB-approved ML study predicting exam performance from study habits, mindset, and behavior. I co-led survey design and ethics, performed feature engineering, and built regression/classification models.</p>

        <h4>Dataset & Ethics</h4>
        <ul>
          <li>Google Forms survey of Augustana students (n ≈ 75) — anonymous participation.</li>
          <li>Signals: start-days-before, total study hours, breaks, sleep, attendance, confidence, stress, GPA.</li>
          <li>IRB-compliant; <em>CITI Human Subjects Research</em> certified. PII removed prior to modeling.</li>
        </ul>

        <h4>Modeling</h4>
        <ul>
          <li><strong>Linear & Ridge Regression</strong> for numeric grade (0–4 scale). Ridge for stability and feature ranking.</li>
          <li><strong>KNN Classification</strong> for High (A/B) vs Low (C/D/F) performers.</li>
          <li>Stack: <code>pandas</code>, <code>scikit-learn</code>, <code>matplotlib</code>.</li>
        </ul>

        <h4>Key Results</h4>
        <ul>
          <li><strong>MSE = 0.86</strong> with 11 features; same error with top 4 only (parsimonious model).</li>
          <li><strong>KNN Accuracy = 86%</strong> on held-out data.</li>
          <li>Strongest positive predictors: <em>Confidence</em>, <em>Class Attendance</em>, and <em>Early Start (days before)</em>.</li>
          <li>Strongest negative predictor: <em>Stress</em> (≈ −0.39 coefficient).</li>
        </ul>

        <h4>Illustrative Code</h4>
        <pre><code class="language-python"># Ridge (top 4 features)
    from sklearn.linear_model import Ridge
    ridge = Ridge(alpha=0.5).fit(X_train[['Confidence','DaysBefore','ClassAttendance','Stress']], y_train)
    print('MSE:', mean_squared_error(y_test, ridge.predict(X_test[['Confidence','DaysBefore','ClassAttendance','Stress']])) )</code></pre>

        <pre><code class="language-python"># KNN Classifier
    from sklearn.neighbors import KNeighborsClassifier
    knn = KNeighborsClassifier(n_neighbors=5).fit(X_train, y_train_clf)
    print('Accuracy:', knn.score(X_test, y_test_clf))</code></pre>

        <h4>Impact</h4>
        <ul>
          <li>Mindset/consistency outweighed raw study hours — actionable insight for advising.</li>
          <li>Small, transparent models can match larger ones — easier to interpret and deploy.</li>
          <li>Next: scale to larger cohorts and pilot nudges for at-risk students.</li>
        </ul>

        <p><em>Docs available:</em> IRB/CITI certificate, survey form, write-up, and slide deck.</p>
      `
    }

  },
  {
    id: "quad-cities",
    title: "Quad Cities Analytics (ACS)",
    tagline: "ACS API → GEOID joins → Tableau storytelling",
    bullets: [
      "Pipeline: Census API pulls, GEOID construction, tract-level merges.",
      "Visualized income/education/housing disparities."
    ],
    chips: ["Python","Requests","Pandas","Tableau","Geo data"],
    links: [
      { label: "Presentation Slides", href: "https://drive.google.com/file/d/1oC3CNB3iY-UMovu2EDCRpMOzFq5N64t1/view?usp=sharing" },
      { label: "Full Report (PDF)", href: "https://drive.google.com/file/d/1W4_ryrtzT9iWBmwNoFjGtUa9svRL1LlG/view?usp=sharing" }
    ],
    media: ["/qc.png","/qc2.png","/qc3.png","/qc4.png","/qc5.png","/qc6.png",],
    modal: {
      html: `
        <h4>Problem & Motivation</h4>
        <p><strong>Question:</strong> How do <em>foreign-born</em> and <em>native-born</em> populations differ across the Quad Cities (income, education, homeownership), and where are the pockets of concentration? This needed to be precise enough for neighborhood-level insights but broad enough to be statistically meaningful.</p>
        <p><strong>Why census tracts?</strong> Tracts (~1,200–8,000 people) strike the best balance between detail and privacy. Counties are too coarse and blocks are noisy/suppressed; tracts are the standard unit for small-area socioeconomic analysis and align cleanly with TIGER shapefiles for mapping.</p>

        <h4>Data Sources & Scope</h4>
        <ul>
          <li><strong>ACS 5-Year (2023)</strong> from the U.S. Census Bureau for: foreign-born share, median household income, education attainment (Bachelor’s+), and housing tenure (owner vs renter).</li>
          <li><strong>Geographies:</strong> Illinois (Rock Island County) and Iowa (Scott County) tracts covering Davenport, Bettendorf, Rock Island, Moline, East Moline, and adjacent places.</li>
          <li><strong>Privacy:</strong> only public, aggregated statistics; no PII.</li>
        </ul>

        <h4>Pipeline Overview</h4>
        <p>The workflow is reproducible and scripted end-to-end in Python, then visualized in Tableau.</p>
        <ol>
          <li><strong>Pull</strong> ACS tables for selected variables via the Census API (per-state/per-county tract queries).</li>
          <li><strong>Normalize</strong> column names and units; compute rates/percentages consistently.</li>
          <li><strong>Craft GEOID</strong> for each tract to serve as a stable join key across files (<code>state_fips + county_fips + tract_fips</code>).</li>
          <li><strong>Add lat/long</strong> by joining to TIGER centroid files (or computing centroids from shapefiles) on GEOID.</li>
          <li><strong>Export</strong> a single tidy CSV → feed into Tableau geospatial dashboards.</li>
        </ol>

        <h4>Why a custom Python pull (vs manual downloads)?</h4>
        <p>Repeatability and scale. The API lets us change variables/years or port the pipeline to other metros with a few parameters. It also avoids copy-paste errors and bakes in versioning and data quality checks.</p>

        <h4>Key Engineering Details</h4>
        <ul>
          <li><strong>GEOID construction.</strong> The tract GEOID is a concatenation of FIPS components, zero-padded: 
            <code>GEOID = STATEFP(2) + COUNTYFP(3) + TRACTCE(6)</code>. This makes joins deterministic across ACS tables and TIGER geometry/centroids.</li>
          <li><strong>Lat/Long enrichment.</strong> We joined TIGER/Line tract centroids on GEOID, yielding a single point per tract for clean map rendering and labeling in Tableau.</li>
          <li><strong>Variable hygiene.</strong> All rates (e.g., % foreign-born, % bachelor’s) are derived from the appropriate denominators; income is kept as median household income in USD; tenure split is owner vs renter, percent of occupied units.</li>
          <li><strong>Versioned outputs.</strong> Intermediate CSVs are stored per run/date so results are auditable.</li>
        </ul>

        <h4>Illustrative Snippets</h4>
        <pre><code class="language-python"># 1) Pull ACS by tract for a county
    import requests, pandas as pd

    BASE = "https://api.census.gov/data/2023/acs/acs5"
    # Example variables: foreign-born share (B05012), bachelor's+ (DP02_0068P), median income (B19013)
    VARS = ["NAME","B05012_011E","B05012_001E","B19013_001E","DP02_0068P"]  # rename later
    params = {
      "get": ",".join(VARS),
      "for": "tract:*",
      "in": "state:17 county:161"  # 17=IL, 161=Rock Island County
    }
    r = requests.get(BASE, params=params); r.raise_for_status()
    rows = r.json()
    df_il = pd.DataFrame(rows[1:], columns=rows[0])

    # 2) Compute rates & GEOID
    df_il = (df_il
        .assign(
          foreign_born=lambda d: d["B05012_011E"].astype(float),
          total_pop=lambda d: d["B05012_001E"].astype(float),
          pct_foreign=lambda d: 100*d["foreign_born"]/d["total_pop"],
          median_income=lambda d: d["B19013_001E"].astype(float),
          pct_bachelors=lambda d: d["DP02_0068P"].astype(float),
          GEOID=lambda d: d["state"].str.zfill(2)+d["county"].str.zfill(3)+d["tract"].str.zfill(6)
        )
        [["GEOID","NAME","pct_foreign","median_income","pct_bachelors"]])

    # Repeat for IA county (Scott: state 19, county 163) then concat → df_all</code></pre>

        <pre><code class="language-python"># 3) Join to TIGER centroids and export
    centroids = pd.read_csv("tiger_tract_centroids.csv")  # GEOID, lat, lon
    final = (df_all.merge(centroids, on="GEOID", how="left")
                   .rename(columns={"lat":"Latitude","lon":"Longitude"}))
    final.to_csv("quad_cities_tracts_2023.csv", index=False)</code></pre>

        <h4>Geospatial Presentation (Tableau)</h4>
        <ul>
          <li><strong>Point map by tract</strong> using centroid Lat/Long; color encodes foreign-born %, size encodes median income. Tooltips show tract ID, city, and metrics.</li>
          <li><strong>Side-by-side bars</strong> compare foreign- vs native-born median income for selected tracts.</li>
          <li><strong>Stacked bars</strong> for homeownership split (owner vs renter) by nativity.</li>
          <li><strong>Education comparison</strong> (Bachelor’s+): native-born vs foreign-born averages.</li>
          <li><strong>Filters</strong> for state/county/tract; highlight actions to trace geographic clusters.</li>
        </ul>

        <h4>Findings (Selected)</h4>
        <ul>
          <li><strong>Foreign-born clustering</strong> around Rock Island, Moline, East Moline, and specific Davenport tracts.</li>
          <li><strong>Education gap:</strong> native-born ≈ <em>11.07%</em> Bachelor’s+, foreign-born ≈ <em>8.98%</em> (sample averages).</li>
          <li><strong>Income disparity:</strong> some tracts show foreign-born median income as low as <em>$9.4k</em> vs neighboring tracts &gt; <em>$40k</em>.</li>
          <li><strong>Homeownership:</strong> foreign-born rates frequently &lt; <em>15%</em> while native-born reach <em>50–75%</em> in the same area.</li>
        </ul>

        <h4>Limitations</h4>
        <ul>
          <li>ACS values are estimates with margins of error; very small tracts can be noisy.</li>
          <li>Cross-section only; this is not causal. Results guide hypotheses and outreach, not conclusions.</li>
          <li>Centroids approximate tract location; choropleth by polygons can be added if needed.</li>
        </ul>

        <h4>Impact & Reuse</h4>
        <ul>
          <li>Reusable Python pipeline: switch FIPS codes to replicate for any U.S. metro.</li>
          <li>Clear targeting for community programs (language access, housing counseling, scholarship outreach).</li>
          <li>Team-friendly handoff: one tidy CSV + Tableau workbook; documented variables and joins.</li>
        </ul>

        <p><em>Artifacts available:</em> ETL scripts, GEOID join tables, export CSV, and Tableau dashboard. Screens in the gallery show the income map, homeownership bars, education comparison, and the tract-level pipeline.</p>
      `
    }

  }
];
