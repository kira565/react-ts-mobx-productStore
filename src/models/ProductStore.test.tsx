import React from 'react'
import {ProductStore} from "./ProductStore";
import {fillProducts} from "../common/functions_common";
import {when} from "mobx";
import {DATE_RECEIPT, SHOW_ALL, SHOW_COLOR, SHOW_INSTOCK, SHOW_SIZE, SHOW_TYPE} from "../common/constants_common";
import {Colors, Sizes, Types} from "../common/enums_common";
import {TProduct} from "../types/types";


it("Product store was filled with 1000 random values", done => {
    const store = ProductStore.create(    {products: fillProducts(1000), filterStore: {}});
    when(
        (): boolean => store.products.length !== 0,
        (): void => {
            expect(store.products.length).toBe(1000);
            done()
        }
    )
});


it("All filters should be disabled or with 'show_all' value", done => {
    const store = ProductStore.create({products: fillProducts(10), filterStore: {
            filters: [
                {
                    id: 1,
                    type: SHOW_TYPE
                },
                {
                    id: 2,
                    type: SHOW_SIZE
                },
                {
                    id: 3,
                    type: SHOW_COLOR
                },
                {
                    id: 4,
                    type: SHOW_INSTOCK,
                    value: false
                },
                {
                    id: 5,
                    type: DATE_RECEIPT,
                    value: []
                }
            ]
        }});
    when(
        (): boolean => store.filterStore.filters.length === 5,
        (): void => {
            expect(store.filterStore.filters[0].value).toBe(SHOW_ALL);
            expect(store.filterStore.filters[1].value).toBe(SHOW_ALL);
            expect(store.filterStore.filters[2].value).toBe(SHOW_ALL);
            expect(store.filterStore.filters[3].value).toBe(false);
            expect(store.filterStore.filters[4].value.length).toBe(0);
            done()
        }
    )
});

describe("All Filters works fine", () => {
    const store = ProductStore.create({products: fillProducts(10), filterStore: {
            filters: [
                {
                    id: 1,
                    type: SHOW_TYPE
                },
                {
                    id: 2,
                    type: SHOW_SIZE
                },
                {
                    id: 3,
                    type: SHOW_COLOR
                },
                {
                    id: 4,
                    type: SHOW_INSTOCK,
                    value: false
                },
                {
                    id: 5,
                    type: DATE_RECEIPT,
                    value: []
                }
            ]
        }});

    it("ProductStore filters data by Size", done => {
        store.filterStore.changeFilter(SHOW_TYPE, Types.Underwear);
        when(
            (): boolean => store.filterStore.filters[0].value === Types.Underwear,
            (): void => {
                expect(store.takeFilteredProducts.every((product: TProduct) => product.type === Types.Underwear)).toBe(true);
                done()
            }
        )
    });
    it("ProductStore filters data by Type", done => {
        store.filterStore.changeFilter(SHOW_SIZE, Sizes.XL);
        when(
            (): boolean => store.filterStore.filters[1].value === Sizes.XL,
            (): void => {
                expect(store.takeFilteredProducts.every((product: TProduct) => product.size === Sizes.XL)).toBe(true);
                done()
            }
        )
    });
    it("ProductStore filters data by Color", done => {
        store.filterStore.changeFilter(SHOW_COLOR, Colors.RED);
        when(
            (): boolean => store.filterStore.filters[2].value === Colors.RED,
            (): void => {
                expect(store.takeFilteredProducts.every((product: TProduct) => product.color === Colors.RED)).toBe(true);
                done()
            }
        )
    });
    it("ProductStore filters data by inStock", done => {
        store.filterStore.changeFilter(SHOW_INSTOCK, true);
        when(
            (): boolean => store.filterStore.filters[3].value === true,
            (): void => {
                expect(store.takeFilteredProducts.every((product: TProduct) => product.inStock)).toBe(true);
                done()
            }
        )
    });
    it("ProductStore filters data by date interval", done => {
        store.filterStore.changeFilter(DATE_RECEIPT, ["12/19/2019", "02/23/2020"]);
        when(
            (): boolean => store.filterStore.filters[4].value.length > 0,
            (): void => {
                expect(store.takeFilteredProducts.every((product: TProduct) =>
                    new Date(product.dateReceipt) >= new Date(store.filterStore.filters[4].value[0])
                    && new Date(product.dateReceipt) <= new Date(store.filterStore.filters[4].value[1])));
                done()
            }
        )
    });
});

