import { Household } from "./";
import { City as Model } from "../../models";
import { EnergyProduction } from ".";
import { partition } from "../utils/partition";

type JsonApiCity = JsonApiResourceIdentifier & {
  attributes: {
    name: string;
  };
  relationships: {
    households: {
      data: { id: number; type: string }[];
    };
    energyProductions: {
      data: { id: number; type: string }[];
    };
  };
};

type JsonApiCitiesDocument = {
  data: JsonApiCity[];
  included: JsonApiHousehold[] | JsonApiEnergyProduction[];
};

type CityTransformer = {
  transform: (json: JsonApiCitiesDocument) => CityModel | CityModel[];
  parseJsonApi: ({
    json,
    jsonApiHouseholds,
    jsonApiEnergyProductions,
  }: {
    json: JsonApiCity;
    jsonApiHouseholds: JsonApiHousehold[];
    jsonApiEnergyProductions: JsonApiEnergyProduction[];
  }) => CityModel;
};

export const City: CityTransformer = {
  transform(json) {
    const { data, included: all = [] } = json;

    const jsonApiHouseholds = all.filter(
      (included) => included.type === "household",
    ) as JsonApiHousehold[];

    const jsonApiEnergyProductions = all.filter(
      (included) => included.type === "energyProduction",
    ) as JsonApiEnergyProduction[];

    if (Array.isArray(data)) {
      return data.map((json) => {
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
        });
      });
    } else {
      return City.parseJsonApi({
        json: data,
        jsonApiHouseholds,
        jsonApiEnergyProductions,
      });
    }
  },

  parseJsonApi({ json, jsonApiHouseholds, jsonApiEnergyProductions }) {
    const { id, attributes } = json;
    const { name } = attributes;

    const partitioned = partition(
      jsonApiEnergyProductions as JsonApiEnergyProduction[],
      (item) => item.attributes.householdRef,
    );

    const households = jsonApiHouseholds.map((json) => {
      const jsonApiEnergyProductions = partitioned[json.attributes.ref];

      return Household.parseJsonApi({
        json,
        jsonApiEnergyProductions,
      });
    });

    const energyProductions = EnergyProduction.transform(
      jsonApiEnergyProductions,
    );

    return new Model({
      id: Number(id),
      name,
      households,
      energyProductions,
    });
  },
};
