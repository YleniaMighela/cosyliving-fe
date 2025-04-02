import emailjs from "emailjs-com";
import { useState, useEffect } from "react";
import axios from "axios";

const initialPersonalData = {
  name: "",
  surname: "",
  email: "",
  shipment_address: "",
  city: "",
  phone_num: "",
  cf: "",
  cap: "",
  products: [],
  totalPrice: 0,
};

const initialBillingData = {
  name_billing: "",
  surname_billing: "",
  billing_address: "",
  city_billing: "",
  cap_billing: "",
};

export default function FormCliente() {
  const [personalData, setPersonalData] = useState(initialPersonalData);
  const [billingData, setBillingData] = useState(initialBillingData);
  const [clients, setClients] = useState([]);
  const [billingInfo, setBillingInfo] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("Cart")) || []
  );
  const [tot_price, setTot_price] = useState(0)

  // Recupero dati da localStorage
  useEffect(() => {
    setClients(JSON.parse(localStorage.getItem("clients")) || []);
    setBillingInfo(JSON.parse(localStorage.getItem("billingInfo")) || []);
  }, []);

  // Salvo dati nel localStorage quando cambia lo stato
  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem("billingInfo", JSON.stringify(billingInfo));
  }, [billingInfo]);

  // Funzione per ottenere i prezzi aggiornati
  function fetchPrices() {
    axios
      .post("http://localhost:3000/calc", cart, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setOrderProducts(response.data);


      })
      .catch((err) => {
        console.log(err);
      });

  }


  // Richiede i prezzi all'avvio
  useEffect(() => {
    fetchPrices();
  }, []);
  console.log(orderProducts);

  function fetch() {
    axios
      .post("http://localhost:3000/calc/last", orderProducts, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setTot_price(response.data.tot_price)



      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetch();
  }, [orderProducts]);

  // Aggiorna l'oggetto `products` in `personalData` quando `orderProducts` cambia
  useEffect(() => {
    if (orderProducts.length > 0) {
      setPersonalData((prevData) => ({
        ...prevData,
        products: orderProducts.map((product) => ({
          id: product.id,
          quantity: product.quantity,
        })),
      }));
    }
  }, [orderProducts]);

  // Ricalcola il prezzo totale quando cambia `orderProducts`
  const prezzo_totale = orderProducts.reduce((acc, product) => {
    const prezzoScontato = product.unitPrice - (product.unitPrice * product.discount) / 100;
    return acc + prezzoScontato * product.quantity;
  }, 0);

  // Funzione per gestire l'input dei dati personali
  function handlePersonalData(e) {
    setPersonalData({
      ...personalData,
      [e.target.name]: e.target.value,
    });
  }

  // Funzione per gestire l'input dei dati di fatturazione
  function handleBillingData(e) {
    setBillingData({
      ...billingData,
      [e.target.name]: e.target.value,
    });
  }

  // Salvataggio dati personali
  function handlePersonalSubmit(e) {
    e.preventDefault();
    const newClient = {
      id: clients.length === 0 ? 1 : clients[clients.length - 1].id + 1,
      ...personalData,
    };
    setClients([...clients, newClient]);
    setPersonalData(initialPersonalData);
  }

  // Salvataggio dati di fatturazione
  function handleBillingSubmit(e) {
    e.preventDefault();
    const newBilling = {
      id:
        billingInfo.length === 0
          ? 1
          : billingInfo[billingInfo.length - 1].id + 1,
      ...billingData,
    };
    setBillingInfo([...billingInfo, newBilling]);
    setBillingData(initialBillingData);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const totalInfo = {
      ...personalData,
      ...billingData,
      products: cart,
      totalPrice: prezzo_totale.toFixed(2),
    };

    axios
      .post(`http://localhost:3000/order/`, totalInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        localStorage.clear();
        setCart([]);
        window.location.href = "/order-summary";
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Abbiamo riscontrato un errore");
      });

    handlePersonalSubmit(e);
  }

  return (
    <>
      <div className="ciao">
        <section className="section_ordine">
          <div className="container_riepilogo">
            <h2>Riepilogo Ordine</h2>
            {orderProducts.length === 0 ? (
              <p>Nessun prodotto aggiunto al carrello</p>
            ) : (
              <>
                <ul>
                  {orderProducts.map((product, index) => (
                    <li key={index}>
                      {product.name} x {product.quantity} - €{product.unitPrice}
                    </li>
                  ))}
                </ul>
                <p>Totale prodotti: €{tot_price - 9.99}</p>
                {tot_price - 9.99 <= 1000 ? (
                  <p>
                    <strong>Spedizione €9,99</strong>
                  </p>
                ) : (
                  <p>
                    <strong>
                      <s>Spedizione €9,99</s>
                    </strong>
                  </p>
                )}
                <p>
                  <strong>Totale: €{tot_price}</strong>
                </p>
              </>
            )}
          </div>
        </section>

        <section>
          <form className="form_personali" onSubmit={handleSubmit}>
            <h2>Inserisci Dati Personali</h2>
            <input type="text" name="name" placeholder="Nome...*" value={personalData.name} onChange={handlePersonalData} required />
            <input type="text" name="surname" placeholder="Cognome...*" value={personalData.surname} onChange={handlePersonalData} required />
            <input type="email" name="email" placeholder="Email...*" value={personalData.email} onChange={handlePersonalData} required />
            {errorMessage && <p>{errorMessage}</p>}
            <button type="submit">Invia dati</button>
          </form>
        </section>
      </div>
    </>
  );
}
