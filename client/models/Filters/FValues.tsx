import {Instance, types} from "mobx-state-tree";

export const FValues = types.union(
    types.string,
    types.number,
    types.array(types.string)
);

export type TFValues = Instance<typeof FValues>