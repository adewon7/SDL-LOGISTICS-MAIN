import 'leaflet/dist/leaflet.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./utils/fixLeafletIcons";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);