# useRequestDataWithPagination

## Overview

`useRequestDataWithPagination` is a custom hook that extends the functionality of `useRequestData` to handle paginated data requests. It provides a convenient way to fetch and navigate through data that spans multiple pages, reducing boilerplate code typically needed for pagination implementation.

The hook returns an object not an array, so it's important to understand how to destructure the returned data. The hook will return an object with the following properties:

- `data`: The fetched data, which may be an array or an object.
- `isLoading`: A boolean indicating if the data is currently being loaded.
- `invalidateResolver`: A function to invalidate the current data and trigger a refetch.
- `pagination`: An object containing pagination information, including `totalItems` and `totalPages`.

### Destructuring the returned data and renaming properties
When using the hook in your project you can __destructure and rename__ the properties as needed to have unique variable names for each property. This is important for situations where you are using this hook multiple times and need unique variable names for each instance of the hook.

To do so use the name of the property in the object, followed by a colon, and then the name you want to give to the property.

```jsx
const {
	records: myPostSearch,
	isLoading: myPostSearchIsLoading,
	invalidateResolver: myPostSearchInvalidateResolver,
	pagination: myPostSearchPagination
} = useRequestDataWithPagination('postType', 'post', { per_page: 10 });
```

In this example, the `records` property will be assigned to the `myPostSearch` variable, the `isLoading` property will be assigned to the `myPostSearchIsLoading` variable, and so on.


## Usage

```jsx
// Import the hook via the NPM package. (https://www.npmjs.com/package/@bostonuniversity/block-imports)
import { useRequestDataWithPagination } from '@bostonuniversity/block-imports;

// Or Locally in a component in this repo
import { useRequestDataWithPagination } from '../hooks/useRequestDataWithPagination';

// Basic usage
const { records, isLoading, invalidateResolver, pagination } = useRequestDataWithPagination(
  'postType', // entity
  'post',     // kind
  {           // query parameters
    per_page: 10,
    orderby: 'date',
    order: 'desc',
    status: 'publish'
  }
);

// Access pagination information
const { totalItems, totalPages } = pagination;
```


