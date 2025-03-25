import { Outlet } from "react-router-dom"

// IMPORTO COMPONENTE HEADER
import Header from "../components/Header"
import Footer from "../components/Footer"

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default DefaultLayout