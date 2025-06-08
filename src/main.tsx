import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeFirestore } from "firebase/firestore";
import './index.css'
import App from './App.tsx'
import firebaseConfig from "../firebaseConfig.ts";

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  // useFetchStreams: false,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
