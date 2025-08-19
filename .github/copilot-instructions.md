# BU Block Imports Development Guide

## Project Overview
BU Block Imports is a library of standardized React components, hooks, and utilities for WordPress blocks. The library is designed to be imported into other WordPress themes or plugins for consistent UI elements and data handling patterns.

## Key Architectural Principles

### Component Structure
- Components use PascalCase naming without BU namespace (e.g., `LoadingSpinner`)
- Export using `.mjs` extension to properly support ES modules
- Each component has its own directory with:
  - `index.mjs`: Entry point that exports the component
  - Component implementation files
  - `README.md`: Documentation on usage
  - `editor.scss`: Component styles

Example: `/components/Pagination/index.mjs` exports the Pagination component

### Hook Structure
- Hooks use camelCase naming without BU namespace (e.g., `useRequestData`)
- Export using `.mjs` extension
- Each hook has its own directory with documentation

Example: `/hooks/useRequestData/index.mjs` is used for fetching data from WordPress REST API

### Export Pattern
Components and hooks are selectively exported in the main `index.js` file. When implementing a new component or hook, add it there to make it available for consumers.

## Development Workflow

### Local Development
```bash
# Start development build with watch mode
cd dev && npm run start

# Start WordPress environment for testing
cd dev && npm run env-start

# Access WordPress CLI within environment
cd dev && npm run env-wp
```

### Component Development
1. Create new component in `/components/YourComponent/`
2. Export from `/components/YourComponent/index.mjs`
3. Add to main `index.js` exports
4. Document with README.md

### Testing
Test components within the dev environment:
1. Reference your component in a dev block in `/dev/src/blocks/`
2. Build and test in the WordPress environment with `npm run env-start`

## Key Integration Patterns

### WordPress Data Integration
- Use `useRequestData` hook for fetching from WordPress REST API
- Use `useGetPagination` hook for pagination with WordPress data
- Components should accept standard WordPress data structures as props

Example from PostChooser:
```javascript
const [data, isLoading] = useRequestData('postType', selectedPostType, query);
```

### Component Communication
- Props down, events up pattern
- Use callback props for parent communication (e.g., `onChange`, `onSelectPost`)
- Avoid global state management unless necessary

## Publishing Process
Publishing occurs automatically via GitHub Actions when creating a new release.
The package is published to NPM with public access.

## Common Patterns

### Loading States
Components handle their own loading states, typically with:
1. Loading prop or state variable
2. Conditional rendering based on loading state
3. Optional LoadingSpinner component integration

### Accessibility
- Use WordPress components (Button, TextControl) that have built-in a11y
- Provide proper ARIA attributes and labels
- Support keyboard navigation

### CSS Conventions
- BEM-style class naming: `bu-components-[component]-[element]`
- Use `editor.scss` for component-specific styles
- Prefer inline styles for margins/padding via props
