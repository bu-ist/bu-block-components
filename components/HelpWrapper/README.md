https://github.com/bu-ist/bu-block-components/tree/develop/components/help-wrapper

# BU Help Wrapper
## Status: Released

![Help Wrapper Component Example](BU_Help_Wrapper_Component_1.gif)

![Help Wrapper Component Example](BU_Help_Wrapper_Component.gif)


An component that can wrap core components in the sidebar and provide a quick and easy help
popover component to display inline help and/or links to external documentation.

This is a wrapping component, to use it wrap it around another component such as a ToggleControl
or TextControl in the InspectorControls.

## Props

| Prop | Description |
|------|-------------|
| `className` | Allows you to pass a class to apply to the component |
| `text` | The text string to display in the popover. Can also be a JSX component |
| `offset` | Pass a value of `label` to offset the help icon to position it to the right of the label on core components such as TextControl |
| `title` | Optional, title for the popover |
| `children` | Optional. Child components to render inside the HelpWrapper. Don't pass this, just wrap the component like markup around other components. |

## Usage
```js
import { HelpWrapper } from '@bostonuniversity/block-components';

import { HelpWrapper as BU_Help_Wrapper } from '@bostonuniversity/block-components';
```



```js
<HelpWrapper
	title="Some title"
	text={ <p>Does Something. <a href="https://wpdocs.bu.edu">Read More</a> </p>}
>
	<p>Some Text</p>
</HelpWrapper>
<HelpWrapper
	text="Some message for the tooltip">
	<ToggleControl
		label="Fixed Background"
		help={'Has fixed background.'}
		checked={ true }
	/>
</HelpWrapper>
<HelpWrapper
	text={ <p>Does Something. <ExternalLink href="https://wpdocs.bu.edu">Read More</ExternalLink> </p>}
>
	<ToggleControl
		label="Another Setting"
		checked={ false }
	/>
</HelpWrapper>
<HelpWrapper
	text={ <p>Does Something. <ExternalLink href="https://wpdocs.bu.edu">Read More</ExternalLink> </p>}
>
	<TextControl
		label="Title"
	/>
</HelpWrapper>
<HelpWrapper
	text={ <p>Does Something. <ExternalLink href="https://wpdocs.bu.edu">Read More</ExternalLink> </p>}
	offset="label"
>
	<SelectControl
		label="Size"
		options={ [
			{ label: 'Big', value: '100%' },
			{ label: 'Medium', value: '50%' },
			{ label: 'Small', value: '25%' },
		] }
	/>
</HelpWrapper>
```
