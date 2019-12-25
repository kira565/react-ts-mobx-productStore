import {types} from "mobx-state-tree";
import {DATE_RECEIPT, SHOW_ALL, SHOW_COLOR, SHOW_INSTOCK, SHOW_SIZE, SHOW_TYPE} from "../common/constants_common";
import {TFValues, TProduct} from "../types/types";


export const FTypes = types.union(
    types.literal(SHOW_TYPE),
    types.literal(SHOW_SIZE),
    types.literal(SHOW_COLOR),
    types.literal(SHOW_INSTOCK),
    types.literal(DATE_RECEIPT)
);
export const FValues = types.union(
    types.string,
    types.boolean,
    types.array(types.string)
);

export const Filter = types.model("Filter", {
    id: types.identifierNumber,
    type: types.union(FTypes),
    value: types.optional(types.union(FValues), SHOW_ALL)
})
    .views(self => ({
        getValue(product: TProduct): boolean {
            switch (self.type) {
                case SHOW_TYPE:
                    return product.type === self.value;
                case SHOW_COLOR:
                    return product.color === self.value;
                case SHOW_SIZE:
                    return product.size === self.value;
                case SHOW_INSTOCK:
                    return product.inStock === self.value;
                case DATE_RECEIPT:
                    return new Date(product.dateReceipt) >= new Date(self.value[0])
                        && new Date(product.dateReceipt) <= new Date(self.value[1]);
                default: return true
            }
        }
    }))
    .actions(self => ({
        setValue(value: TFValues): void {
            self.value = value
        }
    }));
