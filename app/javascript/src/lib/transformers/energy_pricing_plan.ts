import { EnergyPricingPlan as Model } from "../../models";

export const EnergyPricingPlan: JsonApiTransformer<Model> = {
  transform(json): Model[] | Model {
    const { data } = json as JsonApiEnergyPricingPlansDocument;
    if (Array.isArray(data)) {
      return data.map((json: JsonApiEnergyPricingPlan) => {
        return EnergyPricingPlan.parseJsonApi({ json }) as Model;
      });
    } else {
      return EnergyPricingPlan.parseJsonApi({ json: data }) as Model;
    }
  },

  parseJsonApi({ json }: { json: JsonApiEnergyPricingPlan }): Model {
    const { id, attributes } = json;
    const { name, energy_pricing_groups } = attributes;
    return new Model({
      id: Number(id),
      name,
      groups: energy_pricing_groups.map((group) => ({
        name: group.name,
        tiers: group.tiers.map((tier) => ({
          rate: tier.rate,
          min: tier.min,
          max: tier.max,
        })),
      })),
    });
  },
};
