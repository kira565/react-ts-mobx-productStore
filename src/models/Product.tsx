import {types} from "mobx-state-tree";

export const Product = types.model("Product", {
    id: types.identifierNumber,
    name: types.string,
    type: types.string,
    color: types.string,
    size: types.string,
    inStock: types.number,
    dateReceipt: types.string
});
