import {types} from "mobx-state-tree";
import {Filters, TFilterType} from "./Filters/Filter";
import {TProduct} from "../types/types";
import {TFValues} from "./Filters/FValues";

export const FilterStore = types.model("FilterStore", {
    filters: types.array(Filters),
    activeFilters: types.optional(types.map(types.reference(Filters)), {}),
    //selected: types.maybeNull(types.reference(Filters))
})
    .views(self => ({
        getFilters(product: TProduct): boolean {
            return Array.from(self.activeFilters).every((value) => {
                return value[1].getFilter(product)
            });
        },
        get takeFilters() {
            return self.filters
        },
        getFiltersById(filterId: string) {
            let selectedFilter = self.filters.filter(elem => elem.id === filterId);
            if (selectedFilter === undefined){
                throw new Error('nofilter')
            } else return selectedFilter
        }
    }))
    .actions(self => ({
        changeFilter(incomingValue: TFValues, filterId: string) {
            let filt = self.getFiltersById(filterId)[0];
            filt.setValue(incomingValue);

            if (incomingValue === undefined || incomingValue === false) {
                self.activeFilters.delete(filterId)
            }
            else {
                self.activeFilters.set(filterId, filt as TFilterType)
            }
        }
    }));
