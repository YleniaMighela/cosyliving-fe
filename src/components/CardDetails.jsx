// pagina di dettaglio prodotto
import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons/faInstagramSquare";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const CardProducts = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${slug}`);
        if (!response.ok) {
          throw new Error("Prodotto non trovato");
        }
        const data = await response.json();
        // console.log(data)
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


  return (
    <>

      <button id="button_notfound" onClick={() => navigate(-1)}>
        Indietro
      </button>

      <div className="product-detail">
        <div className="product-container">
          <div className="image-container">

            <img src={imageUrl} alt={product.name} className="product-image" />
            <div className="overlay">
              <p className="product-description">{product.description}</p>
            </div>

          </div>
          <div className="product-info">
            <h2 className="product-name">{product.name}</h2>


            <div className="container_dimension">
              <strong> Dimensioni:</strong>
              <ul>
                <li><em>Altezza:</em> {product.height} cm</li>
                <li><em>Lunghezza:</em> {product.length} cm</li>
                <li><em>Profondità:</em> {product.depth} cm</li>
                <li><em>Peso:</em> {product.weight} kg</li>
              </ul>

            </div>
            {/* 
            <div>
              <strong>Materiali:</strong>
              <span></span>
            </div>

            <div>
              <strong>Colori:</strong>
              <span></span>
            </div> */}

            <div className="quantity-container">
              <label><strong>Quantità :</strong></label>
              <button
                onClick={() => setCount((count) => (count === 1 ? 1 : count - 1))}
              >
                -
              </button>
              <p> {count} </p>

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


            <p className="product-price">
              {product.price} €
            </p>
            <p className="discount"> Sconto del: {product.discount} %</p>
            <button className="add-to-cart" onClick={StoreProduct()}>
              Aggiungi al carrello
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProducts;
