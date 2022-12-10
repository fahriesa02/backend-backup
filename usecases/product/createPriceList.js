import { Product, Supply } from "../../models/index.js";

export default async (params) => {
  const itemParams = params.item;
  const supplyParams = params.supply;

  const item = Product.create(itemParams);
  if(!item) return [null, 'FAILED_TO_CREATE_PRODUCT'];

  const supply = Supply.create(supplyParams);
  if(!supply) return [null, 'FAILED_TO_CREATE_SUPPLY'];

  return [{ item, supply }, null];
}