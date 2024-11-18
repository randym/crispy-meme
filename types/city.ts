interface CityModelAttributes {
  id: number;
  name: string;
  households: HouseholdModel[];
  energyProductions: EnergyProductionModel[];
}

type CityModel = CityModelAttributes & {
  viewModel: CityViewModel;
};

interface CityViewModel {
  url: string;
  name: string;
  households: string;
  householdsUrl: string;
  general: Record<string, string | number>;
  averages: Record<string, string>;
  tabs: Record<string, string>;
  charts: Record<string, ChartProps>;
}
