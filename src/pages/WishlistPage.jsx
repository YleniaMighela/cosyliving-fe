import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem("Wishlist")) || [];
        setWishlist(storedWishlist);
    }, []);

    const removeFromWishlist = (id) => {
        const updatedWishlist = wishlist.filter((item) => item.id !== id);
        setWishlist(updatedWishlist);
        localStorage.setItem("Wishlist", JSON.stringify(updatedWishlist));
    };



    return (
        <div className="wishlist-container">
            <h2 className="wishlist-title">La tua Wishlist</h2>
            {wishlist.length === 0 ? (
                <p className="empty-message">Nessun prodotto nei preferiti.</p>
            ) : (
                <div className="wishlist-grid">
                    {wishlist.map((product) => {
                        if (!product.id || !product.name || !product.img) {
                            return null; // Ignora prodotti non validi
                        }

                        return (
                            <div key={product.id} className="wishlist-item hover-img detail-card">
                                <Link to={`/products/${product.name}`}>
                                    <h3 className="wishlist-title">{product.name}</h3>
                                    <img src={product.img} alt={product.name} className="wishlist-image" />
                                </Link>
                                <button className="remove-button" onClick={() => removeFromWishlist(product.id)}>
                                    <FontAwesomeIcon icon={faHeart} className="wishlist-remove" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );

};

export default Wishlist;
