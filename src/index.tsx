import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

// Get the root element from the DOM
const container = document.getElementById("root");

if (container) {
  // If the container exists, create and render the root
  const root = createRoot(container);
  root.render(
    <Router>
      <App />
    </Router>
  );
} else {
  console.error("Root element not found. Make sure the element with id 'root' exists in the HTML.");
}
