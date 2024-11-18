import { EnergyPricingPlan as ViewModel } from "../view_models";
import { EnergyPricingPlans as Remote } from "../lib/api";
import { EnergyPricingPlanCalculation } from "./energy_pricing_plan_calculation";

export class EnergyPricingPlan implements EnergyPricingPlanModel {
  id = 0;
  name = "";
  energy_pricing_groups = [];

  constructor(attributes: EnergyPricingPlanModelAttributes) {
    Object.assign(this, attributes);
  }

  static find = Remote.show;
  static page = Remote.index;

  getCost() {
    return EnergyPricingPlanCalculation.find(this.id);
  }

  get viewModel(): ViewModel {
    return new ViewModel({ model: this });
  }
}
