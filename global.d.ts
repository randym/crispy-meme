declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// MARK: Json Api Interfaces
interface JsonApiResourceIdentifier {
  id: number | string;
  type: string;
}

type JsonApiHousehold = JsonApiResourceIdentifier & {
  attributes: {
    ref: number;
    firstName: string;
    lastName: string;
    residentCount: number;
    hasChildren: boolean;
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

type JsonApiCity = JsonApiResourceIdentifier & {
  attributes: {
    name: string;
  };
  relationships: {
    households: {
      data: { id: number; type: string }[];
    };
    energyProductions: {
      data: { id: number; type: string }[];
    };
  };
};

type JsonApiCitiesDocument = {
  data: JsonApiCity[];
  included: JsonApiHousehold[] | JsonApiEnergyProduction[];
};

interface EnergyProductionAttributes {
  householdRef: number;
  productionMonth: string;
  kwh: number;
  temperature: number;
  daylight: number;
}

type JsonApiEnergyProduction = JsonApiResourceIdentifier & {
  attributes: EnergyProductionAttributes;
};

// MARK: Models
interface ViewModel {
  general: Record<string, string | number>;
  averages: Record<string, string>;
  tabs: Record<string, string>;
  charts: Record<string, ChartProps>;
}

type HouseholdModel = {
  id: number;
  ref: number;
  firstName: string;
  lastName: string;
  residentCount: number;
  hasChildren: boolean;
  city: CityModel;
  energyProductions: EnergyProductionModel[];
};

type HouseholdViewModel = ViewModel & {
  url: string;
  fullName: string;
  city: {
    url: string;
    name: string;
  };
};

type CityModel = {
  id: number;
  name: string;
  households?: HouseholdModel[];
  energyProductions?: EnergyProductionModel[];
};

type CityViewModel = ViewModel & {
  url: string;
  name: string;
  households: string;
  householdsUrl: string;
};

type EnergyProductionModel = {
  id: number;
  householdRef: number;
  productionMonth: Date;
  kwh: number;
  temperature: number;
  daylight: number;
};

interface HouseholdProps {
  household: HouseholdModel;
}

interface HouseholdDetailProps {
  viewModel: HouseholdViewModel;
}

interface CityDetailProps {
  viewModel: CityViewModel;
}

interface CityChartsProps {
  viewModel: CityViewModel;
}

// MARK: Component Props
interface CityCardProps {
  item: CityModel;
}

interface HouseholdCardProps {
  item: HouseholdModel;
}

interface Identifiable {
  id: string | number;
}

interface EnergyProductionStats {
  month: Date;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
}

interface ListableItemProps {
  item: Identifiable;
}

type PageFetcher = {
  initial: readonly any[];
  getPage(page: number, pageSize: number): Promise<any[]>;
};

type ChartSeriesAttribute = "kwh" | "daylight" | "temperature";

type ChartType =
  | "line"
  | "area"
  | "bar"
  | "pie"
  | "donut"
  | "radialBar"
  | "scatter"
  | "bubble"
  | "heatmap"
  | "candlestick"
  | "boxPlot"
  | "radar"
  | "polarArea"
  | "rangeBar"
  | "rangeArea"
  | "treemap";

interface ChartProps {
  series: ApexAxisChartSeries;
  type: ChartType;
}

interface ChartsProps {
  viewModel: {
    charts: Record<ChartSeriesAttribute, ChartProps>;
    tabs: Record<ChartSeriesAttribute, string>;
  };
}

/* TODO:
 - I dont like the document vs array of jsonapiobject 
 - I dont like the conditional attributes in parseJsonApi
*/
type JsonApiTransformer<T> = {
  transform: (
    json:
      | JsonApiCitiesDocument
      | JsonApiHouseholdsDocument
      | JsonApiEnergyProduction[],
  ) => T | T[];
  parseJsonApi: ({
    json,
    included,
    jsonApiHouseholds,
    jsonApiEnergyProductions,
  }: {
    json: any;
    included?: JsonApiEnergyProduction[] | JsonApiHousehold[];
    jsonApiHouseholds?: JsonApiHousehold[];
    jsonApiEnergyProductions?: JsonApiEnergyProduction[];
  }) => T | T[];
};

type Constructable = { new (...args: any[]): any };

interface JsonApiModelConstructor<T> extends Constructable {
  include: string[];
}
interface JsonApiCollection<T> extends Array<T> {
  transformer: JsonApiTransformer<T>;
  include: string[];
  url?: string;
  from: (records: T[]) => JsonApiCollection<T>;
}

type ReadOnlyJsonApiCollection<T> = Readonly<JsonApiCollection<T>>;

type LoaderParams<T> = {
  collection: JsonApiCollection<T>;
};

interface Paginating<T> {
  page(pageNumber: number): Promise<readonly T[]>;
}
