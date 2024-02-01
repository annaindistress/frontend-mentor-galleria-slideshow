import React from "react";
import ReactDOM from "react-dom/client";
import { SlideshowProvider } from "./context/SlideshowContext";
import App from "./components/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SlideshowProvider>
      <App />
    </SlideshowProvider>
  </React.StrictMode>
);
