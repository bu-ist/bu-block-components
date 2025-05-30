# WordPress Block: urd-post-meta

## Display a post and its meta information by post ID

### Overview

The "urd-post-meta" block is a testing/demonstration block designed to showcase the functionality of the `useRequestData` hook from the `@bostonuniversity/block-imports` package. This block allows users to fetch and display data from WordPress posts of a custom post type called 'import-bob' by specifying a post ID. It retrieves the post data including its title and all associated meta information, then displays them in a structured format.

## Key Features

1. **Post Data Fetching**: Uses the `useRequestData` hook to get a post by its ID
2. **Meta Data Display**: Automatically extracts and displays all meta fields associated with the post
3. **Loading States**: Implements a `LoadingSpinner` component to indicate when data is being loaded
4. **User Input**: Provides inspector controls for entering a post ID

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
// Fetch post data by ID
const [ data, isLoading, invalidateRequest ] = useRequestData(
    'postType',
    'import-bob',
    postID,
);
```

The hook call returns:

- `data`: The fetched post data including title and meta information
- `isLoading`: A boolean indicating if data is being loaded
- `invalidateRequest`: A function to invalidate the current request (refresh the data)

#### 3. User Interface

The block provides:

- Inspector controls to input a post ID
- Display of the post title
- Display of all meta fields associated with the post
- Loading spinner during data fetching
- Prompt message when no post ID is entered

### Example Usage

#### Editor Interface

When added to a post, the block shows:

1. A text field in the sidebar to enter a post ID
2. If no post ID is entered: A message prompting the user to enter a post ID
3. If a post ID is entered:
   - A loading spinner while post data is being fetched
   - The post title when loaded
   - A list of all meta fields and their values when loaded

#### Code Example

Here's how you might use the `useRequestData` hook in a similar way:

```javascript
// Import the hook
import { useRequestData, LoadingSpinner } from '@bostonuniversity/block-imports';

// In your component
function MyComponent() {
    // Define the post ID (could come from attributes)
    const postID = '1234';

    // Fetch the post data
    const [data, isLoading, invalidateRequest] = useRequestData(
        'postType',      // The type of request
        'post',          // The post type
        postID           // The post ID to fetch
    );

    // Render based on the data state
    return (
        <div>
            {isLoading && <LoadingSpinner text="Loading" />}

            {data && (
                <>
                    <h2>{data.title.rendered}</h2>
                    <div className="post-meta">
                        <strong>Meta:</strong>
                        {data.meta && Object.keys(data.meta).length > 0 ? (
                            <ul>
                                {Object.entries(data.meta).map(([key, value]) => (
                                    <li key={key}>
                                        <strong>{key}:</strong> {value}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No meta data available</p>
                        )}
                    </div>
                </>
            )}

            {!postID && (
                <strong>Enter a post ID to display its data</strong>
            )}
        </div>
    );
}
```

## Technical Details

1. **Dynamic Rendering**: The block uses a minimal `save` function, suggesting it relies on server-side rendering or JavaScript for the frontend display.

2. **Data Flow**:
   - User enters a post ID in the inspector controls
   - The `useRequestData` hook fetches the post data including meta information
   - The UI updates to display the post title and meta fields

3. **Error Handling**: The block checks for the existence of data before attempting to render it, preventing errors when data is not available.

4. **Custom Post Type**: The block is specifically designed to work with posts of type 'import-bob', but the pattern can be adapted for any post type.
