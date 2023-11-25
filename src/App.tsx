import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Country from "./pages/Country";
import PageNotFound from "./pages/PageNotFound";
import { AppProvider } from "./Context/AppContext";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="home" />} />
          <Route path={"home"} element={<Home />} />
          <Route path={"countries/:countryId"} element={<Country />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
