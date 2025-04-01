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
  // console.log(localStorage);

  // localStorage.clear();
  const [personalData, setPersonalData] = useState(initialPersonalData);
  const [billingData, setBillingData] = useState(initialBillingData);
  const [clients, setClients] = useState([]);
  const [billingInfo, setBillingInfo] = useState([]);
  // variabili di stato per riepilogo dell'ordine
  const [orderProducts, setOrderProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("Cart")) || []
  );

  // Recupero dati da localStorage
  useEffect(() => {
    const storedClients = JSON.parse(localStorage.getItem("clients")) || [];

    setClients(storedClients);

    const storedBilling = JSON.parse(localStorage.getItem("billingInfo")) || [];

    setBillingInfo(storedBilling);
  }, []);

  // Salvo dati nel localStorage quando cambia lo stato
  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem("billingInfo", JSON.stringify(billingInfo));
  }, [billingInfo]);

  // riepilogo ordini dal localstorage
  useEffect(() => {
    setOrderProducts(JSON.parse(localStorage.getItem("Cart")) || []);
  }, []);
  console.log(orderProducts);

  var prezzo_totale = 0;
  for (var i = 0; i < orderProducts.length; i++) {
    prezzo_totale =
      prezzo_totale +
      Number(orderProducts[i].price) * Number(orderProducts[i].quantity);
  }
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

    // Controlla se l'email o codice fiscale già esistono
    const exists = clients.some(
      (c) =>
        c.email === personalData.email ||
        c.codiceFiscale === personalData.codiceFiscale
    );

    // if (exists) {
    //     alert("Email o Codice Fiscale già esistente!");
    //     return;
    // }

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

  // function sendEmail(e) {
  //   e.preventDefault();
  //   // email conferma ordine al cliente
  //   emailjs
  //     .sendForm(
  //       "service_z4wn6ts",
  //       "template_yfwhf7f",
  //       e.target,
  //       "YwWXI2IpotKYzl-pl"
  //     )
  //     .then(
  //       (result) => { },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  //   // email conferma ordine al sitp
  //   emailjs
  //     .sendForm(
  //       "service_z4wn6ts",
  //       "template_792darg",
  //       e.target,
  //       "YwWXI2IpotKYzl-pl"
  //     )
  //     .then(
  //       (result) => { },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  // }

  function handleSubmit(e) {
    e.preventDefault();

    const totalInfo = {
      ...personalData,
      ...billingData,
      products: cart,
      totalPrice: prezzo_totale,
    };
    console.log(totalInfo);

    // **Salva i dati dell'ordine nel localStorage**
    // localStorage.setItem("lastOrder", JSON.stringify(totalInfo));

    // Axios Call
    axios
      .post(`http://localhost:3000/order/`, totalInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);

        localStorage.clear();

        console.log("Carrello svuotato, nuovo stato:", []);

        setCart([]);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Abbiamo riscontrato un errore");
      });

    // sendEmail(e);
    handlePersonalSubmit(e);

    //Reindirizza alla pagina degli ordini
    window.location.href = "/order-summary";
  }

  useEffect(() => {
    if (orderProducts.length > 0) {
      setPersonalData((currentPersonalData) => ({
        ...currentPersonalData,
        products: orderProducts.map((product) => ({
          id: product.id,
          quantity: product.quantity,
        })),
      }));
    }
  }, [orderProducts]);

  return (
    <>
      {/* sezione riepilogo ordine */}
      <section className="section_ordine">
        <div className="container_riepilogo">
          <h2>Riepilogo Ordine</h2>
          {orderProducts.length === 0 ? (
            <p>Nessun prodotto aggiunto al carrello</p>
          ) : prezzo_totale <= 1000 ? (
            <>
              <ul>
                {orderProducts.map((product, index) => (
                  <li key={index}>
                    {product.name} x {product.quantity} - €{product.price}
                  </li>
                ))}
              </ul>
              <p>Totale prodotti €{prezzo_totale.toFixed(2)}</p>
              <p>
                <strong>Spedizione €9,99</strong>
              </p>
              <p>
                <strong>Totale: €{(prezzo_totale + 9.99).toFixed(2)}</strong>
              </p>
            </>
          ) : (
            <>
              <ul>
                {orderProducts.map((product, index) => (
                  <li key={index}>
                    {product.name} x {product.quantity} - €{product.price}
                  </li>
                ))}
              </ul>
              <p>Totale prodotti €{prezzo_totale.toFixed(2)}</p>
              <p>
                <strong>
                  <s>Spedizione €9,99</s>
                </strong>
              </p>
              <p>
                <strong>Totale: €{prezzo_totale.toFixed(2)}</strong>
              </p>
            </>
          )}
        </div>
      </section>
      {/* sezione dati personali */}
      <section>
        {/* Form Dati Personali */}
        <form
          className="form_personali"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h2>Inserisci Dati Personali</h2>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Nome...*"
              value={personalData.name}
              onChange={handlePersonalData}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="surname"
              placeholder="Cognome...*"
              value={personalData.surname}
              onChange={handlePersonalData}
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email...*"
              value={personalData.email}
              onChange={handlePersonalData}
              required
            />
          </div>
          <div>
            <input
              type="tel"
              name="phone_num"
              placeholder="Numero telefonico...*"
              value={personalData.phone_num}
              onChange={handlePersonalData}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="cf"
              placeholder="Codice Fiscale...*"
              value={personalData.cf}
              onChange={handlePersonalData}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="shipment_address"
              value={personalData.shipment_address}
              placeholder="Via...*"
              onChange={handlePersonalData}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="cap"
              value={personalData.cap}
              placeholder="CAP...*"
              onChange={handlePersonalData}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="city"
              value={personalData.city}
              placeholder="Città...*"
              onChange={handlePersonalData}
              required
            />
          </div>
          {errorMessage}
          <div>
            <button type="submit">Invia dati</button>
          </div>
        </form>
      </section>

      {/* sezione dati fatturazione*/}
      <section>
        {/* Form Dati di Fatturazione */}

        <form className="form_personali" onSubmit={handleBillingSubmit}>
          <h2>Inserisci Dati di Fatturazione</h2>
          <div>
            <input
              type="text"
              name="name_billing"
              placeholder="Nome..."
              value={billingData.name_billing}
              onChange={handleBillingData}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="surname_billing"
              placeholder="Cognome..."
              value={billingData.surname_billing}
              onChange={handleBillingData}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="billing_address"
              placeholder="Indirizzo di Fatturazione..."
              value={billingData.billing_address}
              onChange={handleBillingData}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="city_billing"
              value={billingData.city_billing}
              placeholder="Città..."
              onChange={handleBillingData}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="cap_billing"
              value={billingData.cap_billing}
              placeholder="CAP..."
              onChange={handleBillingData}
              required
            />
          </div>
        </form>
      </section>
    </>
  );
}
