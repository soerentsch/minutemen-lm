chrome.action.onClicked.addListener(function(tab) {
    chrome.windows.create({
      url: 'index.html',
      type: 'popup',
      width: 800,
      height: 600
    });
  });