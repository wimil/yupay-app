import utc from "dayjs/plugin/utc";
import "../services/mongodb";
import User from "../models/user";
import Hash from "../helpers/hash";
import process from "process";
import Plan from "#models/plan";
import Period from "#models/period";
import Business from "#models/business";
import Subscription from "#models/subscription";
import Warehouse from "#models/warehouse";
import Office from "#models/office";
import dayjs from "dayjs";
import Category from "#models/category";
//import Unit from "#models/unit";

dayjs.extend(utc);

User.deleteMany({}, () => {
  console.log("remove Users");
});

Plan.deleteMany({}, () => {
  console.log("remove Plans");
});

Business.deleteMany({}, () => {
  console.log("remove Business");
});

Period.deleteMany({}, () => {
  console.log("remove Periods");
});

Subscription.deleteMany({}, () => {
  console.log("remove Subscriptions");
});
Warehouse.deleteMany({}, () => {
  console.log("remove Warehouse");
});
Office.deleteMany({}, () => {
  console.log("remove Office");
});
Category.deleteMany({}, () => {
  console.log("remove Category");
});

const user = await User.create({
  email: "rldev25@gmail.com",
  password: await Hash.make("123456"),
  firstName: "Andy",
  surname: "Reynaldo",
  secondSurname: "Laveriano",
  phoneCode: "51",
  phoneNumber: "902447192",
  photo: null,
});
console.log("User Seeeding");

await Plan.create([
  {
    name: "Gratis",
    currency: "PEN",
    price: 0,
    limits: {
      docs: 30,
      offices: 1,
      warehouses: 1,
      users: 1,
      products: 100,
    },
    devices: ["Web", "Android", "IOS"],
    customSupport: false,
  },
  {
    name: "Microempresa",
    currency: "PEN",
    price: 14.99,
    limits: {
      docs: 100,
      offices: 1,
      warehouses: 1,
      users: 2,
      products: 1000,
    },
    devices: ["Web", "Android", "IOS"],
    customSupport: true,
  },
  {
    name: "Emprendedor",
    currency: "PEN",
    price: 19.99,
    limits: {
      docs: 300,
      offices: 2,
      warehouses: 2,
      users: 4,
      products: 5000,
    },
    devices: ["Web", "Android", "IOS"],
    customSupport: true,
    isPopular: true,
  },
  {
    name: "Corporativo",
    currency: "PEN",
    price: 29.99,
    limits: {
      docs: 0,
      offices: 4,
      warehouses: 4,
      users: 8,
      products: 0,
    },
    devices: ["Web", "Android", "IOS"],
    customSupport: true,
  },
]);

console.log("Plans Seeeding");

/*** Periodos */

await Period.create([
  {
    name: "Mensual",
    months: 1,
    discount: 0,
  },
  {
    name: "Trimestral",
    months: 3,
    discount: 5,
  },
  {
    name: "Semi-Anual",
    months: 6,
    discount: 10,
  },
  {
    name: "Anual",
    months: 12,
    discount: 15,
  },
]);

console.log("Periodos Seeeding");

/** Asignar empresa al usuario */

const business = await Business.create({
  name: "Cotupe S.A.C",
  ruc: 10545686546,
  sol: {
    username: "test",
    password: "test",
  },
  fiscalAddress: "Mi casa - Av. Alcatraz",
  ubigeo: "10256",
  users: [user._id],
  settings: {
    printBankAccounts: "",
    productsDefaultSockControl: true,
    productsDefaultSalesWithoutStock: true,
    printDefaultFormat: "80mm",
    printHeader: "",
    printNumberDecimals: 2,
    printInvoicesA4Columns: [
      "order",
      "unit",
      "code",
      "description",
      "quantity",
      "unit_price",
      "total",
    ],
    printInvoicesA5Columns: [
      "unit_value",
      "igv",
      "isc",
      "icbper",
      "discount",
      "sale_value",
      "total",
      "unit_price",
      "quantity",
      "description",
      "code",
      "unit",
      "order",
    ],
    sunatLegend2001: false,
    sunatLegend2002: false,
  },
});

/** asignar suscripcion a una empresa */

await Subscription.create({
  business: business._id,
  name: "Gratis",
  limits: {
    docs: 30,
    offices: 1,
    warehouses: 1,
    users: 1,
    products: 100,
  },
  startDate: dayjs.utc().format(),
  endDate: dayjs.utc().add(1, "month").format(),
  months: 1,
});

/** Warehouse */

const warehouse = await Warehouse.create([
  {
    business: business._id,
    name: "PRINCIPAL",
    address: "AV. ALCATRACES LT. 17 MZ. F",
  },
  {
    business: business._id,
    name: "IMPORTACIONES",
    address: "AV. MI CASA",
  }
]);

/** Office */

await Office.create({
  business: business._id,
  name: "Principal",
  series: [
    {
      type: "01",
      serie: "FF01",
      number: 1,
    },
    {
      type: "03",
      serie: "BB01",
      number: 1,
    },
    {
      type: "07",
      serie: "FC01",
      number: 1,
    },
    {
      type: "07",
      serie: "BC01",
      number: 1,
    },
    {
      type: "08",
      serie: "FD01",
      number: 1,
    },
    {
      type: "08",
      serie: "BD01",
      number: 1,
    },
    {
      type: "09",
      serie: "T001",
      number: 1,
    },
    {
      type: "99",
      serie: "0001",
      number: 1,
    },
  ],
  users: [user._id],
  warehouses: [warehouse._id],
});

/*await Category.create([
  {
    name: "Tubos",
  },
  {
    name: "Angulos",
  },
  {
    name: "Planchas",
  },
]);*/

process.exit();
