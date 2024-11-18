import { EnergyPricingPlanCalculation as Model } from "../../models";

export const Transformer: EnergyPricingPlanCalculationTransformer = {
  transform(json) {
    return Transformer.parseJsonApi({ json });
  },

  parseJsonApi({ json }) {
    const { attributes } = json.data;
    const { energyCharge, energyChargeDetail } = attributes;

    return new Model({
      energyCharge,
      energyChargeDetail,
    });
  },
};
