import { useEffect, useState } from "react";

export default function OrderSummary() {
    const [orderDetails, setOrderDetails] = useState(null);


    useEffect(() => {
        const storedOrder = JSON.parse(localStorage.getItem("lastOrder"));
        if (storedOrder) {
            setOrderDetails(storedOrder);
        }
    }, []);

    if (!orderDetails) {
        return <p>Caricamento ordine...</p>;
    }


    return (
        <div className="order-container">
            <div className="order-box">
                <h2>Riepilogo Ordine</h2>
                <p><strong>Grazie per il tuo acquisto su CosyLiving, {orderDetails.name}!Il tuo ordine è in buone mani. A presto! </strong></p>
                <p><strong>Email:</strong> {orderDetails.email}</p>
                <p><strong>Indirizzo di Spedizione:</strong> {orderDetails.shipment_address}, {orderDetails.city}</p>

                <h4>Prodotti Ordinati:</h4>
                <ul>
                    {orderDetails.products.map((product, index) => (
                        <li key={index}>{product.name} x {product.quantity}</li>
                    ))}
                </ul>

                <h4>Totale: €{orderDetails.totalPrice.toFixed(2)}</h4>
            </div>
        </div>
    );
}