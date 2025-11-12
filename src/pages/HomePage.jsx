import ReviewSize from "../components/ReviewSize";
import SpecialPrice from "../components/SpecialPrice"
import CardTips from "../components/CardTips";
// import CardProducts from "../components/CardProducts";
import { Modal, Box } from "@mui/material";
import { useState, useEffect } from "react";

import CardHero from "../components/CardHero";
import CardNewArrivals from "../components/CardNewArrivals";
export default function HomePage() {
    const [displayPopUp, setDisplayPopUp] = useState(true);
    // localStorage.setItem("seenPopUp", null)
    // localStorage.clear()
    const closePopUp = () => {
        // imposta "seenPopUP" come true
        localStorage.setItem("seenPopUp", true);
        // setting state to false to not display pop-up
        setDisplayPopUp(false);
    };

    // the useEffect to trigger on first render and check if in the localStorage we already have data about user seen and closed the pop-up
    useEffect(() => {
        // getting value of "seenPopUp" key from localStorage
        let returningUser = localStorage.getItem("seenPopUp");
        // if it's not there, for a new user, it will be null
        // if it's there it will be boolean true
        // setting the opposite to state, false for returning user, true for a new user
        setDisplayPopUp(!returningUser);
    }, []);
    return (
        <>
            <div>
                {/* conditional rendering, if displayPopUp is truthy we will show the modal */}
                {displayPopUp && (
                    <Modal className="box"
                        open={true}
                        // once pop-up will close "closePopUp" function will be executed
                        onClose={closePopUp}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        {/* in the line below we pass our custom styles object to the modal via 'sx' prop*/}
                        <Box className="pop-up">
                            {/* what user will see in the modal is defined below */}
                            <h1>Benvenuto su CosyLiving</h1>
                            <p> L'arredamento perfetto per la tua casa! 🏡✨

                                Scopri la nostra collezione, pensata per unire eleganza, comfort e funzionalità. Dai divani accoglienti alle librerie di design, tutto ciò che serve per rendere il tuo salone unico e accogliente.</p>
                            <p>🛋️ Arreda con stile, vivi con comfort. Buono shopping! 🛍️</p>
                            <button className="button_popup" onClick={closePopUp}>OK</button>
                        </Box>
                    </Modal>
                )}
            </div>

            <div >
                {/* hero compononenteCardhero */}
                <div >
                    <CardHero />
                </div>

                <div className="home-container">
                    {/* ultimi arrivi componente CardProducts */}
                    <CardNewArrivals />

                    {/* promozioni componente SpecialPrice (solo quelli scontati) */}
                    <SpecialPrice />
                </div>

                {/* descrizione sui materiale ecc componente CardTips */}
                <CardTips />

                {/* recensioni ReviewSize */}
                <ReviewSize />

            </div>
        </>
    );
}



