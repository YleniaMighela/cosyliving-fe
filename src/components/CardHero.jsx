// qui ci va il carossello

import React, { useState, useEffect } from "react";


const images = [
    "/arredo1.jpg",
    "/arredo2.jpg",
    "/arredo3.jpg",
    "/arredo4.jpg",
    "/divano.jpg",


];

const CardHero = () => {
    const [index, setIndex] = useState(0);

    const moveTo = (i) => {
        if (i >= images.length) {
            setIndex(0); // Torna all'inizio se è oltre il limite
        } else if (i < 0) {
            setIndex(images.length - 1); // Torna all'ultima immagine
        } else {
            setIndex(i);
        }

    };
    function auto_scroll() {
        var i = 0;
        setInterval(() => {
            i += 1
            if (i >= images.length) {
                setIndex(0); // Torna all'inizio se è oltre il limite
                i = 0
            } else if (i < 0) {
                setIndex(images.length - 1); // Torna all'ultima immagine
                i = images.length - 1
            } else {
                setIndex(i);
            }
            console.log(i);

        }, 3000)

    }

    useEffect(auto_scroll, [])

    return (
        <div className="carousel-container">
            <div className="carousel" style={{ transform: `translateX(-${index * 100}%)` }}>
                {images.map((src, i) => (
                    <img key={i} src={src} alt={`Slide ${i + 1}`} />
                ))}
            </div>

            <div className="navigation">
                {images.map((_, i) => (
                    <button key={i} className={index === i ? "active" : ""} onClick={() => moveTo(i)}></button>
                ))}
            </div>
        </div>
    );
};

export default CardHero;