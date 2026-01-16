# CARS - Children and Adolescents Risk Screener

## Project Overview

CARS is a comprehensive mental health assessment system designed for Grade 9+ learners. The project exists in two versions:

1. **Client-Side Version** (Main): A privacy-focused, browser-only self-assessment tool
2. **Server-Side Rendering (SSR) Version**: A full-stack web application for educational purposes

## Core Purpose

- **Primary**: Provide learners with a tool to record monthly experiences and assess risk levels
- **Educational**: Serve as a teaching aid for fundamental programming concepts and web development
- **Privacy-First**: Keep all assessment data local to the user's browser (client version)

## Key Features

### Assessment Capabilities
- 25 bilingual (English/Filipino) self-report items
- Special item #25 for self-harm thoughts assessment
- Subscales: Externalizing, Internalizing, Social, Academic/Learning, Total
- Raw score to T-score conversion via normative lookup tables
- Tiered risk classification with self-harm override

### Risk Classification System
- **Normal/No Risk**: Total T ≤ 60
- **At-risk**: 61–70
- **High risk**: ≥ 71 OR self-harm item marked "Yes"
- Self-harm affirmative answer immediately sets High risk regardless of Total T

### Data Management
- Local persistence (localStorage in client version)
- Import/export functionality (JSON + CSV)
- Calendar history with clickable day recall
- Trend analysis with line charts and radar visualizations

### Educational Features
- Dev Mode for instructional transparency
- Clear separation of concerns for teaching
- Progressive complexity for learning web development
- Comprehensive documentation and teaching materials

## Target Users

### Primary Users (Client Version)
- Grade 9+ students conducting self-assessments
- Individuals seeking personal mental health tracking
- Users prioritizing data privacy and local storage

### Educational Users (SSR Version)
- High school students learning web development
- Teachers instructing full-stack development
- Educators demonstrating database integration and authentication

### Professional Users
- Counselors accessing student assessment data (SSR version)
- Educational institutions implementing mental health screening
- Researchers studying adolescent risk factors

## Value Proposition

### For Learners
- **Privacy**: No accounts, servers, or analytics - data stays local
- **Accessibility**: Bilingual interface (English/Filipino)
- **Insight**: Visual trends and risk level classification
- **Portability**: Export data for backup or sharing with professionals

### For Educators
- **Teaching Tool**: Real-world application demonstrating programming concepts
- **Progressive Learning**: Structured phases from basic to advanced concepts
- **Practical Skills**: Database design, authentication, security, deployment
- **Industry Relevance**: Modern web development stack and practices

### For Institutions
- **Scalable**: Server-side version supports multiple users
- **Secure**: Proper authentication and data protection
- **Compliant**: Follows educational data privacy standards
- **Deployable**: Ready for cloud deployment with Railway integration

## Technical Approach

### Client Version Philosophy
- Zero backend dependency for maximum privacy
- Pure HTML/CSS/JavaScript for educational clarity
- Chart.js for data visualization
- Modular architecture for teaching separation of concerns

### SSR Version Philosophy
- Modern Node.js/Express stack for industry relevance
- EJS templating for server-side rendering
- PostgreSQL/SQLite for database learning
- Security-first approach with bcrypt and session management

## Current Status

- **Version**: 0.9.0 (Beta) for client version, 1.0.0 for SSR version
- **Status**: Feature-complete core with ongoing documentation and testing
- **Deployment**: GitHub Pages (client) and Railway (SSR) ready
- **Testing**: QUnit for client-side, Jest setup for server-side

## Success Metrics

### Educational Success
- Students successfully deploy working applications
- Progressive skill building from basic HTML to full-stack
- Understanding of security, database, and authentication concepts

### Assessment Tool Success
- Accurate risk classification based on validated scoring algorithms
- User retention for monthly self-assessments
- Data export utilization for professional consultation

### Privacy Success
- Zero data breaches (client version has no server to breach)
- User understanding of local vs. server-side data storage
- Successful data portability through export features