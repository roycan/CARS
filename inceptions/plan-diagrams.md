# Diagram Plan for CARS SSR

Created: November 9, 2025

This document defines what diagrams we will include, how we will lay out sources and outputs, the multi-format strategy (Mermaid, Graphviz DOT, PlantUML, D2), and where each PNG will be embedded in our Markdown docs for Grade 9 students. You will run the converter; this plan provides the exact source code blocks and the target PNG filenames.

---

## Source and Output Layout

- Sources live under: `docs/diagrams/<topic>/`
- For each topic we include multiple formats and levels:
  - Levels: `beginner`, `intermediate` (student-facing), and `advanced` (teacher-only)
  - Formats: prefer Mermaid; include DOT fallback; add PlantUML or D2 where useful
- Output PNG naming convention: `<topic>--<format>--<level>.png`

Example (Architecture topic):
- Sources:
  - `docs/diagrams/architecture/architecture.mmd`
  - `docs/diagrams/architecture/architecture.dot`
  - `docs/diagrams/architecture/architecture.puml`
- Outputs:
  - `docs/diagrams/architecture/architecture--mermaid--beginner.png`
  - `docs/diagrams/architecture/architecture--dot--beginner.png`
  - `docs/diagrams/architecture/architecture--plantuml--intermediate.png`

Color/style: neutral Bulma-like colors when supported (primary/info/success/warning/danger tones). Orientation: LR (left-to-right) for flows; TB (top-to-bottom) for trees.

---

## Embedding Strategy (Markdown)

We embed PNGs (not live diagram code) in:
- `inceptions/plan-SSR.md` (student plan): Beginner and some Intermediate diagrams
- `docs/ARCHITECTURE.md` (deep dive): Intermediate and Advanced diagrams
- `SSR/DEPLOYMENT.md` (ops): Deployment and debugging diagrams

Each embedded image includes:
- Alt text (clear sentence for accessibility)
- A short caption (Figure X: Title)

---

## Batch 1 (Foundational) — Diagram Sources

Included topics: Architecture, SSR Request Lifecycle, ER Diagram, Scoring Algorithm Flow.

You will save each code block to the indicated path, then render PNGs following the naming convention.

### 1) Architecture (Client ↔ Server ↔ DB)

Files:
- `docs/diagrams/architecture/architecture.mmd` (Mermaid, Beginner)
- `docs/diagrams/architecture/architecture.dot` (Graphviz DOT, Beginner fallback)
- `docs/diagrams/architecture/architecture.puml` (PlantUML Component, Intermediate)
- `docs/diagrams/architecture/architecture.d2` (D2, Intermediate alternative)

Mermaid (Beginner) — save as `docs/diagrams/architecture/architecture.mmd`:

```mermaid
flowchart LR
  classDef client fill:#d0ebff,stroke:#228be6,color:#1c7ed6;
  classDef server fill:#e6fcf5,stroke:#12b886,color:#099268;
  classDef view fill:#fff3bf,stroke:#f59f00,color:#b08900;
  classDef db fill:#ffe3e3,stroke:#fa5252,color:#c92a2a;

  Browser[Browser (Student/Counselor)]:::client
  Express[Express Server]:::server
  EJS[EJS Template Engine]:::view
  SQLite[(SQLite Database)]:::db

  Browser -- HTTP Request --> Express
  Express -- Render with data --> EJS
  EJS -- HTML --> Browser
  Express <-- SQL Queries --> SQLite

  %% Notes: Keep high-level for beginners
```

Graphviz DOT (Beginner) — save as `docs/diagrams/architecture/architecture.dot`:

```dot
digraph Architecture {
  rankdir=LR;
  node [shape=box, style=filled, color="#228be6", fillcolor="#d0ebff", fontname="Inter,Arial"];

  Browser [label="Browser\n(Student/Counselor)"];

  node [color="#12b886", fillcolor="#e6fcf5"];
  Express [label="Express Server"];

  node [color="#f59f00", fillcolor="#fff3bf"];
  EJS [label="EJS Templates"];

  node [shape=cylinder, color="#fa5252", fillcolor="#ffe3e3"];
  SQLite [label="SQLite DB"];

  Browser -> Express [label="HTTP Request"];
  Express -> EJS [label="Render"];
  EJS -> Browser [label="HTML"];
  Express -> SQLite [label="SQL Queries"];
  SQLite -> Express [label="Rows"];
}
```

