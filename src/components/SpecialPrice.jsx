import { Link } from "react-router-dom"
export default function SpecialPrice() {

    return (
        <>

            <div className="container_imgprice">
                <h3>Special Price</h3>
                <Link to="/special-price">
                    <img id="special" src="../img/divano.jpg" alt="" />
                </Link>
            </div>
        </>
    );
}

