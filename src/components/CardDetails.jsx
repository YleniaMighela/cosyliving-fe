// pagina di dettaglio prodotto
import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons/faInstagramSquare";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CardProducts = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${slug}`);
        if (!response.ok) {
          throw new Error("Prodotto non trovato");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <p className="loading">Caricamento...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return null;
  // console.log(product);

  const imageUrl = product.img_cover.startsWith("http")
    ? product.img_cover
    : `/images/${product.img_cover}`;

  function CalcPrice(price, mult) {
    price = price * mult;
    // console.log(price);
    return Number(price).toFixed(2);
  }

  const handleCount = (e) => {
    let value = parseInt(e.target.value, 10);

    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > product.quantity) {
      value = product.quantity;
    }

    setCount(value);
  };

  function StoreProduct() {
    // Retrieve the existing cart or initialize an empty array
    var Cart = JSON.parse(localStorage.getItem("Cart")) || [];

    // Determine the new product ID
    var id_cart = Cart.length > 0 ? Cart[Cart.length - 1].id + 1 : 1;

    // Check if the product already exists in the cart
    var existingProduct = Cart.find((item) => item.name === product.name);

    if (existingProduct) {
      // If product exists, update its quantity
      existingProduct.quantity += count;
      existingProduct.price = CalcPrice(
        Number(product.price),
        existingProduct.quantity
      );
    } else {
      // Otherwise, add a new product
      var Product = {
        id: id_cart,
        img: imageUrl,
        name: product.name,
        price: CalcPrice(Number(product.price), Number(count)),
        quantity: count,
      };
      Cart.push(Product);
    }

    // Save updated cart to localStorage
    localStorage.setItem("Cart", JSON.stringify(Cart));
    console.log(Cart);
    // console.log("localstorage" + localStorage);
  }

  function Call() {
    // localStorage.clear()
    StoreProduct();
  }

  return (
    <div className="product-detail">
      <div className="product-container">
        <img src={imageUrl} alt={product.name} className="product-image" />
        <div className="product-info">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">
            €{CalcPrice(Number(product.price), Number(count))}
          </p>
          <div className="quantity-container">
            <label>Quantità</label>
            <button
              onClick={() => setCount((count) => (count === 1 ? 1 : count - 1))}
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max={product.quantity}
              className="quantity-input"
              onChange={handleCount}
              value={count}
            />
            <button
              onClick={() =>
                setCount((count) =>
                  count === product.quantity ? product.quantity : count + 1
                )
              }
            >
              +
            </button>
            {count === product.quantity && <p>Quantità massima ordinabile</p>}
          </div>
          <Link to="/cart">
            <button className="add-to-cart" onClick={Call}>
              Aggiungi al carrello
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardProducts;
