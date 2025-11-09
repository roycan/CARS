# SSR Project Plan: CARS Assessment System (Server-Side Rendering Edition)

**Project Name:** CARS SSR (Children at Risk Screening - Server Side Rendering)  
**Target Audience:** High School Students (Grade 9+) learning web development  
**Technology Stack:** Node.js, Express.js, EJS, Bulma CSS, SQLite3  
**Deployment:** Railway (Free Tier)  
**Timeline:** 12-16 weeks (semester-long project)  
**Created:** November 9, 2025

---

## Executive Summary

This project adapts the existing CARS assessment tool into a full-stack web application using server-side rendering. Students will learn fundamental web development concepts by building a real-world application that allows students to take psychological assessments, stores results persistently, and provides counselors with a password-protected dashboard for analysis.

**Educational Goal:** Teach traditional web application architecture (client-server model, databases, authentication, deployment) in a structured, age-appropriate progression.

Figure 1: High-level Architecture
![High-level architecture of Browser ↔ Express ↔ EJS ↔ SQLite](../docs/diagrams/architecture/architecture--mermaid--beginner.png)

Alt: The browser sends HTTP requests to the Express server, Express renders EJS templates into HTML for the browser, and queries the SQLite database for data.

---

## Grade 9 Appropriateness Analysis

### ✅ Appropriate Because:

1. **Concrete Learning** - Every concept has visible, testable output
2. **Progressive Complexity** - Can be broken into 8 distinct learning phases
3. **Real-World Impact** - Students build something their school can actually use
4. **Age-Appropriate Analogies** - Concepts map to familiar physical-world systems
5. **Scaffolded Complexity** - Teacher provides templates; students modify and extend
6. **Collaborative Potential** - Pairs/groups can divide responsibilities
7. **Portfolio-Worthy** - Demonstrates multiple skills to future teachers/employers

### ⚠️ Requires Mitigation:

1. **Time Investment** - Need full semester (not rushed 2-week unit)
2. **Teacher Support** - Requires instructor familiar with Node.js/Express
3. **Debugging Skills** - Must teach systematic troubleshooting early
4. **Async Concepts** - Promises/callbacks need explicit instruction
5. **Environment Setup** - Initial Node.js/Git installation needs support
6. **Individual Differences** - Some students will need extra time/help

### Cognitive Load Comparison:

| Concept | Grade 9 Difficulty | Mitigation Strategy |
|---------|-------------------|---------------------|
| HTML/CSS | ⭐ Easy | Review/prerequisite |
| Express routing | ⭐⭐ Moderate | Analogy: "If URL = X, show page Y" |
| EJS templates | ⭐⭐ Moderate | Like mail merge in Word |
| SQLite queries | ⭐⭐⭐ Challenging | Start with visual DB browser |
| Authentication | ⭐⭐⭐ Challenging | Abstract concepts; use metaphors |
| Deployment | ⭐⭐ Moderate | Teacher-guided, checklist-based |
| Async/Promises | ⭐⭐⭐⭐ Hard | Defer to phase 7; use clear patterns |

**Overall Assessment:** **APPROPRIATE** with proper scaffolding and pacing.

---

## Learning Objectives

### By project completion, students will be able to:

**Technical Skills:**
1. Create and configure a Node.js/Express web server
2. Use EJS templates to generate dynamic HTML
3. Design and query a SQLite database with SQL
4. Implement user authentication with sessions
5. Handle form data and validate user input
6. Deploy a web application to a cloud platform
7. Debug web applications using logs and browser tools
8. Use Git for version control

**Conceptual Understanding:**
1. Explain client-server architecture
2. Describe how databases store and retrieve data
3. Understand HTTP request/response cycle
4. Recognize security considerations (password hashing, session management)
5. Differentiate between client-side and server-side rendering
6. Appreciate trade-offs in technology choices

**Soft Skills:**
1. Break complex problems into smaller steps
2. Read documentation and adapt examples
3. Collaborate using version control
4. Test systematically and fix bugs methodically
5. Consider user experience in design decisions

---

## Project Phases (12-Week Breakdown)

### Phase 1: Foundation & Environment Setup (Week 1)
**Concepts:** Node.js, npm, project structure, localhost  
**Activities:**
- Install Node.js and VS Code
- Create project directory structure
- Initialize `package.json`
- Run "Hello World" Express server
- Understand `localhost:3000`

