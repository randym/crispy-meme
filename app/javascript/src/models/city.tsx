import { City as ViewModel } from "../view_models";
import { Cities as Remote } from "../lib/api";

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
