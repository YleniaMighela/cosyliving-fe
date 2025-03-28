import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
        <div>
            <h2>Risultati per: {name}</h2>
            <div >
                {products.map((product) => (
                    <div key={product.id}>
                        <img src={product.img_cover} alt={product.name} />
                        <h5>{product.name}</h5>
                        <p>€{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}