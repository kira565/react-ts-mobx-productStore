import {ProductStore} from "./ProductStore";
import {useContext, createContext} from "react";
import {types, Instance, flow} from "mobx-state-tree";
import {makeArrayFromEnum} from "../common/functions_common"
import {connectReduxDevtools} from "mst-middlewares";
import {DATE_RECEIPT, SHOW_COLOR, SHOW_INSTOCK, SHOW_SIZE, SHOW_TYPE} from "../common/constants_common";
import {Colors, Sizes, Types} from "../common/enums_common";
import {FilterStore} from "./FilterStore";
import {TProduct} from "../types/types";
import {productsAPI} from "../api/api";


export const RootStore = types.model({
    productsStore: ProductStore,
    filterStore: FilterStore,
    stateGet: types.enumeration("State", ["pending", "done", "error"]),
    statePost: types.enumeration("State", ["pending", "done", "error"])
})
    .views(self => ({
        get takeFilteredProducts(): Array<TProduct> {
            return self.productsStore.productsArray.filter((product: TProduct) => self.filterStore.getFilters(product))
        },
    }))
    .actions(self => ({
        postProducts: flow(function* postProducts(products: any) {
            try {
                let response = yield productsAPI.loadProducts(products);
                if (response.status = 200) {
                    self.statePost = "done";
                } else {
                    self.statePost = "error"
                }
            }
            catch (error) {
                self.statePost = "error" // невалид запрос
            }
        }),

        getProducts: flow(function* getProducts() {
            try {
                const response = yield productsAPI.getProducts();
                self.stateGet = "done";
                self.productsStore.setProductsArray(response.data);
            } catch (error) {
                self.stateGet = "error"
            }
        })
    }));


export const rootStore = RootStore.create({
    productsStore: {},
    stateGet: "pending",
    statePost: "pending",
    filterStore: {
        filters: [
            {
                id: "f1",
                type: SHOW_TYPE,
                options: makeArrayFromEnum(Types)
            },
            {
                id: "f2",
                type: SHOW_SIZE,
                options: makeArrayFromEnum(Sizes)
            },
            {
                id: "f3",
                type: SHOW_COLOR,
                options: makeArrayFromEnum(Colors)
            },
            {
                id: "f4",
                type: SHOW_INSTOCK
            },
            {
                id: "f5",
                type: DATE_RECEIPT
            },
        ],
    }
});


connectReduxDevtools(require("remotedev"), rootStore);

export type RootInstance = Instance<typeof RootStore>
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;

export function useMst(): RootInstance {
    const store = useContext(RootStoreContext);
    if (store === null) {
        throw new Error("Store === null, необходимо добавить context provider");
    }
    return store as RootInstance;
}