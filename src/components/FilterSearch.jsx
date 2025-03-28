import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
// searchproducts

export default function FilterSearch() {
  const location = useLocation(); // Recupera l'URL attuale
  console.log(location);
  const isHiddenPage = location.pathname.startsWith("/404");
  // location.pathname.startsWith("/trip") ||
  // location.pathname.startsWith("/addPassengers");

  //   useEffect(() => {
  //     axios
  //       .get(`http://localhost:3000/products/divano`)
  //       .then()
  //       .catch((err) => console.error(err));
  //   });

  return (
    <div className="form_search">
      {!isHiddenPage && (
        <>
          <input
            className="input_search"
            type="search"
            placeholder="Cerca il tuo prodotto..."
          />
          <button className="button_search" type="submit">
            Cerca
          </button>
        </>
      )}
    </div>
  );
}
