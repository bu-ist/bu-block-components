# PostChooser Filtering Guide

## Overview

The PostChooser component now supports filtering posts by meta fields and taxonomies, similar to how you would use `meta_query` and `tax_query` in WordPress PHP code.

## Meta Filtering (Custom Fields)

### Simple Meta Filtering

Like using `meta_key` and `meta_value` in `WP_Query`:

```jsx
<PostChooser
  // ... other props
  metaFilters={{
    meta_key: 'featured_post',
    meta_value: 'yes'
  }}
/>
```

### Complex Meta Filtering

Like using `meta_query` in `WP_Query` (WordPress 4.7+):

```jsx
<PostChooser
  // ... other props
  metaFilters={{
    meta_query: [
      {
        key: 'price',
        value: 100,
        compare: '>=',
        type: 'NUMERIC'
      },
      {
        key: 'featured',
        value: 'yes',
        compare: '='
      }
    ]
  }}
/>
```

### Multiple Meta Fields

```jsx
<PostChooser
  // ... other props
  metaFilters={{
    meta_key: 'event_date',
    meta_value: '2024-01-01',
    meta_compare: '>='
  }}
/>
```

## Taxonomy Filtering

### Filter by Category

```jsx
<PostChooser
  // ... other props
  taxonomyFilters={{
    categories: '1,5,10' // Category IDs
  }}
/>
```

### Filter by Tags

```jsx
<PostChooser
  // ... other props
  taxonomyFilters={{
    tags: 'featured,important' // Tag slugs or IDs
  }}
/>
```

### Filter by Custom Taxonomy

```jsx
<PostChooser
  // ... other props
  taxonomyFilters={{
    // Replace 'product_category' with your taxonomy name
    product_category: 'electronics,books'
  }}
/>
```

### Multiple Taxonomy Filters

```jsx
<PostChooser
  // ... other props
  taxonomyFilters={{
    categories: '1,2,3',
    tags: 'featured',
    product_category: 'electronics'
  }}
/>
```

## Combined Filtering

You can use both meta and taxonomy filters together:

```jsx
<PostChooser
  // ... other props
  metaFilters={{
    meta_key: 'price',
    meta_value: '0',
    meta_compare: '>'
  }}
  taxonomyFilters={{
    categories: '1,5',
    tags: 'sale'
  }}
/>
```

## PHP Developer Notes

### Equivalent WP_Query Code

The above PostChooser usage is equivalent to this PHP code:

```php
$args = array(
    'post_type' => 'post',
    'posts_per_page' => 10,
    'meta_query' => array(
        array(
            'key' => 'price',
            'value' => '0',
            'compare' => '>'
        )
    ),
    'tax_query' => array(
        array(
            'taxonomy' => 'category',
            'field' => 'term_id',
            'terms' => array(1, 5)
        ),
        array(
            'taxonomy' => 'post_tag',
            'field' => 'slug',
            'terms' => array('sale')
        )
    )
);

$posts = new WP_Query($args);
```

### REST API Parameters

Behind the scenes, these filters become REST API query parameters:

- `meta_key=price&meta_value=100&meta_compare=>=`
- `categories=1,5&tags=sale`

### WordPress 5.8 Compatibility

All these filtering options work with WordPress 5.8's REST API. The component automatically handles the translation from your filter objects to proper REST API parameters.

## Examples by Use Case

### E-commerce: Featured Products Only

```jsx
<PostChooser
  postTypes={[{ label: 'Products', value: 'product' }]}
  metaFilters={{
    meta_key: 'featured_product',
    meta_value: 'yes'
  }}
/>
```

### Events: Future Events Only

```jsx
<PostChooser
  postTypes={[{ label: 'Events', value: 'event' }]}
  metaFilters={{
    meta_key: 'event_date',
    meta_value: new Date().toISOString().split('T')[0], // Today's date
    meta_compare: '>='
  }}
/>
```

### Content: Published Posts in Specific Category

```jsx
<PostChooser
  postTypes={[{ label: 'Posts', value: 'post' }]}
  taxonomyFilters={{
    categories: '5' // Replace with your category ID
  }}
  metaFilters={{
    meta_key: 'post_status',
    meta_value: 'published'
  }}
/>
```

## Implementation Notes

1. **Performance**: These filters are applied at the database level, so they're efficient even with large datasets.

2. **Caching**: The `useRequestData` hook caches results, so identical queries won't re-fetch data.

3. **Validation**: The WordPress REST API validates all parameters, so invalid meta keys or taxonomy terms will be ignored.

4. **Permissions**: Users can only see posts they have permission to view, regardless of filters applied.