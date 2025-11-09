# CARS SSR - Assessment System (Server-Side Rendering Edition)

**Version:** 1.0.0  
**Purpose:** Teaching web development to Grade 9+ students  
**Tech Stack:** Node.js, Express.js, EJS, SQLite, Bulma CSS

---

## 📚 Overview

This is the server-side rendering version of the CARS (Children and Adolescents Risk Screener) assessment tool. It's designed as a teaching project for high school students to learn full-stack web development fundamentals.

**Key Features:**
- ✅ Student assessment intake with 25 bilingual questions
- ✅ Automatic risk scoring and classification
- ✅ Counselor dashboard with authentication
- ✅ SQLite database persistence
- ✅ Responsive Bulma CSS design
- ✅ Railway deployment ready

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- A code editor (VS Code recommended)

### Installation

```bash
# 1. Navigate to the SSR directory
cd SSR

# 2. Install dependencies
npm install

# 3. Copy environment example
cp .env.example .env

# 4. Set up the database
npm run migrate

# 5. Create default counselor account
npm run seed

# 6. Start the development server
npm run dev
```

The application will be available at **http://localhost:3000**

### Default Credentials

**Counselor Login:**
- Username: `counselor`
- Password: `changeme123`

⚠️ **IMPORTANT:** Change this password after first login in production!

---

## 📖 Project Structure

```
SSR/
├── package.json              # Dependencies and scripts
├── .env.example              # Environment variables template
├── railway.json              # Railway deployment config
├── src/
│   ├── server.js             # Main application entry point
│   ├── config/
│   │   └── env.js            # Configuration management
│   ├── db/
│   │   ├── connection.js     # Database connection
│   │   └── schema.sql        # Database schema
│   ├── models/
│   │   ├── student.js        # Student data access
│   │   ├── assessment.js     # Assessment data access
│   │   └── counselor.js      # Counselor data access
│   ├── services/
│   │   ├── scoring.js        # Assessment scoring logic
│   │   └── auth.js           # Password hashing/verification
│   ├── middleware/
│   │   ├── authGuard.js      # Authentication middleware
│   │   └── validation.js     # Input validation
│   ├── routes/
│   │   ├── index.js          # Home/About routes
│   │   ├── students.js       # Student info routes
│   │   ├── assessments.js    # Assessment routes
│   │   └── counselor.js      # Counselor routes
│   ├── views/
│   │   ├── layouts/
│   │   │   └── base.ejs      # Main layout template
│   │   ├── partials/
│   │   │   ├── nav.ejs       # Navigation bar
│   │   │   ├── flash.ejs     # Flash messages
│   │   │   └── footer.ejs    # Footer
│   │   ├── pages/
│   │   │   ├── home.ejs      # Home page
│   │   │   └── about.ejs     # About page
│   │   ├── students/
│   │   │   └── new.ejs       # Student info form
│   │   ├── assessments/
│   │   │   ├── form.ejs      # Assessment questionnaire
│   │   │   └── result.ejs    # Results page
│   │   └── counselor/
│   │       ├── login.ejs     # Login page
│   │       ├── dashboard.ejs # Dashboard
│   │       └── student.ejs   # Student details
│   └── scripts/
│       ├── migrate.js        # Database migration script
│       └── seed.js           # Database seeding script
└── data/                     # Created at runtime
    └── database.db           # SQLite database file
```

---

## 🎓 Learning Path (For Students)

This project is designed to teach web development in phases:

### Phase 1-2: Server & Templates (Weeks 1-3)
- Understanding Node.js and Express
- Creating routes and handling requests
- Using EJS templates for dynamic HTML
- Serving static files

**Files to study:**
- `src/server.js` - Main application setup
- `src/routes/index.js` - Basic routing
- `src/views/pages/home.ejs` - Template syntax

### Phase 3: Forms & Validation (Week 4)
- HTML form handling
- POST vs GET requests
- Input validation
- Error handling

