import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Cart from "../pages/CartPage"

export default function CartCard({ dati, setCart }) {
    console.log(dati);

    const [data, setData] = useState(dati.props || [])

    function EliminateArticle(name) {
        var Cart = JSON.parse(localStorage.getItem("Cart")) || []

        Cart = Cart.filter(product => product.name != name)
        setCart(Cart)
        localStorage.setItem("Cart", JSON.stringify(Cart))

        setData(Cart)
    }

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("Cart")) || [];
        setData(storedCart);
    }, []);


    return (
        data.map((prop) => (
            <>
                <div className="container_cart" key={prop.id}>
                    <img src={prop.img} alt={prop.name} />
                    <div>
                        <h2>{prop.name}</h2>
                        <p>€{prop.price}</p>
                        <p>{prop.quantity}</p>
                        <Link to="#">
                            <button onClick={() => EliminateArticle(prop.name)}>Rimuovi dal carrello</button>
                        </Link>
                    </div>

                </div>
            </>))


    )
}