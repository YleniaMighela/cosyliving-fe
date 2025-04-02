import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ResultsCategoryHome() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function fetchProducts() {
    axios
      .get(`http://localhost:3000/search/category/${name}`)
      .then((res) => {
        setProducts(res.data);
        console.log("Dati ricevuti dal backend:", res.data); // DEBUG
      })
      .catch((err) => {
        setError(
          err.response?.data?.error || "Errore durante il recupero dei dati"
        );
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
      <Link to="/">
        <button id="button_notfound">Indietro</button>
      </Link>
      <div className="special-price-container">
        <div className="products-grid">
          {products
            .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
            .map((product) => (
              <>
                <div className="product-card hover-img detail-card">
                  <div key={product.id} className="">
                    <Link to={`/products/${product.slug}`} className="not_link">
                      <h2 className="product-name">{product.name}</h2>
                      <img
                        className="img_category1"
                        src={product.img_cover}
                        alt={product.name}
                      />
                      <p className="price_category">{product.price} €</p>
                    </Link>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
}
