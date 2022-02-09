import React, { useEffect, useState } from "react";

import {
  fetchCurrencies,
  fetchCurrenciesByBase,
} from "../../app/conversion/fetchCurrencies";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  currencies,
  currencyCourse,
  isLoadingConversion,
} from "../../app/conversion/convertSlice";
import "./CurrencyRatesPage.scss";
import CorsesTable from "../../components/coursesTable/coursesTable";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const CurrencyRatesPage = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [filteredCurrenciesList, setFilteredCurrenciesList] = useState<
    string[][]
  >([]);

  const [showList, setShowList] = useState(false);

  const dispatch = useAppDispatch();

  const currenciesList = useAppSelector(currencies);
  const courses = useAppSelector(currencyCourse);
  const isLoading = useAppSelector(isLoadingConversion);

  useEffect(() => {
    dispatch(fetchCurrenciesByBase(selectedCurrency.toLowerCase()));
  }, []);

  useEffect(() => {
    setFilteredCurrenciesList(currenciesList);
  }, [currenciesList]);

  const selectBase = (code: string) => {
    setSelectedCurrency(code);
    showCurrencies();
    setShowList(false);
  };

  const showCurrencies = () => {
    dispatch(fetchCurrencies());
    setShowList(!showList);
  };
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const newVal = currenciesList.filter((item) =>
      item[0].toLowerCase().includes(val.toLowerCase())
    );
    setFilteredCurrenciesList(newVal);
    setSelectedCurrency(val);
  };

  const handleCurrencyClick = (code: string) => {
    dispatch(fetchCurrenciesByBase(code));
    selectBase(code);
  };

  return (
    <div className="select_container">
      <Link to="/" className="back">
        <ArrowBackIcon color="success" fontSize="medium" />
        <p>Back</p>
      </Link>
      <div className="select_currency" onMouseDown={showCurrencies}>
        <p> Choose currency</p>
        <input
          type="text"
          value={selectedCurrency}
          onChange={(e) => handleFilter(e)}
        />
      </div>

      <div className={`currencies ${!showList && "currencies_shown"}`}>
        {filteredCurrenciesList.map((currency: string[], index) => (
          <p
            className={`currency_option ${
              currency[0] === selectedCurrency ? "selected" : ""
            }`}
            key={index}
            onClick={() => {
              handleCurrencyClick(currency[0]);
            }}
          >
            {currency[0] + " - " + currency[1]}
          </p>
        ))}
      </div>
      <div className="courses_container">
        {isLoading ? <WithSpinner /> : <CorsesTable courses={courses} />}
      </div>
    </div>
  );
};

export default CurrencyRatesPage;
