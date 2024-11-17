import {
  Household as HouseholdTransformer,
  City as CityTransformer,
  EnergyPricingPlan as EnergyPricingPlanTransformer,
} from "../lib/transformers";
import { Config } from "../config";
import { EnergyPricingPlan } from "@/models/energy_pricing_plan";
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

  energyPricingPlans: {
    options(pageNumber: number) {
      return {
        params: {
          per: pageSize,
          page: pageNumber,
        },
        transformer: EnergyPricingPlanTransformer,
      };
    },

    index: async (pageNumber: number) => {
      return await Api.fetch(
        "/energy_pricing_plans",
        Api.energyPricingPlans.options(pageNumber),
      );
    },

    show: async (id: number) => {
      return await Api.fetch(
        `/energy_pricing_plans/${id}`,
        Api.energyPricingPlans.options(1),
      );
    },

    getCost: async (
      id: number,
      readings: number[][],
    ): Promise<readonly EnergyPricingPlan[]> => {
      return await Api.fetch(`/energy_pricing_plans/${id}/calculate`, {
        fetchOptions: { method: "POST", body: JSON.stringify({ readings }) },
      });
    },
  },
  async fetch(
    path: string,
    options?: {
      params?: Record<string, any>;
      transformer?: { transform: (json: any) => any };
      fetchOptions?: RequestInit;
    },
  ) {
    const url = new URL(path, window.location.origin);
    const { searchParams } = url;
    const { params = {}, fetchOptions = {} } = options || {};

    for (const [key, value] of Object.entries(params)) {
      [value].flat().forEach((item) => {
        searchParams.set(key, item.toString());
      });
    }

    Object.assign(fetchOptions, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

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

  get getCsrfToken(): string | null {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute("content") : null;
  },
};