PlantUML Component (Intermediate) — save as `docs/diagrams/architecture/architecture.puml`:

```plantuml
@startuml
skinparam componentStyle rectangle
skinparam shadowing false
skinparam defaultFontName Inter

actor Browser as B
component "Express Server" as S #e6fcf5
component "EJS Engine" as V #fff3bf
database "SQLite" as D #ffe3e3

B -[#228be6]> S : HTTP
S -[#12b886]> V : Render
V -[#f59f00]> B : HTML
S -[#fa5252]> D : SQL
D -[#fa5252]> S : Results
@enduml
```

D2 (Intermediate) — save as `docs/diagrams/architecture/architecture.d2`:

```d2
direction: right

Browser: {
  label: "Browser\n(Student/Counselor)"
}
Express: {
  label: "Express Server"
}
EJS: {
  label: "EJS Templates"
}
SQLite: {
  shape: cylinder
  label: "SQLite DB"
}

Browser -> Express: "HTTP Request"
Express -> EJS: "Render"
EJS -> Browser: "HTML"
Express -> SQLite: "SQL"
SQLite -> Express: "Rows"
```

Expected outputs:
- `docs/diagrams/architecture/architecture--mermaid--beginner.png`
- `docs/diagrams/architecture/architecture--dot--beginner.png`
- `docs/diagrams/architecture/architecture--plantuml--intermediate.png`
- `docs/diagrams/architecture/architecture--d2--intermediate.png`

---

### 2) SSR Request Lifecycle (Sequence)

Files:
- `docs/diagrams/lifecycle/lifecycle.mmd` (Mermaid, Beginner)
- `docs/diagrams/lifecycle/lifecycle.puml` (PlantUML Sequence, Intermediate)
- `docs/diagrams/lifecycle/lifecycle.dot` (DOT, Fallback)

Mermaid (Beginner) — save as `docs/diagrams/lifecycle/lifecycle.mmd`:

```mermaid
sequenceDiagram
  autonumber
  participant U as Student Browser
  participant S as Express Server
  participant V as EJS Engine
  participant D as SQLite DB

  U->>S: GET /assessment/form
  S->>V: Render form.ejs
  V-->>U: HTML form

  U->>S: POST /assessment/submit (answers)
  S->>D: INSERT student, INSERT assessment
  D-->>S: OK
  S->>V: Render result.ejs (with scores)
  V-->>U: HTML results
```

PlantUML Sequence (Intermediate) — save as `docs/diagrams/lifecycle/lifecycle.puml`:

```plantuml
@startuml
autonumber
actor User as U
participant "Express Server" as S
participant "EJS" as V
database "SQLite" as D

U -> S: GET /assessment/form
S -> V: render(form)
V --> U: HTML

U -> S: POST /assessment/submit
S -> D: INSERT student/assessment
D --> S: OK
S -> V: render(result)
V --> U: HTML
@enduml
```

Graphviz DOT (Fallback Flow) — save as `docs/diagrams/lifecycle/lifecycle.dot`:

```dot
digraph Lifecycle {
  rankdir=LR;
  node [shape=box, style=rounded, fontname="Inter,Arial"];

  U [label="Browser (Student)"];
  S [label="Express Server"];
  V [label="EJS"];
  D [label="SQLite", shape=cylinder];

  U -> S [label="GET /assessment/form"];
  S -> V [label="render form"];
  V -> U [label="HTML form"];
  U -> S [label="POST /assessment/submit"];
  S -> D [label="INSERT rows"];
  D -> S [label="OK"];
  S -> V [label="render result"];
  V -> U [label="HTML results"];
}
```

