interface EnergyPricingPlanCalculationAttributes {
  energyCharge: number;
  energyChargeDetail: EnergyChargeDetail;
}

interface JsonApiEnergyPricingPlanCalculation {
  data: {
    id: string;
    attributes: EnergyPricingPlanCalculationAttributes;
  };
}

type EnergyPricingPlanCalculationTransformer = {
  transform: (
    json: JsonApiEnergyPricingPlanCalculation,
  ) => EnergyPricingPlanCalculationModel;
  parseJsonApi: ({
    json,
  }: {
    json: JsonApiEnergyPricingPlanCalculation;
  }) => EnergyPricingPlanCalculationModel;
};

interface EnergyChargeDetail {
  groups: EnergyPricingGroup[];
}

type EnergyPricingPlanCalculationModel =
  EnergyPricingPlanCalculationAttributes & {};
