import Products from "../models/index.js";
import Supply from "../models/Supply.js";

export default async (params) => {
  const itemParams = params.item;
  const supplyParams = params.supply;

  const item = Products.create(itemParams);
  if(!item) return [null, 'FAILED_TO_CREATE_PRODUCT'];

  const supply = Supply.create(supplyParams);
  if(!supply) return [null, 'FAILED_TO_CREATE_SUPPLY'];

  return [{ item, supply }, null];
}