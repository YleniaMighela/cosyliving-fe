import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
// searchproducts

export default function FilterSearch() {
  // const location = useLocation(); // Recupera l'URL attuale
  const navigate = useNavigate();

  // State Var that contains the searchbar value
  const [valueSearch, setValueSearch] = useState("");

  const isHiddenPage = location.pathname.startsWith("/404");
  // location.pathname.startsWith("/trip") ||
  // location.pathname.startsWith("/addPassengers");

  return (
    <div className="form_search">
      {!isHiddenPage && (
        <>
          <input
            className="input_search"
            type="search"
            placeholder="Cerca il tuo prodotto..."
            value={valueSearch}
            onChange={(e) => setValueSearch(e.target.value)}
          />
          <button
            className="button_search"
            type="submit"
            onClick={() => navigate(`/search/${valueSearch}`)}
          >
            Cerca
          </button>
        </>
      )}
    </div>
  );
}
