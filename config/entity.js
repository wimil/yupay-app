import $_keyBy from "lodash/keyBy";

export const EntityDocTypes = [
  {
    text: "NO DIMICILIADO, SIN RUC (EXPORTACIÓN)",
    value: "0",
  },
  {
    text: "DNI",
    value: "1",
  },
  {
    text: "CARNET DE EXTRANJERIA",
    value: "4",
  },
  {
    text: "RUC",
    value: "6",
  },
  {
    text: "PASAPORTE",
    value: "7",
  },
];

export const entityDocTypesKeyBy = $_keyBy(EntityDocTypes, "value");
