# useRequestData

## Overview

`useRequestData` is a basically a wrapper around `getEntityRecords` (`getEntityRecord` if the query is not an array), with addtional processing that would be standard practice. This reduces the amount of redundant code within a theme.

## Examples

There are a number of examples within the `dev\src\blocks` folder, highliting the flexibility of `useRequestData`:

- `/useRequestData/` - Displays a post title, featured image, and excerpt based on a supplied post ID.
- `/urd-post-list/` - Display a list of posts within a specific post type. This example includes a method for pagination.
- `/urd-post-meta/` - Display the post's meta alongside the title.
- `/urd-post-terms/` - Display a post's terms within a specified taxonomy. This uses `useRequestData` in two separate queries - one to get the post, the second to provide the terms if the previous query was successful.
- `/urd-post-via-term/` - Display a list of posts based on a taxonomy term's slug. This one also requires `useRequestData` to do double work. This time, we need the term id, since we are asking for the slug. The REST API only allows a term id ad an input for the query. The term id can then be used to provide a list of posts.
