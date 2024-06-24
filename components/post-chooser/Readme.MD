# BU Post Picker
## Status: BETA

A post picker for blocks that returns the post object of the
selected post. The returned data can either be directly displayed
or used to fetch additional data from data stores such as media.


## Usage
`import { PostChooser, PostChooserSidebar } from '@bostonuniversity/block-components';`


```
<PostChooser
	label="Choose a post"
	buttonLabel="Choose..."
	placeholder="Pick something..."
	onSelectPost={ calloutSelectedPostHandler }
/>
```
