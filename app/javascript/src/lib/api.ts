import {
  Household as HouseholdTransformer,
  City as CityTransformer,
} from "../lib/transformers";
import { Config } from "../config";
const { pageSize } = Config.pagination;

export const Api = {
  households: {
    options(pageNumber: number) {
      return {
        params: {
          include: "energy_productions",
          per: pageSize,
          page: pageNumber,
        },
        transformer: HouseholdTransformer,
      };
    },
    index: async (pageNumber: number) =>
      await Api.fetch("/households", Api.households.options(pageNumber)),
    show: async (id: number) =>
      await Api.fetch(`/households/${id}`, Api.households.options(1)),
  },
  cities: {
    options(pageNumber: number) {
      return {
        params: {
          include: ["energy_productions", "households"],
          per: pageSize,
          page: pageNumber,
        },
        transformer: CityTransformer,
      };
    },
    index: async (pageNumber: number) =>
      await Api.fetch("/cities", Api.cities.options(pageNumber)),
    show: async (id: number) =>
      await Api.fetch(`/cities/${id}`, Api.cities.options(1)),
  },

  async fetch(
    path: string,
    options?: {
      params?: Record<string, any>;
      transformer?: { transform: (json: any) => any };
    },
  ) {
    const url = new URL(path, window.location.origin);
    const { searchParams } = url;
    const { params = {} } = options || {};

    for (const [key, value] of Object.entries(params)) {
      [value].flat().forEach((item) => {
        searchParams.set(key, item.toString());
      });
    }

    const fetchOptions = { headers: { Accept: "application/json" } };
    return fetch(url, fetchOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network request failed: ${res.statusText}`);
        }
        return res.json();
      })
      .then((json) => {
        return options?.transformer?.transform(json) || json;
      })
      .catch((e) => {
        console.error("Error remote fetching data", e);
        throw e;
      });
  },
};
