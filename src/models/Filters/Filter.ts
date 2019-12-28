import {Instance, types} from "mobx-state-tree";
import {DATE_RECEIPT, SHOW_COLOR, SHOW_INSTOCK, SHOW_SIZE, SHOW_TYPE} from "../../common/constants_common";
import {TypeFilter} from "./TypeFilter";
import {SizeFilter} from "./SizeFilter";
import {ColorFilter} from "./ColorFilter";
import {InStockFilter} from "./InStockFilter";
import {DateReceipt} from "./DateFilter";


const Filter = types.union(TypeFilter, SizeFilter, ColorFilter, InStockFilter, DateReceipt);
export type TFilterType = Instance<typeof Filter>

export const Filters = types.union(
    {
        dispatcher(snapshot: TFilterType): any {
            switch (snapshot.type){
                case SHOW_TYPE: {
                    return TypeFilter
                }
                case SHOW_SIZE: {
                    return SizeFilter
                }
                case SHOW_COLOR: {
                    return ColorFilter
                }
                case SHOW_INSTOCK: {
                    return InStockFilter
                }
                case DATE_RECEIPT: {
                    return DateReceipt
                }
                default: {
                    return "none"
                }
            }
        }
    }, TypeFilter, SizeFilter, ColorFilter, InStockFilter, DateReceipt);
