import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initializeFirestore } from "firebase/firestore";
import { Provider } from "react-redux";

import "./index.scss";
import App from "./App/App.tsx";
import firebaseConfig from "../firebaseConfig.ts";
import store from "./Services/store";

import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
