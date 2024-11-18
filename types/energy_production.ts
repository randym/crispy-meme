interface EnergyProductionStats {
  month: Date;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
}

interface EnergyProductionAttributes {
  householdRef: number;
  kwh: number;
  temperature: number;
  daylight: number;
}

type EnergyProductionModel = EnergyProductionAttributes & {
  id: number;
  productionMonth: Date;
};

type JsonApiEnergyProduction = JsonApiResourceIdentifier & {
  attributes: EnergyProductionAttributes & {
    productionMonth: string;
  };
};
type EnergyProductionsTransformer = {
  transform: (json: JsonApiEnergyProduction[]) => EnergyProductionModel[];
  parseJsonApi: ({
    json,
  }: {
    json: JsonApiEnergyProduction;
  }) => EnergyProductionModel;
};