Expected outputs:
- `docs/diagrams/lifecycle/lifecycle--mermaid--beginner.png`
- `docs/diagrams/lifecycle/lifecycle--plantuml--intermediate.png`
- `docs/diagrams/lifecycle/lifecycle--dot--beginner.png`

---

### 3) Database ER Diagram

Files:
- `docs/diagrams/erd/erd.puml` (PlantUML Class/ER, Intermediate)
- `docs/diagrams/erd/erd.dot` (Graphviz DOT, Beginner)
- `docs/diagrams/erd/erd.mmd` (Mermaid Class, Fallback)

PlantUML (Intermediate) — save as `docs/diagrams/erd/erd.puml`:

```plantuml
@startuml
hide circle
skinparam classAttributeIconSize 0

class students {
  +id : INTEGER PK
  +name : TEXT
  +email : TEXT (unique)
  +section : TEXT
  +batch : TEXT
  +school : TEXT?
  +created_at : DATETIME
}

class assessments {
  +id : INTEGER PK
  +student_id : INTEGER FK
  +raw_answers : JSON
  +raw_scores : JSON
  +t_scores : JSON
  +risk_level : TEXT
  +self_harm_flag : BOOLEAN
  +created_at : DATETIME
}

class counselors {
  +id : INTEGER PK
  +username : TEXT (unique)
  +password_hash : TEXT
  +created_at : DATETIME
}

class counselor_access_log {
  +id : INTEGER PK
  +counselor_id : INTEGER FK
  +student_id : INTEGER FK
  +action : TEXT
  +created_at : DATETIME
}

students "1" -- "*" assessments : has
counselors "1" -- "*" counselor_access_log : writes
students "1" -- "*" counselor_access_log : viewed
@enduml
```

Graphviz DOT (Beginner) — save as `docs/diagrams/erd/erd.dot`:

```dot
digraph ERD {
  rankdir=LR;
  node [shape=record, fontname="Inter,Arial"];

  students [label="{students|id PK|name|email|section|batch|school|created_at}"];
  assessments [label="{assessments|id PK|student_id FK|risk_level|self_harm_flag|created_at}"];
  counselors [label="{counselors|id PK|username|password_hash|created_at}"];
  access_log [label="{counselor_access_log|id PK|counselor_id FK|student_id FK|action|created_at}"];

  students -> assessments [label="1..*", arrowhead=vee];
  counselors -> access_log [label="1..*", arrowhead=vee];
  students -> access_log [label="1..*", arrowhead=vee];
}
```

Mermaid Class (Fallback) — save as `docs/diagrams/erd/erd.mmd`:

```mermaid
classDiagram
  class students {
    id PK
    name
    email
    section
    batch
    school
    created_at
  }
  class assessments {
    id PK
    student_id FK
    risk_level
    self_harm_flag
    created_at
  }
  class counselors {
    id PK
    username
    password_hash
    created_at
  }
  class counselor_access_log {
    id PK
    counselor_id FK
    student_id FK
    action
    created_at
  }
  students --> assessments : has many
  counselors --> counselor_access_log : writes many
  students --> counselor_access_log : viewed many
```

Expected outputs:
- `docs/diagrams/erd/erd--plantuml--intermediate.png`
- `docs/diagrams/erd/erd--dot--beginner.png`
- `docs/diagrams/erd/erd--mermaid--fallback.png`

---

### 4) Scoring Algorithm Flow

Files:
- `docs/diagrams/scoring/scoring.mmd` (Mermaid, Beginner)
- `docs/diagrams/scoring/scoring.dot` (Graphviz DOT, Beginner fallback)
- `docs/diagrams/scoring/scoring.puml` (PlantUML Activity, Intermediate)

Mermaid (Beginner) — save as `docs/diagrams/scoring/scoring.mmd`:

```mermaid
flowchart LR
  classDef step fill:#e6fcf5,stroke:#12b886,color:#099268;
  classDef decision fill:#fff3bf,stroke:#f59f00,color:#b08900;
  classDef end fill:#ffe3e3,stroke:#fa5252,color:#c92a2a;

  A[Collect 25 answers]:::step --> B[Compute raw subscale scores]:::step
  B --> C[Convert to T-scores (lookup tables)]:::step
  C --> D{Self-harm item (Q25) = Yes?}:::decision
  D -- Yes --> E[Set risk = High]:::end
  D -- No --> F[Determine risk by thresholds]:::step
  F --> G[Show results (per subscale + total)]:::step
```

