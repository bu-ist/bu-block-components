# Components

## Overview

This directory contains a collection of reusable React components designed specifically for WordPress Gutenberg blocks. These components can be imported and used in both themes and plugins to maintain consistency, reduce code duplication, and accelerate block development.

## Purpose

The components in this library are built to:

- Provide consistent UI elements across blocks
- Handle common functionality needed in block editors
- Follow WordPress design patterns and accessibility guidelines
- Reduce development time through reusable code

## Usage

Components can be imported into your block files:

```jsx
import { PostChooser } from '@bostonuniversity/block-imports/components';

// Use in your block edit function
export function Edit({ attributes, setAttributes }) {
  return (
    <div>
      <PostChooser
        onSelectPost={(post) => setAttributes({ selectedPost: post.id })}
      />
    </div>
  );
}
```

## Available Components

Each component has its own README.md file with detailed documentation on props, usage examples, and implementation details.

## Development Guidelines

When creating or modifying components:

1. Focus on reusability - components should work across different block contexts
2. Maintain proper PropTypes and default props
3. Follow WordPress coding standards
4. Ensure accessibility compliance
5. Include thorough documentation in component README files
6. Consider backwards compatibility when making changes

You should create React components whenever you have a piece of UI that is self-contained, has its own logic, or needs to be reused across different parts of your application. Key indicators it is time to create a new component include: 

*   **Reusability:** The most common reason. If a part of your UI, such as a Button, Avatar, or NavigationBar, is used in multiple places, extracting it into a component avoids repeating code (the "Don't Repeat Yourself" or DRY principle).
    
*   **Complexity Management:** Break down large, complex components into smaller, simpler ones. This improves readability, makes the code easier to understand and maintain, and simplifies unit testing.
    
*   **Single Responsibility:** Adhere to the single-responsibility principle: each component should ideally do one thing and one thing only. If a component is handling too many responsibilities, receiving too many props, or managing too much state, it's a good candidate for being broken down.
    
*   **Logical Grouping:** If different parts of a component's UI or logic don't inherently belong together, separate them. This helps in creating logical "chunks" of your application.
    
*   **Independent State:** If a section of the UI needs its own local state that doesn't affect other parts of a larger component, you can create a new component to manage that state in isolation.
    
*   **Organization and Structure:** Even if a component is only used once (e.g., a Sidebar or a complete Page), creating a separate file and component for it can improve project organization and structure, as suggested in the [React documentation](https://react.dev/learn/your-first-component). 
    

In general, start with relatively large components and break them down as necessary (refactoring) to find the right balance for your specific project.

## Integration with Block Imports

These components are part of the block-imports library and are designed to work seamlessly with other utilities in this package, such as the data fetching hooks and block registration

