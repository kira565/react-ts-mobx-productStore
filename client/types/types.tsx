import {Instance, types} from "mobx-state-tree";
import {Product} from "../models/Product";

import {RootStore} from "../models/RootStore";
import {ProductStore} from "../models/ProductStore";
import {FilterStore} from "../models/FilterStore";


export type TRootStore = Instance<typeof RootStore>
export type TProductStore = Instance<typeof ProductStore>
export type TProduct = Instance<typeof Product>;




export type TFilterStore = Instance<typeof FilterStore>
export type Enum<E> = Record<keyof E, string>

export const ProdFields = types.union(types.literal('id'), types.literal('name'), types.literal('type'), types.literal('color'), types.literal('size'), types.literal('inStock'), types.literal('dateReceipt'));
export type TProdFields = Instance<typeof ProdFields>
