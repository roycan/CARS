# 🚂 Railway Deployment Guide

## Step-by-Step Railway Deployment

### Prerequisites
- ✅ Code pushed to GitHub
- ✅ Railway account (free tier)
- ✅ Tested locally (everything works on localhost)

---

## Method 1: Deploy via Railway Dashboard (Easiest)

### Step 1: Prepare Your Code

1. **Make sure you have a `.gitignore`:**
   ```
   node_modules/
   .env
   data/
   *.db
   ```

2. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

### Step 2: Create Railway Project

1. Go to [railway.app](https://railway.app/)
2. Click "Login" → Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository (`CARS` or your fork)
6. Railway will automatically:
   - Detect Node.js
   - Find `railway.json`
   - Install dependencies
   - Run migrations
   - Start the server

Visual: Deployment Pipeline (Intermediate)
![Pipeline: Git push → Railway build → migrate → start → optional seed → live URL](../docs/diagrams/deploy/deploy--plantuml--intermediate.png)

Alt: After you push to GitHub, Railway builds the app, runs database migrations, starts the server, and you optionally run a one-time seed before the app becomes publicly accessible.

### Step 3: Configure Environment Variables

1. In your Railway project dashboard, click "Variables"
2. Add these variables:

   | Variable | Value | Notes |
   |----------|-------|-------|
   | `NODE_ENV` | `production` | Required |
   | `SESSION_SECRET` | `<random-string>` | Generate random 32+ chars |
   | `DEFAULT_COUNSELOR_PASSWORD` | `<secure-password>` | Change from default! |
   | `APP_NAME` | `CARS Assessment` | Optional |
   | `SCHOOL_SECTIONS` | `Grade 9-A,Grade 9-B,...` | Customize |
   | `SCHOOL_BATCHES` | `2024,2025,2026,...` | Customize |
   | `SCHOOL_NAMES` | `Your School Name` | Optional |

3. **To generate a secure SESSION_SECRET:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### Step 4: Deploy!

1. Railway will automatically build and deploy
2. Watch the logs in the "Deployments" tab
3. Once complete, click "Generate Domain"
4. Your app will be live at: `https://your-app-name.up.railway.app`

### Step 5: Seed the Database

Railway runs migrations automatically (`npm run migrate`), but you need to seed manually once:

**Option A: Using Railway CLI:**
```bash
railway login
railway link
railway run npm run seed
```

**Option B: Using Dashboard:**
1. Go to your project → "Settings" → "Service"
2. Find "Run Command" section
3. Enter: `npm run seed`
4. Click "Run"

### Step 6: Test Your Deployment

1. Visit your Railway URL
2. Click "Counselor Login"
3. Use credentials you set in environment variables
4. Create a test assessment
5. Verify dashboard works

---

## Method 2: Deploy via Railway CLI

### Step 1: Install Railway CLI

**Mac/Linux:**
```bash
curl -fsSL https://railway.app/install.sh | sh
```

**Windows (PowerShell):**
```powershell
iwr https://railway.app/install.ps1 | iex
```

### Step 2: Login and Initialize

```bash
# Login
railway login

# Initialize project (in SSR directory)
cd SSR
railway init
```

### Step 3: Set Environment Variables

```bash
railway variables set NODE_ENV=production
railway variables set SESSION_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
railway variables set DEFAULT_COUNSELOR_PASSWORD=YourSecurePassword123
railway variables set SCHOOL_SECTIONS="Grade 9-A,Grade 9-B,Grade 9-C"
railway variables set SCHOOL_BATCHES="2024,2025,2026"
```

### Step 4: Deploy

```bash
railway up
```

### Step 5: Seed Database

```bash
railway run npm run seed
```

### Step 6: Open in Browser

```bash
railway open
```

---

## 🎯 Post-Deployment Checklist

- [ ] App loads at Railway URL
- [ ] Home page displays correctly
- [ ] "Take Assessment" button works
- [ ] Student can submit assessment
- [ ] Counselor can login
- [ ] Dashboard shows data
- [ ] Student details page works
- [ ] No errors in Railway logs

---

## 🔧 Troubleshooting

Visual: Debugging Decision Tree (Intermediate)
![Decision tree for common errors: missing packages, port conflicts, SQL errors, auth issues, logs](../docs/diagrams/debug/debug--plantuml--intermediate.png)

Alt: When an error appears, systematically check if it's a missing package (run npm install), port conflict (stop other server), SQL error (check schema in DB Browser), auth 401 (re-login), or otherwise consult server logs and console output before retrying.

### Build Failed

**Check logs:**
```bash
railway logs
```

**Common issues:**
- Missing dependencies → Check `package.json`
- Node version mismatch → Add to `package.json`:
  ```json
  "engines": {
    "node": ">=18.0.0"
  }
  ```

### "Cannot find module..."

Make sure all dependencies are in `package.json`, not just `devDependencies`:
```bash
npm install --save <missing-package>
git commit -am "Add missing dependency"
git push
```

### Database Not Working

1. Check if migrations ran:
   ```bash
   railway logs | grep migrate
   ```

2. Re-run migrations:
   ```bash
   railway run npm run migrate
   ```

3. Check database file:
   ```bash
   railway shell
   ls -la data/
   ```

### Environment Variables Not Working

1. In Railway dashboard → "Variables"
2. Make sure no typos in variable names
3. Re-deploy after changing variables:
   ```bash
   railway up --force
   ```

### App Crashes on Start

**Check logs:**
```bash
railway logs --tail
```

**Common causes:**
- Port binding issue (Railway sets PORT automatically)
- Database connection error
- Missing environment variables

### Can't Login as Counselor

1. Seed database again:
   ```bash
   railway run npm run seed
   ```

2. Check if counselor exists:
   ```bash
   railway shell
   sqlite3 data/database.db "SELECT * FROM counselors;"
   ```

---

## 📊 Monitoring Your App

### View Logs
```bash
# Real-time logs
railway logs --tail

# Recent logs
railway logs

# In dashboard
Project → Deployments → Click deployment → View logs
```

### Check Resource Usage

1. Railway Dashboard → Your project
2. See "Metrics" tab
3. Monitor:
   - Memory usage (max 512 MB on free tier)
   - CPU usage
   - Network traffic

### Set Up Alerts

Railway doesn't have built-in alerts on free tier, but you can:
1. Use [UptimeRobot](https://uptimerobot.com/) (free)
2. Monitor your URL every 5 minutes
3. Get email if site goes down

---

## 💰 Railway Free Tier Limits

| Resource | Free Tier | Notes |
|----------|-----------|-------|
| **Execution Hours** | 500 hours/month | ~$5 credit |
| **Memory** | 512 MB | Per service |
| **Storage** | 1 GB | Persistent disk |
| **Bandwidth** | Unlimited* | Fair use policy |
| **Builds** | Unlimited | - |
| **Sleep** | After 15 min idle | ~30-60s wake time |

**Your app will likely use:**
- ~50-100 hours/month (with sleep)
- ~150 MB memory
- ~100-200 MB storage
- **Well within free tier!** ✅

---

## 🔐 Security Checklist

Before going live:

- [ ] Changed `DEFAULT_COUNSELOR_PASSWORD` from "changeme123"
- [ ] Generated random `SESSION_SECRET` (32+ characters)
- [ ] Removed any test/debug code
- [ ] `.env` file NOT in Git (check `.gitignore`)
- [ ] Database file NOT in Git
- [ ] HTTPS enabled (Railway does this automatically)
- [ ] Rate limiting configured (already in code)
- [ ] Helmet security headers enabled (already in code)

---

## 🚀 Advanced: Custom Domain (Optional)

1. Buy a domain (e.g., Namecheap, Google Domains)
2. In Railway:
   - Settings → Networking → Custom Domain
   - Add your domain
   - Copy the CNAME record
3. In your domain registrar:
   - Add CNAME record pointing to Railway
   - Wait for DNS propagation (5-60 minutes)
4. Your app will be accessible at your custom domain!

---

## 📈 Scaling Beyond Free Tier

When you need more:

### Hobby Plan ($5/month)
- No execution hour limits
- Same resources (512 MB RAM, 1 GB disk)
- No sleep/wake delays
- Great for active school use

### Pro Plan ($20/month)
- 8 GB RAM
- 100 GB storage
- Priority support
- Team collaboration
- Multiple environments

**For most schools:** Free tier → Hobby plan is sufficient!

---

## 🔄 Updating Your Deployment

### After making code changes:

```bash
# Local
git add .
git commit -m "Description of changes"
git push

# Railway auto-deploys on push!
# Or manually:
railway up
```

### Rolling back to previous version:

1. Railway Dashboard → Deployments
2. Find previous successful deployment
3. Click "..." → "Redeploy"

---

## 🆘 Getting Help

**Railway Documentation:**
https://docs.railway.app/

**Railway Community:**
https://discord.gg/railway

**Railway Status:**
https://status.railway.app/

**Common Error Codes:**
- **503:** App not responding → Check logs
- **502:** Build failed → Check build logs
- **404:** Route not found → Check your routes
- **500:** Server error → Check application logs

---

## ✅ Success Indicators

Your deployment is successful when:

1. ✅ Railway shows "Active" status
2. ✅ URL loads without errors
3. ✅ Can submit assessments
4. ✅ Counselor can login
5. ✅ Dashboard displays data
6. ✅ No errors in logs for 24 hours
7. ✅ Students can access from school network

**Congratulations!** Your CARS Assessment System is live! 🎉

---

## 📚 What's Next?

1. **Test with real students** (small group first)
2. **Gather feedback** from counselors
3. **Monitor logs** for errors
4. **Backup database** regularly:
   ```bash
   railway run cp data/database.db data/backup-$(date +%Y%m%d).db
   ```
5. **Add features** (Phase 8+: localStorage sync, analytics, etc.)

---

**Need help?** Check the main README.md or ask your teacher!

Good luck with your deployment! 🚀
