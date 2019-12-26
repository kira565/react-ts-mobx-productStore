import {types} from "mobx-state-tree";
import {Filter, Filters} from "./Filter";
import {TFTypes, TFValues, TProduct} from "../types/types";

export const FilterStore = types.model("FilterStore", {
    filters: types.array(Filters),
    selected: types.reference(Filters)
})
    .views(self => ({
        /*getFilters(product: TProduct): boolean {
            return self.filters.every(filter => filter.getValue(product));
        }*/
        get takeFilters(){
            return self.filters
        }
    }))
    .actions(self => ({
        changeFilter(filterType: TFTypes, incomingValue: TFValues) {
            self.filters.map(filter => filter.type === filterType && filter.setValue(incomingValue))
        }
    }));
