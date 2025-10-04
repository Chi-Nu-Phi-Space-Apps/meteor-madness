import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const element = document.getElementById("root");

if (element === null) throw new Error("Root does not exist");

const root = ReactDOM.createRoot(element);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
