import {ProductStore} from "./ProductStore";
import {useContext, createContext} from "react";
import {types, Instance, onSnapshot} from "mobx-state-tree";
import {fillProducts} from "../common/functions_common"
import {connectReduxDevtools} from "mst-middlewares";


export const RootStore = types.model({
    productsStore: ProductStore
});

export const rootStore = RootStore.create({
    productsStore: {products: fillProducts(1000)}
});
connectReduxDevtools(require("remotedev"), rootStore);

onSnapshot(rootStore, (snapshot) => console.log(snapshot));

export type RootInstance = Instance<typeof RootStore>
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;

export function useMst() {
    const store = useContext(RootStoreContext);
    if (store === null) {
        throw new Error("Store === null, необходимо добавить context provider");
    }
    return store as RootInstance;
}