# Design Guidelines: Geo-Redirect Landing Page

## Design Approach
**System-Based Approach**: Material Design principles with emphasis on clarity and simplicity. This is a utility-focused application where the landing page serves non-redirected users - prioritize clean information delivery over visual complexity.

## Core Design Elements

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Hierarchy**:
  - Hero headline: text-5xl md:text-6xl font-bold
  - Subheading: text-xl md:text-2xl font-normal
  - Body: text-base md:text-lg
  - Small text: text-sm

### Layout System
**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20
- Consistent padding: p-4, p-8, p-12
- Section spacing: py-12 md:py-20
- Component gaps: gap-6, gap-8

### Component Library

**Hero Section** (60vh):
- Centered layout with max-w-4xl container
- Headline + supporting text + single primary CTA
- Clean, uncluttered design without background image (focus on message clarity)

**Information Section**:
- 2-column grid on desktop (lg:grid-cols-2), single column mobile
- Feature cards with subtle borders and minimal padding (p-6)
- Icons from Heroicons (via CDN)

**Footer**:
- Single row with copyright, privacy links, contact email
- py-8 padding, text-sm
- Dark text, light background separator line

### Design Specifications

**Container Widths**:
- Max page width: max-w-7xl
- Text content: max-w-4xl
- Centered with mx-auto

**Component Style**:
- Minimal borders: border border-gray-200
- Subtle shadows: shadow-sm on interactive elements
- Rounded corners: rounded-lg for cards
- Clean button style: px-6 py-3 rounded-md

**Visual Treatment**:
- Flat design with minimal depth
- No gradients or complex backgrounds
- High contrast for readability
- Ample whitespace (don't pack content tightly)

### Page Structure
1. **Hero**: Welcome message explaining the service/content
2. **Features** (if applicable): 2-3 cards explaining benefits or key information
3. **Footer**: Essential links and contact info

### Animations
None required - keep load times minimal for this utility page.

**Key Principle**: This landing page should load instantly and communicate clearly. Users arriving here aren't the primary audience (they weren't redirected), so keep the design professional but streamlined.