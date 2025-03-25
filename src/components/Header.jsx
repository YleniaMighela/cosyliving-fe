// importo il componente dalla libreria di react-router
import { Link } from "react-router-dom"
// import SearchBar from "./SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Header() {

    return (
        <header>



            <nav className="navbar navbar-expand-lg  sedia " >
                <h1>CosyLiving</h1>
                <div className="container-fluid">

                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            PRODOTTI
                        </Link>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Divani</a></li>
                            <li><a className="dropdown-item" href="#">Poltrone</a></li>
                            <li><a className="dropdown-item" href="#">Pouf</a></li>
                            <li><a className="dropdown-item" href="#">Tavoli</a></li>
                            <li><a className="dropdown-item" href="#">Tavolini</a></li>
                            <li><a className="dropdown-item" href="#">Sedie</a></li>
                            <li><a className="dropdown-item" href="#">Lampade</a></li>
                            <li><a className="dropdown-item" href="#">Librerie</a></li>
                        </ul>
                    </li>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* sezione promozioni*/}
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="#">PROMOZIONI</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="#">NUOVI ARRIVI</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="#">CLIENTI CONTENTI</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>



        </header >
    );



}