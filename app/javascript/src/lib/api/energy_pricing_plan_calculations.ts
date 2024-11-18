import { EnergyPricingPlanCalculation as Transformer } from "../transformers";
import { request } from "./request";
import { readings } from "../../config/meter_readings";

const options = {
  fetchOptions: {
    method: "POST",
    body: JSON.stringify({ readings: readings }),
  },
  transformer: Transformer,
};

export const Resource = {
  show: async (id: number) => {
    const url = `/energy_pricing_plans/${id}/calculate`;

    return await request(url, options);
  },
};
