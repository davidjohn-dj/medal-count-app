# Medal Count Mini App

A responsive Olympic medal standings application built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

## 🏆 Features

### Core Functionality
- **Dynamic Data Loading**: Medal data is fetched from a Next.js API route (`/api/medals`)
- **URL Parameter Sorting**: Supports `?sort=` parameter with values: `gold`, `silver`, `bronze`, `total`
- **No Re-fetching on Sort**: Data is cached after initial load, sorting happens client-side
- **Error Handling**: Comprehensive error states with retry functionality
- **Loading States**: Olympic-themed loading spinner with ring animations

### User Interface
- **Olympic Theme**: Professional design with Olympic rings header and gradient background
- **Country Flags**: All 13 countries display their flags using a sprite image (`flags.png`)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Sorting**: Sort by total medals, gold, silver, or bronze with proper tiebreaking

### Technical Implementation
- **TypeScript**: Full type safety with comprehensive interfaces
- **Next.js App Router**: Modern App Router with server components and API routes
- **File-based Data**: API routes read medal data dynamically from JSON files
- **CSS Custom Properties**: Modern theme system with light/dark mode support
- **Tailwind CSS**: Utility-first approach with @apply directives and CSS variable integration
- **Component Architecture**: Modular React components with proper separation of concerns

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0.0 or higher (as specified in package.json engines)
- npm or yarn
- Modern browser with ES2017+ support

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

The application will be available at `http://localhost:3000`

### Key Components

#### `useMedalData` Hook
- Handles API calls with caching
- Manages loading and error states
- Prevents re-fetching on sort changes
- Includes retry functionality

#### `MedalTable` Component
- Dynamic sorting with tiebreaking logic
- Responsive table design
- Flag integration for each country
- Interactive column headers

#### URL Parameter Handling
- Next.js `useSearchParams` hook for reading URL parameters
- Next.js `useRouter` for updating URLs without page refresh
- Parameter validation with fallback to default sorting
- Seamless integration with browser back/forward navigation

#### Error Handling
- Network error detection
- User-friendly error messages
- Retry mechanism with visual feedback
- Console logging for debugging

## Sorting Logic

The medal table implements Olympic-standard sorting with proper tiebreaking rules:

### URL Parameter Support
Access different sorts directly via URL:
- `http://localhost:3000` - Default (gold sorting)
- `http://localhost:3000?sort=gold` - Sort by gold medals
- `http://localhost:3000?sort=silver` - Sort by silver medals
- `http://localhost:3000?sort=bronze` - Sort by bronze medals
- `http://localhost:3000?sort=total` - Sort by total medals

## Development Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting (ESLint + Next.js rules)
npm run lint

# TypeScript type checking
npm run type-check
```

## Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Responsive table layout
- **Desktop Experience**: Full-featured desktop interface
- **Touch Friendly**: Large interactive elements

## Pending Work & Improvements

### Critical Bug Fixes
Currently **12 out of 68 test cases are failing**. Priority fixes needed:

#### Test Failures to Address
- **Component Integration Tests**: Fix component interaction edge cases
- **API Route Tests**: Resolve mock Response object issues in test environment
- **Theme Context Tests**: Fix localStorage mocking and state persistence
- **Hook Tests**: Address async state management test flakiness

**Estimated Time**: 4-6 hours
```bash
# Run tests to identify specific failures
npm test -- --verbose --no-coverage
```

### Design Compliance
- [ ] **Exact Design Match**: Align with provided design mockups from PDF requirements
- [ ] **Color Scheme**: Implement official Olympic color palette
- [ ] **Typography**: Use specified fonts and sizing from design specs
- [ ] **Spacing & Layout**: Match exact spacing, padding, and alignment specifications

**Estimated Time**: 3-4 hours

### Enhanced Testing Strategy

#### End-to-End Testing with Cypress
```bash
# Install Cypress
npm install --save-dev cypress @cypress/react @cypress/webpack-dev-server

