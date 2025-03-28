import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CartCard from "../components/CartCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'


export default function Cart() {

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("Cart")) || [])
    console.log(cart);
    // product = cart[0]
    console.log(cart);

    useEffect(() => {
        localStorage.setItem("Cart", JSON.stringify(cart));
    }, [cart]);
    return (
        <>
            {cart.length === 0 &&
                <div className="container">
                    <FontAwesomeIcon icon={faCartShopping} className="empty_cart" />
                    <h2>Il tuo carrello è vuoto</h2>
                    <Link to="/"><button>Continua i tuoi acquisti</button></Link>
                </div>

            }
            {cart.length != 0 &&
                <section>
                    <div className="flex_cart">
                        <CartCard dati={cart} setCart={setCart} />
                    </div>
                    <Link to="/form"> <button className="button_ordina">Ordina</button></Link>
                </section>

            }
        </>

    )


}


