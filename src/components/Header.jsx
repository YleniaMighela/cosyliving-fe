// importo il componente dallLinklibreriLinkdi react-router
import { Link } from "react-router-dom"
// import SearchBar from "./SearchBar";


export default function Header() {

    return (


        <header>
            <div className="navba">
                <Link to="/"><h1 className="title">CosyLiving</h1></Link>
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


        </header >

    );



}