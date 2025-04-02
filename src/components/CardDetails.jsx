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
  const [text, setText] = useState("Aggiungi al carrello")
  const [classb, setClassb] = useState("add-to-cart")

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

  function CalcPrice(price, mult, discount) {
    let finalPrice = price;

    if (discount > 0) {
      // Calcola il prezzo scontato
      finalPrice = price * (1 - discount / 100);
    }

    return Number(finalPrice * mult).toFixed(2);
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
        existingProduct.quantity,
        product.discount
      );
    } else {
      // Otherwise, add a new product
      var Product = {
        id: product.id,
        name: product.name,
        img: imageUrl,
        price: CalcPrice(Number(product.price), Number(count), Number(product.discount)),
        quantity: count,
      };
      Cart.push(Product);
      console.log(Product);

    }

    // Save updated cart to localStorage
    localStorage.setItem("Cart", JSON.stringify(Cart));
    console.log(Cart);
    console.log(product);
    // console.log("localstorage" + localStorage);
  }


  function ChangeCart(text) {
    setText("Aggiunto al carrello")
    setClassb("add-to-cart added-to-cart")
    setInterval(() => {
      setText("Aggiungi al carrello")
      setClassb("add-to-cart")
      clearInterval()
    }, 2700);
  }

  function Call() {
    ChangeCart(text)
    StoreProduct();

  }

  return (
    <>


      <div className="product-detail">

        <div className="product-container">

          <div className="image-container">

            <img src={imageUrl} alt={product.name} className="product-image" />
            <div className="overlay">
              <p className="product-description">{product.description}</p>
            </div>
          </div>


          <div className="product-info">
            <div>
              <button id="button_notfound_detail" onClick={() => navigate(-1)}>
                Indietro
              </button>
            </div>
            <h2 className="product-name">{product.name}</h2>
            <em>Disponibile dal: {new Date(product.created_at).toLocaleDateString()}</em>

            <div className="container_dimension">
              <strong> Dimensioni:</strong>
              <ul>
                <li>
                  <em>Altezza:</em> {product.height} cm
                </li>
                <li>
                  <em>Lunghezza:</em> {product.length} cm
                </li>
                <li>
                  <em>Profondità:</em> {product.depth} cm
                </li>
                <li>
                  <em>Peso:</em> {product.weight} kg
                </li>
              </ul>

            </div>


            <div className="quantity-container">
              <label>
                <strong>Quantità :</strong>
              </label>
              <button
                onClick={() =>
                  setCount((count) => (count === 1 ? 1 : count - 1))
                }
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
            {product.discount > 0 ? (
              <>
                <p className="price">
                  Prezzo originale: <s>€{Number(product.price).toFixed(2)}</s>
                </p>
                <p className="discount">Sconto del: {product.discount}%</p>
                <p>
                  Prezzo scontato: <strong>€{product.discount_price}</strong>
                </p>
              </>
            ) : (
              <p className="price">
                Prezzo: <strong>€{Number(product.price).toFixed(2)}</strong>
              </p>
            )}
            <button className={classb} onClick={Call}>
              {text}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProducts;
