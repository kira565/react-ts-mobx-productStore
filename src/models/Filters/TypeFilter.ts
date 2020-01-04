import {SHOW_TYPE} from "../../common/constants_common";
import {types} from "mobx-state-tree";
import {createFilterBase, Str} from "./FilterPrototype";


export const TypeFilter = types.compose(
    'TypeFilter',
    createFilterBase(Str, 'type'),
    types.model({
        type: types.literal(SHOW_TYPE)
    })
);

