import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderSummary() {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Axios Call
    axios
      .get(`http://localhost:3000/order/order-details`)
      .then((response) => {
        setOrderDetails(response.data);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Abbiamo riscontrato un errore");
      });
  }, []);

  // Effetto per verificare l'aggiornamento dello stato
  useEffect(() => {
    console.log("Order Details aggiornati:", orderDetails);
  }, [orderDetails]);

  if (!orderDetails) {
    return <p>Caricamento ordine...</p>;
  }

  return (
    <div className="order-container">
      <div className="order-box">
        <h2>Riepilogo Ordine</h2>
        <p>
          <strong>
            Grazie per il tuo acquisto su CosyLiving, {orderDetails.name}! Il
            tuo ordine è in buone mani. A presto!{" "}
          </strong>
        </p>
        <p>
          <strong>Email:</strong> {orderDetails.email}
        </p>
        <p>
          <strong>Indirizzo di Spedizione:</strong>{" "}
          {orderDetails.shipment_address}, <strong>Città: </strong>
          {orderDetails.city}
        </p>

        <h4>Prodotti Ordinati:</h4>
        <ul>
          {orderDetails.products?.map((product, index) => (
            <li key={index}>
              {product.product_name} x {product.quantity}
            </li>
          ))}
        </ul>

        <h4>Totale: €{orderDetails.total_price}</h4>
      </div>
    </div>
  );
}