Graphviz DOT (Beginner) — save as `docs/diagrams/scoring/scoring.dot`:

```dot
digraph Scoring {
  rankdir=LR;
  node [shape=box, style=rounded, fontname="Inter,Arial"];

  A [label="Collect 25 answers"];
  B [label="Compute raw scores"];
  C [label="Lookup T-scores"];
  D [label="Q25 self-harm?", shape=diamond];
  E [label="Risk = High"];
  F [label="Threshold-based risk"];
  G [label="Display results"];

  A -> B -> C -> D;
  D -> E [label="Yes"];
  D -> F [label="No"];
  F -> G;
}
```

PlantUML Activity (Intermediate) — save as `docs/diagrams/scoring/scoring.puml`:

```plantuml
@startuml
start
:Collect 25 answers;
:Compute raw subscale scores;
:Convert to T-scores;
if (Q25 self-harm?) then (Yes)
  :Risk = High;
else (No)
  :Determine risk by thresholds;
endif
:Show results;
stop
@enduml
```

Expected outputs:
- `docs/diagrams/scoring/scoring--mermaid--beginner.png`
- `docs/diagrams/scoring/scoring--dot--beginner.png`
- `docs/diagrams/scoring/scoring--plantuml--intermediate.png`

---

## Batch 2 (Security/Operations) — Outline Only

This batch adds the full source blocks for:
- Authentication & Sessions (sequence)
- Deployment Pipeline to Railway (flow)
- Debugging Decision Tree (tree)

You will save each block to the indicated path, then render to PNGs using the established naming convention.

### 5) Authentication & Session Flow (Login → Session → Protected Route)

Files:
- `docs/diagrams/auth/auth.mmd` (Mermaid Sequence, Beginner)
- `docs/diagrams/auth/auth.puml` (PlantUML Sequence, Intermediate)
- `docs/diagrams/auth/auth.dot` (Graphviz DOT, Fallback)

Mermaid (Beginner) — save as `docs/diagrams/auth/auth.mmd`:

```mermaid
sequenceDiagram
  autonumber
  participant U as Browser
  participant S as Express Server
  participant B as Bcrypt
  participant Sess as Session Store

  U->>S: GET /counselor/login
  S-->>U: HTML login page

  U->>S: POST /counselor/login (username, password)
  S->>B: verify(password, hash)
  B-->>S: true/false
  alt valid
    S->>Sess: create session { counselorId }
    S-->>U: 302 Redirect to /counselor/dashboard (Set-Cookie)
  else invalid
    S-->>U: 401 Invalid credentials
  end

  U->>S: GET /counselor/dashboard (Cookie: session)
  S->>Sess: read session
  Sess-->>S: counselorId
  S-->>U: HTML dashboard
```

PlantUML Sequence (Intermediate) — save as `docs/diagrams/auth/auth.puml`:

```plantuml
@startuml
autonumber
actor User as U
participant "Express" as S
participant "Bcrypt" as B
participant "Session" as Sess

U -> S: GET /counselor/login
S --> U: HTML

U -> S: POST /counselor/login
S -> B: verify()
B --> S: ok?
alt ok
  S -> Sess: create(session)
  S --> U: 302 Set-Cookie; Location: /counselor/dashboard
else fail
  S --> U: 401 Invalid credentials
end

U -> S: GET /counselor/dashboard (Cookie)
S -> Sess: read(session)
Sess --> S: counselorId
S --> U: HTML dashboard
@enduml
```

Graphviz DOT (Fallback Flow) — save as `docs/diagrams/auth/auth.dot`:

