https://github.com/10up/block-components/tree/develop/components/optional

# Optional

![Optional Component Demo](../../images/optional-component.gif)

A component that takes care of the logic of rendering nodes only when it is selected.

## Usage

```js
import { Optional } from '@10up/block-components';

const BlockEdit = (props) => {
    const { attributes, setAttributes, isSelected } = props;
    const { title } = attributes;

    const blockProps = useBlockProps();

    return (
        <div {...blockProps}>
            <Optional value={ title }>
                <RichText tagName="h2" value={ title } onChange={ value => setAttributes({ title: value }) } />
           </Optional>
        </div>
    )
}
```

The `<RichText>` node will only render when BlockEdit is selected.

## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `value` | `string`    | `''`   | The value that will be consumed by the children. If the value is falsy the component will only be rendered if the block is selected. |
