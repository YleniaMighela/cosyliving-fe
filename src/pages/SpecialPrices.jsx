import { useEffect, useState } from "react";


const SpecialPrices = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/products")
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
                const discountedProducts = data.filter((product) => product.discount > 0);
                setProducts(discountedProducts);
            })
            .catch((err) => console.error("Errore nel fetch:", err));
    }, []);

    return (
        <div className="special-price-container">
            <h1>Prodotti in Promozione</h1>
            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={`${product.img_cover}`} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p className="price">€{Number(product.price).toFixed(2)}</p>
                        <p className="discount">Sconto: {product.discount}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpecialPrices;