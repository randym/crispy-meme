import { EnergyProduction } from "./";
import { Household as Model } from "../../models";

const householdScope = (household: JsonApiHousehold) => (item: any) =>
  item.type === "energyProduction" &&
  item.attributes.householdRef === household.attributes.ref;

export const Household: JsonApiTransformer<HouseholdModel> = {
  transform(json): HouseholdModel[] | HouseholdModel {
    const { data, included = [] } = json as JsonApiHouseholdsDocument;
    if (Array.isArray(data)) {
      return data.map((household: JsonApiHousehold) => {
        return Household.parseJsonApi({
          json: household,
          jsonApiEnergyProductions: included.filter(householdScope(household)),
        }) as HouseholdModel;
      });
    } else {
      return Household.parseJsonApi({
        json: data,
        jsonApiEnergyProductions: included.filter(householdScope(data)),
      }) as HouseholdModel;
    }
  },

  /* transforms a single JsonApiHousehold object into a HouseholdModel object */
  parseJsonApi({ json, jsonApiEnergyProductions }): HouseholdModel {
    const {
      id,
      type,
      attributes: data,
      relationships,
    } = json as JsonApiHousehold;

    const { ref, firstName, lastName, residentCount, hasChildren, city } = data;
    const energyProductions = EnergyProduction.transform(
      jsonApiEnergyProductions as JsonApiEnergyProduction[],
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
