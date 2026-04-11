

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./components/hero";
// import Spline from "./components/spline";
// import Dash from "./pages/Dashboard";

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Home route */}
//         <Route path="/" element={<Home />} />
//         <Route path="/spline" element={<Spline />} />
//       </Routes>
//     </Router>
//   );
// }






import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Spline from "./components/spline";
import Dash from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Transition from "./components/transition";
import { useAnimatedFavicon } from "./hooks/useAnimatedFavicon";


const THEME_COUNT = 7;


export default function App() {
  useAnimatedFavicon();

  const [themeIndex, setThemeIndex] = useState(0);

  const handleCycleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % THEME_COUNT);
  };


  return (
    <Router>
      <Transition />
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />
        <Route path="/spline" element={<Spline />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/Stats" element={
            <Dash
              onCycleTheme={handleCycleTheme}
              themeIndex={themeIndex}
            />
          }
        />
      </Routes>
    </Router>
  );
}

