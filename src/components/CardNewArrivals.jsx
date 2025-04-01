import { Link } from "react-router-dom";
import NewArrivalPage from "../pages/NewArrivalPage";

export default function NewArrivalsCard() {
    return (
        <>
            <div className="container_imgprice">
                <Link to="/new-arrivals"><h3>New Arrivals</h3>    </Link>

                <img id="special" src="../img/nuovi arrivi.jpg" alt="Nuovi Arrivi" />
                <NewArrivalPage />
            </div>

        </>
    );
}