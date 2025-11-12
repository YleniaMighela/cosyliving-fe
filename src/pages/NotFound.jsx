// importiamo parte LInk del modulo react-router
import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <>

            <div className="container_notFound">
                <h2>Oooops!!</h2>
                <p>La pagina che stai cercando non è stata trovata...</p>

            </div>
            <Link to="/"> <button id="button_notfound">Torna alla home</button></Link>



        </>
    )
}

