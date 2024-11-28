import React from "react";
import "../../Components/CardsPage/CardsPage.css";
import { Link } from "react-router-dom";

function Cards({ data }) {
  console.log(data);

  return (
    <div className="row main">
      {data.map((card) => (   
        <div className="card" style={{ width: "18rem" }} key={card.id}>
          <img
            src={`${card.imgSrc}`}
            className="card-img-top"
            alt={card.title}
          />
          <div className="card-body">
            <h5 className="card-title">{card.title}</h5>
            <p className="card-text">{card.text}</p>
            <Link to={`/card/${card.id}`}>
              <button className="btn btn-primary">Go somewhere</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
