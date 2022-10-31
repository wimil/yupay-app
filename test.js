import PeruConsult from "./services/peru-consult";

const dni = await PeruConsult.dni("48608459");

const ruc = await PeruConsult.ruc("20603830521");

console.log(dni);

console.log(ruc);
