export default {
  list: [
    //
    { name: "Soles", symbol: "S/", code: "PEN" },
    { name: "Dolares americanos", symbol: "$", code: "USD" },
    { name: "Euros", symbol: "€", code: "EUR" },
  ],
  findByCode(code) {
    return this.list.find((item) => item.code === code);
  },
};
