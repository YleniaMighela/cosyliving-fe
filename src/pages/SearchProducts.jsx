// richiamo il componente Card Products e FilterSearch
// pagina che mostra tutti i prodotti e filtraggio
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function SearchProduct() {
  const params = useParams();
  console.log(params);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/search/${params.value}`)
      .then((response) => console.log(response.data))
      .catch((err) => console.error(err));
  }, [params.value]);

  return (
    <div>
      <h2>Risultati di Ricerca per la parola: {params.value}</h2>
    </div>
  );
}
