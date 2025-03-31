import { Link } from "react-router-dom";

export default function NewArrivalsCard() {
    return (
        <div className="container_imgprice">
            <h3>New Arrivals</h3>
            <Link to="/new-arrivals">
                <img id="special" src="../img/divano.jpg" alt="Nuovi Arrivi" />
            </Link>
        </div>
    );
}