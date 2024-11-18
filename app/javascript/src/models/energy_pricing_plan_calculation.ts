import { EnergyPricingPlanCalculations as Remote } from "../lib/api";

export class EnergyPricingPlanCalculation
  implements EnergyPricingPlanCalculation
{
  energyCharge: number = 0;
  energyChargeDetail: EnergyChargeDetail;

  constructor({
    energyCharge,
    energyChargeDetail,
  }: EnergyPricingPlanCalculation) {
    this.energyCharge = energyCharge;
    this.energyChargeDetail = energyChargeDetail;
  }

  static find = Remote.show;
}
