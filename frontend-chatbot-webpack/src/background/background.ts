/* eslint-disable */
// console.log('Inside background.js');

chrome.tabs.onCreated.addListener(function (tab) {
  // Send a message to the content script of the created tab
  chrome.tabs.sendMessage(tab.id, { message: 'showShopSenseAIIcon' });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // Check if the tab has finished loading
  if (changeInfo.status === 'complete') {
    // Send a message to the content script
    chrome.tabs.sendMessage(tabId, { message: 'showShopSenseAIIcon' });
  }
});

// Manually inject the content script when the tab is updated and the conditions are met, ensuring consistent injection.
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    chrome.scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      files: ['content.js']
    });
  }
});

chrome.tabs.onReplaced.addListener(function (addedTabId, removedTabId) {
  // Send a message to the content script of the added tab
  chrome.tabs.sendMessage(addedTabId, { message: 'showShopSenseAIIcon' });
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
  // Get the active tab
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    // Send a message to the content script of the active tab
    chrome.tabs.sendMessage(tab.id, { message: 'showShopSenseAIIcon' });
  });
});
