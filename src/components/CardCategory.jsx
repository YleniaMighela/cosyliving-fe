// tutte le categorie
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CardCategory() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        function fetchProducts() {
            fetch(`/api/forniture/${category}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Errore nel recupero dei prodotti");
                    }
                    return response.json();
                })
                .then(data => {
                    setProducts(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        }
        fetchProducts();
    }, [category]);

    if (loading) return <p>Caricamento...</p>;
    if (error) return <p>Errore: {error}</p>;

    return (
        <div className="category-page">
            <h2 className="category-title">{category}</h2>
            <div
                className="category-banner"
                style={{ backgroundImage: `url(/images/categories/${category}.jpg)` }}
            ></div>
            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={`/images/products/${product.img_cover}`} alt={product.name} className="product-image" />
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">{product.price} €</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CardCategory;
