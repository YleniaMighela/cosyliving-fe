import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CartCard from "../components/CartCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export default function Cart() {

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("Cart")) || []);
    const [prezzo, setPrezzo] = useState(0);

    // Effettua il calcolo del prezzo ogni volta che il carrello cambia
    useEffect(() => {
        // Salva il carrello in localStorage

        localStorage.setItem("Cart", JSON.stringify(cart));
        // Calcola il totale dei prezzi
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        console.log(total);

        // Aggiorna il prezzo
        setPrezzo(total);
    }, [cart]);

    return (
        <>
            {cart.length === 0 ? (
                <div className="container_notFound">
                    <FontAwesomeIcon icon={faCartShopping} className="empty_cart" />
                    <h2>Il tuo carrello è vuoto</h2>
                    <Link to="/"><button className="bottone_dettaglio">Continua i tuoi acquisti</button></Link>
                </div>
            ) : (
                <section>
                    <div className="flex_cart">
                        <CartCard dati={cart} setCart={setCart} />
                    </div>
                    <Link to="/form">
                        <button className="button_ordina">Ordina</button>
                    </Link>
                    <div>
                        <h2>Totale : €{prezzo.toFixed(2)}</h2>
                    </div>
                </section>
            )}
        </>
    );
}