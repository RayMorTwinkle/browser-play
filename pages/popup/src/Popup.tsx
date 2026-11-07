import '@src/Popup.css';
import { t } from '@extension/i18n';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { disclaimerStorage, videoSettingsStorage } from '@extension/storage';
import { cn, LoadingSpinner } from '@extension/ui';
import { useState, useEffect } from 'react';

const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3];
const MIN_SPEED = 0.1;
const MAX_SPEED = 16;

const PendingDisclaimer = () => {
  useEffect(() => {
    chrome.runtime.openOptionsPage();
  }, []);

  return (
    <div className="pending-container">
      <div className="pending-content">
        <div className="pending-icon">📋</div>
        <h3>请先阅读免责声明</h3>
        <p>免责声明页面已在新标签页打开</p>
        <p className="pending-hint">同意后即可使用插件功能</p>
      </div>
    </div>
  );
};

const MainPanel = () => {
  const settings = useStorage(videoSettingsStorage);
  const isLight = true;
  const [customSpeed, setCustomSpeed] = useState('');
  const [inputError, setInputError] = useState('');

  const handleToggleEnabled = async () => {
    await videoSettingsStorage.toggleEnabled();
  };

  const handleToggleAutoResume = async () => {
    await videoSettingsStorage.toggleAutoResume();
  };

  const handleSpeedChange = async (speed: number) => {
    await videoSettingsStorage.setSpeed(speed);
    setCustomSpeed('');
    setInputError('');
  };

  const handleCustomSpeedChange = async () => {
    const speed = parseFloat(customSpeed);
    if (isNaN(speed)) {
      setInputError('请输入有效数字');
      return;
    }
    if (speed < MIN_SPEED || speed > MAX_SPEED) {
      setInputError(`速度范围: ${MIN_SPEED} - ${MAX_SPEED}`);
      return;
    }
    await videoSettingsStorage.setSpeed(speed);
    setCustomSpeed('');
    setInputError('');
  };

  const handleCustomSpeedKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCustomSpeedChange();
    }
  };

  const isPresetSpeed = (speed: number) => speedOptions.includes(speed);

  return (
    <div className={cn('App', isLight ? 'bg-slate-50' : 'bg-gray-800')} style={{ width: 300, minHeight: 420 }}>
      <header className={cn('App-header', isLight ? 'text-gray-900' : 'text-gray-100')}>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 'bold' }}>视频助手</h2>

        <div className="setting-item">
          <label className="setting-label">
            <input
              type="checkbox"
              checked={settings?.enabled ?? true}
              onChange={handleToggleEnabled}
              className="checkbox-input"
            />
            <span>启用插件</span>
          </label>
        </div>

        <div className="setting-item">
          <label className="setting-label">
            <input
              type="checkbox"
              checked={settings?.autoResume ?? true}
              onChange={handleToggleAutoResume}
              className="checkbox-input"
            />
            <span>暂停时自动续播</span>
          </label>
        </div>

        <div className="setting-item">
          <label className="speed-label">播放速度</label>
          <div className="speed-grid">
            {speedOptions.map(speed => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                className={cn(
                  'speed-button',
                  settings?.speed === speed && 'speed-button-active',
                  isLight ? 'bg-white text-gray-900' : 'bg-gray-700 text-white',
                )}>
                {speed}x
              </button>
            ))}
          </div>

          <div className="custom-speed-section">
            <div className="custom-speed-input-wrapper">
              <input
                type="number"
                value={customSpeed}
                onChange={e => setCustomSpeed(e.target.value)}
                onKeyDown={handleCustomSpeedKeyDown}
                placeholder="自定义"
                min={MIN_SPEED}
                max={MAX_SPEED}
                step="0.1"
                className="custom-speed-input"
              />
              <button onClick={handleCustomSpeedChange} className="custom-speed-btn">
                应用
              </button>
            </div>
            {inputError && <div className="input-error">{inputError}</div>}
            {!isPresetSpeed(settings?.speed ?? 1) && (
              <div className="current-custom-speed">当前: {(settings?.speed ?? 1).toFixed(2)}x (自定义)</div>
            )}
          </div>
        </div>

        <div className="status-bar">
          <span className={cn('status-dot', settings?.enabled ? 'status-active' : 'status-inactive')}></span>
          <span>{settings?.enabled ? '运行中' : '已暂停'}</span>
        </div>

        <div className="author-info">作者: BrowserPlay</div>
      </header>
    </div>
  );
};

const Popup = () => {
  const disclaimerStatus = useStorage(disclaimerStorage);

  if (!disclaimerStatus?.agreed) {
    return <PendingDisclaimer />;
  }

  return <MainPanel />;
};

export default withErrorBoundary(withSuspense(Popup, <LoadingSpinner />), ({ error }) => (
  <div style={{ padding: 16, color: 'red' }}>
    <p>出现错误: {error.message}</p>
  </div>
));
