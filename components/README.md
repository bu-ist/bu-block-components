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

This library includes the following components:

- **PostChooser**: A modal interface for searching and selecting WordPress posts and pages
- **LoadingSpinner**: An animated loading indicator with fade transitions


Each component has its own README.md file with detailed documentation on props, usage examples, and implementation details.

## Development Guidelines

When creating or modifying components:

1. Focus on reusability - components should work across different block contexts
2. Maintain proper PropTypes and default props
3. Follow WordPress coding standards
4. Ensure accessibility compliance
5. Include thorough documentation in component README files
6. Consider backwards compatibility when making changes

## Integration with Block Imports

These components are part of the block-imports library and are designed to work seamlessly with other utilities in this package, such as the data fetching hooks and block registration

