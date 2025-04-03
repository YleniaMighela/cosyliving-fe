import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
// searchproducts

export default function FilterSearch() {
  // const location = useLocation(); // Recupera l'URL attuale
  const navigate = useNavigate();

  // State Var that contains the searchbar value
  const [valueSearch, setValueSearch] = useState("");
  // State Var that contains the option value
  const [optionSearch, setOptionSearch] = useState("all_product");

  const isHiddenPage = location.pathname.startsWith("/404");
  // location.pathname.startsWith("/trip") ||
  // location.pathname.startsWith("/addPassengers");

  return (
    <div className="form_search">
      {!isHiddenPage && (
        <>
          <select
            id="scelta"
            name="scelta"
            value={optionSearch}
            onChange={(e) => setOptionSearch(e.target.value)}
          >
            <option className="ctg" value="all_product">Tutto</option>
            <option className="ctg" value="name">Nome Prodotto</option>
            <option className="ctg" value="category">Categoria</option>
            <option className="ctg" value="discount">In Saldo</option>
          </select>
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
            onClick={() => {
              if (valueSearch.length != 0)
                navigate(`/search/${optionSearch}/${valueSearch}`);
            }}
          >
            Cerca
          </button>
        </>
      )}
    </div>
  );
}
