import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewArrivalPage = () => {
    const [newArrivals, setNewArrivals] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/products/new_arrivals")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Errore HTTP! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (!Array.isArray(data)) {
                    throw new Error("La risposta dell'API non è un array valido.");
                }
                setNewArrivals(data);
            })
            .catch((err) => console.error("Errore nel fetch:", err));
    }, []);

    return (
        <div className="special-price-container">
            <h1>Nuovi Arrivi</h1>

            <div className="products-grid">

                {newArrivals.map((product) => (
                    <div key={product.id} className="product-card">
                        <Link to={`/products/${product.slug}`} className="product-link">
                            <img src={`${product.img_cover}`} alt={product.name} />
                            <h2>{product.name}</h2>

                            <p className="price">€{Number(product.price).toFixed(2)}</p>
                        </Link>
                    </div>

                ))}

            </div>

        </div>
    );
};

export default NewArrivalPage;