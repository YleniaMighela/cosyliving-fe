// import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { Link } from 'react-router-dom'


export default function Footer() {

    return (
        <footer>

            <div className="footer-left">
                <span>Termini e condizioni</span>
                <span>Contatti  +39 3324565784</span>
                <span>email@outlook.it</span>
                <span>P.IVA 56546841354864</span>
            </div>
            <div className="footer-right">
                <span>Seguici anche su</span>
                <Link to="https://www.instagram.com/cosyl.iving/" target='_blank'>
                    <span><FontAwesomeIcon icon={faInstagram} size="2x" color="#E1306C" /></span>
                </Link>
                <Link to="https://www.facebook.com/profile.php?id=61574429769322" target='_blank'>
                    <span><FontAwesomeIcon icon={faFacebook} size="2x" color="#1877F2" />
                    </span></Link>
                <Link to="" target='_blank'>
                    <span><FontAwesomeIcon icon={faWhatsapp} size="2x" color="#25D366" /></span>
                </Link>
            </div>




        </footer>

    )
}



