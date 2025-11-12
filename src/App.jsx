import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalContext from "./context/GlobalContext.jsx";
import DefaultLayout from "./layout/DefaultLayout";
// componenti
import Form from "./components/Form";

// page
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import DetailProduct from "./pages/DetailProduct";
import Cart from "./pages/CartPage.jsx";
import ResultsCategoryHome from "./pages/ResultsCategoryHome";
import SearchProduct from "./pages/SearchProducts.jsx";
import SpecialPrices from "./pages/SpecialPrices";
import NewArrivalPage from "./pages/NewArrivalPage";
import OrderSummary from "./pages/Orders";
import Wishlist from "./pages/WishlistPage.jsx";

function App() {
  return (
    <>
      <GlobalContext.Provider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/*" element={<NotFound />} />
              <Route path="/form" element={<Form />} />
              <Route path="/category/:name" element={<ResultsCategoryHome />} />
              <Route
                path="/search/:option/:value/:sorter?"
                element={<SearchProduct />}
              />
              <Route path="/products/:slug" element={<DetailProduct />} />
              <Route path="/special-price" element={<SpecialPrices />} />
              <Route path="/new-arrivals" element={<NewArrivalPage />} />
              <Route path="/order-summary" element={<OrderSummary />} />
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/wishlist" element={<Wishlist />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