```dot
digraph Auth {
  rankdir=LR;
  node [shape=box, style=rounded, fontname="Inter,Arial"];

  Login[label="GET /login -> HTML"];
  Post[label="POST /login (verify bcrypt)"];
  Ok[label="Create session; 302 redirect"];
  Fail[label="401 Invalid credentials"];
  Dash[label="GET /dashboard (cookie) -> HTML"];

  Login -> Post;
  Post -> Ok [label="valid"];
  Post -> Fail [label="invalid"];
  Ok -> Dash;
}
```

Expected outputs:
- `docs/diagrams/auth/auth--mermaid--beginner.png`
- `docs/diagrams/auth/auth--plantuml--intermediate.png`
- `docs/diagrams/auth/auth--dot--beginner.png`

---

### 6) Deployment Pipeline to Railway

Files:
- `docs/diagrams/deploy/deploy.mmd` (Mermaid Flow, Beginner)
- `docs/diagrams/deploy/deploy.dot` (Graphviz DOT, Beginner fallback)
- `docs/diagrams/deploy/deploy.puml` (PlantUML Activity, Intermediate)

Mermaid (Beginner) — save as `docs/diagrams/deploy/deploy.mmd`:

```mermaid
flowchart LR
  classDef step fill:#e6fcf5,stroke:#12b886,color:#099268;
  classDef warn fill:#fff3bf,stroke:#f59f00,color:#b08900;

  A[Git commit & push]:::step --> B[Railway builds (npm ci)]:::step
  B --> C[Run migrations]:::step
  C --> D[Start server]:::step
  D --> E{Seed run needed?}:::warn
  E -- Yes --> F[railway run npm run seed]:::step
  E -- No --> G[App live at URL]:::step
  F --> G
```

Graphviz DOT (Beginner) — save as `docs/diagrams/deploy/deploy.dot`:

```dot
digraph Deploy {
  rankdir=LR;
  node [shape=box, style=rounded, fontname="Inter,Arial"];

  A [label="Git push"];
  B [label="Railway build (npm ci)"];
  C [label="Run migrations"];
  D [label="Start server"];
  E [label="Seed?", shape=diamond];
  F [label="railway run npm run seed"];
  G [label="App live"];

  A -> B -> C -> D -> E;
  E -> F [label="Yes"];
  E -> G [label="No"];
  F -> G;
}
```

PlantUML Activity (Intermediate) — save as `docs/diagrams/deploy/deploy.puml`:

```plantuml
@startuml
start
:Git push;
:Railway build (npm ci);
:Run migrations;
:Start server;
if (Seed needed?) then (Yes)
  :railway run npm run seed;
endif
:App live;
stop
@enduml
```

Expected outputs:
- `docs/diagrams/deploy/deploy--mermaid--beginner.png`
- `docs/diagrams/deploy/deploy--dot--beginner.png`
- `docs/diagrams/deploy/deploy--plantuml--intermediate.png`

---

### 7) Debugging Decision Tree (Common Errors → Checks)

Files:
- `docs/diagrams/debug/debug.mmd` (Mermaid Flow TB, Beginner)
- `docs/diagrams/debug/debug.dot` (Graphviz DOT TB, Beginner fallback)
- `docs/diagrams/debug/debug.puml` (PlantUML Activity, Intermediate)

Mermaid (Beginner, TB) — save as `docs/diagrams/debug/debug.mmd`:

```mermaid
flowchart TB
  classDef step fill:#e6fcf5,stroke:#12b886,color:#099268;
  classDef decision fill:#fff3bf,stroke:#f59f00,color:#b08900;
  classDef end fill:#ffe3e3,stroke:#fa5252,color:#c92a2a;

  A[Error message appears]:::step --> B{Is it a missing package?}:::decision
  B -- Yes --> B1[Run npm install]:::step
  B -- No --> C{Port 3000 in use?}:::decision
  C -- Yes --> C1[Stop other server / change port]:::step
  C -- No --> D{SQL error?}:::decision
  D -- Yes --> D1[Check schema & query; use DB Browser]:::step
  D -- No --> E{Auth error 401?}:::decision
  E -- Yes --> E1[Login again / check session]:::step
  E -- No --> F[Check server logs and console.log()]:::step
  B1 --> G[Retry]:::end
  C1 --> G
  D1 --> G
  E1 --> G
  F --> G
```

