# WordPress Block: useRequestData

## Display a post via ID

### Overview

The "useRequestData" block is a testing/demonstration block designed to showcase the functionality of the `useRequestData` hook from the `@bostonuniversity/block-imports` package. This block allows users to fetch and display data from WordPress posts of a custom post type called 'import-bob' by specifying a post ID.

## Key Features

1. **Data Fetching**: Uses the `useRequestData` hook to retrieve post data
2. **Media Handling**: Demonstrates the `useMedia` hook to fetch and display featured images
3. **Loading States**: Implements a `LoadingSpinner` component to indicate when data is being loaded
4. **Data Refresh**: Includes a button to invalidate and refresh the data request

### How the Block Works

#### 1. Block Registration

The block is registered with WordPress using the standard block registration pattern:

```javascript
registerBlockType(metadata.name, {
    edit: Edit,
    save,
});
```

#### 2. Data Fetching with useRequestData

The core functionality is in the Edit component, which uses the `useRequestData` hook:

```javascript
const [data, isLoading, invalidateRequest] = useRequestData(
    'postType',
    'import-bob',
    postID
);
```

This hook returns:

- `data`: The fetched post data
- `isLoading`: A boolean indicating if data is being loaded
- `invalidateRequest`: A function to refresh the data

#### 3. Media Handling with useMedia

The block also demonstrates fetching media (featured images) using the `useMedia` hook:

```javascript
const { media, isResolvingMedia, hasResolvedMedia } = useMedia(imageID);
```

#### 4. User Interface

The block provides:

- Inspector controls to input a post ID
- Display of the post title and excerpt
- Display of the featured image
- A "Refresh list" button to reload data
- Loading spinners during data fetching

### Example Usage

#### Editor Interface

When added to a post, the block shows:

1. A text field in the sidebar to enter a post ID
2. If no post ID is entered: A message prompting the user to enter an ID
3. If a post ID is entered:
   - A loading spinner while data is being fetched
   - The post title and excerpt when loaded
   - The featured image (with its own loading state)
   - A refresh button

#### Code Example

Here's how you might use the `useRequestData` hook in your own block:

```javascript
// Import the hook
import { useRequestData } from '@bostonuniversity/block-imports';

// In your component
function MyComponent() {
    // Define the post ID (could come from attributes)
    const postID = '123';

    // Use the hook to fetch data
    const [data, isLoading, invalidateRequest] = useRequestData(
        'postType',  // The type of request
        'post',      // The post type to fetch
        postID       // The specific post ID
    );

    // Render based on the data state
    return (
        <div>
            {isLoading && <p>Loading...</p>}

            {data && (
                <>
                    <h2>{data.title.rendered}</h2>
                    <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
                    <button onClick={invalidateRequest}>Refresh</button>
                </>
            )}
        </div>
    );
}
```

## Technical Details

1. **Dynamic Rendering**: The block uses a minimal `save` function, suggesting it relies on server-side rendering or JavaScript for the frontend display.

2. **Data Flow**:
   - User enters a post ID in the inspector controls
   - `useRequestData` fetches the post data
   - If the post has a featured image, `useMedia` fetches the image data
   - The UI updates to display the fetched data

3. **Error Handling**: The block checks for the existence of data before attempting to render it, preventing errors when data is not available.
