import { City as ViewModel } from "../view_models";
import { Api } from "../lib/api";

export class City implements CityModel {
  id: number = 0;
  name: string = "";

  constructor(attributes: CityModel) {
    Object.assign(this, attributes);
  }

  static find(id: number): Promise<CityModel> {
    return Api.cities.show(id);
  }

  static async page(pageNumber: number): Promise<readonly CityModel[]> {
    return Api.cities.index(pageNumber);
  }

  get viewModel(): ViewModel {
    return new ViewModel({ city: this });
  }
}
