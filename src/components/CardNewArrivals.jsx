import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react";
import axios from "axios";
export default function UltimiArrivi() {

    const [newArrivals, setNewArrivals] = useState([]);
    //funzione di gestione chiamata verso la rottaSHow
    function fetchNewArrival() {

        axios.get(`http://localhost:3000/products/new_arrivals`)

            .then((res) => {
                setNewArrivals(res.data);
                console.log(res.data);


            })

            .catch(err => {
                console.log(err);
                if (err.status === 404) redirect("/404")
            })

    }


    useEffect(fetchNewArrival, []);

    return (
        <>

            <div className="container_imgArrivi">
                <Link to="/">
                    <h4 className="title_arrivi">Nuovi Arrivi</h4>
                </Link>

                {/* Renderizza i nuovi arrivi */}
                {newArrivals.map((arrivo, index) => (
                    <div key={index}>
                        <Link to={`/products/${arrivo.slug}`}>
                            <img
                                className="img_arrivi"
                                src={arrivo.img_cover}
                                alt={arrivo.name}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </>



    );
}