import {types} from "mobx-state-tree";
import {SHOW_ALL} from "../../common/constants_common";
import {TProdFields, TProduct} from "../../types/types";
import {TFValues} from "./FValues";

export const Bool = types.optional(types.boolean, false);
export const Str = types.optional(types.string, SHOW_ALL);
export const Arr = types.optional(types.array(types.string), []);


export const createFilterBase = (valueType: any, productField: TProdFields) => {
    return types.model({
        id: types.identifier,
        type: types.string,
        value: valueType,
        options: types.optional(types.array(types.string), [])
    })
        .views(self => ({
            getFilter(product: TProduct): boolean {
                return product[productField] === self.value;
            }
        }))
        .actions(self => ({
            setValue(value: TFValues): void {
                self.value = value
            }
        }))
};


