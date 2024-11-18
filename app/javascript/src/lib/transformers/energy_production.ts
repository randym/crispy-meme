import { EnergyProduction as Model } from "../../models";

export const Transformer: EnergyProductionsTransformer = {
  transform(json) {
    return json.map((item) => Transformer.parseJsonApi({ json: item }));
  },

  parseJsonApi({ json }) {
    const { id, attributes } = json;
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
