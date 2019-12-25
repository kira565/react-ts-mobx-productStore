import {Instance} from "mobx-state-tree";
import {Product} from "../models/Product";
import {Filter, FTypes, FValues} from "../models/Filter";
import {RootStore} from "../models/RootStore";
import {ProductStore} from "../models/ProductStore";


export type TRootStore = Instance<typeof RootStore>
export type TProductStore = Instance<typeof ProductStore>

export type TProduct = Instance<typeof Product>;
export type TFilter = Instance<typeof Filter>

export type TFTypes = Instance<typeof FTypes>
export type TFValues = Instance<typeof FValues>

export type Enum<E> = Record<keyof E, string>

