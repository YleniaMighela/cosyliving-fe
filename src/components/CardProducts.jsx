// pagina di tutti i prodotti
// pagina di tutti i prodotti
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const CardProducts = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/products/${slug}`);
                if (!response.ok) {
                    throw new Error("Prodotto non trovato");
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    if (loading) return <p className="loading">Caricamento...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!product) return null;
    console.log(product.price);

    const imageUrl = product.img_cover.startsWith("http")
        ? product.img_cover
        : `/images/${product.img_cover}`;


    return (
        <div className="product-detail">
            <div className="product-container">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="product-image"
                />
                <div className="product-info">
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">€{product.price}</p>
                    <div className="quantity-container">
                        <label>Quantità</label>
                        <input
                            type="number"
                            min="1"
                            max={product.quantity}
                            defaultValue="1"
                            className="quantity-input"
                        />
                    </div>
                    <button className="add-to-cart">Aggiungi al carrello</button>
                </div>
            </div>
        </div>
    );
};

export default CardProducts;
