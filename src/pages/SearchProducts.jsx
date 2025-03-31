// richiamo il componente Card Products e FilterSearch
// pagina che mostra tutti i prodotti e filtraggio
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import CardProduct from "../components/CardProduct";

export default function SearchProduct() {
  const params = useParams();

  // State Var that contains the query results
  const [searchRes, setSearchRes] = useState([]);

  useEffect(() => {
    if (searchRes.length > 0) setSearchRes([]);

    axios
      .get(`http://localhost:3000/search/${params.value}`)
      .then((response) => setSearchRes(response.data))
      .catch((err) => console.error(err));
  }, [params.value]);

  function stringSorter(arr, key, order) {
    let newSearchList = [];

    if (order === "asc") {
      newSearchList = [...arr].sort((a, b) => a[key].localeCompare(b[key]));
    } else {
      newSearchList = [...arr].sort((a, b) => b[key].localeCompare(a[key]));
    }
    console.log(newSearchList);
    return newSearchList;
  }

  function numSorter(arr, key, order) {
    let newSearchList = [];

    if (order === "asc") {
      newSearchList = [...arr].sort((a, b) => a[key] - b[key]);
    } else {
      newSearchList = [...arr].sort((a, b) => b[key] - a[key]);
    }

    console.log(newSearchList);
    return newSearchList;
  }

  function dateSorter(arr, key, order) {
    let newSearchList = [];

    if (order === "asc") {
      newSearchList = [...arr].sort(
        (a, b) => new Date(a[key]) - new Date(b[key])
      );
    } else {
      newSearchList = [...arr].sort(
        (a, b) => new Date(b[key]) - new Date(a[key])
      );
    }

    console.log(newSearchList);
    return newSearchList;
  }

  return (
    <>
      <h2>Risultati di Ricerca per la parola: {params.value}</h2>
      <div className="special-price-container">
        {/* sezione del filtro */}
        <h2>Ordina per:</h2>
        <div class="filter-container">
          <div>
            <span>Ultimi arrivi: </span>

            <label>
              <input
                type="radio"
                name="order"
                value="desc"
                id="created_at"
                onChange={(e) =>
                  setSearchRes(dateSorter(searchRes, e.target.id, e.target.value))
                }
              />
              Dal più recente
            </label>

            <label>
              <input
                type="radio"
                name="order"
                value="asc"
                id="created_at"
                onChange={(e) =>
                  setSearchRes(dateSorter(searchRes, e.target.id, e.target.value))
                }
              />
              Al meno recente
            </label>
            <br />
          </div>
          <div>
            <span>Prezzo: </span>
            <label>
              <input
                type="radio"
                name="order"
                value="asc"
                id="price"
                onChange={(e) =>
                  setSearchRes(numSorter(searchRes, e.target.id, e.target.value))
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
                onChange={(e) =>
                  setSearchRes(numSorter(searchRes, e.target.id, e.target.value))
                }
              />
              Decrescente
            </label>
          </div>

        </div>


        {/* sezione del prodotto */}
        <div className="products-grid " >
          {searchRes.length > 0 ? (
            searchRes.map((res) => (
              <Link to={`/products/${res.slug}`} key={res.id}>
                <CardProduct prodInfos={res} />
              </Link>

            ))
          ) : (
            <span>Nessun Risultato Trovato</span>
          )}
        </div>

      </div >
    </>
  );
}
