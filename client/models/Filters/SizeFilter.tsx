import {SHOW_SIZE} from "../../common/constants_common";
import {types} from "mobx-state-tree";

import {createFilterBase, Str} from "./FilterPrototype";

export const SizeFilter = types.compose(
    'SizeFilter',
    createFilterBase(Str, 'size'),
    types.model({
        type: types.literal(SHOW_SIZE)
    })
);
