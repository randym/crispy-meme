import { EnergyPricingPlan as ViewModel } from "../view_models";
import { Api } from "../lib/api";
import { readings } from "../config/meter_readings";
export class EnergyPricingPlan implements EnergyPricingPlanModel {
  id = 0;
  name = "";
  groups = [];
  readings = readings;
  constructor(attributes: IEnergyPricingPlan) {
    Object.assign(this, attributes);
  }

  static find(id: number): Promise<CityModel> {
    return Api.households.show(id);
  }

  static async page(
    pageNumber: number,
  ): Promise<readonly IEnergyPricingPlan[]> {
    return Api.energyPricingPlans.index(pageNumber);
  }

  async getCost(): Promise<any> {
    return Api.energyPricingPlans.getCost(this.id, this.readings);
  }

  get viewModel(): ViewModel {
    return new ViewModel({ model: this });
  }
}
