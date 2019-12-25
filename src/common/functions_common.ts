import moment from 'moment'
import {Enum, TProduct} from "../types/types";
import {Colors, Sizes, Types} from "./enums_common";
import * as faker from "faker";
import {SHOW_COLOR, SHOW_SIZE, SHOW_TYPE} from "./constants_common";

export function fillProducts(count: number): Array<TProduct> {
    let products = [];
    for (let id: number = 1; id <= count; id++) {
        const product: TProduct = {
            id: id,
            name: faker.commerce.productName(),
            type: randomEnum(Types),
            color: randomEnum(Colors),
            size: randomEnum(Sizes),
            inStock: Math.floor(Math.random() * 2) === 0,
            dateReceipt: formatDateToString(faker.date.future())
        };
        products.push(product)
    }
    return products
}



export function randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = (Object.values(anEnum) as unknown) as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
}

export function makeArrayFromEnum<E>(enumObject: Enum<E>): Array<string> {
    let all = [];
    for (let key in enumObject) {
        if (enumObject.hasOwnProperty(key)) {
            all.push(enumObject[key]);
        }
    }
    return all
}


export const formatDateToString = (date: Date): string => {
    return moment(date).toISOString()
};
