# Minimal Chrome Home Page Extension

A minimalistic Chrome extension that transforms your new tab page with custom backgrounds, a clean search bar, and a task management system. Features beautiful background images, glassmorphic design elements, and seamless integration with Google and ChatGPT.

## Features
- Minimalist new tab interface
- Vertical task management system
- Drag-and-drop task reordering
- Editable task entries
- Glassmorphic search bar
- Custom background images with smooth transitions
- Persistent storage of tasks
- Lora font for clean typography
- Subtle blur effect during background transitions
- Integrated Google and ChatGPT search
- Background image cycling with arrow button
- Instant task entry with live preview

## File Structure
```
extension/
├── assets/                  # Icons and UI elements
├── images/                  # Background images
├── styles.css               # Main stylesheet
├── newtab.html              # New tab page structure
├── newtab.js                # New tab page functionality
├── background.js            # Background processes
├── sw.js                    # Service worker for caching
├── manifest.json            # Extension configuration
└── README.md                # This file
```

## File Descriptions

### `manifest.json`
The extension's configuration file. Defines:
- Extension name and version
- Permissions (storage)
- New tab override
- Manifest version (v3)
- Icons for the extension

### `newtab.html`
The main interface structure. Contains:
- Task management container
- Add task button
- Search bar
- Text input area
- Background change button
- Google and ChatGPT search buttons

### `styles.css`
Handles all visual styling. Includes:
- Glassmorphic design elements
- Lora font implementation
- Background image and overlay
- Task and search bar styling
- Responsive design
- Smooth transition effects
- Loading animations

### `newtab.js`
Core functionality for the new tab page. Handles:
- Task creation, editing, and deletion
- Drag-and-drop task reordering
- Persistent storage using Chrome's storage API
- Search functionality (Google and ChatGPT)
- Background image transitions
- Event listeners for user interactions
- Text entry management

### `background.js`
Background processes. Includes:
- Image preloading
- Bookmark handling
- Background tasks

### `sw.js`
Service worker for caching background images. Features:
- Image caching strategy
- Cache versioning
- Fetch event handling

## Setup Instructions

1. **Clone the repository** or download the extension files
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer Mode** (toggle in top right corner)
4. **Click "Load unpacked"** and select the extension directory
5. **Open a new tab** to see the extension in action

## Example Home Page:



<img width="1680" alt="Demo" src="https://github.com/user-attachments/assets/81672b3a-557b-45d2-af3e-8c7e010923b0" />



## Adding Custom Background Images

1. Place your images in the `images/` directory
2. Supported formats: JPG, PNG, WebP
3. Recommended size: 1920x1080 pixels
4. Add image filenames to the `images` array in `newtab.js` and `background.js` 
5. The extension will automatically cycle through all images

## Using the Search Functionality

- **Google Search**: Click the Google icon or press Enter in the search bar
- **ChatGPT Search**: Click the ChatGPT icon to open ChatGPT in a new tab
- The active search method is indicated by the black icon.

## Best Practices

1. **Image Optimization**:
   - Use WebP format for better compression
   - Resize images to 1920x1080 pixels
   - Compress images using tools like ImageOptim or TinyPNG

2. **Performance**:
   - Keep the number of background images reasonable (10-15)
   - Use the service worker for caching
   - Implement lazy loading for non-visible elements

3. **Maintenance**:
   - Regularly update Chrome extension APIs
   - Test with different screen resolutions
   - Monitor storage usage for text entries

4. **Security**:
   - Validate all user input
   - Use Chrome's storage API for persistence
   - Keep dependencies up to date

## Customization

- **Background Images**: Replace images in the `images/` directory
- **Font**: Currently Lora font. Change the font in `styles.css` (line 4)
- **Colors**: Adjust the color scheme in `styles.css`
- **Search Engine**: Modify the search URLs in `newtab.js`
- **Transition Speed**: Adjust transition timing in `styles.css` and `newtab.js`

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Open an issue to discuss proposed changes
2. Fork the repository and create a feature branch
3. Follow the existing code style and structure
4. Write clear commit messages
5. Test your changes thoroughly
6. Submit a pull request with a detailed description

## License

This project is open-source and available under the MIT License.

## Support

For issues or feature requests, please open an issue on GitHub.
