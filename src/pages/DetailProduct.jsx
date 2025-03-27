// pagina di dettaglio del singolo prodotto
// componente CardProduct
import { Link } from "react-router-dom"
import CardProducts from "../components/CardProducts"

export default function DetailProducts() {
    return (
        <>

            <div >
                <CardProducts />

            </div>
            <Link to="/"> <button id="button_notfound">Torna alla home</button></Link>



        </>
    )
}