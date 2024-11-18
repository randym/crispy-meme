interface SharedHouseholdAttributes {
  ref: number;
  firstName: string;
  lastName: string;
  residentCount: number;
  hasChildren: boolean;
}

interface HouseholdModelAttributes extends SharedHouseholdAttributes {
  id: number;
  city: { id: number; name: string };
  energyProductions: EnergyProductionModel[];
}

type HouseholdModel = HouseholdModelAttributes & {
  viewModel: HouseholdViewModel;
};

type HouseholdTransformer = {
  transform: (
    json: JsonApiHouseholdsDocument,
  ) => HouseholdModel | HouseholdModel[];
  parseJsonApi: ({
    json,
    jsonApiEnergyProductions,
  }: {
    json: any;
    jsonApiEnergyProductions: JsonApiEnergyProduction[];
  }) => HouseholdModel;
};

interface HouseholdViewModel {
  url: string;
  fullName: string;
  city: {
    url: string;
    name: string;
  };
  general: Record<string, string | number>;
  averages: Record<string, string>;
  tabs: Record<string, string>;
  charts: Record<string, ChartProps>;
}

interface HouseholdDetailProps {
  viewModel: HouseholdViewModel;
}

type JsonApiHousehold = JsonApiResourceIdentifier & {
  attributes: SharedHouseholdAttributes & {
    city: string;
  };
  relationships: {
    city: {
      data: { id: number; type: string };
    };
    energyProductions: {
      data: { id: number; type: string }[];
    };
  };
};

type JsonApiHouseholdsDocument = {
  data: JsonApiHousehold[];
  included: JsonApiEnergyProduction[];
};
