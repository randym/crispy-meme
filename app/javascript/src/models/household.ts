import { Household as ViewModel } from "../view_models";
import { Households as Remote } from "../lib/api";

export class Household implements Household {
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

  constructor(attributes: HouseholdModelAttributes) {
    Object.assign(this, attributes);
  }

  static find = Remote.show;
  static page = Remote.index;

  get viewModel(): ViewModel {
    return new ViewModel({ household: this });
  }
}
