import { EnergyProduction } from "./";
import { Household as Model } from "../../models";
import { partition } from "../utils/partition";

export const Transformer: HouseholdTransformer = {
  transform(json) {
    const { data, included = [] } = json;
    const energyProductions = partition(
      included,
      (item) => item.attributes.householdRef,
    );

    const builder = (json: JsonApiHousehold) => {
      const jsonApiEnergyProductions =
        energyProductions[json.attributes.ref] || [];
      return Transformer.parseJsonApi({
        json,
        jsonApiEnergyProductions,
      });
    };

    return Array.isArray(data) ? data.map(builder) : builder(data);
  },

  /* transforms a single JsonApiHousehold object into a HouseholdModel object */
  parseJsonApi({ json, jsonApiEnergyProductions }) {
    const { id, attributes: data, relationships } = json;

    const { ref, firstName, lastName, residentCount, hasChildren, city } = data;

    const energyProductions = EnergyProduction.transform(
      jsonApiEnergyProductions,
    ) as EnergyProductionModel[];

    const { data: cityData } = relationships.city;
    const attributes = {
      id: Number(id),
      ref,
      firstName,
      lastName,
      residentCount,
      hasChildren,
      city: { id: cityData.id, name: city },
      energyProductions,
    };

    return new Model(attributes);
  },
};
