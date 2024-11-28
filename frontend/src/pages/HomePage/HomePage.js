import React from "react";
//import Navbar from "../../Components/Navbar/Navbar";
import Cards from "../../Components/CardsPage/Cards";
import CarouselPage from "../../Components/CarousalPage/CarousalPage";


export default function HomePage({ cardData }) {
  
  return (
    <>
      <CarouselPage />
      <Cards data={cardData} />
    </>
  );
}
