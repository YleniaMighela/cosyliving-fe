// pagina di dettaglio del singolo prodotto
// componente CardProduct
import { Link } from "react-router-dom";
import CardDetails from "../components/CardDetails";

export default function DetailProducts() {
  return (
    <>
      <div>
        <CardDetails />
      </div>
      <Link to="/">
        {" "}
        <button id="button_notfound">Torna alla home</button>
      </Link>
    </>
  );
}
