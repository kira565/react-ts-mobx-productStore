import {DATE_RECEIPT} from "../../common/constants_common";
import {types} from "mobx-state-tree";
import {Arr, createFilterBase} from "./FilterPrototype";
import {TProduct} from "../../types/types";
import {formatDateToString} from "../../common/functions_common";
import {TFValues} from "./FValues";


export const DateReceipt = types.compose(
    'DateFilter',
    createFilterBase(Arr, 'dateReceipt'),
    types.model({
        type: types.literal(DATE_RECEIPT)
    }))
    .views(self => ({
    getFilter(product: TProduct): boolean {
        return new Date(product.dateReceipt) >= new Date(self.value[0])
            && new Date(product.dateReceipt) <= new Date(self.value[1]);
    }
}))
    .actions(self => ({
        setValue(value: TFValues): void {
            let dateRanges: Array<string> = [];
            if (value !== undefined) {
                let arrValue = value as Array<any>;
                arrValue.map(momentI => {
                    dateRanges.push(formatDateToString(momentI));
                });
            }
            self.value = dateRanges
        }
    }));
