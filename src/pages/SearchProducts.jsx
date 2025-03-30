// richiamo il componente Card Products e FilterSearch
// pagina che mostra tutti i prodotti e filtraggio
import { useParams } from "react-router-dom";
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

  function stringOrder(arr, key, order) {
    let newSearchList = [];

    if (order === "asc") {
      newSearchList = [...arr].sort((a, b) => a[key].localeCompare(b[key]));
    } else {
      newSearchList = [...arr].sort((a, b) => b[key].localeCompare(a[key]));
    }
    console.log(newSearchList);
    return newSearchList;
  }

  function numOrder(arr, key, order) {
    let newSearchList = [];

    if (order === "asc") {
      newSearchList = [...arr].sort((a, b) => a[key] - b[key]);
    } else {
      newSearchList = [...arr].sort((a, b) => b[key] - a[key]);
    }

    console.log(newSearchList);
    return newSearchList;
  }

  function dateOrder(arr, key, order) {
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
    <div>
      <div>
        <h2>Risultati di Ricerca per la parola: {params.value}</h2>
        {searchRes.length > 0 ? (
          searchRes.map((res) => <CardProduct key={res.id} prodInfos={res} />)
        ) : (
          <span>Nessun Risultato Trovato</span>
        )}
      </div>
      <div>
        <h2>Ordina per:</h2>
        <div>
          <span>Data </span>
          <label>
            <input
              type="radio"
              name="order"
              value="asc"
              id="created_at"
              onChange={(e) =>
                setSearchRes(dateOrder(searchRes, e.target.id, e.target.value))
              }
            />
            Crescente
          </label>
          <label>
            <input
              type="radio"
              name="order"
              value="desc"
              id="created_at"
              onChange={(e) =>
                setSearchRes(dateOrder(searchRes, e.target.id, e.target.value))
              }
            />
            Decrescente
          </label>
        </div>
        <div>
          <span>Prezzo </span>
          <label>
            <input
              type="radio"
              name="order"
              value="asc"
              id="price"
              onChange={(e) =>
                setSearchRes(numOrder(searchRes, e.target.id, e.target.value))
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
                setSearchRes(numOrder(searchRes, e.target.id, e.target.value))
              }
            />
            Decrescente
          </label>
        </div>
        <div>
          <span>Nome </span>
          <label>
            <input
              type="radio"
              name="order"
              value="asc"
              id="name"
              onChange={(e) =>
                setSearchRes(
                  stringOrder(searchRes, e.target.id, e.target.value)
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
              id="name"
              onChange={(e) =>
                setSearchRes(
                  stringOrder(searchRes, e.target.id, e.target.value)
                )
              }
            />
            Decrescente
          </label>
        </div>
      </div>
    </div>
  );
}
