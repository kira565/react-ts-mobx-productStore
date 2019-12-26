import {Instance, IType, types} from "mobx-state-tree";
import {DATE_RECEIPT, SHOW_ALL, SHOW_COLOR, SHOW_INSTOCK, SHOW_SIZE, SHOW_TYPE} from "../common/constants_common";
import {TFilter, TFValues, TProduct} from "../types/types";


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



export const TypeFilter = types.model({
    id: types.identifier,
    type: types.string,
    value: types.optional(types.union(FValues), SHOW_ALL)
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


export const SizeFilter = types.model({
    id: types.identifier,
    type: types.string,
    value: types.optional(types.union(FValues), SHOW_ALL),
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


export const ColorFilter = types.model({
    id: types.identifier,
    type: types.string,
    value: types.optional(types.union(FValues), SHOW_ALL)
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


export const InStockFilter = types.model({
    id: types.identifier,
    type: types.string,
    value: types.optional(types.union(FValues), false)
})
    .views(self => ({
        getFilter(product: TProduct): boolean {
            return self.value === false ? true : product.inStock === self.value;
        }
    }))
    .actions(self => ({
        setValue(value: TFValues): void {
            self.value = value
        }
    }));


export const DateReceipt = types.model({
    id: types.identifier,
    type: types.string,
    value: types.optional(types.union(FValues), [])
})
    .views(self => ({
        getFilter(product: TProduct): boolean {
            return self.value.length < 2 ? true : new Date(product.dateReceipt) >= new Date(self.value[0])
                && new Date(product.dateReceipt) <= new Date(self.value[1]);
        }
    }))
    .actions(self => ({
        setValue(value: TFValues): void {
            self.value = value
        }
    }));


export const Filters = types.union(
    {
        dispatcher(snapshot: any): any {
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

