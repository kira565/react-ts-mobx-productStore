import {SHOW_INSTOCK} from "../../common/constants_common";
import {types} from "mobx-state-tree";
import {Bool, createFilterBase} from "./FilterPrototype";


export const InStockFilter = types.compose(
    'StockFilter',
    createFilterBase(Bool, 'inStock'),
    types.model({
        type: types.literal(SHOW_INSTOCK)
    })
);

