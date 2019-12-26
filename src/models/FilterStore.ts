import {Instance, types} from "mobx-state-tree";
import {Filters, TypeFilter} from "./Filter";
import {TFilter, TFTypes, TFValues, TProduct} from "../types/types";

export const FilterStore = types.model("FilterStore", {
    filters: types.array(Filters),
    selected: types.reference(Filters)
})
    .views(self => ({
        /*getFilters(product: TProduct): boolean {
            return self.filters.every(filter => filter.getValue(product));
        }*/
        applyFilters() {

        },
        get takeFilters(){
            return self.filters
        },
    }))
    .actions(self => ({
        changeFilter(filterType: any, incomingValue: TFValues) {
            self.filters.map(filter => filter.type === filterType && filter.setValue(incomingValue));
            self.selected = filterType;
            console.log((self.selected as Instance<typeof TypeFilter>).type)
        }
    }));
