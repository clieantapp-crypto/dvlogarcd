# Geo-Redirect Landing Page

## Overview

This is a geo-redirect application that automatically redirects users from specific countries (Kuwait and Jordan) to a configured destination URL while showing a landing page to users from other regions. The application uses IP-based geolocation to determine user location and implements bot detection to allow search engine crawlers through regardless of location.

**Key Features:**
- Geographic IP-based redirects for specific countries
- Search bot detection and allowlist
- Material Design-based landing page using shadcn/ui components
- Express backend with TypeScript
- React frontend with Vite

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Single Page Application (SPA) with wouter for client-side routing

**UI Component System:**
- shadcn/ui component library with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Material Design principles following the design guidelines
- "New York" style variant for shadcn components

**Design Token System:**
- HSL-based color system with CSS variables for theming
- Custom spacing, typography, and elevation system
- Responsive design with mobile-first approach
- Consistent component styling through Tailwind utilities

**State Management:**
- TanStack Query (React Query) for server state management
- Custom query client configuration with controlled refetching behavior
- Simple local state with React hooks

### Backend Architecture

**Server Framework:**
- Express.js for HTTP server
- TypeScript with ES modules
- Development mode uses tsx for hot reloading
- Production build uses esbuild for bundling

**Geo-Redirect Middleware:**
- IP-based geolocation detection (implementation to be added)
- Hardcoded country list: Kuwait (KW) and Jordan (JO)
- User-agent pattern matching for search bot detection
- Redirects matching countries to configured URL (default: google.com)
- Allows search bots through regardless of location

**Request Processing:**
- IP normalization to handle IPv4-mapped IPv6 addresses
- X-Forwarded-For header parsing for proxied requests
- Comprehensive bot detection patterns (Google, Bing, social media crawlers)

**Static File Serving:**
- Production mode serves pre-built React app from dist/public
- Development mode uses Vite middleware for HMR
- SPA fallback routing to index.html

### Database & Data Layer

**ORM and Schema:**
- Drizzle ORM configured for PostgreSQL
- Schema-first approach with TypeScript types
- User table with UUID primary keys
- Zod validation schemas generated from Drizzle schema

**Storage Abstraction:**
- Interface-based storage layer (IStorage)
- In-memory storage implementation (MemStorage) for development
- Designed to be swapped with database-backed storage in production

**Note:** The application is configured for PostgreSQL via Drizzle, but currently uses in-memory storage. Database connection will need to be established for persistence.

### Build & Deployment

**Build Process:**
- Client: Vite builds React app to dist/public
- Server: esbuild bundles server to single dist/index.cjs file
- Selective dependency bundling (allowlist) to reduce cold start times
- Most dependencies externalized to reduce bundle size

**Environment Configuration:**
- `REDIRECT_URL`: Target URL for geo-redirects (default: https://google.com)
- `DATABASE_URL`: PostgreSQL connection string (required but not actively used)
- `NODE_ENV`: development/production mode switching

**Development Workflow:**
- Hot module reloading via Vite
- Concurrent client and server TypeScript compilation
- Express middleware integration with Vite dev server

## External Dependencies

### Core Runtime Dependencies

**Frontend:**
- React & React DOM: UI framework
- wouter: Lightweight client-side routing
- @tanstack/react-query: Server state management
- Tailwind CSS: Utility-first styling framework

**UI Components:**
- @radix-ui/*: Accessible component primitives (dialogs, dropdowns, tooltips, etc.)
- shadcn/ui: Pre-built component library built on Radix
- lucide-react: Icon system
- class-variance-authority: Component variant management
- clsx & tailwind-merge: Conditional class name utilities

**Backend:**
- Express: Web server framework
- Drizzle ORM: Database ORM with PostgreSQL dialect
- Zod: Runtime validation and type inference

**Development Tools:**
- TypeScript: Static type checking
- Vite: Frontend build tool and dev server
- tsx: TypeScript execution for development
- esbuild: Production bundling
- drizzle-kit: Database schema management CLI

### Third-Party Services

**Geolocation:**
- IP geolocation service integration point (implementation pending)
- Currently relies on X-Forwarded-For headers and IP detection

**Database:**
- PostgreSQL database (configured but not actively connected)
- Session storage could use connect-pg-simple (dependency present)

### Configuration Files

- `components.json`: shadcn/ui configuration
- `tailwind.config.ts`: Tailwind styling system
- `drizzle.config.ts`: Database ORM configuration
- `vite.config.ts`: Frontend build configuration
- `tsconfig.json`: TypeScript compiler options