# Quick Start Guide - CARS SSR

## For Students: Your First Time Setup

### Step 1: Install Node.js
1. Go to https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Run the installer
4. To verify: Open terminal/command prompt and type:
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers.

### Step 2: Get the Code
```bash
# Navigate to the SSR folder
cd SSR

# Or if you're starting fresh:
# git clone <repository-url>
# cd CARS/SSR
```

### Step 3: Install Dependencies
```bash
npm install
```
This downloads all the packages the project needs. It may take 1-2 minutes.

### Step 4: Set Up Database
```bash
# Create the database tables
npm run migrate

# Create the counselor account
npm run seed
```

### Step 5: Start the Server
```bash
# For development (auto-restarts when you make changes)
npm run dev

# Or for production mode
npm start
```

### Step 6: Open in Browser
Open your web browser and go to:
```
http://localhost:3000
```

You should see the CARS home page!

---

## 🎯 Testing Checklist

### As a Student:
- [ ] Click "Take Assessment"
- [ ] Fill in your information
- [ ] Answer all 25 questions
- [ ] Submit and view your results

### As a Counselor:
- [ ] Click "Counselor Login"
- [ ] Username: `counselor`
- [ ] Password: `changeme123`
- [ ] View the dashboard
- [ ] Click on a student to see details
- [ ] Log out

---

## 🐛 Common Problems

### "Cannot find module..."
**Solution:** Run `npm install` again

### "Port 3000 is already in use"
**Solution:** 
- Stop any other servers running
- Or change PORT in `.env` file to 3001

### "Database not found"
**Solution:** Run `npm run migrate`

### "Cannot login as counselor"
**Solution:** Run `npm run seed`

### Page looks broken (no styling)
**Solution:** 
- Check your internet connection (Bulma CSS loads from CDN)
- Or the CSS link in `views/layouts/base.ejs`

---

## 📁 What Did We Just Create?

```
SSR/
├── 📦 package.json          ← Lists all dependencies
├── 🔒 .env                  ← Your configuration (don't share!)
├── 📄 README.md             ← Full documentation
├── ⚙️ railway.json          ← Deployment configuration
│
├── src/
│   ├── 🚀 server.js         ← Main file (starts everything)
│   │
│   ├── config/
│   │   └── env.js           ← Reads .env file
│   │
│   ├── db/
│   │   ├── connection.js    ← Connects to SQLite database
│   │   └── schema.sql       ← Database structure (tables)
│   │
│   ├── models/              ← Database operations
│   │   ├── student.js       ← Create/find students
│   │   ├── assessment.js    ← Save/retrieve assessments
│   │   └── counselor.js     ← Counselor accounts
│   │
│   ├── services/            ← Business logic
│   │   ├── scoring.js       ← Calculate risk scores
│   │   └── auth.js          ← Password hashing
│   │
│   ├── middleware/          ← Request interceptors
│   │   ├── authGuard.js     ← Protect counselor routes
│   │   └── validation.js    ← Check form inputs
│   │
│   ├── routes/              ← URL handlers
│   │   ├── index.js         ← Home, About pages
│   │   ├── students.js      ← Student info form
│   │   ├── assessments.js   ← Assessment questions
│   │   └── counselor.js     ← Dashboard, login
│   │
│   ├── views/               ← HTML templates (EJS)
│   │   ├── layouts/         ← Page wrapper
│   │   ├── partials/        ← Reusable pieces (nav, footer)
│   │   ├── pages/           ← Home, About
│   │   ├── students/        ← Student forms
│   │   ├── assessments/     ← Assessment pages
│   │   └── counselor/       ← Dashboard pages
│   │
│   └── scripts/             ← Helper scripts
│       ├── migrate.js       ← Setup database
│       └── seed.js          ← Create counselor
│
└── data/                    ← Created automatically
    └── database.db          ← SQLite database file
```

---

## 🎓 Learning Objectives

By the end of this project, you will understand:

### Week 1-2: Basics
- ✅ What is a web server?
- ✅ How Node.js and Express work
- ✅ Routes (URLs) and request handling
- ✅ Templates (EJS) for dynamic HTML

### Week 3-4: Forms
- ✅ GET vs POST requests
- ✅ Form data processing
- ✅ Validation and error handling
- ✅ User feedback (success/error messages)

### Week 5-6: Database
- ✅ What is a database?
- ✅ SQL basics (INSERT, SELECT, UPDATE, DELETE)
- ✅ Database design (tables, relationships)
- ✅ Prepared statements (security)

### Week 7-8: Authentication
- ✅ Password hashing (why never store plain text!)
- ✅ Sessions (remembering logged-in users)
- ✅ Route protection (private pages)
- ✅ Login/logout flow

### Week 9-10: Dashboard
- ✅ Data aggregation (statistics)
- ✅ Filtering and searching
- ✅ Multiple page views
- ✅ Access logging

---

## 🚀 Next Steps

1. **Explore the code:**
   - Start with `src/server.js`
   - Then look at `src/routes/index.js`
   - Open `src/views/pages/home.ejs`

2. **Make a change:**
   - Edit the home page title
   - Add a new link to the navigation
   - Change a color in the CSS

3. **Break something (safely):**
   - Comment out a route
   - See what error you get
   - Fix it!

4. **Add a feature:**
   - Add a "Contact" page
   - Add a new field to student form
   - Change dropdown options in `.env`

---

## 💡 Tips for Success

1. **Read error messages carefully** - They tell you what's wrong!
2. **Use console.log()** - Print variables to see their values
3. **Ask questions** - No question is too small
4. **Experiment** - You can't break it permanently (Git saves everything)
5. **Help each other** - Teaching is the best way to learn

---

## 🆘 Getting Help

1. **Error message?** → Google it (add "node.js" or "express")
2. **Stuck?** → Ask a classmate
3. **Still stuck?** → Ask your teacher
4. **Really stuck?** → Check the README.md troubleshooting section

---

## 🎉 You're Ready!

Open http://localhost:3000 in your browser and start exploring!

**Remember:** The best way to learn is by doing. Don't be afraid to make mistakes—that's how we learn!

Happy coding! 🚀
