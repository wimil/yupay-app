import $_keyBy from "lodash/keyBy";

export const units = [
  {
    code: "4A",
    sunatCode: "4A",
    name: "BOBINAS",
  },
  {
    code: "BJ",
    sunatCode: "BJ",
    name: "BALDE",
  },
  {
    code: "BLL",
    sunatCode: "BLL",
    name: "BARRILES",
  },
  {
    code: "BG",
    sunatCode: "BG",
    name: "BOLSA",
  },
  {
    code: "BO",
    sunatCode: "BO",
    name: "BOTELLAS",
  },
  {
    code: "BX",
    sunatCode: "BX",
    name: "CAJA",
  },
  {
    code: "CT",
    sunatCode: "CT",
    name: "CARTONES",
  },
  {
    code: "CMK",
    sunatCode: "CMK",
    name: "CENTIMETRO CUADRADO",
  },
  {
    code: "CMQ",
    sunatCode: "CMQ",
    name: "CENTIMETRO CUBICO",
  },
  {
    code: "CMT",
    sunatCode: "CMT",
    name: "CENTIMETRO LINEAL",
  },
  {
    code: "CEN",
    sunatCode: "CEN",
    name: "CIENTO DE UNIDADES",
  },
  {
    code: "CY",
    sunatCode: "CY",
    name: "CILINDRO",
  },
  {
    code: "CJ",
    sunatCode: "CJ",
    name: "CONOS",
  },
  {
    code: "DZN",
    sunatCode: "DZN",
    name: "DOCENA",
  },
  {
    code: "BE",
    sunatCode: "BE",
    name: "FARDO",
  },
  {
    code: "GLI",
    sunatCode: "GLI",
    name: "GALON INGLES (4.545956L)",
  },
  {
    code: "GRM",
    sunatCode: "GRM",
    name: "GRAMO",
  },
  {
    code: "GRO",
    sunatCode: "GRO",
    name: "GRUESA",
  },
  {
    code: "HLT",
    sunatCode: "HLT",
    name: "HECTOLITRO",
  },
  {
    code: "LEF",
    sunatCode: "LEF",
    name: "HOJA",
  },
  {
    code: "SET",
    sunatCode: "SET",
    name: "JUEGO",
  },
  {
    code: "KGM",
    sunatCode: "KGM",
    name: "KILOGRAMO",
  },
  {
    code: "KTM",
    sunatCode: "KTM",
    name: "KILOMETRO",
  },
  {
    code: "KWH",
    sunatCode: "KWH",
    name: "KILOVATIO HORA",
  },
  {
    code: "KT",
    sunatCode: "KT",
    name: "KIT",
  },
  {
    code: "CA",
    sunatCode: "CA",
    name: "LATAS",
  },
  {
    code: "LBR",
    sunatCode: "LBR",
    name: "LIBRAS",
  },
  {
    code: "LTR",
    sunatCode: "LTR",
    name: "LITRO",
  },
  {
    code: "MWH",
    sunatCode: "MWH",
    name: "MEGAWATT HORA",
  },
  {
    code: "MTR",
    sunatCode: "MTR",
    name: "METRO",
  },
  {
    code: "MTK",
    sunatCode: "MTK",
    name: "METRO CUADRADO",
  },
  {
    code: "MTQ",
    sunatCode: "MTQ",
    name: "METRO CUBICO",
  },
  {
    code: "MGM",
    sunatCode: "MGM",
    name: "MILIGRAMOS",
  },
  {
    code: "MLT",
    sunatCode: "MLT",
    name: "MILILITRO",
  },
  {
    code: "MMT",
    sunatCode: "MMT",
    name: "MILIMETRO",
  },
  {
    code: "MMK",
    sunatCode: "MMK",
    name: "MILIMETRO CUADRADO",
  },
  {
    code: "MMQ",
    sunatCode: "MMQ",
    name: "MILIMETRO CUBICO",
  },
  {
    code: "MLL",
    sunatCode: "MLL",
    name: "MILLARES",
  },
  {
    code: "UM",
    sunatCode: "UM",
    name: "MILLON DE UNIDADES",
  },
  {
    code: "ONZ",
    sunatCode: "ONZ",
    name: "ONZAS",
  },
  {
    code: "PF",
    sunatCode: "PF",
    name: "PALETAS",
  },
  {
    code: "PK",
    sunatCode: "PK",
    name: "PAQUETE",
  },
  {
    code: "PR",
    sunatCode: "PR",
    name: "PAR",
  },
  {
    code: "FOT",
    sunatCode: "FOT",
    name: "PIES",
  },
  {
    code: "FTK",
    sunatCode: "FTK",
    name: "PIES CUADRADOS",
  },
  {
    code: "FTQ",
    sunatCode: "FTQ",
    name: "PIES CUBICOS",
  },
  {
    code: "C62",
    sunatCode: "C62",
    name: "PIEZAS",
  },
  {
    code: "PG",
    sunatCode: "PG",
    name: "PLACAS",
  },
  {
    code: "ST",
    sunatCode: "ST",
    name: "PLIEGO",
  },
  {
    code: "INH",
    sunatCode: "INH",
    name: "PULGADAS",
  },
  {
    code: "RM",
    sunatCode: "RM",
    name: "RESMA",
  },
  {
    code: "DR",
    sunatCode: "DR",
    name: "TAMBOR",
  },
  {
    code: "STN",
    sunatCode: "STN",
    name: "TONELADA CORTA",
  },
  {
    code: "LTN",
    sunatCode: "LTN",
    name: "TONELADA LARGA",
  },
  {
    code: "TNE",
    sunatCode: "TNE",
    name: "TONELADAS",
  },
  {
    code: "TU",
    sunatCode: "TU",
    name: "TUBOS",
  },
  {
    code: "NIU",
    sunatCode: "NIU",
    name: "UNIDADES",
  },
  {
    code: "ZZ",
    sunatCode: "ZZ",
    name: "SERVICIOS",
  },
  {
    code: "GLL",
    sunatCode: "GLL",
    name: "GALON US (3.7843L)",
  },
  {
    code: "YRD",
    sunatCode: "YRD",
    name: "YARDA",
  },
  {
    code: "YDK",
    sunatCode: "YDK",
    name: "YARDA CUADRADA",
  },
];

export const unitsKeyByCode = $_keyBy(units, "code");

export const findUnitByCode = (code) => {
  return unitsKeyByCode[code];
};
