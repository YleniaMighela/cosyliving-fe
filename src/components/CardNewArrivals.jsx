import { Link } from "react-router-dom";

import NewArrivalPage from "../pages/NewArrivalPage";

export default function NewArrivalsCard() {
    return (
        <>
            <Link to="/new-arrivals"><h3>New Arrivals</h3>    </Link>
            <div className="container_imgprice">
                <Link to="/new-arrivals" className="hover-img new-arrivals" >
                    <img id="special" src="../img/nuovi arrivi.jpg" alt="Nuovi Arrivi" />
                </Link>
                <div className="container_newarrival">
                    <NewArrivalPage />

                </div>

            </div>


        </>
    );
}