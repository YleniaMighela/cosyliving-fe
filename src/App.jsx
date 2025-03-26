import { BrowserRouter, Route, Routes, } from "react-router-dom";
import GlobalContext from "./context/GlobalContext.jsx";
import DefaultLayout from "./layout/DefaultLayout";
// page
import NotFound from "./pages/NotFound"
import HomePage from "./pages/HomePage"

function App() {


  return (

    <>
      <GlobalContext.Provider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />} >
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>

  )
}

export default App
