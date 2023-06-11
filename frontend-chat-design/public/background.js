/* eslint-disable */

openInNewTab = (firstTab) => {
  const { id, url } = firstTab;
  chrome.tabs.create({ url }, function (tab) {
    return tab;
  });
};

chrome.tabs.onCreated.addListener((tab) => {
  console.log('chrome on created');
  // wait for contenscript to load
  chrome.runtime.onMessage.addListener((isLoaded, sender, sendResponse) => {
    if (isLoaded) {
      (async () => {
        await chrome.tabs.sendMessage(tab.id, 'test');
        console.log('Chrome tab created successfully');
      })();
    }
  });
});

chrome.tabs.onUpdated.addListener((tab) => {
  // wait for contenscript to load
  console.log('chrome tab updated');
  chrome.runtime.onMessage.addListener(() => {
    console.log('chrome tab on listener');
    (async () => {
      await chrome.tabs.sendMessage(tab.id, 'test');
      console.log('Chrome tab loaded');
    })();
  });
});

chrome.tabs.onReplaced.addListener((tab) => {
  // wait for contenscript to load
  console.log('chrome tab updated');
  chrome.runtime.onMessage.addListener(() => {
    console.log('chrome tab on listener');
    (async () => {
      await chrome.tabs.sendMessage(tab.id, 'test');
      console.log('Chrome tab loaded');
    })();
  });
});

chrome.tabs.onActivated.addListener((tab) => {
  // wait for contenscript to load
  console.log('chrome tab activated');
  chrome.runtime.onMessage.addListener(() => {
    console.log('chrome tab on listener');
    (async () => {
      await chrome.tabs.sendMessage(tab.id, 'test');
      console.log('Chrome tab loaded');
    })();
  });
});

chrome.action.onClicked.addListener((tab) => {
  console.log('chrome action clicked');
  openInNewTab(tab);
});
