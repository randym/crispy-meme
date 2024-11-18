import { City as ViewModel } from "../view_models";
import { Cities as Remote } from "../lib/api";

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

type CityTransformer = {
  transform: (json: JsonApiCitiesDocument) => CityModel | CityModel[];
  parseJsonApi: ({
    json,
    jsonApiHouseholds,
    jsonApiEnergyProductions,
  }: {
    json: JsonApiCity;
    jsonApiHouseholds: JsonApiHousehold[];
    jsonApiEnergyProductions: JsonApiEnergyProduction[];
  }) => CityModel;
};

export class City implements CityModel {
  id: number = 0;
  name: string = "";
  households = [];
  energyProductions = [];

  constructor(attributes: CityModelAttributes) {
    Object.assign(this, attributes);
  }

  static find = Remote.find;
  static page = Remote.page;

  get viewModel(): ViewModel {
    return new ViewModel({ city: this });
  }
}
