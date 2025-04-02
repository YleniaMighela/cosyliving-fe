// richiamo il componente Card Products e FilterSearch
// pagina che mostra tutti i prodotti e filtraggio
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Components
import CardProduct from "../components/CardProduct";

export default function SearchProduct() {
  const { value, sorter } = useParams();

  // State Var that contains the query results
  const [searchRes, setSearchRes] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    // Clean searchRes
    if (searchRes.length > 0) setSearchRes([]);

    // Axios call that search specific prods
    axios
      .get(`http://localhost:3000/search/${value}${sorter ? `/${sorter}` : ""}`)
      .then((response) => setSearchRes(response.data))
      .catch((err) => console.error(err));
  }, [value, sorter]);

  return (
    <>
      <button id="button_notfound" onClick={() => navigate(-1)}>
        Indietro
      </button>

      <div className="order_by">
        <h2>Risultati di Ricerca per la parola: {value}</h2>
        <div className="special-price-container">
          {/* sezione del filtro */}
          <h2>Ordina per:</h2>
          <div className="filter-container">
            <div className="ultim_arrivi">
              <span>Ultimi arrivi: </span>

              <label>
                <input
                  type="radio"
                  name="order"
                  value="desc"
                  id="date"
                  checked={sorter === "date_desc"}
                  onChange={(e) =>
                    navigate(
                      `/search/${value}/${e.target.id}_${e.target.value}`
                    )
                  }
                />
                Dal più recente
              </label>

              <label>
                <input
                  type="radio"
                  name="order"
                  value="asc"
                  id="date"
                  checked={sorter === "date_asc"}
                  onChange={(e) =>
                    navigate(
                      `/search/${value}/${e.target.id}_${e.target.value}`
                    )
                  }
                />
                Al meno recente
              </label>
              <br />
            </div>

            <div className="ultim_arrivi">
              <span>Prezzo: </span>
              <label>
                <input
                  type="radio"
                  name="order"
                  value="asc"
                  id="price"
                  checked={sorter === "price_asc"}
                  onChange={(e) =>
                    navigate(
                      `/search/${value}/${e.target.id}_${e.target.value}`
                    )
                  }
                />
                Crescente
              </label>
              <label>
                <input
                  type="radio"
                  name="order"
                  value="desc"
                  id="price"
                  checked={sorter === "price_desc"}
                  onChange={(e) =>
                    navigate(
                      `/search/${value}/${e.target.id}_${e.target.value}`
                    )
                  }
                />
                Decrescente
              </label>
            </div>

            <div className="ultim_arrivi">
              <br />
              <span>Nome: </span>

              <label>
                <input
                  type="radio"
                  name="order"
                  value="asc"
                  id="name"
                  checked={sorter === "name_asc"}
                  onChange={(e) =>
                    navigate(
                      `/search/${value}/${e.target.id}_${e.target.value}`
                    )
                  }
                />
                A-Z
              </label>

              <label>
                <input
                  type="radio"
                  name="order"
                  value="desc"
                  id="name"
                  checked={sorter === "name_desc"}
                  onChange={(e) =>
                    navigate(
                      `/search/${value}/${e.target.id}_${e.target.value}`
                    )
                  }
                />
                Z-A
              </label>
              <br />
            </div>
          </div>

          {/* sezione del prodotto */}
          <div className="products-grid ">
            {searchRes.length > 0 ? (
              searchRes.map((res) => (
                <div key={res.id} className="product-item ">
                  <div className="hover-img detail-card">


                    <Link
                      to={`/products/${res.slug}`}
                      className="not_link product-link "
                    >
                      <CardProduct prodInfos={res} />


                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <span>Nessun Risultato Trovato</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
