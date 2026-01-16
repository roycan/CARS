# CARS Development Guidelines

## Code Quality Standards

### File Structure and Organization
- **Header Comments**: All server-side files include descriptive header comments explaining purpose and functionality
- **Module Exports**: Use `module.exports` for Node.js modules with clear object structure
- **Import Organization**: Group imports logically (built-in modules, third-party, local modules)
- **Separation of Concerns**: Each file has a single, well-defined responsibility

### Naming Conventions
- **Variables**: Use camelCase for variables and functions (`rawScores`, `hasSelfHarm`)
- **Constants**: Use UPPER_SNAKE_CASE for constants (`SALT_ROUNDS`, `SELF_HARM_ITEM_INDEX`)
- **Files**: Use kebab-case for file names, descriptive prefixes (`ui_questionnaire.js`, `counselor.js`)
- **Database**: Use snake_case for database fields (`password_hash`, `accessed_at`)

### Code Formatting Patterns
- **Indentation**: 2-space indentation consistently used across all files
- **Line Length**: Keep lines readable, break long parameter lists appropriately
- **Semicolons**: Consistent semicolon usage in JavaScript
- **Spacing**: Proper spacing around operators and after commas

### Documentation Standards
- **JSDoc Comments**: Use JSDoc format for function documentation with `@param` and `@returns`
- **Inline Comments**: Explain complex logic, especially in scoring algorithms
- **README Files**: Comprehensive documentation with setup instructions and examples
- **Code Comments**: Explain "why" not "what" - focus on business logic reasoning

## Architectural Patterns

### Database Access Patterns
```javascript
// Pattern: Static class methods for data access
class Counselor {
  static async findByUsername(username) {
    const result = await pool.query(
      'SELECT * FROM counselors WHERE username = $1',
      [username]
    );
    return result.rows[0];
  }
}
```

### Error Handling Patterns
```javascript
// Pattern: Graceful degradation with null returns
static async validatePassword(username, password) {
  const counselor = await this.findByUsername(username);
  if (!counselor) {
    return null; // Graceful failure
  }
  // Continue processing...
}
```

### Configuration Management
```javascript
// Pattern: Centralized configuration with environment variables
const config = require('./config/env');
app.locals.appName = config.APP_NAME;
```

### Middleware Patterns
```javascript
// Pattern: Middleware with descriptive logging
app.use((req, res, next) => {
  const hasStudent = !!(req.session && req.session.student);
  console.log(`➡️  ${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});