# Setup E2E tests
mkdir cypress/e2e
```

**Test Coverage Needed**:
- [ ] **User Journey Tests**: Complete sorting workflow from landing to results
- [ ] **URL Parameter Tests**: Direct navigation with different sort parameters
- [ ] **Error State Tests**: API failure scenarios and recovery
- [ ] **Responsive Tests**: Cross-device functionality validation
- [ ] **Theme Toggle Tests**: Dark/light mode persistence across sessions

**Estimated Time**: 8-10 hours

#### Behavioral Testing (BDD)
```bash
# Install Cucumber for behavior-driven development
npm install --save-dev @cucumber/cucumber @cucumber/webpack
```

**Feature Files Needed**:
- [ ] **Sorting Behavior**: Gherkin scenarios for all sort combinations
- [ ] **Tiebreaker Logic**: Complex ranking scenarios validation
- [ ] **Error Handling**: User-friendly error message validation
- [ ] **Accessibility**: Screen reader and keyboard navigation flows

**Estimated Time**: 6-8 hours

### Performance Optimizations

#### Core Web Vitals Improvements
- [ ] **Code Splitting**: Implement dynamic imports for non-critical components
- [ ] **Image Optimization**: Optimize flag sprite and implement lazy loading
- [ ] **Bundle Analysis**: Reduce bundle size using webpack-bundle-analyzer
- [ ] **Caching Strategy**: Implement proper HTTP caching headers

```bash
# Bundle analysis
npm install --save-dev webpack-bundle-analyzer
npm run build && npx webpack-bundle-analyzer .next/static/chunks/*.js
```

**Estimated Time**: 4-6 hours

#### Data Loading Optimizations
- [ ] **Parallel Data Loading**: Implement React 18 Suspense boundaries
- [ ] **Optimistic Updates**: Show loading states with skeleton screens
- [ ] **Error Boundaries**: Graceful error handling with retry mechanisms
- [ ] **Memory Management**: Prevent memory leaks in sorting operations

**Estimated Time**: 3-4 hours

### Accessibility Enhancements

#### WCAG 2.1 AA Compliance
- [ ] **Screen Reader Support**: Comprehensive ARIA labels and descriptions
- [ ] **Keyboard Navigation**: Full keyboard accessibility for all interactions
- [ ] **Color Contrast**: Ensure 4.5:1 contrast ratio compliance
- [ ] **Focus Management**: Visible focus indicators and logical tab order
- [ ] **Alternative Text**: Comprehensive alt text for all flag images

**Estimated Time**: 5-7 hours

#### Testing Tools Integration
```bash
# Install accessibility testing tools
npm install --save-dev @axe-core/react axe-playwright
```

### Production Readiness

#### DevOps & Deployment
- [ ] **CI/CD Pipeline**: GitHub Actions for automated testing and deployment
- [ ] **Docker Configuration**: Containerization for consistent deployments
- [ ] **Environment Configuration**: Proper env variable management
- [ ] **Monitoring**: Error tracking with Sentry integration
- [ ] **Analytics**: User behavior tracking implementation

**Estimated Time**: 8-10 hours

#### Security Enhancements
- [ ] **Content Security Policy**: Implement strict CSP headers
- [ ] **Input Validation**: Sanitize URL parameters and API responses
- [ ] **Rate Limiting**: Implement API rate limiting protection
- [ ] **Security Headers**: HTTPS, HSTS, and other security headers

**Estimated Time**: 3-4 hours

### Code Quality Improvements

#### Documentation
- [ ] **API Documentation**: Complete JSDoc comments for all functions
- [ ] **Component Documentation**: Storybook integration for component library
- [ ] **Architecture Documentation**: Technical design document
- [ ] **Deployment Guide**: Step-by-step production deployment instructions

**Estimated Time**: 4-5 hours

#### Advanced TypeScript
- [ ] **Strict Type Safety**: Enable strict mode and resolve all type issues
- [ ] **Generic Components**: Implement reusable generic component patterns
- [ ] **Type Guards**: Runtime type validation for API responses
- [ ] **Utility Types**: Create custom utility types for better type safety

**Estimated Time**: 3-4 hours

### Feature Enhancements

#### Advanced Functionality
- [ ] **Search & Filter**: Country name search functionality
- [ ] **Medal History**: Historical medal data comparison
- [ ] **Export Features**: CSV/PDF export of medal standings
- [ ] **Offline Support**: Progressive Web App (PWA) capabilities
- [ ] **Real-time Updates**: WebSocket integration for live medal updates

**Estimated Time**: 15-20 hours

#### Internationalization
- [ ] **Multi-language Support**: i18n implementation for global users
- [ ] **RTL Support**: Right-to-left language compatibility
- [ ] **Number Formatting**: Locale-specific number formatting
- [ ] **Date Formatting**: Regional date and time formatting

**Estimated Time**: 8-10 hours

### Priority Order
1. **Fix failing tests** (Critical - 4-6 hours)
2. **Design compliance** (High - 3-4 hours)  
3. **E2E testing setup** (High - 8-10 hours)
4. **Performance optimizations** (Medium - 4-6 hours)
5. **Accessibility enhancements** (Medium - 5-7 hours)
6. **Production readiness** (Medium - 8-10 hours)

**Total Estimated Time**: 32-43 hours for complete implementation

### Quick Wins (Next 2-3 hours)
- Fix the 12 failing test cases
- Implement exact design compliance
- Add comprehensive error boundaries
- Optimize bundle size with code splitting
