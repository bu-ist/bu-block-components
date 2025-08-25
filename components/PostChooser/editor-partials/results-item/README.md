# ResultsItem

## Overview

The `ResultsItem` component renders an individual post in the search results list. It displays post details and provides a selection button.

## Features

- Displays post title, modification date, and status
- Provides a "View Post" link when the post URL is available
- Provides a "Select" button for choosing the post
- Styled with hover effects for better user experience

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `post` | Object | Required | WordPress post object with title, modified date, status, and type |
| `onSelectPost` | Function | Required | Function to call when the post is selected |
| `placeholder` | Boolean | false | If true, renders a placeholder element without any content but has the ResultItem's shape to indicate data will be loaded in it's place. |


## Implementation Details

- Uses WordPress `Button` component for the select action
- Provides an "View Post" external link to the post on the site when post.link is available
- Uses WordPress `dateI18n` for proper localized date formatting
- Renders HTML-encoded titles with proper escaping (`post.title.rendered`) using WordPress `decodeEntities`
- Displays post status information
- Styled with CSS Grid for responsive layout
