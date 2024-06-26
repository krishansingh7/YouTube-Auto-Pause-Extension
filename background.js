chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, tab => {
      if (tab.url.includes('youtube.com/watch')) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
        });
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: handleTabActivated
        });
      }
    });
  });
  
  chrome.windows.onFocusChanged.addListener(windowId => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs.length > 0 && tabs[0].url.includes('youtube.com/watch')) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: pauseVideo
          });
        }
      });
    } else {
      chrome.tabs.query({ active: true, windowId: windowId }, tabs => {
        if (tabs.length > 0 && tabs[0].url.includes('youtube.com/watch')) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: playVideo
          });
        }
      });
    }
  });
  
  function handleTabActivated() {
    playVideo();
  }
  
  function pauseVideo() {
    const video = document.querySelector('video');
    if (video) {
      video.pause();
    }
  }
  
  function playVideo() {
    const video = document.querySelector('video');
    if (video) {
      video.play();
    }
  }
  