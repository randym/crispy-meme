import { Household as Transformer } from "../transformers";
import { pageSize } from "../../config";
import { request } from "./request";

const options = (pageNumber: number = 1) => ({
  params: {
    include: "energy_productions",
    per: pageSize,
    page: pageNumber,
  },
  transformer: Transformer,
});

export const Resource = {
  index: async (pageNumber: number) =>
    await request("/households", options(pageNumber)),

  show: async (id: number) => await request(`/households/${id}`, options(1)),
};
