import emailjs from "emailjs-com";
import { useState, useEffect } from "react";
import axios from "axios";
import { faL } from "@fortawesome/free-solid-svg-icons";

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
  const [errorMessage2, setErrorMessage2] = useState("");
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("Cart")) || []
  );
  const [tot_price, setTot_price] = useState(0);
  const [showBillingForm, setShowBillingForm] = useState(false);

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
        setTot_price(response.data.tot_price);
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
    const prezzoScontato =
      product.unitPrice - (product.unitPrice * product.discount) / 100;
    return acc + prezzoScontato * product.quantity;
  }, 0);

  // Check Values
  function inputValidator(value, regexp) {
    if (regexp.test(value)) {
      return true;
    } else {
      setErrorMessage(value + " non è un valido inserimento");
      return false;
    }
  }

  // Funzione per gestire l'input dei dati personali
  function handlePersonalData(e, regexp) {
    if (!regexp.test(e.target.value)) {
      setErrorMessage(`${e.target.value} non è un inserimento valido`);
      return;
    } else {
      setErrorMessage(""); // Nessun errore se esattamente 10 cifre
    }

    if (e.target.value.length < 10 && e.target.name === "phone_num") {
      setErrorMessage("Il numero deve avere esattamente 10 cifre.");
    } else {
      setErrorMessage(""); // Nessun errore se esattamente 10 cifre
    }

    if (e.target.value.length < 5 && e.target.name === "cap") {
      setErrorMessage("Il CAP deve avere esattamente 5 cifre.");
    } else {
      setErrorMessage(""); // Nessun errore se esattamente 10 cifre
    }

    setPersonalData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
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
  //       (result) => {},
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
  //       (result) => {},
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  // }

  // Funzione per gestire l'input dei dati di fatturazione
  function handleBillingData(e, regexp) {
    if (!regexp.test(e.target.value)) {
      setErrorMessage2(`${e.target.value} non è un inserimento valido`);
      return;
    } else {
      setErrorMessage2(""); // Nessun errore se esattamente 10 cifre
    }

    if (e.target.value.length < 5 && e.target.name === "cap_billing") {
      setErrorMessage2("Il CAP deve avere esattamente 5 cifre.");
    } else {
      setErrorMessage2(""); // Nessun errore se esattamente 10 cifre
    }

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
      .post("http://localhost:3000/order/", totalInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        localStorage.removeItem("Cart");
        setCart([]);
        console.log(
          "LocalStorage after clearing:",
          localStorage.getItem("Cart")
        );
        //Reindirizza alla pagina degli ordini
        setInterval(() => {
          window.location.href = "/order-summary";
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Abbiamo riscontrato un errore, riprova.");
      });

    handlePersonalSubmit(e);
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
      <div className="ciao">
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
                      {product.name} x {product.quantity} - €
                      {product.totalPrice}
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
                      {product.name} x {product.quantity} - €{product.unitPrice}
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
                  <strong>Totale: €{tot_price}</strong>
                </p>
              </>
            )}
          </div>
          {/* Form Dati Personali */}
          <section>
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
                  maxLength="50"
                  placeholder="Nome...*"
                  value={personalData.name}
                  onChange={(e) =>
                    handlePersonalData(e, /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{0,50}$/)
                  }
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="surname"
                  maxLength="50"
                  placeholder="Cognome...*"
                  value={personalData.surname}
                  onChange={(e) =>
                    handlePersonalData(e, /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{0,50}$/)
                  }
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  maxLength="100"
                  placeholder="Email...*"
                  value={personalData.email}
                  onChange={(e) => handlePersonalData(e, /.*/)}
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone_num"
                  placeholder="Numero telefonico ...*"
                  inputMode="numeric"
                  maxLength="10"
                  value={personalData.phone_num}
                  onChange={(e) => handlePersonalData(e, /^\d{0,10}$/)}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="cf"
                  maxLength="16"
                  placeholder="Codice Fiscale...*"
                  value={personalData.cf}
                  onChange={(e) =>
                    handlePersonalData(
                      e,
                      /^[A-Z]{0,6}\d{0,2}[A-Z]{0,1}\d{0,2}[A-Z]{0,1}\d{0,3}[A-Z]{0,1}$/
                    )
                  }
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="shipment_address"
                  maxLength="100"
                  value={personalData.shipment_address}
                  placeholder="Via...*"
                  onChange={(e) =>
                    handlePersonalData(e, /^[A-Za-z0-9\s,.-]{0,100}$/)
                  }
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="cap"
                  maxLength="5"
                  value={personalData.cap}
                  placeholder="CAP...*"
                  onChange={(e) => handlePersonalData(e, /^\d{0,5}$/)}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="city"
                  maxLength="50"
                  value={personalData.city}
                  placeholder="Città...*"
                  onChange={(e) =>
                    handlePersonalData(e, /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{0,50}$/)
                  }
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
          <div>
            {/* Checkbox per Dati di Fatturazione */}
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={showBillingForm}
                  onChange={() => setShowBillingForm(!showBillingForm)}
                />
                Inserisci Dati di Fatturazione
              </label>
            </div>
            {/* Form Dati di Fatturazione */}
            {showBillingForm && (
              <section>
                <form className="form_personali" onSubmit={handleBillingSubmit}>
                  <h2>Inserisci Dati di Fatturazione</h2>
                  <div>
                    <input
                      type="text"
                      name="name_billing"
                      maxLength="50"
                      placeholder="Nome..."
                      value={billingData.name_billing}
                      onChange={(e) =>
                        handleBillingData(e, /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{0,50}$/)
                      }
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="surname_billing"
                      maxLength="50"
                      placeholder="Cognome..."
                      value={billingData.surname_billing}
                      onChange={(e) =>
                        handleBillingData(e, /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{0,50}$/)
                      }
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="billing_address"
                      maxLength="100"
                      placeholder="Indirizzo di Fatturazione..."
                      value={billingData.billing_address}
                      onChange={(e) =>
                        handleBillingData(e, /^[A-Za-z0-9\s,.-]{0,100}$/)
                      }
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="city_billing"
                      maxLength="50"
                      value={billingData.city_billing}
                      placeholder="Città..."
                      onChange={(e) =>
                        handleBillingData(e, /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{0,50}$/)
                      }
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="cap_billing"
                      maxLength="5"
                      value={billingData.cap_billing}
                      placeholder="CAP..."
                      onChange={(e) => handleBillingData(e, /^\d{0,5}$/)}
                      required
                    />
                  </div>
                  {errorMessage2}
                </form>
              </section>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
