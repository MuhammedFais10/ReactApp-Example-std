import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Services/UserDataServices";
import { useAuthContext } from "../../Components/hooks/AuthProvider";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserFromStorage } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await login(email, password);
      console.log("Login Success:", loginResponse);

      // Set user in context after successful login
      setUserFromStorage(loginResponse);
      toast.success("Login Succes");
      // Redirect to home or dashboard after successful login
      navigate("/");
    } catch (err) {
      console.error("Login Page Error:", err.response?.data || err.message);
      toast.error(err.response.data);
    }
  };

  return (
    <div className="container">
      <form className="loginform" onSubmit={handleSubmit}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password : </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <div>
          Don't have an account? <Link to="/signup">Register here</Link>
        </div>
      </form>
    </div>
  );
}
