# SSR Migration Plan for CARS (Updated)

This is a checkable task list for migrating the static CARS application to a full-featured Server-Side Rendered (SSR) application. Decisions have been made to use **PostgreSQL (Neon)**, **iron-session**, **Bulma**, and **Node.js 22** with **Vercel** deployment.

**Key Decisions:**
- Database: Neon PostgreSQL (free tier) - fresh schema, no data migration
- Sessions: iron-session (stateless, encrypted cookies)
- Styling: Bulma CSS framework
- Runtime: Node.js 22 (current LTS)
- Deployment: Vercel (free tier)
- Development: Shared database (staging/production separation planned for later)

### 0. Environment Setup
*Feasibility: 10/10, Confidence: 100%*
- [ ] Verify Node.js version 22 is installed (`node --version`)
- [ ] Install dotenv for environment variable management (`npm install dotenv`)
- [ ] Verify `.env` file contains Neon DATABASE_URL and required variables
- [ ] Test basic Node.js 22 features (native fetch, improved performance)

### 1. Styling: Integrate Bulma CSS
*Feasibility: 10/10, Confidence: 100%*
- [ ] Create a `public` directory in `SSR/`
- [ ] Create a `public/css` subdirectory
- [ ] Download and add the Bulma CSS file to `public/css`
- [ ] Configure Express in `src/server.js` to serve static files from the `public` directory
- [ ] Link the Bulma stylesheet in the main layout file (`src/views/layouts/base.ejs`)

### 2. Database: Migrate from SQLite to PostgreSQL (Neon)
*Feasibility: 10/10, Confidence: 98%* ⬆️ *Improved with fresh schema approach*
- [ ] Uninstall `better-sqlite3` (`npm uninstall better-sqlite3`)
- [ ] Install `pg` (node-postgres) (`npm install pg`)
- [ ] Update `src/config/env.js` to load environment variables with dotenv
- [ ] Update `src/db/connection.js` to use `pg` with Neon connection string
- [ ] Create fresh PostgreSQL schema files in `src/db/schema/`:
  - [ ] `students.sql` - Student information table
  - [ ] `assessments.sql` - Assessment results table
  - [ ] `counselors.sql` - Counselor accounts table
  - [ ] `counselor_access_log.sql` - Access logging table
- [ ] Create `src/scripts/migrate.js` to run schema creation
- [ ] Create `src/scripts/seed.js` to create default counselor account and sample data:
  - [ ] Default counselor account
  - [ ] Sample students (3-5 test students)
  - [ ] Sample assessments (various risk levels for testing)
- [ ] Update database queries in `src/models/` for PostgreSQL compatibility
- [ ] Test connection to Neon database from local development

### 3. Session Management: Migrate to `iron-session`
*Feasibility: 9/10, Confidence: 95%*
- [ ] Uninstall `express-session` (`npm uninstall express-session`)
- [ ] Install `iron-session` (`npm install iron-session`)
- [ ] Verify `SESSION_SECRET` in `.env` (must be at least 32 characters long)
- [ ] Create session middleware using `iron-session` in `src/middleware/session.js`
- [ ] Remove old `express-session` setup from `src/server.js`
- [ ] Apply new `iron-session` middleware in `src/server.js`
- [ ] Update routes (e.g., `counselor.js`) to use `req.session` as provided by `iron-session`
- [ ] Test session persistence across requests

### 4. Review and Refactor
*Feasibility: 10/10, Confidence: 100%*
- [ ] Review all routes and models to ensure they function correctly with PostgreSQL and iron-session
- [ ] Run database migration and seed scripts
- [ ] Test all user flows:
  - [ ] Student assessment submission
  - [ ] Counselor login and logout
  - [ ] Counselor dashboard view
  - [ ] Counselor student detail view
- [ ] Verify data persistence in Neon database
- [ ] Test error handling and validation

### 5. Deployment (Vercel + Neon)
*Feasibility: 9/10, Confidence: 90%*
- [ ] Remove Railway-related files:
  - [ ] Delete `railway.json`
  - [ ] Remove Railway-specific configurations
- [ ] Create `vercel.json` configuration for Node.js 22
- [ ] Configure Vercel project settings:
  - [ ] Set Node.js version to 22
  - [ ] Add environment variables (`DATABASE_URL`, `SESSION_SECRET`, etc.)
  - [ ] Configure build and start commands
- [ ] Deploy to Vercel and verify Neon connection works in production
- [ ] Test all user flows in production environment
- [ ] Monitor performance and connection limits

### 6. Future Enhancements (Optional)
*Feasibility: 10/10, Confidence: 100%*
- [ ] Set up separate Neon database for staging environment
- [ ] Add connection pooling optimization if needed
- [ ] Implement database backup strategy
- [ ] Add monitoring and logging for production