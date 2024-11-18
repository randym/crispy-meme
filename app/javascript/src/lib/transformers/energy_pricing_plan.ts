import { EnergyPricingPlan as Model } from "../../models";

export const Transformer: EnergyPricingPlanTransformer = {
  transform(json) {
    const { data } = json;
    const builder = (item: JsonApiEnergyPricingPlan) => {
      return Transformer.parseJsonApi({ json: item });
    };

    return Array.isArray(data) ? data.map(builder) : builder(data);
  },

  parseJsonApi({ json }) {
    const { id, attributes } = json;
    const { name, energy_pricing_groups } = attributes;

    return new Model({
      id: Number(id),
      ...attributes,
    });
  },
};
