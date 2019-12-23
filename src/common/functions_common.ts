import moment from 'moment'
import {SHOW_ALL} from "./constants_common";
import {IProduct} from "../types/types";
import {Colors, Sizes, Types} from "./enums_common";
import * as faker from "faker";

export function fillProducts(count: number): Array<IProduct> {
    let products = [];
    for (let id: number = 1; id <= count; id++) {
        const product: IProduct = {
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

export function makeArrayFromEnum(enumObject: any): Array<any>{
    let all = [];
    for(let key in enumObject){
        if (enumObject.hasOwnProperty(key)){
            all.push(enumObject[key]);
        }
    }
    return all
}

export const formatDateToString = (date: any): string => {
    return moment(date).toISOString()
};

export const selectFilter = ((productType: any, filter: string): boolean => filter === SHOW_ALL ? true : productType === filter);

export const isInStock = ((inStockOption:boolean, productInStock: any): boolean => inStockOption ? productInStock : true);

export const inDateInterval = ((interval: Array<string>, productDate:any): boolean => interval.length < 2
    ? true
    : new Date(productDate) >= new Date(interval[0]) && new Date(productDate) <= new Date(interval[1])
);
