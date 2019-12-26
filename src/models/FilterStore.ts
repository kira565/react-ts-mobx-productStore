import {types} from "mobx-state-tree";
import {Filter} from "./Filter";
import {TFTypes, TFValues, TProduct} from "../types/types";

export const FilterStore = types.model("FilterStore", {
    filters: types.array(Filter)
})
    .views(self => ({
        getFilters(product: TProduct): boolean {
            let ok = true;
            for (let i = 0; i < self.filters.length; i++) {
                ok = ok && self.filters[i].getValue(product)
            }
            return ok;
        }
    }))
    .actions(self => ({
        changeFilter(filterType: TFTypes, incomingValue: TFValues) {
            self.filters.map(filter => filter.type === filterType && filter.setValue(incomingValue))
        }
    }));
