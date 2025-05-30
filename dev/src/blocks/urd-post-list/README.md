# WordPress Block: urd-post-list

## Display a list of posts using WordPress REST API

### Overview

The "urd-post-list" block is designed to showcase the functionality of the `useRequestData` hook from the `@bostonuniversity/block-imports` package. This block fetches and displays a list of posts from the WordPress REST API, rendering each post with its title, excerpt, and featured image when available. It demonstrates how to use React components to create a dynamic post listing within the WordPress block editor.

## Key Features

1. **Post List Fetching**: Uses the `useRequestData` hook to get a list of posts
2. **Featured Image Display**: Utilizes the `useMedia` hook to fetch and display featured images
3. **Loading States**: Implements a `LoadingSpinner` component to indicate when data is being loaded
4. **Component-Based Architecture**: Uses a separate `ThePost` component to render individual posts
5. **Pagination**: Implements pagination to navigate through multiple pages of posts
6. **Last Page Detection**: Automatically detects when the last page is reached and provides a way to return to the first page
7. **Data Refresh**: Provides a button to load the next page of posts

### How the Block Works

#### 1. Data Fetching with useRequestData

The core functionality is in the Edit component, which uses the `useRequestData` hook to fetch posts:

```javascript
const [data, isLoading, invalidateRequest] = useRequestData(
    'postType',
    'post',
    query
);
```

The hook call returns:

- `data`: An array of post objects
- `isLoading`: A boolean indicating if data is being loaded
- `invalidateRequest`: A function to refresh the data

#### 2. Post Rendering with ThePost Component

Each post is rendered using a separate `ThePost` component:

```javascript
{data && data.length > 0 && (
    data.map((post) => {
        return (
            <ThePost
                post={post}
            />
        )
    })
)}
```

The `ThePost` component handles:

- Displaying the post title
- Showing the post excerpt if available
- Fetching and displaying the featured image using the `useMedia` hook

#### 3. Featured Image Handling

The `ThePost` component uses the `useMedia` hook to fetch and display the featured image:

```javascript
const {media, isResolvingMedia, hasResolvedMedia} = useMedia(post.featured_media);
```

This provides:

- `media`: The media object containing the image URL and metadata
- `isResolvingMedia`: A boolean indicating if the media is being fetched
- `hasResolvedMedia`: A boolean indicating if the media has been successfully fetched

### Example Usage

#### Editor Interface

When added to a post, the block shows:

1. A loading spinner while posts are being fetched
2. A list of posts, each displaying:
   - The featured image (if available)
   - The post title
   - The post excerpt (if available)
3. A "Refresh list" button to load the next page of posts
4. When the last page is reached, a message indicating "You've reached the last page of posts"
5. A "Back to first page" button when not on the first page

#### Code Example

Here's how you might use the `useRequestData` hook in a similar way:

```javascript
// Import the hooks
import { useRequestData, LoadingSpinner } from '@bostonuniversity/block-imports';
import { useState, useEffect } from '@wordpress/element';

// In your component
function MyPostList() {
    // State for pagination
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const perPage = 10;

    // Define query parameters with page state
    const query = {
        per_page: perPage,
        page,
        categories: 5 // Optional: filter by category ID
    };

    // Fetch the posts
    const [posts, isLoading, refreshPosts] = useRequestData(
        'postType',      // The type of request
        'post',          // The post type
        query            // Query parameters
    );

    // Check if we're on the last page (fewer posts than per_page)
    useEffect(() => {
        if (posts && posts.length < perPage && posts.length > 0) {
            setIsLastPage(true);
        } else {
            setIsLastPage(false);
        }
    }, [posts]);

    // Render based on the data state
    return (
        <div className="my-post-list">
            {isLoading && <LoadingSpinner text="Loading posts" />}

            {posts && posts.length > 0 && (
                <div className="posts-container">
                    {posts.map(post => (
                        <div key={post.id} className="post-item">
                            <h3>{post.title.rendered}</h3>
                            {post.excerpt && (
                                <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                            )}
                            <a href={post.link}>Read more</a>
                        </div>
                    ))}

                    {isLastPage ? (
                        <div className="last-page-message">
                            <p>You've reached the last page of posts.</p>
                            {page > 1 && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPage(1);
                                        refreshPosts();
                                    }}
                                >
                                    Back to first page
                                </button>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                setPage(page + 1);
                                refreshPosts();
                            }}
                        >
                            Load Next Page
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
```

## Technical Details

1. **Query Parameters**: The block fetches 15 posts per page by default, but this can be customized.

2. **Data Flow**:
   - The `useRequestData` hook fetches the post data
   - The UI updates to display the loading spinner while fetching
   - Once loaded, posts are mapped to individual `ThePost` components
   - Each `ThePost` component handles its own featured image loading

3. **Styling**: Each post is displayed in a container with a dotted red border, margin, and padding for demonstration purposes.

4. **Media Handling**: The block efficiently handles featured images, showing a loading spinner while the image is being fetched.

5. **Pagination Functionality**:
   - The block includes a "Refresh list" button that increments the page number and loads the next set of posts
   - When the last page is detected (fewer posts than the per_page limit), a message is displayed
   - A "Back to first page" button allows users to return to the first page of posts
   - The block uses React's `useState` and `useEffect` hooks to manage pagination state
