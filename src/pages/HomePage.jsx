import ReviewSize from "../components/ReviewSize";
import SpecialPrice from "../components/SpecialPrice"
import CardTips from "../components/CardTips";
import CardProducts from "../components/CardProducts";


export default function HomePage() {

    return (
        <main>


            <div >





                {/* hero compononenteCardhero */}
                <div >

                </div>


                {/* ultimi arrivi componente CardProducts */}
                <CardProducts />

                {/* promozioni componente SpecialPrice (solo quelli scontati) */}
                <SpecialPrice />

                {/* descrizione sui materiale ecc componente CardTips */}
                <CardTips />

                {/* recensioni ReviewSize */}
                <ReviewSize />

            </div>
        </main>
    );
}



