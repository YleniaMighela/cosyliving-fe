import ReviewSize from "../components/ReviewSize";
import SpecialPrice from "../components/SpecialPrice"
import CardTips from "../components/CardTips";
import CardHero from "../components/CardHero";
import UltimiArrivi from "../components/CardProducts";
export default function HomePage() {

    return (



        <div >





            {/* hero compononenteCardhero */}
            <div >
                <CardHero />
            </div>


            {/* ultimi arrivi componente CardProducts */}
            <UltimiArrivi />

            {/* promozioni componente SpecialPrice (solo quelli scontati) */}
            <SpecialPrice />

            {/* descrizione sui materiale ecc componente CardTips */}
            <CardTips />

            {/* recensioni ReviewSize */}
            <ReviewSize />

        </div>

    );
}



