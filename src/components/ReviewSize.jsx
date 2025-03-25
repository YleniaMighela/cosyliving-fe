// recensioni
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function ReviewSize() {
    const stars = Array.from({ length: 5 });
    return (
        <section>
            <div>
                <h2> Recensione:</h2>
                <div>
                    {stars.map((_, index) => (
                        <FontAwesomeIcon
                            key={index}
                            icon={faStar}
                            style={{ color: "#FFD43B", marginRight: "5px" }}
                        />
                    ))}
                </div>
                <p>
                    "Ho acquistato un divano moderno e sono rimasto sorpreso dalla qualità!
                    Il tessuto è resistente e molto elegante. Consegna puntuale e servizio clienti impeccabile."
                </p>
            </div>

            <div>
                <h2> Recensione:</h2>
                <div>
                    {stars.map((_, index) => (
                        <FontAwesomeIcon
                            key={index}
                            icon={faStar}
                            style={{ color: "#FFD43B", marginRight: "5px" }}
                        />
                    ))}
                </div>
                <p>
                    "Ho acquistato un divano moderno e sono rimasto sorpreso dalla qualità!
                    Il tessuto è resistente e molto elegante. Consegna puntuale e servizio clienti impeccabile."
                </p>
            </div>
        </section>
    )

}