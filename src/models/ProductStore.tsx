import {types} from "mobx-state-tree";
import {SHOW_ALL, SHOW_COLOR, SHOW_SIZE, SHOW_TYPE,} from "../common/constants_common";
import {Product} from "./Product";
import {inDateInterval, isInStock, selectFilter} from "../common/functions_common";
import {FilterStore} from "./FilterStore";

const ProductArray = types.array(Product);

export const ProductStore = types.model("ProductStore", { // Store. Содержит массив из экземпляров класса Product
    products: types.optional(ProductArray, []),
    filterStore: FilterStore,


    /*typeFilter: types.optional(types.string, SHOW_ALL),
    sizeFilter: types.optional(types.string, SHOW_ALL),
    colorFilter: types.optional(types.string, SHOW_ALL),
    inStockFilter: types.optional(types.boolean, false),
    dateFilter: types.optional(types.array(types.string), [])*/
})
    .views(self => ({ // ~~redux selectors
        get takeFilteredProducts(): any {
            console.log('takeFilteredProducts');
            return self.products.filter(product => self.filterStore.getFilters(product))

            // filter (product => filterProducts(self.filterStore.getFilters) +++++ [{"SHOW_COLOR", "SHOW_ALL"}, {SHOW_INSTOCK, true}...]
            // Соответственно селект фильтр будет одной функцией, которая будет выаолнять работу исходя из типа фильтра

            /*        .filter(product => selectFilter(product.type, self.typeFilter))
                    .filter(product => selectFilter(product.size, self.sizeFilter))
                    .filter(product => selectFilter(product.color, self.colorFilter))
                    .filter(product => isInStock(self.inStockFilter, product.inStock))
                    .filter(product => inDateInterval(self.dateFilter, product.dateReceipt))*/
        }
    }));
