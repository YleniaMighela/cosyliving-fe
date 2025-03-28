import { BrowserRouter, Route, Routes, } from "react-router-dom";
import GlobalContext from "./context/GlobalContext.jsx";
import DefaultLayout from "./layout/DefaultLayout";
// componenti
import Form from "./components/Form";
// pages


// page
import NotFound from "./pages/NotFound"
import HomePage from "./pages/HomePage"
import DetailProduct from "./pages/DetailProduct"
import Cart from "./pages/CartPage.jsx";


function App() {


  return (

    <>
      <GlobalContext.Provider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />} >
              <Route path="/" element={<HomePage />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="/form" element={<Form />} />

              <Route path="/products/:slug" element={<DetailProduct />} />
              <Route path="/cart" element={<Cart />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>

  )
}

export default App
