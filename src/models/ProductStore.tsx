import {types} from "mobx-state-tree";
import {Product} from "./Product";
import {FilterStore} from "./FilterStore";
import {TProduct} from "../types/types";

const ProductArray = types.array(Product);

export const ProductStore = types.model("ProductStore", {
    products: types.optional(ProductArray, []),
    filterStore: FilterStore,
})
    .views(self => ({ // ~~redux selectors
        get takeFilteredProducts(): Array<TProduct> {
            return self.products.filter((product: TProduct) => self.filterStore.getFilters(product))
        }
    }));
