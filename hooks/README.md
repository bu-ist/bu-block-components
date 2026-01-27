# Hooks

These are React hooks <https://react.dev/reference/react/hooks>, not [WordPress Hooks](https://developer.wordpress.org/plugins/hooks/). They should be camelCase. Each subfolder should contain a readme.md that explains the purpose and usage of the hook.

React Hooks are used in functional components to manage **state**, handle **side effects**, optimize **performance**, and **reuse stateful logic**. They allow developers to use features that were previously only available in class components, leading to cleaner, more modular, and more maintainable code.

The best place to start is to familiarize yourself with [Built-in React Hooks](https://react.dev/reference/react/hooks) and then how to make [Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks#extracting-your-own-custom-hook-from-a-component).

## When to Use Specific Built-in Hooks

*   **useState**: Use useState when you need to add local, reactive state to a functional component. It is ideal for simple state management, such as toggling a value or managing a counter.
    
*   **useEffect**: Use useEffect when your component needs to synchronize with an external system or perform side effects, such as:
    
    *   Fetching data from an API.
        
    *   Setting up or tearing down subscriptions or event listeners.
        
    *   Manually changing the DOM or setting the document title.
        
    *   Always use the cleanup function within useEffect to avoid memory leaks if the effect sets up a subscription or similar resource.
        
*   **useContext**: Use useContext to avoid "prop drilling" (passing props through many nested components). It provides a way to share data like themes, user authentication status, or app-wide settings across the entire component tree.
    
*   **useReducer**: Use useReducer when you have complex state logic that involves multiple sub-values or next state depends on the previous one. It makes the state transitions more predictable and testable.
    
*   **useMemo and useCallback**: Use these performance optimization hooks only when you have identified performance bottlenecks in your application through profiling. They help in caching expensive calculations or function definitions to prevent unnecessary re-renders in performance-sensitive scenarios.
    
*   **useRef**: Use useRef to store mutable values that should persist across renders without causing the component to re-render. It is commonly used to access DOM elements directly or store timeout IDs. 
    
## When to Create Custom Hooks

You should create a custom hook when you have stateful logic that needs to be shared across multiple components. 

*   **Reusable Logic**: Abstract common logic (e.g., form handling, data fetching with loading/error states, authentication flow, device sensor data access) into a custom hook to promote the "Don't Repeat Yourself" (DRY) principle.
    
*   **Separation of Concerns**: Custom hooks help to decouple business logic from the UI rendering logic, making components cleaner and easier to read and test independently.
    
*   **Encapsulation**: Combine several related built-in hooks and logic into a single, well-named custom hook (e.g., useFetchData, useForm, useAuth) to manage complexity. 
    
## Rules for Using Hooks

To use Hooks correctly, you must follow the two main [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks): 

1.  **Only call Hooks at the top level** of your functional components or custom hooks. Do not call them inside loops, conditions, or nested functions.
    
2.  **Only call Hooks from React functions**. Do not call them from regular JavaScript functions or class components. 

By adhering to these principles, you can leverage the full power of React Hooks to build efficient and scalable applications.

--- 

WordPress 6.4 introduces [Block Hooks](https://make.wordpress.org/core/2023/10/15/introducing-block-hooks-for-dynamic-blocks/), a feature that provides an extensibility mechanism for Block Themes. This is the first step in emulating WordPress’ Hooks concept that allows developers to extend Classic Themes using filters and actions.
