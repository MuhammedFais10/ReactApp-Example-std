import React from "react";

import CardPage from "./Components/CardPage/CardPage";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./Components/LayOutNavbar";
import Path from "./Components/Path";
import LoginPage from "./pages/Login/LoginPage";
import SignUp from "./pages/Register/SignUp";
import { useAuthContext } from "./Components/hooks/AuthProvider";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();

  // Redirect to login if the user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default function AppRouter({ cardData }) {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage cardData={cardData} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/card/:id"
            element={
              <ProtectedRoute>
                <CardPage data={cardData} />
              </ProtectedRoute>
            }
          />

          <Route path="/path" element={<Path />} />
        </Routes>
      </Layout>
    </>
  );
}
