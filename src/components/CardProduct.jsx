import { Link } from "react-router-dom";
export default function CardProduct(props) {
  const { name, price, quantity, img_cover, created_at } = props.prodInfos;
  return (
    // Style temporaneo
    <>
      <div className="special-price-container">
        <div className="products-grid ">
          <div className="product-card">
            <img src={img_cover} alt={"Image of " + name} />
            <span>
              {" "}
              <strong> Nome del prodotto: </strong> {name}{" "}
            </span>
            <br />
            <span className="price">
              {" "}
              <strong>Prezzo:</strong> {price} €
            </span>
            <br />
            <span>
              {" "}
              <strong>Quantità:</strong> {quantity}
            </span>
            <br />
            <span>
              {" "}
              <strong>Disponibile dal: </strong>{" "}
              {new Date(created_at).toLocaleDateString()}{" "}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
