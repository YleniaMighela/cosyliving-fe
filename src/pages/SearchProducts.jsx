// richiamo il componente Card Products e FilterSearch
// pagina che mostra tutti i prodotti e filtraggio
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// Components
import CardProducts from "../components/CardProducts";

export default function SearchProduct() {
  const params = useParams();
  // console.log(params);

  // State Var that contains the query results
  const [searchRes, setSearchRes] = useState([]);

  useEffect(() => {
    if (searchRes.length > 0) setSearchRes([]);

    axios
      .get(`http://localhost:3000/search/${params.value}`)
      .then((response) => setSearchRes(response.data))
      .catch((err) => console.error(err));
  }, [params.value]);

  return (
    <div>
      <h2>Risultati di Ricerca per la parola: {params.value}</h2>
      <ul>
        {searchRes.length > 0 ? (
          searchRes.map((res) => <li>{res.name}</li>)
        ) : (
          <span>Nessun Risultato Trovato</span>
        )}
      </ul>
    </div>
  );
}
