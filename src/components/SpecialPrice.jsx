import { Link } from "react-router-dom"
import SpecialPrices from "../pages/SpecialPrices";

export default function SpecialPrice() {

    return (
        <>
            <Link to="/special-price">  <h3>Special Price</h3> </Link>
            <div className="container_imgprice">

                <Link to="/special-price">
                    <img id="special" src="../img/divano.jpg" alt="Promozioni" />
                </Link>

                <div className="container_newarrival">
                    <SpecialPrices />

                </div>
            </div>
        </>
    );
}

