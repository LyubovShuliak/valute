import React, { useState, useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./ConvertPage.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { convert, fetchCurrencies } from "../../app/conversion/fetchCurrencies";
import {
  conversationResult,
  currencies,
} from "../../app/conversion/convertSlice";
import { InputType } from "zlib";
import { Link } from "react-router-dom";
import { store } from "../../app/store";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ConvertPage() {
  const [result, setResult] = useState("");
  const input = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const resultOfConversation = useAppSelector(conversationResult);
  const currenciesList = useAppSelector(currencies);

  const handleConversation = () => {
    const value = input.current?.value
      .trim()
      .toLowerCase()
      .match(/\d+\s[a-z]{3}\s(in)\s[a-z]{3}/gi);

    if (value) {
      const amount = value[0].match(/\d+/gi)!![0];
      const fromCurrency = value[0].match(/\s[a-z]{3}\s/gi)!![0].trim();
      const toCurrency = value[0].match(/\w+$/gi)!![0];

      const isFromCurrencyValid = store
        .getState()
        .convert.currencies.currencies.find((el) =>
          el.includes(fromCurrency.toUpperCase())
        );
      const isToCurrencyValid = store
        .getState()
        .convert.currencies.currencies.find((el) =>
          el.includes(toCurrency.toUpperCase())
        );
      if (!isFromCurrencyValid || !isToCurrencyValid) {
        setResult("*currencies do not exist in data base");
      } else {
        dispatch(convert({ fromCurrency, toCurrency, amount }));
        setResult(toCurrency.toUpperCase());
      }
    } else {
      setResult("*invalid input");
    }
  };
  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  const convertedResult = resultOfConversation[result]
    ? `${resultOfConversation[result]} ${result}`
    : "0";

  return (
    <>
      <div className="conversation_container">
        <p>
          Enter in format : [YOUR AMOUNT] [CURRENCY CODE] in [CURRENCY CODE]
        </p>
        <p>EXAMPLE: 150 usd in uah, 150 usd in UAH, 150 USD in uah </p>
        <Box sx={{ flexGrow: 1, width: "600px", margin: "auto" }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item
                onClick={handleConversation}
                sx={{ backgroundColor: "cadetblue", cursor: "pointer" }}
              >
                Convert
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <p
                  className={` error ${
                    result === "" || result.length !== 3 ? "" : "show"
                  }`}
                >
                  {result}
                </p>
                <input
                  className="inputField"
                  ref={input}
                  type="text"
                  placeholder="Enter..."
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>{convertedResult}</Item>
            </Grid>
          </Grid>
        </Box>

        <Link to="/rates" className="link_to_rates">
          To relevant rates
        </Link>
      </div>
    </>
  );
}
