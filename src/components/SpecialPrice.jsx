import { Link } from "react-router-dom"
export default function SpecialPrice() {

    return (
        <>

            <div className="container_imgprice">
                <Link to="/"><h3>Special Price</h3></Link>
                <img id="special" src="../img/tavolino.jpg" alt="" />
            </div>
        </>
    );
}