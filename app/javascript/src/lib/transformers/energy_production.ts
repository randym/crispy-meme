import { EnergyProduction as Model } from "../../models";

export const EnergyProduction: JsonApiTransformer<EnergyProductionModel> = {
  transform(json): EnergyProductionModel[] | EnergyProductionModel {
    if (!Array.isArray(json)) {
      return EnergyProduction.parseJsonApi({ json }) as EnergyProductionModel;
    }

    return json.map(
      (item) =>
        EnergyProduction.parseJsonApi({ json: item }) as EnergyProductionModel,
    );
  },

  parseJsonApi({
    json,
  }: {
    json: JsonApiEnergyProduction;
  }): EnergyProductionModel {
    const { id, type, attributes } = json;

    if (type !== "energyProduction") {
      throw new Error(`Expected type 'energyProduction', received '${type}'`);
    }

    const {
      householdRef,
      productionMonth: productionMonthString,
      kwh,
      temperature,
      daylight,
    } = attributes;

    return new Model({
      id: Number(id),
      householdRef,
      productionMonth: new Date(productionMonthString),
      kwh,
      temperature,
      daylight,
    });
  },
};
