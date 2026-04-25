import { useEffect } from 'react';
import offlineMarkup from '../legacy/offlineMarkup.js';
import offlineRuntime from '../legacy/offlineRuntime.js';

export default function OfflinePage() {
  useEffect(() => {
    if (window.__sataOfflineRuntimeLoaded) return;
    window.__sataOfflineRuntimeLoaded = true;

    (0, eval)(offlineRuntime);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: offlineMarkup }} />;
}
