import { Link } from "react-router-dom";
import CartCard from "../components/CartCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'


export default function Cart() {
    var cart = JSON.parse(localStorage.getItem("Cart"))
    console.log(cart);
    // product = cart[0]
    return (
        <>
            {cart === null &&
                <div className="container">
                    <FontAwesomeIcon icon={faCartShopping} className="empty_cart" />
                    <h2>Il tuo carrello è vuoto</h2>
                    <Link to="/"><button>Continua i tuoi acquisti</button></Link>
                </div>

            }
            {cart != null &&
                <section>
                    <div className="flex_cart">
                        <CartCard props={cart} />
                    </div>
                    <Link to="/form"> <button className="button_ordina">Ordina</button></Link>
                </section>

            }
        </>

    )


}


