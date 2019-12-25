import {types} from "mobx-state-tree";
import {DATE_RECEIPT, SHOW_ALL, SHOW_COLOR, SHOW_INSTOCK, SHOW_SIZE, SHOW_TYPE} from "../common/constants_common";
import {TFValues} from "../types/types";


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
        get getValue(): TFValues {
            return self.value
        }
    }))
    .actions(self => ({
        setValue(value: TFValues): void {
            self.value = value
        }
    }));
