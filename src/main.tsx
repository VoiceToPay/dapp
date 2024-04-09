import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import SolanaProvider from './components/provider/SolanaProvider.tsx';
import VoiceChatProvider from './components/provider/VoiceChatProvider.tsx';
import App from './App.tsx';

import './index.css';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SolanaProvider>
      <VoiceChatProvider>
        <App />
        <ToastContainer position="bottom-right" autoClose={2000} />
      </VoiceChatProvider>
    </SolanaProvider>
  </React.StrictMode>
);
