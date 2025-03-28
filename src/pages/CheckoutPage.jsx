import emailjs from 'emailjs-com';
import { useState, useEffect } from "react";

const initialPersonalData = {
    nome: "",
    cognome: "",
    email: "",
    numeroTelefonico: "",
    codiceFiscale: "",
    city: "",
    via: "",
};

const initialBillingData = {
    partitaIVA: "",
    indirizzoFatturazione: "",
    cittàFatturazione: "",
    cap: "",
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

    // Funzione per gestire l'input dei dati personali
    function handlePersonalData(e) {
        setPersonalData({
            ...personalData,
            [e.target.name]: e.target.value
        });
    }

    // Funzione per gestire l'input dei dati di fatturazione
    function handleBillingData(e) {
        setBillingData({
            ...billingData,
            [e.target.name]: e.target.value
        });
    }

    // Salvataggio dati personali
    function handlePersonalSubmit(e) {
        e.preventDefault();

        // Controlla se l'email o codice fiscale già esistono
        const exists = clients.some(
            (c) => c.email === personalData.email || c.codiceFiscale === personalData.codiceFiscale
        );

        // if (exists) {
        //     alert("Email o Codice Fiscale già esistente!");
        //     return;
        // }

        const newClient = {
            id: clients.length === 0 ? 1 : clients[clients.length - 1].id + 1,
            ...personalData
        };

        setClients([...clients, newClient]);
        setPersonalData(initialPersonalData);
    }

    // Salvataggio dati di fatturazione
    function handleBillingSubmit(e) {
        e.preventDefault();

        const newBilling = {
            id: billingInfo.length === 0 ? 1 : billingInfo[billingInfo.length - 1].id + 1,
            ...billingData
        };

        setBillingInfo([...billingInfo, newBilling]);
        setBillingData(initialBillingData);
    }

    function sendEmail(e) {
        e.preventDefault();
        // email conferma ordine al cliente
        emailjs.sendForm('service_z4wn6ts', 'template_yfwhf7f', e.target, 'YwWXI2IpotKYzl-pl')
            .then((result) => {
            }, (error) => {
                console.log(error.text);
            });
        // email conferma ordine al sitp
        emailjs.sendForm('service_z4wn6ts', 'template_792darg', e.target, 'YwWXI2IpotKYzl-pl')
            .then((result) => {
            }, (error) => {
                console.log(error.text);
            });
    }

    function handleSubmit(e) {
        e.preventDefault();

        sendEmail(e);
        handlePersonalSubmit(e);
    }


    return (
        <>
            {/* sezione riepilogo ordine */}
            <section className='section_ordine' >
                <div className="container_riepilogo">
                    <h2>Riepilogo Ordine</h2>
                    {orderProducts.length === 0 ? (
                        <p>Nessun prodotto aggiunto al carrello</p>
                    ) : (
                        <>
                            <ul>
                                {orderProducts.map((product, index) => (
                                    <li key={index}>
                                        {product.name} - {product.quantity} x €{product.price}
                                    </li>
                                ))}
                            </ul>
                            <p><strong>Totale: €{total.toFixed(2)}</strong></p>
                        </>
                    )}
                </div>
            </section>
            {/* sezione dati personali */}
            <section>
                {/* Form Dati Personali */}
                <form className="form_personali" onSubmit={handleSubmit}>
                    <h2>Inserisci Dati Personali</h2>
                    <div>

                        <input type="text"
                            name="nome"
                            placeholder="Nome..."
                            value={personalData.nome}
                            onChange={handlePersonalData} />
                    </div>
                    <div>

                        <input type="text"
                            name="cognome"
                            placeholder="Cognome..."
                            value={personalData.cognome}
                            onChange={handlePersonalData} />
                    </div>
                    <div>

                        <input type="email"
                            name="email"
                            placeholder="Email..."
                            value={personalData.email}
                            onChange={handlePersonalData} />
                    </div>
                    <div>

                        <input type="tel"
                            name="numeroTelefonico"
                            placeholder="Numero telefonico..."
                            value={personalData.numeroTelefonico}
                            onChange={handlePersonalData} />
                    </div>
                    <div>

                        <input type="text"
                            name="codiceFiscale"
                            placeholder="Codice Fiscale..."
                            value={personalData.codiceFiscale}
                            onChange={handlePersonalData} />
                    </div>
                    <div>

                        <input type="text"
                            name="via"
                            value={personalData.via}
                            placeholder="Via..."
                            onChange={handlePersonalData} />
                    </div>
                    <div>

                        <input type="text"
                            name="city"
                            value={personalData.city}
                            placeholder="Città..."
                            onChange={handlePersonalData} />
                    </div>

                    <div>
                        <button type="submit" >Invia dati</button>
                    </div>
                </form>
            </section>

            {/* sezione dati fatturazione*/}
            <section>
                {/* Form Dati di Fatturazione */}

                <form className="form_personali" onSubmit={handleBillingSubmit}>
                    <h2>Inserisci Dati di Fatturazione</h2>
                    <div>

                        <input type="text"
                            name="partitaIVA"
                            placeholder="Partita Iva..."
                            value={billingData.partitaIVA}
                            onChange={handleBillingData} required />
                    </div>
                    <div>

                        <input type="text"
                            name="indirizzoFatturazione"
                            placeholder="Indirizzo di Fatturazione..."
                            value={billingData.indirizzoFatturazione}
                            onChange={handleBillingData} required />
                    </div>
                    <div>

                        <input type="text"
                            name="cittàFatturazione"
                            value={billingData.cittàFatturazione}
                            placeholder="Città..."
                            onChange={handleBillingData} required />
                    </div>
                    <div>

                        <input type="text"
                            name="cap"
                            value={billingData.cap}
                            placeholder="CAP..."
                            onChange={handleBillingData} required />
                    </div>

                    <div>
                        <button type="submit" onClick={localStorage.clear()}>Invia dati</button>
                    </div>
                </form>
            </section>


        </>
    );
}
