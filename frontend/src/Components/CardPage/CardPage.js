import { useParams } from "react-router-dom";
import "../CardPage/cardpage.css";

function CardPage({ data }) {
  console.log(data);

  const { id } = useParams();
  console.log("params::::", id);

  const card = data.find((c) => c._id === id);
  console.log(card);
  console.log(`paramsId=${id},,, ${card?._id}`);

  if (!card) {
    return <h2>Card not found</h2>;
  }

  return (
    <div className="card-detail">
      <img src={card.imgSrc} alt={card.title} />
      <h2>{card.title}</h2>

      <p className="card-detail-content">{card.text}</p>
    </div>
  );
}

export default CardPage;
