export default function CardProduct(props) {
  const { name, price, quantity, img_cover } = prodInfos.props;
  return (
    <div>
      <img src={img_cover} alt={name} />
      <h2>Prodotto: {name}</h2>
      <h3>Prezzo: {price}</h3>
      <h3>Quantità: {quantity}</h3>
    </div>
  );
}
