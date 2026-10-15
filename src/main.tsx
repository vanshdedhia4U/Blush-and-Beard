import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(<App />);
  } catch (err) {
    console.error('Fatal startup error in main.tsx:', err);
    rootElement.innerHTML = `
      <div style="min-height: 100vh; background-color: #101828; color: #FFFFFF; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: sans-serif; text-align: center; padding: 24px;">
        <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(198,165,107,0.2); border: 1px solid #C6A56B; display: flex; align-items: center; justify-content: center; color: #C6A56B; font-weight: bold; margin-bottom: 16px;">B&B</div>
        <h1 style="color: #FFFFFF; font-size: 22px; margin-bottom: 8px;">Blush &amp; Beard – Unisex Salon</h1>
        <p style="color: rgba(255,255,255,0.7); font-size: 14px; max-width: 400px; margin-bottom: 20px;">Gauripada, Kalyan West. Please click below to refresh the page.</p>
        <button onclick="window.location.reload()" style="background-color: #C6A56B; color: #101828; font-weight: bold; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer;">Reload Application</button>
      </div>
    `;
  }
}

