export default function CardProduct(props) {
  const { name, price, quantity, img_cover } = props.prodInfos;
  return (
    // Style temporaneo

    <div className="special-price-container">
      <div className="products-grid ">
        <div className="product-card">
          <img src={img_cover} alt={"Image of " + name} />
          <span> <strong> Nome del prodotto: </strong> {name} </span>
          <br />
          <span className="price"> <strong>Prezzo:</strong> {price} €</span>
          <br />
          <span> <strong>Quantità:</strong> {quantity}</span>
        </div>
      </div>
    </div >
  );
}
