// Listener for Chrome extension events
chrome.runtime.onInstalled.addListener(() => {
    console.log("Minutemen LM extension installed.");
  });
  // Listener for Chrome extension events
  chrome.action.onClicked.addListener(function(tab) {
    chrome.windows.create({
      url: 'index.html',
      type: 'popup',
      width: 800,
      height: 600
    });
  });