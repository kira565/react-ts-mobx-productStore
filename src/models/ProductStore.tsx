import {types} from "mobx-state-tree";
import {SHOW_ALL, SHOW_COLOR, SHOW_SIZE, SHOW_TYPE,} from "../common/constants_common";
import {Product} from "./Product";
import {inDateInterval, isInStock, selectFilter} from "../common/functions_common";

const ProductArray = types.array(Product);

export const ProductStore = types.model("ProductStore", { // Store. Содержит массив из экземпляров класса Product
    products: types.optional(ProductArray, []),
    typeFilter: types.optional(types.string, SHOW_ALL),
    sizeFilter: types.optional(types.string, SHOW_ALL),
    colorFilter: types.optional(types.string, SHOW_ALL),
    inStockFilter: types.optional(types.boolean, false),
    dateFilter: types.optional(types.array(types.string), [])
})
    .views(self => ({ // ~~redux selectors
        get filteredProducts(): any {
            return self.products
                .filter(product => selectFilter(product.type, self.typeFilter))
                .filter(product => selectFilter(product.size, self.sizeFilter))
                .filter(product => selectFilter(product.color, self.colorFilter))

                .filter(product => isInStock(self.inStockFilter, product.inStock))
                .filter(product => inDateInterval(self.dateFilter, product.dateReceipt))
        },
    }))
    .actions(self => ({ // ~~ actions (mutable but safe)
        setFilter(filter: string, filterValue: string) {
            switch (filter) {
                case (SHOW_TYPE):
                    self.typeFilter = filterValue;
                    break;
                case (SHOW_SIZE):
                    self.sizeFilter = filterValue;
                    break;
                case (SHOW_COLOR):
                    self.colorFilter = filterValue;
            }
        },
        setInStock(isInStock: boolean) {
            self.inStockFilter = isInStock;
        },
        setDateInterval(interval: any) {
            self.dateFilter = interval
        }
    }));
