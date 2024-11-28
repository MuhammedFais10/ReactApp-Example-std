import { useEffect, useState } from "react";
import "./App.css";
import AppRouter from "./AppRouter.js";

import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const getUser = () => {
      axios
        .get("/api/data/data")
        .then((response) => {
          console.log("Success: Data transfer", response.data);
          setCardData(response.data);
        })
        .catch((err) => {
          console.log("Data Transfer Error:", err);
        });
    };

    getUser();
  }, []);

  return (
    <>
      <ToastContainer />
      <AppRouter cardData={cardData} />
    </>
  );
}

export default App;
