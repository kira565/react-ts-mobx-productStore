import {ProductStore} from "./ProductStore";
import {useContext, createContext} from "react";
import {types, Instance, onSnapshot} from "mobx-state-tree";
import {fillProducts} from "../common/functions_common"
import {connectReduxDevtools} from "mst-middlewares";
import {DATE_RECEIPT, SHOW_COLOR, SHOW_INSTOCK, SHOW_SIZE, SHOW_TYPE} from "../common/constants_common";


export const RootStore = types.model({
    productsStore: ProductStore
});

export const rootStore = RootStore.create({
    productsStore: {
        products: fillProducts(1000),
        filterStore: {
            filters: [
                {
                    id: 1,
                    type: SHOW_TYPE
                },
                {
                    id: 2,
                    type: SHOW_SIZE
                },
                {
                    id: 3,
                    type: SHOW_COLOR
                },
                {
                    id: 4,
                    type: SHOW_INSTOCK,
                    value: false
                },
                {
                    id: 5,
                    type: DATE_RECEIPT,
                    value: []
                }
            ]
        }
    }
});
connectReduxDevtools(require("remotedev"), rootStore);

onSnapshot(rootStore, (currSnapshot) => console.log(currSnapshot));

export type RootInstance = Instance<typeof RootStore>
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;

export function useMst(): any {
    const store = useContext(RootStoreContext);
    if (store === null) {
        throw new Error("Store === null, необходимо добавить context provider");
    }
    return store as RootInstance;
}