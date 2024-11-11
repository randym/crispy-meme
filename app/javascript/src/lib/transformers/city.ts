import { Household } from "./";
import { City as Model } from "../../models";
import { EnergyProduction } from ".";

export const City: JsonApiTransformer<CityModel> = {
  transform(json): CityModel[] | CityModel {
    const { data, included: all = [] } = json as JsonApiCitiesDocument;

    const jsonApiHouseholds = all.filter(
      (included) => included.type === "household",
    ) as JsonApiHousehold[];

    const jsonApiEnergyProductions = all.filter(
      (included) => included.type === "energyProduction",
    ) as JsonApiEnergyProduction[];

    if (Array.isArray(data)) {
      return data.map((json: JsonApiCity) => {
        const households = jsonApiHouseholds.filter((household) => {
          return [household.relationships!.city.data].flat()[0].id === json.id;
        });

        const energyProductions = jsonApiEnergyProductions.filter(
          (included) => {
            return households.some(
              (household) =>
                household.attributes.ref === included.attributes.householdRef,
            );
          },
        );

        return City.parseJsonApi({
          json,
          jsonApiHouseholds: households,
          jsonApiEnergyProductions: energyProductions,
        }) as CityModel;
      });
    } else {
      return City.parseJsonApi({
        json: data,
        jsonApiHouseholds,
        jsonApiEnergyProductions,
      }) as CityModel;
    }
  },

  parseJsonApi({ json, jsonApiHouseholds, jsonApiEnergyProductions }) {
    const { id, type, attributes } = json;

    if (type !== "city") {
      throw new Error(`Expected type 'city', received '${type}'`);
    }

    const { name } = attributes;
    const householdDoc: JsonApiHouseholdsDocument = {
      data: jsonApiHouseholds as JsonApiHousehold[],
      included: [],
    };

    const households = Household.transform({
      ...householdDoc,
      included: [],
    });

    const energyProductions = EnergyProduction.transform(
      jsonApiEnergyProductions as JsonApiEnergyProduction[],
    ) as EnergyProductionModel[];

    [households].flat().forEach((household) => {
      household.energyProductions = energyProductions.filter(
        (production) => production.householdRef === household.ref,
      );
    });

    return new Model({
      id: Number(id),
      name,
      households: [households].flat(),
      energyProductions,
    });
  },
};
