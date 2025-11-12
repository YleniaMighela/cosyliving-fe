// recensioni
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'



const reviews = [
    { rating: 5, text: "Ho acquistato un divano moderno e sono rimasto sorpreso dalla qualità! Il tessuto è resistente e molto elegante. Consegna puntuale e servizio clienti impeccabile." },
    { rating: 5, text: "Sedie bellissime! Ho preso un set per la mia sala da pranzo e sono comodissime. Struttura solida e design raffinato. Consigliatissimo!" },
    { rating: 5, text: "Pouf comodissimo e di ottima qualità! Perfetto per il mio salotto, aggiunge un tocco di eleganza e comfort." },
    { rating: 5, text: "La poltrona che ho acquistato è semplicemente fantastica. Ergonomica, ben imbottita e con un design moderno. Sono molto soddisfatto!" },
    { rating: 4, text: "La lampada da terra illumina benissimo ed è un elemento d’arredo di grande effetto. Avrei preferito un cavo leggermente più lungo." },
    { rating: 5, text: "La libreria è solida e facile da montare. Materiali di alta qualità e ottima capienza. Un vero affare!" },
    { rating: 5, text: "Esperienza di acquisto perfetta! Il sito è chiaro e ben organizzato, il servizio clienti è stato disponibile e cordiale." },
    { rating: 4, text: "Sedie eleganti e robuste. Ottimo rapporto qualità-prezzo, le consiglio a chi vuole arredare con stile!" }
];

const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, i) => (
        <FontAwesomeIcon key={i} icon={faStar} style={{ color: "#FFD43B" }} />
    ));
};

export default function ReviewSize() {
    return (
        <section className='container_review'>
            {reviews.map((review, index) => (
                <div key={index} className='containersingle_review'>
                    <h2>Recensione:</h2>
                    <div>{renderStars(review.rating)}</div>
                    <p>{review.text}</p>
                </div>
            ))}
        </section>
    );
}
