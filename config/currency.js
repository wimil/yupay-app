import $_keyBy from "lodash/keyBy";

export const currencies = [
  {
    name: "NUEVO SOL",
    pluralName: "SOLES",
    code: "PEN",
    symbol: "S/",
  },
  {
    name: "DOLAR AMERICANO",
    pluralName: "DOLARES AMERICANOS",
    code: "USD",
    symbol: "$",
  },
  {
    name: "EURO",
    pluralName: "EUROS",
    code: "EUR",
    symbol: "€",
  },
];

export const currenciesKeyByCode = $_keyBy(currencies, "code");
