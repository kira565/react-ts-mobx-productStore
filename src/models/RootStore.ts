import {ProductStore} from "./ProductStore";
import {useContext, createContext} from "react";
import {types, Instance} from "mobx-state-tree";
import {fillProducts, makeArrayFromEnum} from "../common/functions_common"
import {connectReduxDevtools} from "mst-middlewares";
import {DATE_RECEIPT, SHOW_COLOR, SHOW_INSTOCK, SHOW_SIZE, SHOW_TYPE} from "../common/constants_common";
import {Colors, Sizes, Types} from "../common/enums_common";
import {FilterStore} from "./FilterStore";
import {TProduct} from "../types/types";


export const RootStore = types.model({
        productsStore: ProductStore,
        filterStore: FilterStore,
    })
        .views(self => ({
            get takeFilteredProducts(): Array<TProduct> {
                return self.productsStore.productsArray.filter((product: TProduct) => self.filterStore.getFilters(product))
            },
        }))
;


export const rootStore = RootStore.create({
    productsStore: {
        products: fillProducts(1000)
    },
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
        //selected: null
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