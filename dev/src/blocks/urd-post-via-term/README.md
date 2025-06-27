# WordPress Block: urd-post-via-term

## Display a list of posts via term slug

### Overview

The "urd-post-via-term" block is a testing/demonstration block designed to showcase the functionality of the `useRequestData` hook from the `@bostonuniversity/block-imports` package. This block allows users to fetch and display data from WordPress posts of a custom post type called 'import-bob' by specifying a term slug. It demonstrates a two-step data fetching process: first retrieving a term object, then using that term's ID to fetch related posts.

## Key Features

1. **Two-Step Data Fetching**: Uses the `useRequestData` hook twice - first to get a term by slug, then to get posts by term ID
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

The core functionality is in the Edit component, which uses the `useRequestData` hook twice:

```javascript
// First call: Get term by slug
const [termData, isLoadingTerm, invalidateTermRequest] = useRequestData(
    'term',
    'category', // taxonomy
    termSlug    // term slug to fetch
);

// Second call: Get posts by term ID (only if term data is available)
const [postsData, isLoadingPosts, invalidatePostsRequest] = useRequestData(
    'postsByTerm',
    'import-bob',  // post type
    termData?.id   // term ID from the first request
);
```

Each hook call returns:

- `data`: The fetched data (term or posts)
- `isLoading`: A boolean indicating if data is being loaded
- `invalidateRequest`: A function to refresh the data

#### 3. Media Handling with useMedia

The block also demonstrates fetching media (featured images) using the `useMedia` hook:

```javascript
const { media, isResolvingMedia, hasResolvedMedia } = useMedia(imageID);
```

#### 4. User Interface

The block provides:

- Inspector controls to input a term slug
- Display of posts related to the specified term
- Display of featured images for posts
- A "Refresh list" button to reload data
- Loading spinners during data fetching

### Example Usage

#### Editor Interface

When added to a post, the block shows:

1. A text field in the sidebar to enter a term slug
2. If no term slug is entered: A message prompting the user to enter a slug
3. If a term slug is entered:
   - A loading spinner while term data is being fetched
   - Another loading spinner while posts data is being fetched
   - The posts' titles and excerpts when loaded
   - Featured images for posts (with their own loading states)
   - A refresh button

#### Code Example

Here's how you might use the `useRequestData` hook in a similar two-step process:

```javascript
// Import the hook
import { useRequestData } from '@bostonuniversity/block-imports';

// In your component
function MyComponent() {
    // Define the term slug (could come from attributes)
    const termSlug = 'news';

    // First request: Get the term data
    const [termData, isLoadingTerm, invalidateTermRequest] = useRequestData(
        'term',      // The type of request
        'category',  // The taxonomy
        termSlug     // The term slug to fetch
    );

    // Second request: Get posts by term ID (only if term data is available)
    const [postsData, isLoadingPosts, invalidatePostsRequest] = useRequestData(
        'postsByTerm',  // The type of request
        'post',         // The post type to fetch
        termData?.id    // The term ID from the first request
    );

    // Render based on the data state
    return (
        <div>
            {(isLoadingTerm || isLoadingPosts) && <p>Loading...</p>}

            {postsData && postsData.length > 0 && (
                <>
                    <h2>Posts in {termData.name}</h2>
                    <ul>
                        {postsData.map(post => (
                            <li key={post.id}>
                                <h3>{post.title.rendered}</h3>
                                <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => {
                        invalidateTermRequest();
                        invalidatePostsRequest();
                    }}>Refresh</button>
                </>
            )}
        </div>
    );
}
```

## Technical Details

1. **Dynamic Rendering**: The block uses a minimal `save` function, suggesting it relies on server-side rendering or JavaScript for the frontend display.

2. **Data Flow**:
   - User enters a term slug in the inspector controls
   - First `useRequestData` call fetches the term data
   - Once term data is available, second `useRequestData` call fetches posts using the term ID
   - If posts have featured images, `useMedia` fetches the image data
   - The UI updates to display the fetched posts

3. **Error Handling**: The block checks for the existence of data before attempting to render it, preventing errors when data is not available.
