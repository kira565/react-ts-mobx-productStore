import {Instance} from "mobx-state-tree";
import {Product} from "../models/Product";

export type IProduct = Instance<typeof Product>;