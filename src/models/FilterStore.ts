import {types} from "mobx-state-tree";
import {Filters} from "./Filters/Filter";
import {TProduct} from "../types/types";
import {TFValues} from "./Filters/FValues";
import {values} from "mobx";



export const FilterStore = types.model("FilterStore", {
    filters: types.array(Filters),
    activeFilters: types.optional(types.map(types.reference(Filters)), {}),
    selected: types.maybeNull(types.reference(Filters))
})
    .views(self => ({
        getFilters(product: TProduct): boolean {
            return values(self.activeFilters).every((value) => {
                return (value as any).getFilter(product)
            });
        },
        get takeFilters() {
            return self.filters
        },
    }))
    .actions(self => ({
        changeFilter(filterType: string, incomingValue: TFValues, filterId: string) {
            console.log(incomingValue);
            self.selected = filterId as any;
            self.selected && self.selected.setValue(incomingValue);

            if (incomingValue === undefined || incomingValue === false) {
                self.activeFilters.delete(filterId)
            }
            else {
                self.activeFilters.set(filterId, self.selected as any)
            }
        }
    }));
