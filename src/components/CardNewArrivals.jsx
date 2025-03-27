import { Link } from "react-router-dom"

export default function UltimiArrivi() {

    return (
        <>


            <div className="container_imgArrivi">
                <Link to="/"><h4 className="title_arrivi" >Nuovi Arrivi</h4></Link>

                <img className="img_arrivi" src="../img/sedia.jpg" alt="" />
                <img className="img_arrivi" src="../img/tavolini.jpg" alt="" />
                <img className="img_arrivi" src="../img/poltrona.jpg" alt="" />
                <img className="img_arrivi" src="../img/divano.jpg" alt="" />
                <img className="img_arrivi" src="../img/libreria.jpg" alt="" />




            </div>
        </>
    );
}