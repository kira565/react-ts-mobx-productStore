import {types} from "mobx-state-tree";
import {Filters, TFilterType} from "./Filters/Filter";
import {TProduct} from "../types/types";
import {TFValues} from "./Filters/FValues";

export const FilterStore = types.model("FilterStore", {
    filters: types.array(Filters),
    activeFilters: types.optional(types.map(types.reference(Filters)), {}),
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
        getFilterById(filterId: string) { // Filter*
            let selectedFilter = self.filters.filter(elem => {
                if (elem.id === filterId) return elem
            });
            if (selectedFilter === undefined){
                throw new Error('nofilter')
            } else return selectedFilter[0]
        }
    }))
    .actions(self => ({
        changeFilter(incomingValue: TFValues, filterId: string) {
            let filt = self.getFilterById(filterId);
            filt.setValue(incomingValue);

            if (incomingValue === undefined || incomingValue === 0) {
                self.activeFilters.delete(filterId)
            }
            else {
                self.activeFilters.set(filterId, filt as TFilterType)
            }
        }
    }));