**Deliverable:** Server that displays "Hello World" in browser

**Difficulty:** ⭐ Easy  
**Teacher Support:** High (setup help, troubleshooting installs)

---

### Phase 2: Static Routes & Templates (Weeks 2-3)
**Concepts:** Express routes, EJS templates, static files  
**Activities:**
- Create basic routes (`/`, `/about`, `/assessment`)
- Set up EJS view engine
- Build simple templates with partials (header, footer)
- Serve static CSS (Bulma CDN initially)
- Create navigation system

**Deliverable:** Multi-page website with consistent styling

**Difficulty:** ⭐⭐ Moderate  
**Teacher Support:** Moderate (provide template structure, review routing)

**Teaching Tip:** Use analogy: "Routes are like a receptionist directing visitors to different rooms"

Figure 2: SSR Request Lifecycle (Beginner)
![Sequence: Browser GET/POST ↔ Express ↔ EJS ↔ SQLite](../docs/diagrams/lifecycle/lifecycle--mermaid--beginner.png)

Alt: Browser requests the form, Express renders EJS to send HTML; on submit, Express saves to SQLite and renders results back to the browser.

---

### Phase 3: Forms & Data Handling (Week 4)
**Concepts:** HTML forms, POST requests, body parsing, validation  
**Activities:**
- Create student information form (name, section, batch, school)
- Parse form data with `express.urlencoded()`
- Validate input (required fields, length limits)
- Display form data on confirmation page
- Handle errors (empty fields, invalid input)

**Deliverable:** Working form that captures and displays student info

**Difficulty:** ⭐⭐ Moderate  
**Teacher Support:** Moderate (explain POST vs GET, demonstrate validation)

**Teaching Tip:** "Forms are like paper surveys; POST is putting them in a mailbox"

---

### Phase 4: Assessment Logic Integration (Week 5)
**Concepts:** JavaScript modules, importing/exporting, scoring algorithms  
**Activities:**
- Port scoring logic from original CARS project
- Create questionnaire form (multiple sections)
- Calculate risk scores in route handler
- Display results with styling based on risk level
- Store results temporarily in session/memory

**Deliverable:** Full assessment flow (form → scoring → results)

**Difficulty:** ⭐⭐⭐ Challenging  
**Teacher Support:** High (scoring logic provided, students integrate it)

**Teaching Tip:** Provide scoring module as black box initially; explain internals later

Figure 3: Scoring Algorithm Flow (Beginner)
![Flow: answers → raw scores → T-scores → risk (override on Q25)](../docs/diagrams/scoring/scoring--mermaid--beginner.png)

Alt: Collect answers, compute raw subscale scores, convert to T-scores, check if self-harm item is yes (override to High), otherwise determine risk by thresholds.

---

### Phase 5: Database Introduction (Weeks 6-7)
**Concepts:** SQLite, SQL queries (SELECT, INSERT), database design  
**Activities:**
- Install `better-sqlite3`
- Design database schema (students, assessments tables)
- Write SQL migration script
- Use DB Browser for SQLite to visualize data
- Implement INSERT to save student data
- Implement SELECT to retrieve data
- Replace in-memory storage with database

**Deliverable:** Data persists between server restarts

**Difficulty:** ⭐⭐⭐ Challenging  
**Teacher Support:** High (SQL syntax help, schema design guidance)

**Teaching Tip:** "Database is like a filing cabinet that never loses papers"

**Key SQL Concepts:**
```sql
-- Students learn these patterns
INSERT INTO students (name, section) VALUES (?, ?);
SELECT * FROM students WHERE section = ?;
SELECT COUNT(*) FROM assessments WHERE risk_level = 'high';
```

Figure 4: Database ER Diagram (Beginner)
![Tables and relationships: students, assessments, counselors, access_log](../docs/diagrams/erd/erd--dot--beginner.png)

Alt: A student has many assessments; counselors write access logs; access logs reference both counselors and students.

---

### Phase 6: Authentication System (Weeks 8-9)
**Concepts:** Password hashing, sessions, middleware, authorization  
**Activities:**
- Create counselor login page
- Hash passwords with bcrypt
- Set up express-session or cookie-session
- Create authentication middleware (isAuthenticated)
- Protect counselor routes
- Implement logout functionality

