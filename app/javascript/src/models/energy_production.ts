export class EnergyProduction implements EnergyProductionModel {
  id: number = 0;
  householdRef: number = 0;
  productionMonth: Date = new Date();
  kwh: number = 0;
  temperature: number = 0;
  daylight: number = 0;

  constructor(attributes: EnergyProductionModel) {
    Object.assign(this, attributes);
  }
}
