import { Link } from "react-router-dom";
export default function CardProduct(props) {
  const { name, price, quantity, img_cover, created_at, discount, discount_price } = props.prodInfos;
  return (
    // Style temporaneo
    <>
      <div className="special-price-container">
        <div className="products-grid ">
          <div className="product-card hover-img detail-card">
            <img src={img_cover} alt={"Image of " + name} />
            <span>
              {" "}
              <strong> Nome del prodotto: </strong> {name}{" "}
            </span>

            <br />
            {discount > 0 ? (
              <>
                <p className="price">Prezzo originale:<s>€{Number(price).toFixed(2)}</s></p>
                <p className="discount">Sconto del: {discount}%</p>
                <p> Prezzo scontato: €{discount_price}</p>
              </>
            ) : (
              <p className="price">Prezzo: €{Number(price).toFixed(2)}</p>
            )}
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