```

## Security Implementation Standards

### Password Security
- **bcrypt Usage**: Always use bcrypt for password hashing with appropriate salt rounds
- **Salt Rounds**: Use 10 rounds for development, higher for production
- **No Plain Text**: Never store or log plain text passwords

### Session Management
- **Session Validation**: Check session existence before accessing properties
- **Flash Messages**: Clear flash messages after displaying to prevent persistence
- **Graceful Logout**: Proper session cleanup on logout

### Input Validation
- **Prepared Statements**: Always use parameterized queries (`$1`, `$2`) to prevent SQL injection
- **Data Sanitization**: Validate and sanitize all user inputs
- **Rate Limiting**: Apply rate limiting to sensitive endpoints (login, assessment submission)

### Security Headers
```javascript
// Pattern: Comprehensive security headers with CSP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      // ... other directives
    }
  }
}));
```

## Testing Patterns

### Unit Test Structure
```javascript
// Pattern: QUnit module organization with descriptive test names
QUnit.module('Scoring Logic', function() {
  QUnit.test('computeRawScores: calculates scores correctly', function(assert) {
    // Arrange
    const answers = Array(24).fill(1);
    
    // Act
    const rawScores = CARS.scoring.computeRawScores(answers);
    
    // Assert
    assert.equal(rawScores.total, 24, 'Total score should be 24');
  });
});
```

### Test Data Patterns
- **Boundary Testing**: Test edge cases (all zeros, maximum values)
- **Override Testing**: Test special conditions (self-harm override)
- **Descriptive Assertions**: Include meaningful assertion messages

## Data Processing Patterns

### Pure Function Design
```javascript
// Pattern: Pure functions for business logic
function computeRawScores(answers, scales = SCALES) {
  const raw = {};
  for(const scale of scales) {
    raw[scale.key] = scale.items.reduce((sum, itemId) => sum + answers[itemId-1], 0);
  }
  return raw;
}
```

### Lookup Table Implementation
```javascript
// Pattern: Object-based lookup tables with fallback logic
function convertRawToTScore(scaleKey, raw) {
  const table = T_SCORE_TABLE[scaleKey];
  if(!table) return null;
  if(table[raw] !== undefined) return table[raw];
  
  // Clamping logic for out-of-range values
  const keys = Object.keys(table).map(Number).sort((a,b) => a-b);
  if(raw <= keys[0]) return table[keys[0]];
  if(raw >= keys[keys.length-1]) return table[keys[keys.length-1]];
  
  return table[lower];
}
```

### Data Transformation Pipeline
```javascript
// Pattern: Sequential data transformation
function calculateAssessmentResult(answers) {
  const rawScores = computeRawScores(answers);
  const tScores = convertAllToTScores(rawScores);
  const hasSelfHarm = answers[SELF_HARM_ITEM_INDEX] === 1;
  const riskInfo = determineRisk(tScores, hasSelfHarm);
  
  return { /* structured result object */ };
}
```

## Server Configuration Patterns

### Express Application Setup
```javascript
// Pattern: Layered middleware configuration
app.set('trust proxy', 1);
app.use(helmet(/* security config */));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(withSession());
```

### Route Organization
- **Modular Routes**: Separate route files by feature area
- **Middleware Application**: Apply middleware at appropriate levels (global vs route-specific)
- **Error Handling**: Centralized error handling with environment-aware messages

### Graceful Shutdown
```javascript
// Pattern: Proper cleanup on process termination
process.on('SIGTERM', () => {
  server.close(() => {
    pool.end();
    process.exit(0);
  });
});
```

## Database Design Patterns

### Schema Organization
- **Separate Schema Files**: Individual SQL files for each table
- **Timestamp Fields**: Include `created_at` and `updated_at` for audit trails
- **Foreign Key Relationships**: Proper referential integrity with foreign keys

### Query Patterns
```javascript
// Pattern: Parameterized queries with meaningful aliases
const result = await pool.query(`
  SELECT 
    cal.*,
    s.name as student_name
  FROM counselor_access_log cal
  LEFT JOIN students s ON cal.student_id = s.id
  WHERE cal.counselor_id = $1
  ORDER BY cal.accessed_at DESC
  LIMIT $2
`, [counselorId, limit]);
```

## Development Workflow Standards

### Environment Management
- **Environment Files**: Use `.env` files for local development
- **Configuration Validation**: Validate required environment variables on startup
- **Default Values**: Provide sensible defaults for optional configuration

### Logging Patterns
```javascript
// Pattern: Structured logging with emojis for visual clarity
console.log('✅ Server running in ${config.NODE_ENV} mode');
console.log('🌐 URL: http://localhost:${PORT}');
```

### Development Scripts
- **Migration Scripts**: Automated database setup and updates
- **Seed Scripts**: Consistent test data creation
- **Development Server**: Auto-reload functionality with nodemon

## Code Organization Best Practices

### Module Structure
- **Single Responsibility**: Each module handles one aspect of functionality
- **Clear Exports**: Export only necessary functions and classes
- **Dependency Injection**: Pass dependencies as parameters when possible

### Constants Management
- **Centralized Constants**: Keep configuration constants in dedicated files
- **Immutable Data**: Use const for data that shouldn't change
- **Descriptive Names**: Use self-documenting constant names

### Error Handling Philosophy
- **Fail Gracefully**: Return null or default values rather than throwing errors
- **User-Friendly Messages**: Provide helpful error messages for users
- **Development vs Production**: Different error detail levels based on environment

## Performance Considerations

### Database Optimization
- **Connection Pooling**: Use connection pools for database access
- **Query Optimization**: Use appropriate indexes and query structure
- **Prepared Statements**: Reuse prepared statements for repeated queries

### Middleware Efficiency
- **Compression**: Enable gzip compression for responses
- **Static Asset Serving**: Efficient static file serving
- **Rate Limiting**: Prevent abuse while maintaining usability

## Educational Code Patterns

### Teaching-Friendly Structure
- **Progressive Complexity**: Start with simple concepts, build complexity gradually
- **Clear Examples**: Provide working examples for each concept
- **Commented Code**: Explain complex logic for learning purposes

### Debugging Support
- **Diagnostic Logging**: Include helpful logging for development
- **Error Messages**: Clear, actionable error messages
- **Development Tools**: Include tools for inspecting application state