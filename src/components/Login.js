// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [credentials, setCredentials] = useState({ userId: "", password: "" });
//   const navigate = useNavigate();

//   const API_BASE_URL = "http://localhost:8080/User";  // Backend Login API

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/Login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: parseInt(credentials.userId, 10),
//           password: credentials.password
//         })
//       });

//       const result = await response.json();

//       if (result.success) {
//         navigate("/wallet");  // Redirect to wallet page
//       } else {
//         alert("Wrong Password");
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       alert("Login failed. Try again.");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
//       <h2>Login</h2>
//       <input
//         type="number"
//         name="userId"
//         placeholder="User ID"
//         value={credentials.userId}
//         onChange={handleChange}
//         style={{ display: "block", marginBottom: "10px", padding: "8px", width: "100%" }}
//         required
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={credentials.password}
//         onChange={handleChange}
//         style={{ display: "block", marginBottom: "10px", padding: "8px", width: "100%" }}
//         required
//       />
//       <button onClick={handleLogin} style={{ padding: "10px 20px", cursor: "pointer" }}>
//         Login
//       </button>
//     </div>
//   );
// }

// export default Login;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./index.css"; // Import the CSS for styling

// function Login() {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [credentials, setCredentials] = useState({ userId: "", password: "" });
//   const [signUpData, setSignUpData] = useState({
//     name: "",
//     contactNo: "",
//     email: "",
//     password: ""
//   });

//   const navigate = useNavigate();
//   const API_BASE_URL = "http://localhost:8080/User";

//   const handleChange = (e) => {
//     if (isSignUp) {
//       setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
//     } else {
//       setCredentials({ ...credentials, [e.target.name]: e.target.value });
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/Login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: parseInt(credentials.userId, 10),
//           password: credentials.password
//         })
//       });

//       const result = await response.json();
//       if (result.success) {
//         navigate("/wallet");
//       } else {
//         alert("Wrong Password");
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       alert("Login failed. Try again.");
//     }
//   };

//   const handleSignUp = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/addUpdate`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(signUpData)
//       });

//       if (response.ok) {
//         alert("Signup Successful!");
//         navigate("/wallet");
//       } else {
//         alert("Signup failed. Try again.");
//       }
//     } catch (error) {
//       console.error("Signup Error:", error);
//       alert("Signup failed. Try again.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>{isSignUp ? "Sign Up" : "Login"}</h2>

//         {!isSignUp ? (
//           // **Login Form**
//           <>
//             <input
//               type="number"
//               name="userId"
//               placeholder="User ID"
//               value={credentials.userId}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={credentials.password}
//               onChange={handleChange}
//               required
//             />
//             <button onClick={handleLogin}>Login</button>
//             <p className="toggle-link" onClick={() => setIsSignUp(true)}>Don't have an account? Sign Up</p>
//           </>
//         ) : (
//           // **Sign Up Form**
//           <>
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={signUpData.name}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="text"
//               name="contactNo"
//               placeholder="Contact No"
//               value={signUpData.contactNo}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={signUpData.email}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={signUpData.password}
//               onChange={handleChange}
//               required
//             />
//             <button onClick={handleSignUp}>Sign Up</button>
//             <p className="toggle-link" onClick={() => setIsSignUp(false)}>Already have an account? Login</p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"; // Import the CSS for styling

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [credentials, setCredentials] = useState({ userId: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    name: "",
    contactNo: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:8080/User";

  const handleChange = (e) => {
    if (isSignUp) {
      setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    } else {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/Login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: parseInt(credentials.userId, 10),
          password: credentials.password
        })
      });

      const result = await response.json();
      if (result.success) {
        navigate("/wallet", { state: { userId: credentials.userId } }); // ✅ Pass userId to Wallet.js
      } else {
        alert("Wrong Password");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Try again.");
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/addUpdate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData)
      });

      if (response.ok) {
        alert("Signup Successful!");
        navigate("/wallet", { state: { userId: signUpData.contactNo } }); // ✅ Pass userId after signup
      } else {
        alert("Signup failed. Try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>

        {!isSignUp ? (
          // **Login Form**
          <>
            <input
              type="number"
              name="userId"
              placeholder="User ID"
              value={credentials.userId}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <button onClick={handleLogin}>Login</button>
            <p className="toggle-link" onClick={() => setIsSignUp(true)}>Don't have an account? Sign Up</p>
          </>
        ) : (
          // **Sign Up Form**
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={signUpData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="contactNo"
              placeholder="Contact No"
              value={signUpData.contactNo}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signUpData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signUpData.password}
              onChange={handleChange}
              required
            />
            <button onClick={handleSignUp}>Sign Up</button>
            <p className="toggle-link" onClick={() => setIsSignUp(false)}>Already have an account? Login</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;

