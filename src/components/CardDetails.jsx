// pagina di dettaglio prodotto
import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons/faInstagramSquare";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


const CardProducts = () => {
  // localStorage.removeItem("Wishlist")
  const { slug } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(1);

  const navigate = useNavigate();
  const [text, setText] = useState("Aggiungi al carrello")
  const [classb, setClassb] = useState("add-to-cart")
  const [classa, setClassa] = useState("heart-icon")
  const [Wish, setWish] = useState([])
  const [max, setMax] = useState(false)
  const [maxMessage, setMaxMessage] = useState(""); // Stato per il messaggio

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
  useEffect(() => {
    if (!product) return;
    const wishList = JSON.parse(localStorage.getItem("Wishlist")) || [];


    const existingProduct = wishList.find((item) => item.name === product.name);

    if (existingProduct) {
      setClassa(existingProduct ? "added-to-wishlist" : "heart-icon");
    }
  }, [product])
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
    let Cart = JSON.parse(localStorage.getItem("Cart")) || [];
    let existingProductIndex = Cart.findIndex((item) => item.name === product.name);

    let newCount = count;

    if (existingProductIndex !== -1) {
      let existingProduct = { ...Cart[existingProductIndex] };

      // Se la somma delle quantità supera la quantità massima disponibile
      if (existingProduct.quantity + count > product.quantity) {
        newCount = product.quantity - existingProduct.quantity; // Aggiunge solo il massimo possibile
        setMaxMessage("Quantità massima raggiunta, aggiunti solo i prodotti disponibili.");
      }

      existingProduct.quantity += newCount;
      existingProduct.price = CalcPrice(
        Number(product.price),
        existingProduct.quantity,
        product.discount
      );

      Cart[existingProductIndex] = existingProduct;
    } else {
      if (count > product.quantity) {
        newCount = product.quantity; // Limita la quantità al massimo disponibile
        setMaxMessage("Quantità massima raggiunta, aggiunti solo i prodotti disponibili.");
      }

      let newProduct = {
        id: product.id,
        name: product.name,
        img: imageUrl,
        price: CalcPrice(Number(product.price), Number(newCount), Number(product.discount)),
        quantity: newCount,
      };

      Cart.push(newProduct);
    }

    localStorage.setItem("Cart", JSON.stringify(Cart));
  }

  function Call() {
    ChangeCart();
    StoreProduct();
  }



  function addWish() {
    let wishList = JSON.parse(localStorage.getItem("Wishlist")) || [];

    let existingProduct = wishList.find((item) => item.name === product.name);


    if (existingProduct) {
      console.log("Rimosso dai preferiti");
      setClassa("heart-icon");

      wishList = wishList.filter(item => item.id !== existingProduct.id);
    } else {
      console.log("Aggiunto ai preferiti");
      let newProduct = {
        id: product.id,
        name: product.name,
        img: imageUrl,
      };

      wishList.push(newProduct);
      setClassa("added-to-wishlist heart-icon");
    }

    setWish([...wishList]);
    localStorage.setItem("Wishlist", JSON.stringify(wishList));
    // console.log(JSON.parse(localStorage.getItem("Wishlist")));

  }




  function ChangeCart() {
    setText("Aggiunto al carrello")
    setClassb("add-to-cart added-to-cart")
    setInterval(() => {
      setText("Aggiungi al carrello")
      setClassb("add-to-cart")
      clearInterval()
    }, 2700);
  }

  function Call() {
    ChangeCart()
    StoreProduct();

  }
  // console.log(JSON.parse(localStorage.getItem("Wishlist")));




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
              <p onClick={addWish}><FontAwesomeIcon icon={faHeart} size="2x" className={classa} /></p>
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
            {maxMessage === "" ? (

              <button className={classb} onClick={Call}>
                {text}
              </button>) : (
              <p> {maxMessage}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default CardProducts;
