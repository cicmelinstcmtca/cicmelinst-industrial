import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import App from './App'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js?v=2', { updateViaCache: 'none' }).then((reg) => {
      const checkForUpdate = () => reg.update().catch(() => {});

      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (!newWorker) return;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              window.dispatchEvent(new CustomEvent('sw-update'));
            } else {
              window.dispatchEvent(new CustomEvent('sw-update'));
            }
          }
        });
      });

      setInterval(checkForUpdate, 60 * 1000);
      checkForUpdate();
    }).catch(() => {});
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
