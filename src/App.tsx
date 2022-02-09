import { store } from "./app/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import ConvertPage from "./pages/convertPage/ConvertPage";
import CurrencyRatesPage from "./pages/currencyRates/CurrencyRatesPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ConvertPage />} />
          <Route path="/rates" element={<CurrencyRatesPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
