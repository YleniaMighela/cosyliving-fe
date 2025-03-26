// qui ci va il carossello

import React, { useState } from "react";


const images = [
    "/divani-componibili.jpg",
    "/tips-img.webp"

];

const CardHero = () => {
    const [index, setIndex] = useState(0);

    const moveTo = (i) => {
        setIndex(i);
    };

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