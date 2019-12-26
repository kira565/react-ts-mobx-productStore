import {Instance, IType, types} from "mobx-state-tree";
import {DATE_RECEIPT, SHOW_ALL, SHOW_COLOR, SHOW_INSTOCK, SHOW_SIZE, SHOW_TYPE} from "../common/constants_common";
import {TFilter, TFValues, TProduct} from "../types/types";
import {makeArrayFromEnum} from "../common/functions_common";
import {Colors, Sizes, Types} from "../common/enums_common";

export const FValues = types.union(
    types.string,
    types.boolean,
    types.array(types.string)
);
export const FTypes = types.union(
    types.literal(SHOW_TYPE),
    types.literal(SHOW_SIZE),
    types.literal(SHOW_COLOR),
    types.literal(SHOW_INSTOCK),
    types.literal(DATE_RECEIPT)
);



export const TypeFilter = types.model("TypeFilter", {
    id: types.identifierNumber,
    type: types.union(FTypes),
    value: types.optional(types.union(FValues), SHOW_ALL),
    options: types.optional(types.array(types.string), makeArrayFromEnum(Types))

})
    .views(self => ({
        getFilter(product: TProduct): boolean{
            return self.value === SHOW_ALL ? true : product.type === self.value;
        }
    }))
    .actions(self => ({
        setValue(value: TFValues): void {
            self.value = value
        }
    }));


export const SizeFilter = types.model("SizeFilter", {
    id: types.identifierNumber,
    type: types.union(FTypes),
    value: types.optional(types.union(FValues), SHOW_ALL),
    options: types.optional(types.array(types.string), makeArrayFromEnum(Sizes))
})
    .views(self => ({
        getFilter(product: TProduct): boolean{
            return self.value === SHOW_ALL ? true : product.size === self.value;
        }
    }))
    .actions(self => ({
        setValue(value: TFValues): void {
            self.value = value
        }
    }));


export const ColorFilter = types.model("ColorFilter", {
    id: types.identifierNumber,
    type: types.union(FTypes),
    value: types.optional(types.union(FValues), SHOW_ALL),
    options: types.optional(types.array(types.string), makeArrayFromEnum(Colors))
})
    .views(self => ({
        getFilter(product: TProduct): boolean{
            return self.value === SHOW_ALL ? true : product.color === self.value;
        }
    }))
    .actions(self => ({
        setValue(value: TFValues): void {
            self.value = value
        }
    }));


export const InStockFilter = types.model("InStockFilter", {
    id: types.identifierNumber,
    type: types.union(FTypes),
    value: types.optional(types.union(FValues), SHOW_ALL)
})
    .views(self => ({
        getFilter(product: TProduct): boolean{
            return self.value === false ? true : product.inStock === self.value;
        }
    }))
    .actions(self => ({
        setValue(value: TFValues): void {
            self.value = value
        }
    }));


export const DateReceipt = types.model("DateReceiptFilter", {
    id: types.identifierNumber,
    type: types.union(FTypes),
    value: types.optional(types.union(FValues), SHOW_ALL)
})
    .views(self => ({}))
    .actions(self => ({
        setValue(value: TFValues): void {
            self.value = value
        }
    }));

const FilterUnionForTs = types.union(TypeFilter, SizeFilter, ColorFilter, InStockFilter, DateReceipt); // унион для тс, чтобы определить тип снапшота
export type FiltersType = Instance<typeof FilterUnionForTs>

const FiltersWithOptions = types.union(TypeFilter, SizeFilter, ColorFilter);
export type FilterTypesWithOptions = Instance<typeof FiltersWithOptions>


export const Filters = types.union(
    {
        dispatcher(snapshot: FiltersType): any {
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
            }
        }
    }, TypeFilter, SizeFilter, ColorFilter, InStockFilter, DateReceipt);













//=====================================================================================================



export const Filter = types.model("Filter", {
    id: types.identifierNumber,
    type: types.union(FTypes),
    value: types.optional(types.union(FValues), SHOW_ALL)
})
    .views(self => ({
        getValue(product: TProduct): boolean {
            switch (self.type) {
                case SHOW_TYPE:
                    return self.value === SHOW_ALL ? true : product.type === self.value;
                case SHOW_COLOR:
                    return self.value === SHOW_ALL ? true : product.color === self.value;
                case SHOW_SIZE:
                    return self.value === SHOW_ALL ? true : product.size === self.value;
                case SHOW_INSTOCK:
                    return self.value === false ? true : product.inStock === self.value;
                case DATE_RECEIPT:
                    return self.value.length < 2 ? true : new Date(product.dateReceipt) >= new Date(self.value[0])
                        && new Date(product.dateReceipt) <= new Date(self.value[1]);
                default:
                    return true
            }
        }
    }))
    .actions(self => ({
        setValue(value: TFValues): void {
            self.value = value
        }
    }));
