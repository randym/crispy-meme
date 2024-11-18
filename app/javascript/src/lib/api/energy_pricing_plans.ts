import {
  EnergyPricingPlan as Transformer,
  EnergyPricingPlanCalculation as CalculationTransformer,
} from "../transformers";
import { pageSize } from "../../config";
import { request } from "./request";

const options = (pageNumber: number = 1) => ({
  params: {
    per: pageSize,
    page: pageNumber,
  },
  transformer: Transformer,
});

export const Resource = {
  index: async (pageNumber: number) => {
    return await request("/energy_pricing_plans", options(pageNumber));
  },

  show: async (id: number) => {
    return await request(`/energy_pricing_plans/${id}`, options());
  },
};
