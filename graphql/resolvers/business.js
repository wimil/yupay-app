import Business from "../../models/business";
import Office from "../../models/office";
import PeruConsult from "../../services/peru-consult";

export default {
  Query: {
    async getBusinessByUser(_, {}, ctx) {
      const business = await Business.find({
        users: [ctx.auth.id],
      });

      return business;
    },
  },
  Mutation: {
    async createBusiness(_, { input }, ctx) {
      const ruc = await PeruConsult.ruc(input.ruc);
      if (ruc) {
        const data = {
          ...input,
          name: ruc.razonSocial,
          fiscalAddress: ruc.direccion,
          tradename: ruc.nombreComercial,
          ubigeo: "00000",
          logo: null,
          type: ruc.tipo,
          department: ruc.departamento,
          province: ruc.provincia,
          district: ruc.distrito,
          enrollmentDate: ruc.fechaInscripcion,
          emissionSystem: ruc.sistEmsion,
          accountingSystem: ruc.sistContabilidad,
          outdoorActivity: ruc.actExterior,
          economicActivities: ruc.actEconomicas,
          cpPago: ruc.cpPago,
          sistElectronica: ruc.sistElectronica,
          fechaPle: ruc.fechaPle,
          padrones: ruc.padrones,
          fechaBaja: ruc.fechaBaja,
          profesion: ruc.profesion,
          users: [ctx.auth.id],
        };

        const business = await Business.create(data);

        // Crear Office
        const office = await Office.create({
          business: business._id,
          name: "Principal",
          address: null,
        });

        // Crear Warehouse

        return business;
      }
    },
    async updateBusiness(_, { id, input }, ctx) {
      //
    },
  },
};
