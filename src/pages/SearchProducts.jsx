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
            <input type="radio" name="data" value="asc" />
            Crescente
          </label>
          <label>
            <input type="radio" name="data" value="desc" />
            Decrescente
          </label>
        </div>
        <div>
          <span>Prezzo </span>
          <label>
            <input
              type="radio"
              name="price"
              value="asc"
              onChange={() => setSearchRes(numOrder(searchRes, "price", "asc"))}
            />
            Crescente
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="desc"
              onChange={() =>
                setSearchRes(numOrder(searchRes, "price", "desc"))
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
              name="name"
              value="asc"
              onChange={() =>
                setSearchRes(stringOrder(searchRes, "name", "asc"))
              }
            />
            Crescente
          </label>
          <label>
            <input
              type="radio"
              name="name"
              value="desc"
              onChange={() =>
                setSearchRes(stringOrder(searchRes, "name", "desc"))
              }
            />
            Decrescente
          </label>
        </div>
      </div>
    </div>
  );
}
