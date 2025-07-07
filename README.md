# Color Comparer Chrome Extension

**Color Comparer** is a Chrome extension that helps you select a color from a web page and compare it with your reference color. It provides an easy to follow UI and visual feedback on how similar two colors are using a tolerance scale.

---

## Features

- Pick reference and comparison colors directly from any webpage using the EyeDropper API
- Option to manually enter reference color in HEX or RGB format
- View similarity percentage and tolerance level (Identical, Similar, Different, Very Different)
- See numerical color difference
- Built with React + TypeScript + Tailwind CSS

---

## Installation

1. **Clone the repo:**

   ```bash
   git clone https://github.com/your-username/color-comparer-extension.git
   cd color-comparer-extension
2. ```bash
   npm install
3. ```bash
   npm run build
4. Load the extension in Chrome:
  - Open Chrome and go to [chrome://extensions/](chrome://extensions/)
  - Enable Developer mode
  - Click Load unpacked
  - Select the dist folder

## How to Use
1. Click the extension icon in the Chrome toolbar.
2. Use the text input or the Pick Color button to select a color from the page.
3. Select a second color to compare using the Pick Color from Page button.
4. View the match percentage and color tolerance level.
5. Select the clear colors button to clear all inputs.

## Notes
- The EyeDropper API is only supported in Chromium-based browsers.
- Colors must be in valid HEX (#RRGGBB) or RGB (rgb(r,g,b)) format.
- No user data is collected or stored.

