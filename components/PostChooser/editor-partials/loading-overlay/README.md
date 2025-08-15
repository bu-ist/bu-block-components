# Loading Overlay

## Overview

The `LoadingOverlay` component provides visual feedback when content is being loaded or processed in the PostChooser interface. It consists of two main elements:

1. `LoadingOverlay`: A semi-transparent overlay that covers the entire results area
2. `LoadingSpinner`: A centered spinner animation that indicates loading activity

## Features

- Smooth fade in/out animations with CSS transitions
- Backdrop blur effect for enhanced visual experience
- Non-blocking overlay (doesn't prevent interaction with underlying elements)
- Automatic handling of visibility states based on loading prop

## Components

### LoadingOverlay

Creates a semi-transparent backdrop that indicates the loading state.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | Boolean | `false` | Controls whether the overlay is visible |

### LoadingSpinner

Displays a centered spinning animation using the BU Loading Spinner component.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | Boolean | `false` | Controls whether the spinner is visible |

## Usage

```jsx
import { LoadingOverlay, LoadingSpinner } from './loading-overlay';

// In your component:
const YourComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Set loading state when needed
  const handleSomeAction = async () => {
    setIsLoading(true);
    // Do some async work...
    await someAsyncOperation();
    setIsLoading(false);
  };

  return (
    <div className="your-component">
      {/* Your content here */}
      <LoadingOverlay loading={isLoading} />
      <LoadingSpinner loading={isLoading} />
    </div>
  );
};
```

## Implementation Notes

- Uses React's `useState` and `useEffect` hooks to manage visibility states
- Applies a 300ms delay when hiding elements to allow for smooth fade-out animation
- Styled with SCSS for consistent appearance across the application
- Z-index management ensures proper layering with other UI elements
