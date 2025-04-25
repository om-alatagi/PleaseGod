// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";  // Login Page
// import Wallet from "./components/Wallet"; // Your Wallet Dashboard (previously App.js)

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />    {/* Show Login Page first */}
//         <Route path="/wallet" element={<Wallet />} /> {/* Redirect here after login */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Wallet from "./components/Wallet";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/wallet" element={<Wallet />} />
      </Routes>
    </Router>
  );
}

export default App;

