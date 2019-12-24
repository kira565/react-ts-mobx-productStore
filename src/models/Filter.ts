import {Instance, types} from "mobx-state-tree";
import {DATE_RECEIPT, SHOW_ALL, SHOW_COLOR, SHOW_INSTOCK, SHOW_SIZE, SHOW_TYPE} from "../common/constants_common";


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
    id: types.identifierNumber, // Может не пригодиться, надо протестить
    type: types.union(FTypes),
    value: types.optional(types.union(FValues), SHOW_ALL)
})
    .views(self => ({
        get getValue(): any {
            return self.value
        }
    }))
    .actions(self => ({
        setValue(value: any): void{
            self.value = value
        }
    }));
