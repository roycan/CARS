# CARS Project Structure

## Repository Organization

The CARS project is organized as a multi-version repository with clear separation between client-side and server-side implementations:

```
CARS/
├── Root Level (Client-Side Version)
├── SSR/ (Server-Side Rendering Version)
├── docs/ (Shared Documentation)
├── tests/ (Client-Side Tests)
├── archive/ (Legacy Files)
└── inceptions/ (Planning Documents)
```

## Root Level - Client-Side Version

### Core Application Files
- `index.html` - Main application entry point
- `styles.css` - Application styling
- `js/` - JavaScript modules directory

### JavaScript Module Architecture
```
js/
├── data.js          # Questions, scales, T-score tables, configuration
├── scoring.js       # Pure scoring pipeline functions
├── storage.js       # localStorage persistence and import/export
├── main.js          # Application orchestration and initialization
├── devmode.js       # Developer transparency features
└── ui_*.js          # UI-specific modules
    ├── ui_questionnaire.js  # Form handling and validation
    ├── ui_modal.js          # Results display modal
    ├── ui_calendar.js       # Historical data calendar
    └── ui_analysis.js       # Charts and trend analysis
```

### Design Principles
- **Separation of Concerns**: Each module has a single responsibility
- **Pure Functions**: Scoring logic is stateless and testable
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **Educational Clarity**: Code structure mirrors teaching concepts

## SSR Directory - Server-Side Version

### Application Structure
```
SSR/
├── package.json         # Dependencies and scripts
├── src/                 # Source code
├── public/             # Static assets
├── data/               # Runtime database storage
└── deployment files    # Railway, Docker, environment configs
```

### Source Code Organization
```
src/
├── server.js           # Express application entry point
├── config/             # Configuration management
├── db/                 # Database layer
├── models/             # Data access layer
├── services/           # Business logic layer
├── middleware/         # Express middleware
├── routes/             # HTTP route handlers
├── views/              # EJS templates
└── scripts/            # Database migration and seeding
```

### Database Layer (`db/`)
```
db/
├── connection.js       # Database connection management
├── schema.sql         # Complete database schema
└── schema/            # Individual table definitions
    ├── students.sql
    ├── assessments.sql
    ├── counselors.sql
    └── counselor_access_log.sql
```

### Models Layer (`models/`)
- `student.js` - Student CRUD operations and validation
- `assessment.js` - Assessment data access and statistics
- `counselor.js` - Counselor authentication and management

### Services Layer (`services/`)
- `scoring.js` - Assessment scoring algorithms (shared with client)
- `auth.js` - Password hashing and verification utilities

### Routes Layer (`routes/`)
- `index.js` - Home and about pages
- `students.js` - Student information management
- `assessments.js` - Assessment form and results
- `counselor.js` - Authentication and dashboard

### Views Layer (`views/`)
```
views/
├── layouts/
│   └── base.ejs        # Main HTML template
├── partials/           # Reusable components
│   ├── nav.ejs
│   ├── footer.ejs
│   └── flash.ejs
├── pages/              # Static pages
├── students/           # Student-related views
├── assessments/        # Assessment forms and results
└── counselor/          # Counselor dashboard and login
```

## Documentation Structure (`docs/`)

### Technical Documentation
- `ARCHITECTURE.md` - Detailed system architecture
- `DATA_DICTIONARY.md` - Database schema and field definitions
- `SCORING_AND_RISK.md` - Assessment algorithms and risk classification

### Governance Documentation
- `PRIVACY_AND_SAFETY.md` - Privacy policy and safety considerations
- `RISK_NOTICES.md` - Legal disclaimers and usage warnings
- `CHANGELOG.md` - Version history and changes

### Development Documentation
- `PROJECT_LIFECYCLE.md` - Development phases and milestones
- `diagrams/flow.mmd` - Mermaid data flow diagrams

## Testing Structure (`tests/`)

### Client-Side Testing
- `test-runner.html` - QUnit test runner for browser testing
- `scoring.test.js` - Unit tests for scoring algorithms

### Testing Philosophy
- **Buildless Testing**: Tests run directly in browser
- **Pure Function Focus**: Emphasis on testing scoring logic
- **Educational Value**: Tests serve as documentation

## Planning and Inception (`inceptions/`)

### Project Planning
- `plan-SSR.md` - Server-side version development plan
- `plan-diagrams.md` - Architecture and flow diagrams
- `USER_STORIES.md` - Feature requirements and user scenarios

## Archive Structure (`archive/`)

### Legacy Files
- Previous versions of `index.html`
- `REFACTOR_PLAN.md` - Historical refactoring decisions

## Architectural Patterns

### Client-Side Patterns
- **Module Pattern**: Each JS file exports specific functionality
- **Observer Pattern**: Event-driven UI updates
- **Strategy Pattern**: Pluggable scoring algorithms
- **Factory Pattern**: Result object construction

### Server-Side Patterns
- **MVC Architecture**: Models, Views, Controllers separation
- **Repository Pattern**: Data access abstraction
- **Middleware Pattern**: Request/response processing pipeline
- **Service Layer Pattern**: Business logic encapsulation

### Shared Patterns
- **Configuration Pattern**: Environment-based settings
- **Validation Pattern**: Input sanitization and validation
- **Error Handling Pattern**: Consistent error processing

## Data Flow Architecture

### Client-Side Flow
1. User Input → Form Collection
2. Raw Answers → Scoring Pipeline
3. Scores → Risk Classification
4. Results → Local Storage + UI Update
5. Historical Data → Calendar + Charts

### Server-Side Flow
1. HTTP Request → Route Handler
2. Input Validation → Business Logic
3. Database Operations → Model Layer
4. Response Generation → View Rendering
5. Client Response → Browser Display

## Security Architecture

### Client-Side Security
- **No Server Communication**: Eliminates network attack vectors
- **Local Storage Only**: Data never leaves user's device
- **Input Sanitization**: XSS prevention in display logic

### Server-Side Security
- **Authentication Middleware**: Route protection
- **Password Hashing**: bcrypt for secure storage
- **Session Management**: Secure session handling
- **Input Validation**: SQL injection and XSS prevention
- **Rate Limiting**: Brute force protection

## Deployment Architecture

### Client Deployment
- **Static Hosting**: GitHub Pages, Netlify, or any web server
- **No Build Process**: Direct file serving
- **CDN Dependencies**: External library loading

### Server Deployment
- **Railway Platform**: Integrated deployment pipeline
- **Environment Configuration**: Secure secrets management
- **Database Migration**: Automated schema setup
- **Health Monitoring**: Application status tracking