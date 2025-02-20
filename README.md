# BU Block Components
Standardized set of components that can be used within WordPress blocks.

# Installation
Install the package

```
npm i @bostonuniversity/block-components
```

# Use


# Publishing & Release Process

This package is managed through NPM (https://www.npmjs.com/).  It can be found here: https://www.npmjs.com/package/@bostonuniversity/block-components

Publishing Process (manual for now, we will automate in the future - please ask a DEV for assistance):
- ensure that this repositor's Main branch is up-to-date
- increment the version number to match changes that were made
- clone the main branch down to your computer
- navigate to the folder on your local computer
- run: 'npm login', and follow the instructions (you will need a valid login account for the BU account)
- once logged in, run: 'npm publish' from the folder on your local computer (please see the note below)

NOTE: you should verify that the package JSON file includes the following to make publishing easier:

```
"publishConfig": {
    "access": "public"
  }
```





