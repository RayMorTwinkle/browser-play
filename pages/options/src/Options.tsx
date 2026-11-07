import '@src/Options.css';
import { t } from '@extension/i18n';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { disclaimerStorage } from '@extension/storage';
import { cn, LoadingSpinner } from '@extension/ui';

const DisclaimerPage = () => {
  const disclaimerStatus = useStorage(disclaimerStorage);

  const handleAgree = async () => {
    await disclaimerStorage.agree();
    window.close();
  };

  const handleDecline = () => {
    window.close();
  };

  return (
    <div className="disclaimer-container">
      <div className="disclaimer-card">
        <h1 className="disclaimer-title">{t('disclaimerTitle')}</h1>

        <div className="disclaimer-content">
          {t('disclaimerContent')
            .split('\n')
            .map((line, index) => (
              <p key={index}>{line || '\u00A0'}</p>
            ))}
        </div>

        <div className="disclaimer-buttons">
          <button className="disclaimer-btn agree-btn" onClick={handleAgree}>
            {t('disclaimerAgree')}
          </button>
          <button className="disclaimer-btn decline-btn" onClick={handleDecline}>
            {t('disclaimerDecline')}
          </button>
        </div>

        <div className="disclaimer-footer">
          <p>作者: {t('extensionAuthor')}</p>
          <p>版本: 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

const Options = () => {
  return <DisclaimerPage />;
};

export default withErrorBoundary(withSuspense(Options, <LoadingSpinner />), ({ error }) => (
  <div className="error-container">
    <p>出现错误: {error.message}</p>
  </div>
));
