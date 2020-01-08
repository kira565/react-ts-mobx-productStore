import {SHOW_COLOR} from "../../common/constants_common";
import {types} from "mobx-state-tree"
import {createFilterBase, Str} from "./FilterPrototype";


export const ColorFilter = types.compose(
    'ColorFilter',
    createFilterBase(Str, 'color'),
    types.model({
        type: types.literal(SHOW_COLOR)
    })
);
