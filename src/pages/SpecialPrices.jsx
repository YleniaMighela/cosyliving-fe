import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";


const SpecialPrices = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const isDetail = location.pathname === "/";

    useEffect(() => {
        fetch("http://localhost:3000/products/special_price")
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
            {!isHomePage && (
                <>
                    <Link to="/">
                        <button id="button_notfound">Indietro</button>
                    </Link>
                    <h1>Prodotti in Promozione</h1>

                </>
            )}
            <section>


                <Link to="/special-price">

                    <div className="products-grid">

                        {products.slice(0, isHomePage ? 6 : products.length).map((product) => (
                            <div key={product.id} className="product-card">

                                <img src={`${product.img_cover}`} alt={product.name} />
                                <h2>{product.name}</h2>
                                <p className="price">€{Number(product.price).toFixed(2)}</p>
                                <p className="discount">Sconto: {product.discount}%</p>
                                {!isDetail && (
                                    <Link to={`/products/${product.slug}`} className="not_link product-link"> <button className="bottone_dettaglio">Vai al dettaglio</button></Link>
                                )}
                            </div>
                        ))}
                    </div>
                </Link>
            </section>
        </div>
    );
};

export default SpecialPrices;