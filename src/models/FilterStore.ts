import {types} from "mobx-state-tree";
import {Filters} from "./Filters/Filter";
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
        getFiltersById(filterId: string, value: TFValues){
            self.filters.forEach(elem => {
                if (filterId === elem.id){
                    elem.setValue(value);
                    if (value === undefined || value === false) {
                        self.activeFilters.delete(filterId)
                    }
                    else {
                        self.activeFilters.set(filterId, elem)
                    }
                } // else console.log(elem.id, filterId) Где тут выкидывать ошибку??
            })
        }
    }))
    .actions(self => ({
        changeFilter(incomingValue: TFValues, filterId: string) {
            self.getFiltersById(filterId, incomingValue)
            /*self.selected = filterId as any;
            self.selected && self.selected.setValue(incomingValue);

            if (incomingValue === undefined || incomingValue === false) {
                self.activeFilters.delete(filterId)
            }
            else {
                self.activeFilters.set(filterId, self.selected as TFilterType)
            }*/
        }
    }));
