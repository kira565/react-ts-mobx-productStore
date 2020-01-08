import {types} from "mobx-state-tree";
import {Product} from "./Product";
import {TProduct} from "../types/types";

const ProductArray = types.array(Product);

export const ProductStore = types.model("ProductStore", {
    products: types.optional(ProductArray, [])
})
    .views(self => ({ // ~~redux selectors
        get productsArray(): Array<TProduct> {
            return self.products
        }
    }))
    .actions(self => ({
        setProductsArray(products: any){
            console.log(products);
            self.products = products;
        }
    }))
;
