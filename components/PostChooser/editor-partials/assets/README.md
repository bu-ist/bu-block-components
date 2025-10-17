# Icon Assets

## Overview

This directory contains SVG icons and related assets used by the PostChooser component's search, filtering, and sorting interfaces.

## Contents

### icons.mjs

Exports a collection of SVG icons used throughout the PostChooser interface, including sort controls and search type indicators.

#### Exported Icons

- `IconSortMenu`: Icon for the sort dropdown toggle button
- `IconPostChooserTextSearch`: Icon for text content search option
- `IconPostChooserRecentlyUpdated`: Icon for recently updated posts filter
- `IconPostChooserSlugSearch`: Icon for searching by post slug
- `IconPostChooserId`: Icon for searching by post ID

#### Usage

```jsx
import {
  IconSortMenu,
  IconPostChooserTextSearch,
  IconPostChooserRecentlyUpdated,
  IconPostChooserSlugSearch,
  IconPostChooserId
} from './assets/icons.mjs';

// Use with WordPress components
<Button icon={IconSortMenu} />

// Use directly in JSX
{IconPostChooserRecentlyUpdated}

// Use with Radio components
<Radio
  value="recent"
  icon={IconPostChooserRecentlyUpdated}
  iconPosition="right"
>
  Recently Updated
</Radio>
```

## Implementation Details

All icons are implemented using WordPress's native SVG components from `@wordpress/primitives` and wrapped with the `Icon` component from `@wordpress/components`. This ensures compatibility with WordPress styling and accessibility standards.

Each icon is defined with:
- Clean SVG paths
- Proper viewBox attributes
- Consistent 24×24 size


