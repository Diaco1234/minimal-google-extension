chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getBookmarks") {
      chrome.bookmarks.getTree((tree) => {
        sendResponse({bookmarks: tree});
      });
      return true; // Keep message channel open for async response
    }
  });

// Preload images using fetch
function preloadImages() {
  return Promise.all(images.map(image => {
    return fetch(`images/${image}`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.blob();
      })
      .then(blob => URL.createObjectURL(blob))
      .catch(error => console.error('Error preloading image:', error));
  }));
}

const images = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpg',
  'image4.jpg',
  'image5.jpg',
  'image6.jpg',
  'image7.jpg',
  'image8.jpg',
  'image9.jpg',
  'image10.jpg',
  'image11.jpg',
  'image12.jpg',
  'image13.jpg'
];

preloadImages();