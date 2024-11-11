import { Household as ViewModel } from "../view_models";
import { Api } from "../lib/api";

export class Household implements HouseholdModel {
  id: number = 0;
  ref: number = 0;
  firstName: string = "";
  lastName: string = "";
  residentCount: number = 0;
  hasChildren: boolean = false;
  city: {
    id: number;
    name: string;
  } = { id: 0, name: "" };
  energyProductions: EnergyProductionModel[] = [];

  constructor(attributes: HouseholdModel) {
    Object.assign(this, attributes);
  }

  static find(id: number): Promise<CityModel> {
    return Api.households.show(id);
  }

  static async page(pageNumber: number): Promise<readonly CityModel[]> {
    return Api.households.index(pageNumber);
  }

  get viewModel(): ViewModel {
    return new ViewModel({ household: this });
  }
}
