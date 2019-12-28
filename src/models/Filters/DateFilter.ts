import { TProduct} from "../../types/types";
import {DATE_RECEIPT} from "../../common/constants_common";
import {types} from "mobx-state-tree";
import {FValues, TFValues} from "./FValues";

export const DateReceipt = types.model(DATE_RECEIPT, {
    id: types.identifier,
    type: types.string,
    value: types.optional(types.union(FValues), []),
    options: types.optional(types.array(types.string), [])
})
    .views(self => ({
        getFilter(product: TProduct): boolean {
            return new Date(product.dateReceipt) >= new Date(self.value[0])
                && new Date(product.dateReceipt) <= new Date(self.value[1]);
        }
    }))
    .actions(self => ({
        setValue(value: TFValues): void {
            self.value = value
        }
    }));