**Files to study:**
- `src/routes/students.js` - Form processing
- `src/middleware/validation.js` - Validation logic
- `src/views/students/new.ejs` - Form structure

### Phase 4: Business Logic (Week 5)
- Separating concerns (models, services, routes)
- Pure functions and testing
- Data transformation

**Files to study:**
- `src/services/scoring.js` - Scoring algorithms
- `src/routes/assessments.js` - Assessment flow

### Phase 5: Database (Weeks 6-7)
- SQLite basics
- SQL queries (INSERT, SELECT, JOIN)
- Database design principles
- Prepared statements

**Files to study:**
- `src/db/schema.sql` - Database structure
- `src/models/student.js` - Data access patterns
- `src/models/assessment.js` - Complex queries

### Phase 6: Authentication (Weeks 8-9)
- Password hashing with bcrypt
- Session management
- Route protection middleware
- Security best practices

**Files to study:**
- `src/services/auth.js` - Password handling
- `src/middleware/authGuard.js` - Route protection
- `src/routes/counselor.js` - Login flow

### Phase 7: Dashboard & Analytics (Week 10)
- Data aggregation
- Filtering and sorting
- User interface design
- Access logging

**Files to study:**
- `src/models/assessment.js` - Statistics functions
- `src/views/counselor/dashboard.ejs` - Dashboard UI

---

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start with auto-reload (nodemon)
npm start            # Start production server

# Database
npm run migrate      # Create/update database schema
npm run seed         # Create default counselor account

# Testing (Phase 10 - optional)
npm test            # Run tests (not yet implemented)
```

---

## 🌐 Deployment to Railway

### Prerequisites
1. Create a [Railway account](https://railway.app/) (free tier)
2. Install [Railway CLI](https://docs.railway.app/develop/cli) (optional)

### Method 1: GitHub Integration (Recommended)

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. In Railway dashboard:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will automatically detect `railway.json` and deploy

3. Set environment variables in Railway dashboard:
   ```
   NODE_ENV=production
   SESSION_SECRET=<generate-random-secret>
   DEFAULT_COUNSELOR_PASSWORD=<choose-secure-password>
   ```

4. Your app will be live at: `https://your-app-name.up.railway.app`

### Method 2: Railway CLI

```bash
# Login to Railway
railway login

# Link to project
railway link

# Deploy
railway up

# Set environment variables
railway variables set NODE_ENV=production
railway variables set SESSION_SECRET=your-random-secret

# Open in browser
railway open
```

### Post-Deployment

1. Access your app URL
2. The database will be created automatically on first run
3. Run seed script (one-time):
   ```bash
   railway run npm run seed
   ```
4. Login with your counselor credentials
5. Change the default password immediately!

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file (copied from `.env.example`):

