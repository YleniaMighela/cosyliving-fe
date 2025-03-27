// componente CardCategory
// importiamo parte LInk del modulo react-router
import { Link } from "react-router-dom"
import CardCategory from "../components/CardCategory";

export default function CategoryProducts() {
    return (
        <>

            <div className="container_notFound">
                <CardCategory />

            </div>
            <Link to="/"> <button id="button_notfound">Torna alla home</button></Link>



        </>
    )
}