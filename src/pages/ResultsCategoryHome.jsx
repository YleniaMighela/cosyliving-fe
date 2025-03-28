import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ResultsCategoryHome() {
    const { name } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function fetchProducts() {
        axios.get(`http://localhost:3000/search/${name}`)
            .then((res) => {
                setProducts(res.data);
                console.log("Dati ricevuti dal backend:", res.data); // DEBUG
            })
            .catch((err) => {
                setError(err.response?.data?.error || "Errore durante il recupero dei dati");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchProducts();
    }, [name]);

    if (loading) return <p>Caricamento...</p>;
    if (error) return <p>{error}</p>;


    return (
        <>
            <h2 id="resultsCategory">Risultati per: {name}</h2>
            <div className="container_categoryhome">

                <div >

                    {products
                        .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
                        .map((product) => (
                            <>
                                <Link to={`/products/${product.name}`} className="not_link">
                                    <div className="container_infocategory">
                                        <div key={product.id}>
                                            <div className="info">
                                                <h5>{product.name}</h5>
                                                <p>€{product.price}</p>
                                            </div>
                                            <img className="img_category1" src={product.img_cover} alt={product.name} />

                                        </div>
                                    </div>
                                </Link>

                            </>
                        ))}
                </div>
            </div>
        </>
    );
}