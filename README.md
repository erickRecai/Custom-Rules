# Custom-Rules
Adds a window to add site specific rules and selectors.

Requires:  
[Collapsable Toolbar](https://github.com/erickRecai/Collapsable-Toolbar)  
[Filter, Highlight, & Delete](https://github.com/erickRecai/Filter-Highlight-Delete)

#### Remember to click `Save` to save changes.
Selectors and Filter Rules created here are saved to local storage and require the browser to have cookies enabled to be saved.

# Installation
Requires a browser extension that enables userscripts to install this userscript. I personally use Tampermonkey but other extensions should work as well.  

[Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)  
[Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

To install this script specifically, just the `.user.js` file needs to downloaded.

## Selectors
![Selectors](/instruction-images/1a-selectors.png)
## Lowlight Example
![Lowlight Example](/instruction-images/2a-lowlight1.png)
## Highlight Example
![Highlight Example](/instruction-images/2b-highlight1.png)

How the scripts are ordered are generally the order that they run. There is a required order if you want everything to show up correctly should you want an onscreen user interface.
1. [Collapsable Toolbar](https://github.com/erickRecai/Collapsable-Toolbar)
2. [Script Options](https://github.com/erickRecai/Script-Options)
3. [Custom Rules](https://github.com/erickRecai/Custom-Rules)
4. [Replace Text](https://github.com/erickRecai/Replace-Text)
5. [Filter, Highlight, & Delete](https://github.com/erickRecai/Filter-Highlight-Delete)