**Deliverable:** Password-protected counselor dashboard

**Difficulty:** ⭐⭐⭐⭐ Hard  
**Teacher Support:** Very High (security concepts are abstract)

**Teaching Tip:** "Hashing is like a one-way door: easy to go in, impossible to reverse"

**Simplified Approach:**
- Start with plain text password (show it's bad)
- Upgrade to hashed (explain why)
- Discuss sessions as "temporary ID badges"

Figure 5: Authentication & Session Flow (Beginner)
![Sequence: Login form → bcrypt verify → set session cookie → access protected dashboard](../docs/diagrams/auth/auth--mermaid--beginner.png)

Alt: User loads login page, posts credentials; server verifies with bcrypt, creates a session, sets cookie, and grants access to the protected dashboard on subsequent requests.

---

### Phase 7: Counselor Dashboard (Week 10)
**Concepts:** Aggregation queries, data visualization (basic), joins  
**Activities:**
- Query aggregated statistics (count by risk level)
- Display student list with filters (by section, batch)
- Create drill-down view (click student → see their assessment)
- Add basic sorting (by date, by score)
- Implement simple export (CSV or JSON)

**Deliverable:** Functional counselor dashboard with data analysis

**Difficulty:** ⭐⭐⭐ Challenging  
**Teacher Support:** Moderate (provide query templates)

**SQL Patterns:**
```sql
-- Aggregation examples
SELECT risk_level, COUNT(*) as count 
FROM assessments 
GROUP BY risk_level;

-- Join example
SELECT s.name, a.score, a.risk_level
FROM students s
JOIN assessments a ON s.id = a.student_id
WHERE s.section = ?;
```

---

### Phase 8: LocalStorage Sync (Week 11)
**Concepts:** Client-side JavaScript, AJAX/Fetch API, offline capability  
**Activities:**
- Add client-side JavaScript to cache form data in localStorage
- Implement fetch() to POST data to server
- Handle network errors (offline → save locally → sync later)
- Display sync status to user

**Deliverable:** Offline-capable form submission with sync indicator

**Difficulty:** ⭐⭐⭐⭐ Hard  
**Teacher Support:** High (async JavaScript is challenging)

**Teaching Tip:** "localStorage is like writing notes in your notebook; fetch is like emailing them to teacher"

**Optional:** Can defer this to Phase 9 or make it an extension activity

---

### Phase 9: Deployment to Railway (Week 12)
**Concepts:** Cloud hosting, environment variables, production vs development  
**Activities:**
- Create Railway account
- Connect GitHub repository
- Configure environment variables (secrets)
- Deploy application
- Test live URL
- Monitor logs and fix issues

**Deliverable:** Publicly accessible web application

**Difficulty:** ⭐⭐ Moderate  
**Teacher Support:** High initially (guided first deployment)

**Teaching Tip:** "Railway is like renting a computer that runs 24/7 so everyone can access your app"

Figure 6: Deployment Pipeline (Beginner)
![Flow: Git push → Railway build → run migrations → start server → optional seed → app live](../docs/diagrams/deploy/deploy--mermaid--beginner.png)

Alt: After pushing to GitHub, Railway builds the app, runs migrations, starts the server, and if needed you run a one-time seed before the app is live.

---

### Phase 10: Polish & Documentation (Week 13-14, Optional)
**Concepts:** User experience, error handling, documentation  
**Activities:**
- Add user-friendly error messages
- Improve styling and responsiveness
- Write README with setup instructions
- Document API/routes for future maintainers
- Add input validation edge cases
- Create backup/restore scripts

**Deliverable:** Production-ready, documented application

**Difficulty:** ⭐⭐ Moderate  
**Teacher Support:** Low (mostly polish work)

---

## Technology Stack Rationale

### Why These Technologies for Grade 9?

| Technology | Why Chosen | Learning Value | Alternatives Considered |
|------------|-----------|----------------|------------------------|
| **Node.js** | JavaScript everywhere (front+back) | Transferable language | Python/Flask (different syntax) |
| **Express.js** | Minimal boilerplate, clear patterns | Industry-standard framework | Next.js (too complex), Fastify (less docs) |
| **EJS** | HTML with minimal syntax additions | Easy template logic | React (too complex), Handlebars (more limited) |
| **Bulma** | No JavaScript required, readable classes | Modern CSS without complexity | Bootstrap (jQuery baggage), Tailwind (too granular) |
| **SQLite** | Zero-config, file-based, real SQL | Portable, visual tools available | PostgreSQL (harder setup), MongoDB (NoSQL confusion) |
| **Railway** | Free tier, simple Git deployment | Real hosting experience | Vercel (serverless complexity), Heroku (deprecated free tier) |

---

## Prerequisites

### Required Knowledge (Students should have):
- ✅ Basic HTML (tags, forms, links)
- ✅ Basic CSS (selectors, properties)
- ✅ Basic JavaScript (variables, functions, if/else)
- ✅ Computer literacy (file system, command line basics)

### Nice to Have (Will be taught if missing):
- Git/GitHub basics
- JSON format understanding
- HTTP concepts (requests, responses)
- Debugging techniques

### Teacher Prerequisites:
- Solid understanding of Node.js/Express
- Familiarity with SQLite and SQL queries
- Experience with Railway or similar PaaS
- Patience for troubleshooting student environment issues

---

## Teaching Strategies

### 1. Scaffolding Approach
**Provide progressively less support:**
- Phase 1-3: Teacher provides complete code; students run and modify
- Phase 4-6: Teacher provides structure; students implement logic
- Phase 7-9: Students implement with reference documentation
- Phase 10: Independent work with peer review

### 2. Pair Programming
**Assign roles that rotate:**
- Driver (types code) + Navigator (reads instructions, catches errors)
- Rotate every 20-30 minutes
- Ensures engagement and knowledge sharing

### 3. Code Review Culture
**Weekly code reviews:**
- Project on screen, class discusses
- "What would happen if we changed this?"
- Identify bugs before they become frustrating
- Celebrate creative solutions

### 4. Debugging Boot Camp (Week 4)
**Dedicate one class to debugging skills:**
- How to read error messages
- Using console.log() strategically
- Inspecting network tab in browser DevTools
- Checking server logs vs browser logs
- Asking good questions (rubber duck debugging)

Figure 7: Debugging Decision Tree (Beginner)
![Tree: error → missing package? → port used? → SQL error? → 401 auth? → logs/console → retry](../docs/diagrams/debug/debug--mermaid--beginner.png)

Alt: Start from the error message, then check for common issues like missing packages, port conflicts, SQL errors, or auth problems; use logs and console to iterate and retry.

### 5. Checkpoint Assessments
**After each phase:**
- Quick quiz (conceptual understanding)
- Code check-in (teacher reviews student repos)
- Reflection journal (what was hard? what clicked?)

### 6. Extension Activities
**For advanced students:**
- Add email notifications (with SendGrid)
- Implement data export to Excel
- Create admin panel for managing counselors
- Add password reset functionality
- Build mobile-responsive design

### 7. Differentiation Strategies
**Support struggling students:**
- Video walkthroughs of each phase
- Office hours for one-on-one help
- Provide extra starter code templates
- Allow phase completion over multiple weeks

**Challenge advanced students:**
- Ask them to explain concepts to peers
- Assign architectural improvements
- Have them research alternative approaches

---

## Assessment Rubric

### Grading Breakdown (Suggested)

| Component | Weight | Criteria |
|-----------|--------|----------|
| **Functionality** | 40% | Does the app work as specified? All features present? |
| **Code Quality** | 20% | Organized structure, meaningful names, comments where needed |
| **Understanding** | 20% | Can student explain their code? Verbally defend design choices? |
| **Documentation** | 10% | README clear? Code comments present? Setup instructions work? |
| **Presentation** | 10% | Demo to class, answer questions, show features |

### Phase-by-Phase Checkpoints (Pass/Revise)

| Phase | Must Demonstrate | Pass Criteria |
|-------|-----------------|---------------|
| 1-2 | Running server, multiple pages | Server starts without errors, navigation works |
| 3-4 | Form submission, assessment flow | Data captured correctly, results display |
| 5 | Database persistence | Data survives server restart |
| 6 | Login system | Counselor page protected, login/logout works |
| 7 | Dashboard functionality | Can view student list and drill down |
| 8 | LocalStorage sync | Form saves to browser, recovers on reload |
| 9 | Deployment | App accessible via public URL |

---

## Risk Mitigation

### Potential Challenges & Solutions

#### Challenge 1: Environment Setup Failures
**Risk:** Students can't install Node.js or have permission issues  
**Mitigation:**
- Pre-class tech check (week before)
- Provide school computers with pre-installed environment
- Have portable Node.js version on USB drives
- Alternative: Use Replit for initial phases (cloud IDE)

#### Challenge 2: Async/Callback Confusion
**Risk:** Students struggle with promises and async concepts  
**Mitigation:**
- Defer advanced async until Phase 8
- Use synchronous better-sqlite3 (not async sqlite)
- Provide clear patterns they can copy
- Analogy: "async is like ordering food at restaurant—you don't wait at counter"

#### Challenge 3: SQL Syntax Errors
**Risk:** Students make typos in queries, get frustrated  
**Mitigation:**
- Provide SQL query templates in documentation
- Use prepared statements (reduces syntax errors)
- Install DB Browser for SQLite (visual query builder)
- Create "SQL cheat sheet" reference

#### Challenge 4: Debugging Frustration
**Risk:** Students spend hours on simple typos  
**Mitigation:**
- Explicit debugging instruction in Week 4
- Pair programming (two sets of eyes)
- "15-minute rule": Try for 15 min, then ask for help
- Common errors document (updated throughout semester)

#### Challenge 5: Git Merge Conflicts (if using groups)
**Risk:** Students overwrite each other's work  
**Mitigation:**
- Clear file ownership (Student A: routes, Student B: views)
- Frequent commits with descriptive messages
- Teacher reviews pull requests
- Optional: Solo projects to avoid this entirely

#### Challenge 6: Deployment Issues
**Risk:** Works locally, fails in production  
**Mitigation:**
- Environment variable checklist
- Railway logs viewing tutorial
- Common deployment issues guide
- Teacher does first deployment as demo

#### Challenge 7: Time Management
**Risk:** Project takes longer than 12 weeks  
**Mitigation:**
- Built-in buffer weeks (recommend 14-16 weeks)
- Optional phases (localStorage sync can be skipped)
- Minimum viable product defined (Phases 1-7 core, 8-10 optional)
- Allow summer completion for interested students

---

## Resource Requirements

### Software (All Free)

| Tool | Purpose | Installation |
|------|---------|-------------|
| Node.js (LTS) | Runtime environment | nodejs.org |
| VS Code | Code editor | code.visualstudio.com |
| Git | Version control | git-scm.com |
| DB Browser for SQLite | Database visualization | sqlitebrowser.org |
| Chrome/Firefox | Testing browser | google.com/chrome |
| Railway CLI | Deployment tool | railway.app |

### Hardware Requirements (Minimum)

- Computer with 4GB RAM (8GB preferred)
- 5GB free disk space
- Internet connection (for deployment phases)
- Admin rights OR pre-configured school computers

### Teacher Resources (To Create/Adapt)

- [ ] Slide decks for each phase (10 presentations)
- [ ] Video walkthroughs (screen recordings of key concepts)
- [ ] Starter code repository (template for students to fork)
- [ ] SQL cheat sheet (common queries)
- [ ] Debugging flowchart (troubleshooting guide)
- [ ] Environment setup script (automated Node/Git install)
- [ ] Assessment rubrics (detailed grading criteria)
- [ ] Extension activity descriptions (for advanced students)

---

## Project Structure Overview

### Directory Layout
```
SSR/
├── package.json                 # Dependencies and scripts
├── .env                        # Environment variables (not in Git)
├── .gitignore                  # Files to exclude from Git
├── README.md                   # Project documentation
├── railway.json                # Railway deployment config (optional)
├── src/
│   ├── server.js               # Entry point (Phase 1)
│   ├── config/
│   │   └── env.js             # Environment configuration
│   ├── db/
│   │   ├── connection.js       # Database connection (Phase 5)
│   │   ├── schema.sql          # Table definitions (Phase 5)
│   │   └── seed.sql            # Sample data (Phase 5)
│   ├── models/
│   │   ├── student.js          # Student data access (Phase 5)
│   │   ├── assessment.js       # Assessment data access (Phase 5)
│   │   └── counselor.js        # Counselor data access (Phase 6)
│   ├── services/
│   │   ├── scoring.js          # Assessment scoring logic (Phase 4)
│   │   └── auth.js             # Authentication helpers (Phase 6)
│   ├── middleware/
│   │   ├── authGuard.js        # Route protection (Phase 6)
│   │   └── validation.js       # Input validation (Phase 3)
│   ├── routes/
│   │   ├── index.js            # Home routes (Phase 2)
│   │   ├── students.js         # Student routes (Phase 3)
│   │   ├── assessments.js      # Assessment routes (Phase 4)
│   │   └── counselor.js        # Counselor dashboard routes (Phase 6-7)
│   ├── views/
│   │   ├── layouts/
│   │   │   └── base.ejs        # Main layout template (Phase 2)
│   │   ├── partials/
│   │   │   ├── nav.ejs         # Navigation bar (Phase 2)
│   │   │   ├── footer.ejs      # Footer (Phase 2)
│   │   │   └── flash.ejs       # Flash messages (Phase 3)
│   │   ├── pages/
│   │   │   ├── home.ejs        # Landing page (Phase 2)
│   │   │   ├── about.ejs       # About page (Phase 2)
│   │   │   └── error.ejs       # Error page (Phase 3)
│   │   ├── students/
│   │   │   ├── new.ejs         # Student info form (Phase 3)
│   │   │   └── show.ejs        # Student details (Phase 5)
│   │   ├── assessments/
│   │   │   ├── form.ejs        # Assessment questionnaire (Phase 4)
│   │   │   └── result.ejs      # Assessment results (Phase 4)
│   │   └── counselor/
│   │       ├── login.ejs       # Login page (Phase 6)
│   │       ├── dashboard.ejs   # Main dashboard (Phase 7)
│   │       └── student.ejs     # Individual student view (Phase 7)
│   ├── public/
│   │   ├── css/
│   │   │   └── custom.css      # Custom styles (Phase 2)
│   │   ├── js/
│   │   │   ├── localStorage.js # LocalStorage sync (Phase 8)
│   │   │   └── form-helpers.js # Form validation (Phase 3)
│   │   └── img/
│   │       └── logo.png        # School logo
│   └── utils/
│       ├── logger.js           # Logging utility
│       └── validation.js       # Shared validation functions
├── tests/                      # (Optional Phase 10)
│   ├── unit/
│   │   └── scoring.test.js
│   └── integration/
│       └── routes.test.js
└── data/                       # Created at runtime
    ├── database.db             # SQLite database (Phase 5)
    └── backups/                # Database backups (Phase 10)
```

---

## Dependencies

### Production Dependencies
```json
{
  "express": "^4.18.2",           // Web framework
  "ejs": "^3.1.9",                // Template engine
  "better-sqlite3": "^9.2.0",     // SQLite database (synchronous)
  "bcrypt": "^5.1.1",             // Password hashing
  "express-session": "^1.17.3",   // Session management
  "dotenv": "^16.3.1",            // Environment variables
  "compression": "^1.7.4",        // Response compression
  "helmet": "^7.1.0",             // Security headers
  "express-rate-limit": "^7.1.5"  // Rate limiting
}
```

### Development Dependencies
```json
{
  "nodemon": "^3.0.2",            // Auto-restart on changes
  "jest": "^29.7.0",              // Testing framework (optional)
  "supertest": "^6.3.3"           // HTTP testing (optional)
}
```

---

## Feasibility Analysis

### ✅ Technical Feasibility: HIGH

**All components proven and stable:**
- Express: 10+ years mature, extensive documentation
- SQLite: Decades-old, rock-solid reliability
- EJS: Simple, well-documented, widely used
- Railway: Modern platform, good free tier

**No experimental technologies or bleeding-edge features required.**

### ✅ Pedagogical Feasibility: HIGH (with caveats)

**Appropriate for grade 9 IF:**
- Semester-long timeline (not rushed)
- Teacher has Node.js/Express experience
- Students have HTML/CSS/JS foundations
- Class size manageable (<30 students)
- Technical support available for setup issues

**Red flags that would make it infeasible:**
- 2-4 week timeline (too rushed)
- Teacher learning Node.js alongside students (risky)
- No computer lab/students lack computers (can't practice)
- Large class (40+ students) without TA support

### ✅ Resource Feasibility: HIGH

**All tools are free:**
- Software: $0 (all open source or free tiers)
- Deployment: $0 (Railway free tier sufficient)
- Learning resources: Free online (Node.js docs, MDN, etc.)

**Only cost: Teacher preparation time** (~40-60 hours to create materials)

### ✅ Operational Feasibility: MODERATE

**Smooth operation requires:**
- ✅ School network allows Node.js traffic (port 3000)
- ✅ Students can install software OR pre-configured lab computers
- ⚠️ Internet access for deployment phases (not continuous)
- ⚠️ Git/GitHub accounts (may require parental permission if under 13)
- ⚠️ Railway accounts (requires email, no age restriction)

**Potential blockers:**
- Restrictive IT policies (locked-down computers)
- Firewall blocking Railway/GitHub
- Lack of admin rights for student installations

### ✅ Timeline Feasibility: HIGH

**12 weeks is realistic IF:**
- 2-3 class periods per week (90-120 min total)
- Students have 1-2 hours homework per week
- Buffer weeks built in (14-16 week semester ideal)

**Risk:** Phases 5-6 (database + auth) may take longer than expected

---

## Success Metrics

### Student Success Indicators:
- [ ] 80%+ students complete Phases 1-7 (core functionality)
- [ ] 60%+ students deploy working app to Railway
- [ ] 90%+ students can explain client-server architecture
- [ ] 70%+ students can write basic SQL queries independently
- [ ] Class average score on final assessment: 75%+

### Project Success Indicators:
- [ ] Deployed app handles 200+ student assessments without crashes
- [ ] Counselor successfully uses dashboard for data analysis
- [ ] Zero data loss incidents during semester
- [ ] Student survey: 70%+ report "learned a lot" or "very valuable"
- [ ] Principal/admin endorsement for future classes

### Teacher Success Indicators:
- [ ] All lesson materials prepared by Week 0
- [ ] Student questions decrease over semester (increasing independence)
- [ ] <5% class time spent on environment issues after Week 2
- [ ] Positive peer feedback from other CS teachers (if shared)

---

## Comparison to Alternatives

### vs. Building a Mobile App
**Pros of SSR approach:**
- ✅ No app store submission complexity
- ✅ Works on any device with browser
- ✅ More relevant to general web skills
- ✅ Easier debugging (browser DevTools)

**Cons:**
- ❌ Less "cool factor" for students
- ❌ Doesn't teach mobile-specific patterns

### vs. Static Site (Just Frontend)
**Pros of SSR approach:**
- ✅ Teaches full-stack concepts (backend + database)
- ✅ More substantial learning outcome
- ✅ Real data persistence

**Cons:**
- ❌ More complex
- ❌ Requires server management

### vs. Framework (React, Vue, Angular)
**Pros of SSR approach:**
- ✅ Simpler mental model (server generates HTML)
- ✅ Less JavaScript abstraction
- ✅ Better for beginners

**Cons:**
- ❌ Less industry relevance (SPAs dominate)
- ❌ Doesn't teach component-based architecture

### vs. Python/Django or Flask
**Pros of SSR approach (Node/Express):**
- ✅ Same language front and back (JavaScript)
- ✅ More modern deployment ecosystem
- ✅ JSON-native (easier API building)

**Cons:**
- ❌ Async concepts harder than synchronous Python
- ❌ Python is better first language generally

**Verdict:** Node/Express is appropriate given they likely know JavaScript already.

---

## Implementation Decisions (Confirmed November 9, 2025)

### Student Information Fields:
- ✅ **Required:** name, section, email, batch
- ✅ **Optional:** school
- ✅ Section, batch, and school: Dropdown values from configuration file
- ✅ Name and email: Free text input with validation

### Authentication:
- ✅ Single counselor account initially (can expand later)
- ✅ Default credentials: username="counselor", password="changeme123"
- ✅ Seed script provided for initial setup
- ✅ Password hashing with bcrypt

### Assessment Content:
- ✅ Port all 25 questions from existing scoring.js
- ✅ Keep bilingual support (English + Filipino)
- ✅ Include self-harm item (#25) with override logic
- ✅ Maintain all T-score tables and risk classification logic

### Deployment:
- ✅ Railway.json configuration included
- ✅ .env.example for environment variables
- ✅ Deployment guide in README
- ✅ Production-ready configuration

### MVP Scope (Initial Build):
- ✅ Phases 1-7: Complete core functionality
- ✅ Student assessment flow (info → questions → results)
- ✅ Database persistence
- ✅ Counselor authentication
- ✅ Basic dashboard with student list and drill-down
- ⏸️ Phase 8 (localStorage sync): Deferred to v2
- ⏸️ Advanced analytics: Deferred to v2

## Next Steps (When Approved to Code)

### Immediate Actions:
1. Create `SSR/` directory structure
2. Initialize `package.json` with dependencies
3. Create database schema SQL files
4. Port scoring logic from original CARS project
5. Set up Git repository with .gitignore
6. Create README with setup instructions
7. Build Phase 1 starter code (Hello World server)
8. Document environment setup for students

### Teacher Preparation:
1. Review Node.js/Express documentation (refresh knowledge)
2. Set up personal Railway account and test deployment
3. Create slide deck for Phase 1 introduction
4. Prepare video walkthrough of environment setup
5. Identify 2-3 "TA students" (advanced students to help peers)
6. Schedule lab time with school IT coordinator

### Student Onboarding (Week 0):
1. Distribute project overview (this document)
2. Collect parental permissions (if needed for GitHub/Railway)
3. Environment setup homework (install Node/Git/VS Code)
4. Pre-assessment: HTML/CSS/JS knowledge check
5. Form pairs (or assign solo, depending on class size)

---

## Conclusion

**This project is FEASIBLE and APPROPRIATE for grade 9 students** under these conditions:

✅ **Semester-long timeline** (12-16 weeks)  
✅ **Experienced teacher** (Node.js/Express familiarity)  
✅ **Proper scaffolding** (progressive complexity, templates provided)  
✅ **Technical resources** (computers, internet, software)  
✅ **Realistic expectations** (not all students will master everything)

The project provides **authentic learning** in a **real-world technology stack** while building something **genuinely useful** for the school community. The progressive phase structure allows students to build confidence incrementally, and the concrete nature of web development provides immediate, visible feedback.

**Recommendation: PROCEED** with implementation, following the phased approach outlined above.

---

## Appendix A: Key Analogies for Teaching

| Concept | Analogy | When to Use |
|---------|---------|-------------|
| **Server** | Restaurant kitchen (takes orders, prepares food, serves) | Phase 1 intro |
| **Routes** | Receptionist directing visitors to rooms | Phase 2 routing |
| **Database** | Filing cabinet / library card catalog | Phase 5 intro |
| **Templates** | Mail merge / form letter with blanks | Phase 2 EJS |
| **POST request** | Putting letter in mailbox | Phase 3 forms |
| **GET request** | Looking something up in dictionary | Phase 3 forms |
| **Sessions** | Temporary visitor badge at school | Phase 6 auth |
| **Password hashing** | One-way door / shredder (irreversible) | Phase 6 security |
| **LocalStorage** | Writing notes in your notebook | Phase 8 |
| **Deployment** | Moving from practice gym to championship court | Phase 9 |

## Appendix B: Common Error Messages & Solutions

| Error | Likely Cause | Solution |
|-------|-------------|----------|
| `Cannot find module 'express'` | Dependencies not installed | Run `npm install` |
| `Port 3000 already in use` | Server already running | Stop previous server (Ctrl+C) |
| `ENOENT: no such file or directory` | Wrong working directory | Navigate to project folder |
| `Cannot set headers after sent` | Multiple res.send() calls | Remove duplicate response |
| `database is locked` | Concurrent writes | Use WAL mode, add timeout |
| `Cannot read property of undefined` | Missing data validation | Check if variable exists first |
| `401 Unauthorized` | Session expired | Login again |

## Appendix C: Additional Resources

**Official Documentation:**
- Node.js: https://nodejs.org/docs
- Express: https://expressjs.com/
- EJS: https://ejs.co/
- SQLite: https://sqlite.org/docs.html
- Bulma: https://bulma.io/documentation/

**Video Tutorials (age-appropriate):**
- freeCodeCamp: Node.js and Express Tutorial
- Traversy Media: Express Crash Course
- Web Dev Simplified: EJS Crash Course

**Interactive Learning:**
- NodeSchool.io (hands-on workshops)
- MDN Web Docs (reference)

**Community Support:**
- Stack Overflow (tag: express)
- Reddit: r/node
- Discord: Nodeiflux community

---

**Document Version:** 1.0  
**Last Updated:** November 9, 2025  
**Author:** GitHub Copilot (with Teacher Roy)  
**Status:** Ready for Review and Implementation
