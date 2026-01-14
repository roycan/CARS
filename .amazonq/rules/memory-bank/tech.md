# CARS Technology Stack

## Programming Languages

### Client-Side Version
- **HTML5**: Semantic markup and form structure
- **CSS3**: Styling with Flexbox and Grid layouts
- **JavaScript (ES6+)**: Modern JavaScript with modules, arrow functions, destructuring
- **JSON**: Data storage format and configuration

### Server-Side Version
- **JavaScript (Node.js)**: Server-side runtime (v18+ required, v22+ recommended)
- **SQL**: Database queries and schema definition (PostgreSQL/SQLite)
- **EJS**: Embedded JavaScript templating engine
- **Shell Scripts**: Database migration and deployment automation

## Frameworks and Libraries

### Client-Side Dependencies
- **Chart.js**: Data visualization for trends and radar charts
- **Bulma CSS**: Modern CSS framework for responsive design
- **QUnit**: JavaScript unit testing framework

### Server-Side Dependencies
```json
{
  "express": "^4.18.2",           // Web application framework
  "ejs": "^3.1.9",               // Template engine
  "pg": "^8.11.3",               // PostgreSQL client
  "bcrypt": "^5.1.1",            // Password hashing
  "iron-session": "^8.0.1",      // Session management
  "dotenv": "^16.3.1",           // Environment variables
  "compression": "^1.7.4",       // Response compression
  "helmet": "^7.1.0",            // Security headers
  "express-rate-limit": "^7.1.5", // Rate limiting
  "express-validator": "^7.0.1"   // Input validation
}
```

### Development Dependencies
```json
{
  "nodemon": "^3.0.2",           // Development server auto-reload
  "jest": "^29.0.0"              // Testing framework (planned)
}
```

## Database Systems

### Production Database
- **PostgreSQL**: Primary database for production deployment
- **Neon Database**: Managed PostgreSQL service for cloud deployment
- **Connection Pooling**: Efficient database connection management

### Development Database
- **SQLite**: Lightweight database for local development
- **File-based Storage**: Simple setup without server requirements

### Database Schema
```sql
-- Core tables
students              # Student information and demographics
assessments          # Assessment responses and scores
counselors           # Authentication and access control
counselor_access_log # Audit trail for data access
```

## Development Tools

### Package Management
- **npm**: Node.js package manager
- **package.json**: Dependency management and scripts
- **package-lock.json**: Exact dependency versions

### Development Scripts
```bash
npm run dev          # Start development server with auto-reload
npm start            # Start production server
npm run migrate      # Database schema setup
npm run seed         # Create default data
npm test            # Run test suite
```

### Code Quality Tools
- **ESLint**: JavaScript linting (configuration pending)
- **Prettier**: Code formatting (configuration pending)
- **Nodemon**: Automatic server restart during development

## Build and Deployment

### Client-Side Build Process
- **No Build Required**: Direct file serving
- **Static Asset Serving**: HTML, CSS, JS files served directly
- **CDN Dependencies**: External libraries loaded from CDNs

### Server-Side Build Process
- **No Transpilation**: Modern Node.js supports ES6+ features
- **Environment Configuration**: `.env` file for local, environment variables for production
- **Database Migration**: Automated schema setup on deployment

### Deployment Platforms

#### Client Version
- **GitHub Pages**: Free static hosting with automatic deployment
- **Netlify**: Alternative static hosting with form handling
- **Any Web Server**: Apache, Nginx, or simple HTTP server

#### Server Version
- **Railway**: Primary deployment platform with PostgreSQL integration
- **Heroku**: Alternative cloud platform (configuration available)
- **Docker**: Containerization support (planned)

## Environment Configuration

### Client-Side Configuration
```javascript
// Embedded in data.js
const CONFIG = {
  version: '0.9.0',
  schemaVersion: 1,
  devMode: false,
  chartColors: {...}
};
```

### Server-Side Environment Variables
```env
# Server Configuration
NODE_ENV=development|production
PORT=3000
APP_NAME=CARS Assessment System

# Database
DATABASE_URL=postgresql://...
DATABASE_PATH=./data/database.db  # SQLite fallback

# Security
SESSION_SECRET=random-secret-key
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Application Settings
DEFAULT_COUNSELOR_USERNAME=counselor
DEFAULT_COUNSELOR_PASSWORD=changeme123
SCHOOL_SECTIONS=Grade 9-A,Grade 9-B,Grade 9-C
SCHOOL_BATCHES=2024,2025,2026,2027
SCHOOL_NAMES=Sample High School,Another School
```

## Security Technologies

### Client-Side Security
- **Content Security Policy**: XSS prevention through CSP headers
- **Local Storage Encryption**: Data stored in browser localStorage
- **No Network Communication**: Eliminates network-based attacks

### Server-Side Security
- **bcrypt**: Password hashing with salt rounds
- **iron-session**: Secure session management with encryption
- **helmet**: Security headers middleware
- **express-rate-limit**: Brute force protection
- **express-validator**: Input sanitization and validation
- **Prepared Statements**: SQL injection prevention

## Testing Technologies

### Client-Side Testing
- **QUnit**: Browser-based unit testing
- **Manual Testing**: Browser compatibility testing
- **Test Runner**: HTML-based test execution

### Server-Side Testing (Planned)
- **Jest**: JavaScript testing framework
- **Supertest**: HTTP assertion library
- **Test Database**: Separate SQLite instance for testing

## Development Commands

### Initial Setup
```bash
# Client version
git clone <repository>
open index.html  # Or serve with local server

# Server version
cd SSR
npm install
cp .env.example .env
npm run migrate
npm run seed
npm run dev
```

### Database Management
```bash
# Create/update schema
npm run migrate

# Reset database
rm data/database.db && npm run migrate

# Create default counselor
npm run seed

# Manual database access
sqlite3 data/database.db
```

### Development Workflow
```bash
# Start development
npm run dev  # Auto-reload on file changes

# Check logs
tail -f logs/app.log  # If logging implemented

# Test deployment locally
NODE_ENV=production npm start
```

## Browser Compatibility

### Client Version Requirements
- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **JavaScript Features**: ES6 modules, localStorage, fetch API
- **CSS Features**: Flexbox, Grid, CSS variables

### Server Version Requirements
- **Any Modern Browser**: Server-rendered HTML works universally
- **JavaScript Enhancement**: Progressive enhancement for interactive features
- **Mobile Responsive**: Bulma CSS framework provides mobile support

## Performance Considerations

### Client-Side Performance
- **Minimal Dependencies**: Only Chart.js for visualization
- **Local Storage**: No network requests for data operations
- **Lazy Loading**: Charts loaded only when needed

### Server-Side Performance
- **Connection Pooling**: Efficient database connections
- **Compression Middleware**: Gzip response compression
- **Static Asset Caching**: Efficient serving of CSS/JS files
- **Session Storage**: Memory-based session management

## Version Requirements

### Node.js Version
- **Minimum**: Node.js 18.0.0
- **Recommended**: Node.js 22.0.0+
- **LTS Support**: Use current LTS version for production

### Database Versions
- **PostgreSQL**: 12.0+ (for production)
- **SQLite**: 3.35+ (for development)

### Browser Support Matrix
| Browser | Client Version | Server Version |
|---------|---------------|----------------|
| Chrome  | 60+           | Any            |
| Firefox | 55+           | Any            |
| Safari  | 12+           | Any            |
| Edge    | 79+           | Any            |
| Mobile  | iOS 12+       | Any            |