```env
# Server
NODE_ENV=development
PORT=3000

# Session Security
SESSION_SECRET=change-this-to-random-string

# Database
DATABASE_PATH=./data/database.db

# Application
APP_NAME=CARS Assessment System
APP_URL=http://localhost:3000

# Default Counselor (for seeding)
DEFAULT_COUNSELOR_USERNAME=counselor
DEFAULT_COUNSELOR_PASSWORD=changeme123

# School Configuration
SCHOOL_SECTIONS=Grade 9-A,Grade 9-B,Grade 9-C,Grade 9-D
SCHOOL_BATCHES=2024,2025,2026,2027,2028
SCHOOL_NAMES=Sample High School,Another High School

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Customizing Dropdown Values

Edit the `.env` file:

**Sections:** Comma-separated list of class sections
```env
SCHOOL_SECTIONS=Grade 9-A,Grade 9-B,Grade 9-C,Grade 9-D,Grade 10-A,Grade 10-B
```

**Batches:** Comma-separated list of graduation years
```env
SCHOOL_BATCHES=2024,2025,2026,2027,2028
```

**Schools:** Comma-separated list of school names (optional for students)
```env
SCHOOL_NAMES=My High School,Another High School,Third School
```

---

## 📊 Database Schema

### Tables

**students**
- `id` - Primary key
- `name` - Student full name
- `email` - Student email
- `section` - Class section
- `batch` - Graduation year
- `school` - School name (optional)
- `created_at`, `updated_at` - Timestamps

**assessments**
- `id` - Primary key
- `student_id` - Foreign key to students
- `raw_answers` - JSON array of answers
- `raw_scores` - JSON object of raw scores
- `t_scores` - JSON object of T-scores
- `risk_level` - Classification result
- `interpretation` - Full interpretation text
- `self_harm_flagged` - Boolean flag
- `taken_at` - Timestamp

**counselors**
- `id` - Primary key
- `username` - Login username
- `password_hash` - Bcrypt hashed password
- `created_at` - Timestamp

**counselor_access_log**
- `id` - Primary key
- `counselor_id` - Foreign key
- `student_id` - Foreign key
- `action` - Type of access
- `accessed_at` - Timestamp

---

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ Session-based authentication
- ✅ CSRF protection (helmet middleware)
- ✅ Rate limiting on sensitive routes
- ✅ Input validation and sanitization
- ✅ SQL injection protection (prepared statements)
- ✅ XSS protection (EJS auto-escaping)
- ✅ Access logging for counselor actions

---

## 🐛 Troubleshooting

### Server won't start

```bash
# Check if port 3000 is already in use
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process or change PORT in .env
```

### Database errors

```bash
# Reset database
rm data/database.db
npm run migrate
npm run seed
```

### "Module not found" errors

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Login not working

```bash
# Re-seed the database
npm run seed

# Or manually check counselor exists
sqlite3 data/database.db "SELECT * FROM counselors;"
```

---

## 📝 Teaching Notes

### For Teachers

This project is structured to introduce concepts progressively:

1. **Start simple:** Have students run the server and explore routes first
2. **One file at a time:** Focus on one route file per lesson
3. **Live coding:** Demonstrate changes with immediate feedback
4. **Pair programming:** Students work in pairs (driver + navigator)
5. **Code reviews:** Weekly whole-class code reviews on projector
6. **Debugging practice:** Intentionally introduce bugs for students to fix

### Common Student Mistakes

1. **Forgetting `npm install`** - Always first step after cloning
2. **Not running migrations** - Database won't exist without this
3. **Hard-coding values** - Teach environment variables early
4. **Copy-paste without understanding** - Require explanations
5. **Ignoring error messages** - Teach how to read stack traces

### Assessment Ideas

- **Phase checkpoints:** Students must demonstrate working features
- **Code explanations:** Verbal defense of their code choices
- **Peer reviews:** Students review each other's code
- **Feature extensions:** Add new fields, pages, or functionality
- **Bug fix challenges:** Give them broken code to debug

---

## 🤝 Contributing

This is a teaching project. If you're an educator using this:

1. Fork the repository
2. Adapt for your classroom needs
3. Share improvements back via pull requests
4. Join discussions in Issues tab

---

## 📄 License

MIT License - Free to use for educational purposes

---

## 🆘 Support

**For Students:**
- Read error messages carefully
- Use `console.log()` to debug
- Ask your teacher or classmates
- Check the troubleshooting section above

**For Teachers:**
- Open an issue on GitHub
- Reference the `plan-SSR.md` document
- Check Railway documentation for deployment issues

---

## 🎯 Roadmap (Future Enhancements)

- [ ] Phase 8: LocalStorage synchronization
- [ ] CSV export for counselors
- [ ] Data visualization (charts)
- [ ] Email notifications
- [ ] Multiple counselor roles
- [ ] Assessment history comparison
- [ ] Mobile-responsive improvements
- [ ] Automated testing suite
- [ ] Docker containerization
- [ ] Multi-language support expansion

---

## 🙏 Acknowledgments

- Original CARS project (client-side version)
- Bulma CSS framework
- Railway platform for easy deployment
- All teachers and students learning full-stack development!

---

**Happy Coding! 🎉**

For questions or issues, please open a GitHub issue or contact your instructor.
