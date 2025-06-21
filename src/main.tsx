import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeFirestore } from "firebase/firestore";
import './index.scss'
import App from './App/App.tsx'
import firebaseConfig from "../firebaseConfig.ts";

import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
