# Pagination

![Pagination component screenshot](BU_Components_Pagination.jpeg)


![Pagination component recording](BU_Pagination_screenrecording.gif)

## Status: BETA

A customizable pagination component that provides navigation controls for data that spans multiple pages. This component works well with the `useGetPagination` hook to handle fetching pagination information for WordPress data.

## Features

- First/Last page buttons (optional)
- Previous/Next navigation with customizable labels
- Page number display with smart ellipsis behavior
- "Page X of Y" information display (optional)
- Jump-to-page input field (optional)
- Fully customizable display options
- Smart pagination number display that shows ellipses for large page ranges
- Accessible navigation controls with proper button labels and ARIA attributes
- SVG icons from the Noun Project
- Configurable inline style margins - margin styles can be passed as props to avoid having to write additional CSS


## Layout Options
![Pagination component screenshot](BU_Pagination_Layout_Options.png)

This screenshot shows 6 different ways to customize the layout of the Pagination component.

## Usage

```jsx
import { Pagination } from '@bostonuniversity/block-components';
import { useState } from '@wordpress/element';

const MyComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Total number of pages available

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onChange={(newPage) => setCurrentPage(newPage)}
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | Number | `1` | The currently active page |
| `totalPages` | Number | `1` | Total number of pages available |
| `onChange` | Function | `() => {}` | Callback function triggered when page changes |
| `showPageInfo` | Boolean | `false` | Whether to show the current page and total pages text (e.g., "Page 1 of 10") |
| `showFirstLastButtons` | Boolean | `false` | Whether to show first/last page buttons |
| `showPrevNextButtons` | Boolean | `true` | Whether to show previous/next buttons |
| `showPageNumbers` | Boolean | `false` | Whether to show numbered page buttons |
| `showMaxPageNumbers` | Number | `5` | Maximum number of page numbers to display before using ellipsis |
| `prevLabel` | String | `"Back"` | Label for the previous page button |
| `nextLabel` | String | `"Next"` | Label for the next page button |
| `showJumpToPage` | Boolean | `false` | Whether to show a text input for jumping to a specific page |
| `margin` | Object | `{ marginBlock: '1em', marginInline: 0 }` | Custom margin settings with optional `marginBlock` and `marginInline` properties |
| `className` | String | `''` | Additional CSS class to apply to the pagination component |

## Examples

### Basic Pagination (Previous/Next only)

```jsx
<Pagination
  currentPage={1}
  totalPages={5}
  onChange={(page) => console.log(`Navigated to page ${page}`)}
/>
```

### Complete Pagination (All features enabled)

```jsx
<Pagination
  currentPage={3}
  totalPages={10}
  onChange={(page) => console.log(`Navigated to page ${page}`)}
  showFirstLastButtons={true}
  showPageNumbers={true}
  showPageInfo={true}
  showJumpToPage={true}
/>
```

### Pagination with Page Numbers and Ellipsis

```jsx
<Pagination
  currentPage={5}
  totalPages={20}
  onChange={(page) => console.log(`Navigated to page ${page}`)}
  showPageNumbers={true}
  showMaxPageNumbers={5}
/>
```

### With Custom Navigation Labels

```jsx
<Pagination
  currentPage={3}
  totalPages={10}
  onChange={(page) => console.log(`Navigated to page ${page}`)}
  prevLabel="Previous"
  nextLabel="Forward"
/>
```

### With Jump-to-Page Input

```jsx
<Pagination
  currentPage={3}
  totalPages={10}
  onChange={(page) => console.log(`Jumped to page ${page}`)}
  showJumpToPage={true}
/>
```

### With Custom Margins

```jsx
<Pagination
  currentPage={1}
  totalPages={5}
  onChange={(page) => console.log(`Navigated to page ${page}`)}
  margin={{
    marginBlock: '2rem',
    marginInline: '1rem'
  }}
/>
```

### Combined with useGetPagination and useRequestData

```jsx
import { Pagination } from '@bostonuniversity/block-components';
import { useGetPagination, useRequestData } from '@bostonuniversity/block-imports';
import { useState } from '@wordpress/element';

const PostList = () => {
  const [page, setPage] = useState(1);

  // Get pagination information
  const { pagination } = useGetPagination('postType', 'post', {
    per_page: 10,
    status: 'publish'
  });

  // Get posts for current page
  const [posts, isLoading] = useRequestData('postType', 'post', {
    per_page: 10,
    page: page,
    status: 'publish'
  });

  return (
    <div>
      {isLoading ? (
        <p>Loading posts...</p>
      ) : (
        <>
          {/* Display posts here */}
          {posts && posts.map(post => (
            <div key={post.id}>{post.title.rendered}</div>
          ))}

          {pagination.totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={pagination.totalPages}
              onChange={setPage}
              showJumpToPage={true}
              margin={{ marginBlock: '1.5rem' }}
            />
          )}
        </>
      )}
    </div>
  );
};
```