Graphviz DOT (Beginner, TB) — save as `docs/diagrams/debug/debug.dot`:

```dot
digraph Debug {
  rankdir=TB;
  node [shape=box, style=rounded, fontname="Inter,Arial"];

  A [label="Error message"];
  B [label="Missing package?", shape=diamond];
  B1 [label="npm install"];
  C [label="Port 3000 in use?", shape=diamond];
  C1 [label="Stop other server / change port"];
  D [label="SQL error?", shape=diamond];
  D1 [label="Check schema/query in DB Browser"];
  E [label="401 auth?", shape=diamond];
  E1 [label="Login again / check session"];
  F [label="Check server logs / console.log()"];
  G [label="Retry"];

  A -> B;
  B -> B1 [label="Yes"];
  B -> C [label="No"];
  C -> C1 [label="Yes"];
  C -> D [label="No"];
  D -> D1 [label="Yes"];
  D -> E [label="No"];
  E -> E1 [label="Yes"];
  E -> F [label="No"];
  B1 -> G;
  C1 -> G;
  D1 -> G;
  E1 -> G;
  F -> G;
}
```

PlantUML Activity (Intermediate) — save as `docs/diagrams/debug/debug.puml`:

```plantuml
@startuml
start
:Error appears;
if (Missing package?) then (Yes)
  :npm install;
  -> Retry;
else (No)
  if (Port 3000 in use?) then (Yes)
    :Stop other server/change port;
    -> Retry;
  else (No)
    if (SQL error?) then (Yes)
      :Check schema/query in DB Browser;
      -> Retry;
    else (No)
      if (401 auth?) then (Yes)
        :Login again / check session;
        -> Retry;
      else (No)
        :Check logs and console.log();
        -> Retry;
      endif
    endif
  endif
endif
stop
@enduml
```

Expected outputs:
- `docs/diagrams/debug/debug--mermaid--beginner.png`
- `docs/diagrams/debug/debug--dot--beginner.png`
- `docs/diagrams/debug/debug--plantuml--intermediate.png`

---

## Embedding Map Updates (Batch 2)

- `inceptions/plan-SSR.md`
  - Phase 6 (Authentication): add Auth diagram — beginner PNG
  - Phase 9 (Deployment): add Deployment diagram — beginner PNG
  - Teaching Strategies → Debugging Boot Camp: add Debugging Tree — beginner PNG

- `SSR/DEPLOYMENT.md`
  - Use Deployment diagram (intermediate) near Step 2/3

- `docs/ARCHITECTURE.md`
  - Include intermediate versions for Auth and Debugging for teacher reference

---

## Embedding Map (Where images appear)

- `inceptions/plan-SSR.md`
  - Executive Summary (end): Architecture — beginner PNG
  - Phase 2 (Static Routes & Templates): SSR Lifecycle — beginner PNG
  - Phase 4 (Assessment Logic): Scoring Flow — beginner PNG
  - Phase 5 (Database Intro): ER Diagram — beginner PNG
  - Each with caption + alt text; link to intermediate version in docs

- `docs/ARCHITECTURE.md`
  - Architecture — intermediate PNG (+ alternative formats)
  - ER Diagram — intermediate PNG

- `SSR/DEPLOYMENT.md`
  - Deployment pipeline (to be added in Batch 2)
  - Debugging decision tree (to be added in Batch 2)

---

## Feasibility Check

- Scope: 4 foundational diagrams × 2–3 formats each is manageable in one pass.
- Render risk: Mermaid occasionally varies by renderer; DOT and PlantUML are robust fallbacks.
- Student fit: Beginner variants limit nodes to 7–10, matching Grade 9 cognitive load.
- Maintenance: Source alongside PNGs keeps regeneration easy when architecture evolves.
- Next: After confirming the PNGs render correctly on your converter, proceed with Batch 2.

No blockers expected. This plan is feasible and aligned with teaching goals.

---

## After You Render

Please generate PNGs to the specified filenames. Once the images exist, the embedded links in `plan-SSR.md` will render correctly.
