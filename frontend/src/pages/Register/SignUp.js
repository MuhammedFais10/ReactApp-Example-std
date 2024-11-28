import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../Services/UserDataServices"; // Import your register function from auth.js
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Components/hooks/AuthProvider";
import { toast } from "react-toastify";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserFromStorage } = useAuthContext(); // Destructure setUserFromStorage from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerData = { name, email, password };
      const registrationResponse = await register(registerData);
      console.log("Registration Success:", registrationResponse);

      // Set user in context after successful registration
      setUserFromStorage(registrationResponse);
      toast.success("Registration Successful!");
      navigate("/"); // Redirect to login page
    } catch (err) {
      console.error("SignUp Page Error:", err.response?.data || err.message);
      const errorMessage =
        err.response?.data?.message || "Registration failed!";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <div className="container">
        <form className="loginform" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="Enter your Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
