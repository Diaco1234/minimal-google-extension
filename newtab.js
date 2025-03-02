document.addEventListener('DOMContentLoaded', function() {
  // Text functionality
  let textEntries = [];
  let dragStartIndex;

  // Load text entries from storage
  function loadTextEntries() {
    chrome.storage.sync.get(['textEntries'], (result) => {
      textEntries = result.textEntries || [];
      renderTextEntries();
    });
  }

  // Save text entries to storage
  function saveTextEntries() {
    chrome.storage.sync.set({ textEntries });
  }

  // Render text entries
  function renderTextEntries() {
    const container = document.getElementById('text-entries');
    if (container) {
      container.innerHTML = textEntries.map((text, index) => `
        <div class="text-entry" data-index="${index}" draggable="true">
          <div class="text-content">${text}</div>
          <div class="separator"></div>
        </div>
      `).join('');
      
      // Add event listeners for drag and drop
      const textEntriesElements = document.querySelectorAll('.text-entry');
      textEntriesElements.forEach(entry => {
        entry.addEventListener('dragstart', dragStart);
        entry.addEventListener('dragover', dragOver);
        entry.addEventListener('drop', dragDrop);
        entry.addEventListener('click', editText);
      });
    }
  }

  // Drag and drop functionality
  function dragStart(e) {
    dragStartIndex = +this.dataset.index;
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragDrop() {
    const dragEndIndex = +this.dataset.index;
    swapEntries(dragStartIndex, dragEndIndex);
    saveTextEntries();
    renderTextEntries();
  }

  function swapEntries(fromIndex, toIndex) {
    [textEntries[fromIndex], textEntries[toIndex]] = 
      [textEntries[toIndex], textEntries[fromIndex]];
  }

  // Edit text functionality
  function editText() {
    const index = this.dataset.index;
    const textContent = this.querySelector('.text-content');
    const currentText = textContent.textContent;
    
    const input = document.createElement('textarea');
    input.value = currentText;
    input.classList.add('edit-input');
    
    textContent.replaceWith(input);
    input.focus();
    
    input.addEventListener('blur', () => saveEdit(index, input));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        saveEdit(index, input);
      }
    });
  }

  function saveEdit(index, input) {
    const newText = input.value.trim();
    if (newText) {
      textEntries[index] = newText;
    } else {
      textEntries.splice(index, 1);
    }
    saveTextEntries();
    renderTextEntries();
  }

  // Add new text entry
  const addTextBtn = document.getElementById('add-text-btn');
  const textInputContainer = document.getElementById('text-input-container');
  const liveTextInput = document.getElementById('live-text-input');

  if (addTextBtn && textInputContainer && liveTextInput) {
    addTextBtn.addEventListener('click', () => {
      textInputContainer.classList.remove('hidden');
      liveTextInput.focus();
    });

    liveTextInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        saveTextEntry();
      }
    });

    // Save when clicking outside
    document.addEventListener('click', (e) => {
      if (!textInputContainer.contains(e.target) && e.target !== addTextBtn) {
        saveTextEntry();
      }
    });
  }

  // New save function
  function saveTextEntry() {
    const text = liveTextInput.value.trim();
    if (text) {
      textEntries.push(text);
      saveTextEntries();
      renderTextEntries();
      liveTextInput.value = '';
      textInputContainer.classList.add('hidden');
    } else {
      textInputContainer.classList.add('hidden');
    }
  }

  // Search engine functionality
  let currentSearchEngine = 'google';

  // Add event listeners for search engine buttons
  const googleBtn = document.getElementById('google-btn');
  const chatgptBtn = document.getElementById('chatgpt-btn');

  if (googleBtn && chatgptBtn) {
    googleBtn.addEventListener('click', () => {
      if (currentSearchEngine !== 'google') {
        currentSearchEngine = 'google';
        googleBtn.src = 'assets/clicked-google.png';
        chatgptBtn.src = 'assets/chatgpt.png';
        googleBtn.classList.add('active');
        chatgptBtn.classList.remove('active');
      }
    });

    chatgptBtn.addEventListener('click', () => {
      if (currentSearchEngine !== 'chatgpt') {
        currentSearchEngine = 'chatgpt';
        chatgptBtn.src = 'assets/clicked-chatgpt.png';
        googleBtn.src = 'assets/google.png';
        chatgptBtn.classList.add('active');
        googleBtn.classList.remove('active');
      }
    });
  }

  // Modify search functionality
  const searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const query = encodeURIComponent(this.value);
        if (currentSearchEngine === 'google') {
          window.location.href = `https://www.google.com/search?q=${query}`;
        } else {
          window.location.href = `https://chat.openai.com/?q=${query}`;
        }
      }
    });
  }

  // Image cycling functionality
  let currentImageIndex = 0;
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

  // Load saved image index from storage
  function loadImageIndex() {
    chrome.storage.sync.get(['imageIndex'], (result) => {
      if (result.imageIndex !== undefined) {
        currentImageIndex = result.imageIndex;
      }
      setBackgroundImage();
    });
  }

  // Save image index to storage
  function saveImageIndex() {
    chrome.storage.sync.set({ imageIndex: currentImageIndex });
  }

  // Set background image from cache
  function setBackgroundImage() {
    const imageUrl = `images/${images[currentImageIndex]}`;
    // Create a new image element to preload
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${imageUrl})`;
    };
  }

  // Change background with smooth transition
  function changeBackgroundImage() {
    // Add blur to current background
    document.body.classList.add('bg-blur');

    // Create transition container
    const container = document.createElement('div');
    container.className = 'bg-transition-container';
    container.style.backgroundImage = `url('images/${images[currentImageIndex]}')`;
    document.body.appendChild(container);

    // Fade in new background
    setTimeout(() => {
      container.style.opacity = '1';
    }, 10);

    // Update current index and preload next image
    currentImageIndex = (currentImageIndex + 1) % images.length;
    const nextImage = new Image();
    nextImage.src = `images/${images[currentImageIndex]}`;

    // Remove old container and blur after transition
    setTimeout(() => {
      setBackgroundImage();
      document.body.classList.remove('bg-blur');
      container.remove();
      saveImageIndex(); // Save the new image index
    }, 300);
  }

  // Load initial image when page loads
  loadImageIndex();

  // Add click event listener to the change background button
  const changeBgBtn = document.getElementById('change-bg-btn');
  if (changeBgBtn) {
    changeBgBtn.addEventListener('click', changeBackgroundImage);
  }

  // Load text entries when page loads
  loadTextEntries();
});