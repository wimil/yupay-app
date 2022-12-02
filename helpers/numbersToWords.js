function numberFormat(number, decimals, decPoint, thousandsSep) {
  number = (number + "").replace(/[^0-9+\-Ee.]/g, "");
  const n = !isFinite(+number) ? 0 : +number;
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  const sep = typeof thousandsSep === "undefined" ? "," : thousandsSep;
  const dec = typeof decPoint === "undefined" ? "." : decPoint;
  let s = "";
  const toFixedFix = function (n, prec) {
    if (("" + n).indexOf("e") === -1) {
      return +(Math.round(n + "e+" + prec) + "e-" + prec);
    } else {
      const arr = ("" + n).split("e");
      let sig = "";
      if (+arr[1] + prec > 0) {
        sig = "+";
      }
      return (+(
        Math.round(+arr[0] + "e" + sig + (+arr[1] + prec)) +
        "e-" +
        prec
      )).toFixed(prec);
    }
  };
  // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec).toString() : "" + Math.round(n)).split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}

class NumberToWord {
  static units = [
    "",
    "UNO ",
    "DOS ",
    "TRES ",
    "CUATRO ",
    "CINCO ",
    "SEIS ",
    "SIETE ",
    "OCHO ",
    "NUEVE ",
    "DIEZ ",
    "ONCE ",
    "DOCE ",
    "TRECE ",
    "CATORCE ",
    "QUINCE ",
    "DIECISÉIS ",
    "DIECISIETE ",
    "DIECIOCHO ",
    "DIECINUEVE ",
    "VEINTE ",
  ];

  static decenas = [
    "VEINTI",
    "TREINTA ",
    "CUARENTA ",
    "CINCUENTA ",
    "SESENTA ",
    "SETENTA ",
    "OCHENTA ",
    "NOVENTA ",
    "CIEN ",
  ];

  static centenas = [
    "CIENTO ",
    "DOSCIENTOS ",
    "TRESCIENTOS ",
    "CUATROCIENTOS ",
    "QUINIENTOS ",
    "SEISCIENTOS ",
    "SETECIENTOS ",
    "OCHOCIENTOS ",
    "NOVECIENTOS ",
  ];

  static acentosExcepciones = {
    VEINTIDOS: "VEINTIDÓS ",
    VEINTITRES: "VEINTITRÉS ",
    VEINTISEIS: "VEINTISÉIS ",
  };

  static conector = "CON";

  static apocope = false;

  static toWords() {
    //
  }

  static toMoney() {
    //
  }

  static toString() {
    //
  }

  static toInvoice(number, decimals = 2, currency = "") {
    this.#checkApocope();

    const _number = numberFormat(number, decimals, ".", "");

    let splitNumber = _number.split(".");

    splitNumber[0] = this.#wholeNumber(splitNumber[0]);

    if (splitNumber[1]) {
      splitNumber[1] += "/100";
    } else {
      splitNumber[1] = "00/100";
    }

    return `${this.#glue(splitNumber)} ${currency.toUpperCase()}`;
  }

  static #checkApocope() {
    if (this.apocope === true) {
      this.units[1] = "UN ";
    }
  }

  static #wholeNumber(num) {
    let number = num;
    if (number == "0") {
      number = "CERO ";
    } else {
      number = this.#convertNumber(number);
    }

    return number;
  }

  static #glue(splitNumber) {
    return splitNumber.filter(Boolean).join(` ${this.conector.toUpperCase()} `);
  }

  static #convertNumber(num) {
    let converted = "";

    if (num < 0 || num > 999999999) {
      throw new Error("Wrong parameter number");
    }

    const numberStrFill = num.toString().padStart(9, "0");
    const millones = numberStrFill.substring(0, 3);
    const miles = numberStrFill.substring(3, 6);
    const cientos = numberStrFill.substring(6);

    if (parseInt(millones) > 0) {
      if (millones == "001") {
        converted += "UN MILLON ";
      } else if (parseInt(millones) > 0) {
        converted += `${this.#convertGroup(millones)}MILLONES `;
      }
    }

    if (parseInt(miles) > 0) {
      if (miles == "001") {
        converted += "MIL ";
      } else if (parseInt(miles) > 0) {
        converted += `${this.#convertGroup(miles)}MIL `;
      }
    }

    if (parseInt(cientos) > 0) {
      if (cientos == "001") {
        converted += this.apocope === true ? "UN " : "UNO ";
      } else if (parseInt(cientos) > 0) {
        converted += `${this.#convertGroup(cientos)} `;
      }
    }

    return converted.trim();
  }

  static #convertGroup(num) {
    let output = "";
    let unidades;

    if (num === "100") {
      output = "CIEN ";
    } else if (num[0] !== "0") {
      output = this.centenas[parseInt(num[0]) - 1];
    }

    const k = parseInt(num.substring(1));

    if (k <= 20) {
      unidades = this.units[k];
    } else {
      if (k > 30 && num[2] !== "0") {
        unidades = `${this.decenas[parseInt(num[1]) - 2]}Y ${
          this.units[parseInt(num[2])]
        }`;
      } else {
        unidades = `${this.decenas[parseInt(num[1]) - 2]}${
          this.units[parseInt(num[2])]
        }`;
      }
    }

    output += this.acentosExcepciones[unidades.trim()]
      ? this.acentosExcepciones[unidades.trim()]
      : unidades;

    return output.trim();
  }
}

export default NumberToWord;
