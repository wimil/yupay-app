export const SunatVoucherTypes = [
  {
    text: "Sin Documento",
    pluralName: "",
    shortName: "",
    value: "00",
  },
  {
    text: "Factura",
    pluralName: "",
    shortName: "",
    value: "01",
  },
  {
    text: "Boleta",
    pluralName: "",
    shortName: "",
    value: "03",
  },
  {
    text: "Nota de crédito",
    pluralName: "",
    shortName: "",
    value: "07",
  },
  {
    text: "Nota de débito",
    pluralName: "",
    shortName: "",
    value: "08",
  },
];

export const findSunatVoucherTypeByValue = (value) => {
  return SunatVoucherTypes.find((item) => item.value === value);
};

//export const 
