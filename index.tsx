// スタイル: Tailwind → CMS本文用の順で読み込む（後勝ちで preflight を上書きする）
import './styles/app.css';
import './styles/cms.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);