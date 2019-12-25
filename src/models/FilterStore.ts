import {types} from "mobx-state-tree";
import {Filter} from "./Filter";
import {TFTypes, TFValues, TProduct} from "../types/types";
import {DATE_RECEIPT, SHOW_ALL, SHOW_COLOR, SHOW_INSTOCK, SHOW_SIZE, SHOW_TYPE} from "../common/constants_common";


export const FilterStore = types.model("FilterStore", {
    filters: types.array(Filter)
})
    .views(self => ({
        getFilters(product: TProduct): boolean {
            let typePassed: boolean = true;
            let sizePassed: boolean = true;
            let colorPassed: boolean = true;
            let inStockPassed: boolean = true;
            let dateIntervalPassed: boolean = true;

            for (let i = 0; i < self.filters.length; i++) {

                if (self.filters[i].type === SHOW_TYPE) {
                    if (self.filters[i].value === SHOW_ALL) {
                        typePassed = true
                    } else typePassed = self.filters[i].value === product.type;
                }
                if (self.filters[i].type === SHOW_SIZE) {
                    if (self.filters[i].value === SHOW_ALL) {
                        sizePassed = true
                    } else sizePassed = self.filters[i].value === product.size;
                }
                if (self.filters[i].type === SHOW_COLOR) {
                    if (self.filters[i].value === SHOW_ALL) {
                        colorPassed = true
                    } else colorPassed = self.filters[i].value === product.color;
                }
                if (self.filters[i].type === SHOW_INSTOCK) {
                    if (self.filters[i].value === false) {
                        inStockPassed = true
                    } else inStockPassed = self.filters[i].value === product.inStock;
                }
                if (self.filters[i].type === DATE_RECEIPT) {
                    if (self.filters[i].value.length < 2) {
                        dateIntervalPassed = true
                    } else dateIntervalPassed = new Date(product.dateReceipt) >= new Date(self.filters[i].value[0])
                        && new Date(product.dateReceipt) <= new Date(self.filters[i].value[1]);
                }
            }
            return typePassed && sizePassed && colorPassed && inStockPassed && dateIntervalPassed
        }
    }))
    .actions(self => ({
        changeFilter(filterType: TFTypes, incomingValue: TFValues) {
            self.filters.map(filter => filter.type === filterType && filter.setValue(incomingValue))
        }
    }));