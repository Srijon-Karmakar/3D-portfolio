// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.jsx';
// import "./styles.css";
// import Transition from "./components/transition.jsx"

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Transition />
//     <App />
//   </StrictMode>,
// )





// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
