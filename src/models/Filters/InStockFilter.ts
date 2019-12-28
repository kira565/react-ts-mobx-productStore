import {SHOW_INSTOCK} from "../../common/constants_common";
import {TProduct} from "../../types/types";
import {types} from "mobx-state-tree";
import {FValues, TFValues} from "./FValues";

export const InStockFilter = types.model(SHOW_INSTOCK, {
    id: types.identifier,
    type: SHOW_INSTOCK,
    value: types.optional(types.union(FValues), false),
    options: types.optional(types.array(types.string), [])
})
    .views(self => ({
        getFilter(product: TProduct): boolean {
            return product.inStock === self.value;
        }
    }))
    .actions(self => ({
        setValue(value: TFValues): void {
            self.value = value
        }
    }));
