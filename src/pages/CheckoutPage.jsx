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

    localStorage.clear();
    const [personalData, setPersonalData] = useState(initialPersonalData);
    const [billingData, setBillingData] = useState(initialBillingData);
    const [clients, setClients] = useState([]);
    const [billingInfo, setBillingInfo] = useState([]);

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
        emailjs.sendForm('service_3d3jrkm', 'template_yfwhf7f', e.target, 'YwWXI2IpotKYzl-pl')
            .then((result) => {
            }, (error) => {
                console.log(error.text);
            });
        // email conferma ordine al sitp
        emailjs.sendForm('service_3d3jrkm', 'template_792darg', e.target, 'YwWXI2IpotKYzl-pl')
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
            <section className="form_datipersonali">
                {/* Form Dati Personali */}
                <h2>Inserisci Dati Personali</h2>

                <form className="form_personali" onSubmit={handleSubmit}>
                    <div>
                        <label>Nome</label>
                        <input type="text" name="nome" value={personalData.nome} onChange={handlePersonalData} />
                    </div>
                    <div>
                        <label>Cognome</label>
                        <input type="text" name="cognome" value={personalData.cognome} onChange={handlePersonalData} />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" name="email" value={personalData.email} onChange={handlePersonalData} />
                    </div>
                    <div>
                        <label>Numero Telefonico</label>
                        <input type="tel" name="numeroTelefonico" value={personalData.numeroTelefonico} onChange={handlePersonalData} />
                    </div>
                    <div>
                        <label>Codice Fiscale</label>
                        <input type="text" name="codiceFiscale" value={personalData.codiceFiscale} onChange={handlePersonalData} />
                    </div>
                    <div>
                        <label>Città</label>
                        <input type="text" name="city" value={personalData.city} onChange={handlePersonalData} />
                    </div>
                    <div>
                        <label>Via</label>
                        <input type="text" name="via" value={personalData.via} onChange={handlePersonalData} />
                    </div>
                    <div>
                        <button type="submit" >Invia dati</button>
                    </div>
                </form>
            </section>

            <section className="form_datipersonali">
                {/* Form Dati di Fatturazione */}
                <h2>Inserisci Dati di Fatturazione</h2>
                <form className="form_personali" onSubmit={handleBillingSubmit}>

                    <div>
                        <label>Partita IVA</label>
                        <input type="text" name="partitaIVA" value={billingData.partitaIVA} onChange={handleBillingData} required />
                    </div>
                    <div>
                        <label>Indirizzo Fatturazione</label>
                        <input type="text" name="indirizzoFatturazione" value={billingData.indirizzoFatturazione} onChange={handleBillingData} required />
                    </div>
                    <div>
                        <label>Città</label>
                        <input type="text" name="cittàFatturazione" value={billingData.cittàFatturazione} onChange={handleBillingData} required />
                    </div>
                    <div>
                        <label>CAP</label>
                        <input type="text" name="cap" value={billingData.cap} onChange={handleBillingData} required />
                    </div>

                    <div>
                        <button type="submit">Invia dati</button>
                    </div>
                </form>
            </section>

        </>
    );
}
