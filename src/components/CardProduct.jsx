export default function CardProduct(props) {
  const { name, price, quantity, img_cover } = props.prodInfos;
  return (
    // Style temporaneo
    <div style={{ border: "solid 1px black" }}>
      <img src={img_cover} alt={"Image of " + name} />
      <h2>Prodotto: {name} </h2>
      <span>Prezzo: {price} </span>
      <span>Quantità: {quantity}</span>
    </div>
  );
}
