# Search UI Assets

## Overview

This directory contains SVG icons and related assets used by the PostChooser component's search and sorting interfaces.

## Contents

### icons.mjs

Exports a collection of SVG icons used for the sort controls in the PostChooser interface.

#### Exported Icons

- `IconSortMenu`: Icon for the sort dropdown toggle button
- `IconSortTitleAscending`: Icon for sorting by title in ascending order
- `IconSortTitleDescending`: Icon for sorting by title in descending order
- `IconSortDateAscending`: Icon for sorting by date in ascending order
- `IconSortDateDescending`: Icon for sorting by date in descending order

#### Usage

```jsx
import {
  IconSortMenu,
  IconSortTitleAscending,
  IconSortTitleDescending,
  IconSortDateAscending,
  IconSortDateDescending
} from './assets/icons.mjs';

// Use with WordPress Icon component
<Icon icon={IconSortMenu} />

// Use directly
{IconSortDateAscending}
```

### SVG Files

The directory also contains original SVG files from The Noun Project:

- `noun-sort-576642.svg`: Generic sort icon
- `noun-a-to-z-72773.svg`: Alphabetical ascending sort icon
- `noun-z-to-a-72788.svg`: Alphabetical descending sort icon
- `noun-ascending-by-time-6967060.svg`: Chronological ascending sort icon
- `noun-descending-by-time-6967061.svg`: Chronological descending sort icon
- `noun-sort-up-3646432.svg`: Upward sort icon
- `noun-sort-down-3646413.svg`: Downward sort icon

## Attribution

Icons used in this component are sourced from [The Noun Project](https://thenounproject.com/) and have been modified to fit the WordPress icon system using the SVG and Path components from `@wordpress/primitives`.
