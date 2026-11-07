import type { VideoSettingsType } from '@extension/storage';

const defaultSettings: VideoSettingsType = {
  autoResume: true,
  speed: 1,
  enabled: true,
};

let currentSettings: VideoSettingsType = defaultSettings;
const processedVideos = new WeakSet<HTMLVideoElement>();

const processVideo = (video: HTMLVideoElement) => {
  if (processedVideos.has(video)) {
    if (currentSettings.enabled) {
      video.playbackRate = currentSettings.speed;
    }
    return;
  }

  processedVideos.add(video);

  const handlePause = () => {
    if (!currentSettings.enabled || !currentSettings.autoResume) {
      return;
    }

    if (video.ended) {
      return;
    }

    setTimeout(() => {
      if (video.paused && !video.ended) {
        video.play().catch(() => {});
      }
    }, 100);
  };

  video.addEventListener('pause', handlePause);

  if (currentSettings.enabled) {
    video.playbackRate = currentSettings.speed;
  }
};

const scanAndProcessVideos = () => {
  document.querySelectorAll('video').forEach(processVideo);
};

const initContentScript = async () => {
  try {
    const result = await chrome.storage.local.get(['video-settings-key']);
    if (result['video-settings-key']) {
      currentSettings = result['video-settings-key'] as VideoSettingsType;
    }
  } catch {
    console.log('Video Helper: Using default settings');
  }

  scanAndProcessVideos();

  const observer = new MutationObserver(() => {
    scanAndProcessVideos();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

chrome.storage.onChanged.addListener(changes => {
  if (changes['video-settings-key']) {
    currentSettings = changes['video-settings-key'].newValue as VideoSettingsType;
    scanAndProcessVideos();
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContentScript);
} else {
  initContentScript();
}
