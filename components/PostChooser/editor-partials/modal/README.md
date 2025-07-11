# PostChooserModal

## Overview

The `PostChooserModal` component serves as the main container for the post selection interface. It provides a modal dialog where users can search for and select posts from the WordPress database.

## Features

- Search interface for finding posts
- Support for different search types (recent, content, slug, ID)
- Sorting controls for search results
- Customizable post type support

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClose` | Function | Required | Function to call when the modal is closed |
| `onSelectPost` | Function | Required | Function to call when a post is selected |
| `label` | String | - | Label for the search field |
| `postTypes` | Array | `['posts', 'pages']` | Array of post types to search |
| `placeholder` | String | "Enter a search term…" | Placeholder text for the search field |
| `title` | String | "Choose a Post" | Title of the modal |

## Usage

```jsx
import { PostChooserModal } from '@components/PostChooser/editor-partials/modal';

const MyComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePostSelect = (post) => {
    console.log('Selected post:', post);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Choose a Post</Button>

      {isModalOpen && (
        <PostChooserModal
          onClose={() => setIsModalOpen(false)}
          onSelectPost={handlePostSelect}
          postTypes={['posts', 'pages']}
          title="Select Content"
        />
      )}
    </>
  );
};
```

## Internal Components

The `PostChooserModal` coordinates the following sub-components:
- `SearchUI`: Provides the search input interface
- `ResultsControls`: Provides sorting and filtering options
- `Results`: Displays the search results
