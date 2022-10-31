export default {
  typeIgvAffectation: [
    { text: "Gravado - Operación onerosa", value: "10" },
    { text: "[Gratuita] Gravado - Retiro por premio", value: "11" },
    { text: "[Gratuita] Gravado - Retiro por donación", value: "12" },
    { text: "[Gratuita] Gravado - Retiro", value: "13" },
    { text: "[Gratuita] Gravado - Retiro por publicidad", value: "14" },
    { text: "[Gratuita] Gravado - Bonificaciones", value: "15" },
    {
      text: "[Gratuita] Gravado - Retiro por entrega a trabajadores",
      value: "16",
    },
    { text: "Exonerado - Operación onerosa", value: "20" },
    { text: "[Gratuita] Exonerado - Transferencia gratuita", value: "21" },
    { text: "Inafecto - Operación onerosa", value: "30" },
    { text: "[Gratuita] Inafecto - Retiro por bonificación", value: "31" },
    { text: "[Gratuita] Inafecto - Retiro", value: "32" },
    { text: "[Gratuita] Inafecto - Retiro por muestras medicas", value: "33" },
    {
      text: "[Gratuita] Inafecto - Retiro por convenio colectivo",
      value: "34",
    },
    { text: "[Gratuita] Inafecto - Retiro por premio", value: "35" },
    { text: "[Gratuita] Inafecto - Retiro por publicidad", value: "36" },
    { text: "Exportación", value: "40" },
  ],
  findTypeIgvAffectation(value) {
    return this.typeIgvAffectation.find((item) => item.value === value);
  },
  typeIscAffectation: [
    { text: "No aplica", value: "-" },
    { text: "Sistema al valor", value: "01" },
    { text: "Sistema de Precios de Venta al Público", value: "03" },
  ],
  findTypeIscAffectation(value) {
    return this.typeIscAffectation.find((item) => item.value === value);
  },
};
