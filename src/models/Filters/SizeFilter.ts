import {TProduct} from "../../types/types";
import {SHOW_ALL, SHOW_SIZE} from "../../common/constants_common";
import {types} from "mobx-state-tree";
import {FValues, TFValues} from "./FValues";



export const SizeFilter = types.model(SHOW_SIZE, {
    id: types.identifier,
    type: types.string,
    value: types.optional(types.union(FValues), SHOW_ALL),
    options: types.optional(types.array(types.string), []),
})
    .views(self => ({
        getFilter(product: TProduct): boolean{
            return product.size === self.value;
        }
    }))
    .actions(self => ({
        setValue(value: TFValues): void {
            self.value = value
        }
    }));