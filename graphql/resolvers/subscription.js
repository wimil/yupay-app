import Subscription from "#models/subscription";

export default {
  Query: {
    async getSubscriptionByBusiness(_, { business }, ctx) {
      //console.log(`bussines: ${business}`);
      const subscription = await Subscription.findOne({
        business: business,
      });

      return subscription;
    },
  },
  Mutation: {
    //
  },
};
