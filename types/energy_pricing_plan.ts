interface EnergyPricingTier {
  rate: number;
  min: number;
  max: number;
}

interface EnergyPricingGroup {
  name: string;
  tiers: EnergyPricingTier[];
  time_of_use: number[];
}

interface EnergyPricingPlanAttributes {
  name: string;
  energy_pricing_groups: EnergyPricingGroup[];
}

interface EnergyPricingPlanModelAttributes extends EnergyPricingPlanAttributes {
  id: number;
}

interface EnergyPricingPlanViewModel {
  name: string;
  groups: EnergyPricingGroup[];
}

type EnergyPricingPlanModel = EnergyPricingPlanModelAttributes & {
  viewModel: EnergyPricingPlanViewModel;
  getCost: () => Promise<any>;
};

type JsonApiEnergyPricingPlan = JsonApiResourceIdentifier & {
  id: number;
  attributes: EnergyPricingPlanAttributes;
};

type JsonApiEnergyPricingPlansDocument = {
  data: JsonApiEnergyPricingPlan[];
};

type EnergyPricingPlanTransformer = {
  transform: (
    json: JsonApiEnergyPricingPlansDocument,
  ) => EnergyPricingPlanModel | EnergyPricingPlanModel[];
  parseJsonApi: ({
    json,
  }: {
    json: JsonApiEnergyPricingPlan;
  }) => EnergyPricingPlanModel;
};
