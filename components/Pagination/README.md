# Pagination

![Pagination component screenshot](BU_Components_Pagination.jpeg)


![Pagination component recording](BU_Pagination_screenrecording.gif)

## Status: BETA

A customizable pagination component that provides navigation controls for data that spans multiple pages. This component works well with the `useRequestDataWithPagination` hook to handle fetching and navigating through paginated data.

## Features

- First/Last page buttons
- Previous/Next navigation
- Page number display
- Fully customizable display options
- Accessible navigation controls with proper button labels
- Icons from the Noun Project

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
| `currentPage` | Number | Required | The currently active page |
| `totalPages` | Number | Required | Total number of pages available |
| `onChange` | Function | Required | Callback function triggered when page changes |
| `showPageNumbers` | Boolean | `true` | Whether to show the current page and total pages |
| `showFirstLastButtons` | Boolean | `true` | Whether to show first/last page buttons |
| `showPrevNextButtons` | Boolean | `true` | Whether to show previous/next buttons |

## Examples

### Basic Pagination

```jsx
<Pagination
  currentPage={1}
  totalPages={5}
  onChange={(page) => console.log(`Navigated to page ${page}`)}
/>
```

### Minimal Pagination (Only Previous/Next)

```jsx
<Pagination
  currentPage={1}
  totalPages={5}
  onChange={(page) => console.log(`Navigated to page ${page}`)}
  showFirstLastButtons={false}
  showPageNumbers={false}
/>
```

### Combined with useRequestDataWithPagination

```jsx
import { Pagination } from '@bostonuniversity/block-components';
import { useRequestDataWithPagination } from '@bostonuniversity/block-imports';
import { useState } from '@wordpress/element';

const PostList = () => {
  const [page, setPage] = useState(1);

  const {
    records: posts,
    isLoading,
    pagination: { totalItems, totalPages }
  } = useRequestDataWithPagination('postType', 'post', {
    per_page: 10,
    page: page,
    status: 'publish'
  });

  return (
    <div>
      {/* Display posts here */}
      {posts && posts.map(post => (
        <div key={post.id}>{post.title.rendered}</div>
      ))}

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onChange={setPage}
        />
      )}
    </div>
