import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

import FilterSearch from "./FilterSearch";

export default function Header() {
  return (
    <header>
      <div className="navba">
        <Link to="/">
          <h1 className="title">
            CosyLiving
            <FontAwesomeIcon icon={faHouse} />
          </h1>
        </Link>
        {/* sezione navbar */}
        <div className="dropdown">
          <button>CATEGORIE ▼</button>
          <div className="dropdown-content">
            <Link to="#">Divani</Link>
            <Link to="#">Poltrone</Link>
            <Link to="#">Pouf</Link>
            <Link to="#">Tavolini</Link>
            <Link to="#">Sedie</Link>
            <Link to="#">Lampade</Link>
            <Link to="#">Librerie</Link>
          </div>
        </div>
      </div>

      {/* sezione search */}
      <FilterSearch />

      {/* sezione icone */}
      <div className="icons_header">
        <Link to="#">
          <FontAwesomeIcon
            icon={faCartShopping}
            size="2x"
            className="cart-icon"
          />
        </Link>
        <Link to="#">
          <FontAwesomeIcon icon={faHeart} size="2x" className="heart-icon" />
        </Link>
      </div>
    </header>
  );
}
