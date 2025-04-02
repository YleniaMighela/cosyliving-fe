import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Cart from "../pages/CartPage"

export default function CartCard({ dati, setCart }) {
    // console.log(dati);


    const [data, setData] = useState(dati.props || [])
    // console.log(localStorage.getItem("Cart"));

    function EliminateArticle(id) {
        var Cart = JSON.parse(localStorage.getItem("Cart")) || []

        Cart = Cart.filter(product => product.id != id)
        setCart(Cart)
        localStorage.setItem("Cart", JSON.stringify(Cart))

        setData(Cart)
    }

    function updateQuantity(id, newQuantity) {
        var newCart = data.map((product) => product.id === id ? { ...product, quantity: newQuantity } : product)
        setData(newCart);
        setCart(newCart)

        localStorage.setItem("Cart", JSON.stringify(newCart))
        console.log(localStorage.getItem("Cart"));

    }

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("Cart")) || [];
        setData(storedCart);
    }, []);


    return (
        data.map((prop) => (

            <div className="container_cart" key={prop.id}>
                <img src={prop.img} alt={prop.name} />
                <div>
                    <h2>{prop.name}</h2>
                    <p>€{prop.price}</p>
                    <div className="flex_cart">
                        <button
                            onClick={() =>
                                prop.quantity === 1
                                    ? EliminateArticle(prop.id)
                                    : updateQuantity(prop.id, prop.quantity - 1)
                            }
                        >
                            -
                        </button>
                        <p>{prop.quantity}</p>
                        <button
                            onClick={() => updateQuantity(prop.id, prop.quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    <button onClick={() => EliminateArticle(prop.id)}>Rimuovi dal carrello</button>
                </div>

            </div>

        ))


    )
}