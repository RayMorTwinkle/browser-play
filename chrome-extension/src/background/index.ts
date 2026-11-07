import 'webextension-polyfill';
import { videoSettingsStorage } from '@extension/storage';

videoSettingsStorage.get().then(settings => {
  console.log('Video Helper: Settings loaded', settings);
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('Video Helper extension installed');
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes['video-settings-key']) {
    const newSettings = changes['video-settings-key'].newValue;
    console.log('Video Helper: Settings changed', newSettings);

    chrome.tabs.query({}, tabs => {
      tabs.forEach(tab => {
        if (tab.id && tab.url && !tab.url.startsWith('chrome://')) {
          chrome.tabs.sendMessage(tab.id, { type: 'SETTINGS_UPDATED', settings: newSettings }).catch(() => {});
        }
      });
    });
  }
});

console.log('Video Helper: Background script loaded');
