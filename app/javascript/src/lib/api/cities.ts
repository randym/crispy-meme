import { City as Transformer } from "../transformers";
import { pageSize } from "../../config";
import { request } from "./request";

const options = (pageNumber: number = 1) => ({
  params: {
    include: ["energy_productions", "households"],
    per: pageSize,
    page: pageNumber,
  },
  transformer: Transformer,
});

export const Resource = {
  page: async (pageNumber: number) =>
    await request("/cities", options(pageNumber)),

  find: async (id: number) => await request(`/cities/${id}`, options()),
};
