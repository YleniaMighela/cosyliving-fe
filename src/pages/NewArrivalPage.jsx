import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const NewArrivalPage = () => {
    const [newArrivals, setNewArrivals] = useState([]);

    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const isDetail = location.pathname === "/";

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

            {!isHomePage && (
                <>
                    <Link to="/">
                        <button id="button_notfound">Indietro</button>
                    </Link>
                    <h1>Nuovi Arrivi</h1>
                </>
            )}
            <section>


                <Link to="/new-arrivals">

                    <div className="products-grid">


                        {newArrivals.map((product) => (
                            <div key={product.id} className="product-card">
                                <em>Disponibile dal: {new Date(product.created_at).toLocaleDateString()}</em>
                                <img className="img_newarri" src={`${product.img_cover}`} alt={product.name} />
                                <h2>{product.name}</h2>

                                <p className="price">{Number(product.price).toFixed(2)}€</p>
                                {!isDetail && (
                                    <Link to={`/products/${product.slug}`} className="not_link product-link"> <button className="bottone_dettaglio">Vai al dettaglio</button></Link>

                                )}

                            </div>

                        ))}
                    </div>
                </Link>
            </section>


        </div >
    );
};

export default NewArrivalPage;