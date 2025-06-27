# WordPress Block: urd-post-terms

## Display a list of terms associated with a post

### Overview

The "urd-post-terms" block is a testing/demonstration block designed to showcase the functionality of the `useRequestData` hook from the `@bostonuniversity/block-imports` package. This block allows users to fetch and display data from WordPress posts of a custom post type called 'import-bob' by specifying a post ID. It demonstrates a two-step data fetching process: first retrieving a post object, then using that post's ID to fetch that post's terms in the 'fish' taxonomy.

## Key Features

1. **Two-Step Data Fetching**: Uses the `useRequestData` hook twice - first to get a term by slug, then to get posts by term ID
2. **Media Handling**: Demonstrates the `useMedia` hook to fetch and display featured images
3. **Loading States**: Implements a `LoadingSpinner` component to indicate when data is being loaded

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
// First call: Get post by ID
 const [ postData, postIsLoading ] = useRequestData(
  'postType',
  'import-bob',
  postID
 );

 // Second call: Query for fish terms if we have post data
 const [ fishTerms, termsIsLoading ] = useRequestData(
  postData ? 'taxonomy' : undefined,
  'fish',
  postData ? { post: postID } : undefined
 );
```

Each hook call returns:

- `data`: The fetched data (post or terms)
- `isLoading`: A boolean indicating if data is being loaded

#### 3. User Interface

The block provides:

- Inspector controls to input a post ID
- Display of posts related to the specified term
- Display of featured images for posts
- Loading spinners during data fetching

### Example Usage

#### Editor Interface

When added to a post, the block shows:

1. A text field in the sidebar to enter a post ID
2. If no post ID is entered: A message prompting the user to enter a slug
3. If a post ID is entered:
   - A loading spinner while post data is being fetched
   - Another loading spinner while term data is being fetched
   - A list of post's term names when loaded

#### Code Example

Here's how you might use the `useRequestData` hook in a similar two-step process:

```javascript
// Import the hook
import { useRequestData } from '@bostonuniversity/block-imports';

// In your component
function MyComponent() {
    // Define the post ID (could come from attributes)
    const postID = '1234';

    // First request: Get the term data
    const [postData, isLoadingPost, invalidatePostRequest] = useRequestData(
        'postType',      // The type of request
        'post',  // The post type
        postID     // The post ID to fetch
    );

    // Second request: Get termss by post ID (only if post data is available)
    const [termsData, isLoadingTerms, invalidateTermsRequest] = useRequestData(
        'taxonomy',  // The type of request
        'category',         // The post type to fetch
        postData? { post: postID }    // The term ID from the first request
    );

    // Render based on the data state
    return (
        <div>
            {(isLoadingPost || isLoadingTerms) &&) && <p>Loading...</p>}

            {termsData && termsData.length > 0 && (
                <>
                    <h2>Terms in {postData.title.rendered}</h2>
                    <ul>
                        {termsData.map(term => (
                            <li key={term.slug}>
                                {term.name}
                            </li>
                        ))}
                    </ul>
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
