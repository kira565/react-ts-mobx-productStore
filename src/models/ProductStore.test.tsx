import React from 'react'
import {ProductStore} from "./ProductStore";
import {fillProducts, makeArrayFromEnum} from "../common/functions_common";
import {when} from "mobx";
import {DATE_RECEIPT, SHOW_ALL, SHOW_COLOR, SHOW_INSTOCK, SHOW_SIZE, SHOW_TYPE} from "../common/constants_common";
import {Colors, Sizes, Types} from "../common/enums_common";
import {TProduct} from "../types/types";
import {RootStore} from "./RootStore";



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
    const store = RootStore.create({
        productsStore: {
            products: fillProducts(1000), filterStore: {
                filters: [
                    {
                        id: "f1",
                        type: SHOW_TYPE,
                        options: makeArrayFromEnum(Types)
                    },
                    {
                        id: "f2",
                        type: SHOW_SIZE,
                        options: makeArrayFromEnum(Sizes)
                    },
                    {
                        id: "f3",
                        type: SHOW_COLOR,
                        options: makeArrayFromEnum(Colors)
                    },
                    {
                        id: "f4",
                        type: SHOW_INSTOCK
                    },
                    {
                        id: "f5",
                        type: DATE_RECEIPT
                    },
                ],
                selected: null
            }
        }
    });
    when(
        (): boolean => store.productsStore.filterStore.filters.length === 5,
        (): void => {
            expect(store.productsStore.filterStore.filters[0].value).toBe(SHOW_ALL);
            expect(store.productsStore.filterStore.filters[1].value).toBe(SHOW_ALL);
            expect(store.productsStore.filterStore.filters[2].value).toBe(SHOW_ALL);
            expect(store.productsStore.filterStore.filters[3].value).toBe(false);
            expect(store.productsStore.filterStore.filters[4].value.length).toBe(0);
            done()
        }
    )
});

describe("All Filters works fine", () => {
    const store = RootStore.create({
        productsStore: {
            products: fillProducts(1000), filterStore: {
                filters: [
                    {
                        id: "f1",
                        type: SHOW_TYPE,
                        options: makeArrayFromEnum(Types)
                    },
                    {
                        id: "f2",
                        type: SHOW_SIZE,
                        options: makeArrayFromEnum(Sizes)
                    },
                    {
                        id: "f3",
                        type: SHOW_COLOR,
                        options: makeArrayFromEnum(Colors)
                    },
                    {
                        id: "f4",
                        type: SHOW_INSTOCK
                    },
                    {
                        id: "f5",
                        type: DATE_RECEIPT
                    },
                ],
                selected: null
            }
        }
    });

    it("ProductStore filters data by Size", done => {
        store.productsStore.filterStore.changeFilter(SHOW_TYPE, Types.Underwear, "f1");
        when(
            (): boolean =>  store.productsStore.filterStore.filters[0].value === Types.Underwear,
            (): void => {
                expect(store.productsStore.takeFilteredProducts.every((product: TProduct) => product.type === Types.Underwear)).toBe(true);
                done()
            }
        )
    });
    it("ProductStore filters data by Type", done => {
        store.productsStore.filterStore.changeFilter(SHOW_SIZE, Sizes.XL, "f2");
        when(
            (): boolean => store.productsStore.filterStore.filters[1].value === Sizes.XL,
            (): void => {
                expect(store.productsStore.takeFilteredProducts.every((product: TProduct) => product.size === Sizes.XL)).toBe(true);
                done()
            }
        )
    });
    it("ProductStore filters data by Color", done => {
        store.productsStore.filterStore.changeFilter(SHOW_COLOR, Colors.RED, "f3");
        when(
            (): boolean => store.productsStore.filterStore.filters[2].value === Colors.RED,
            (): void => {
                expect(store.productsStore.takeFilteredProducts.every((product: TProduct) => product.color === Colors.RED)).toBe(true);
                done()
            }
        )
    });
    it("ProductStore filters data by inStock", done => {
        store.productsStore.filterStore.changeFilter(SHOW_INSTOCK, true, "f4");
        when(
            (): boolean => store.productsStore.filterStore.filters[3].value === true,
            (): void => {
                expect(store.productsStore.takeFilteredProducts.every((product: TProduct) => product.inStock)).toBe(true);
                done()
            }
        )
    });
    it("ProductStore filters data by date interval", done => {
        store.productsStore.filterStore.changeFilter(DATE_RECEIPT, ["12/19/2019", "02/23/2020"], "f5");
        when(
            (): boolean => store.productsStore.filterStore.filters[4].value.length > 0,
            (): void => {
                expect(store.productsStore.takeFilteredProducts.every((product: TProduct) =>
                    new Date(product.dateReceipt) >= new Date(store.productsStore.filterStore.filters[4].value[0])
                    && new Date(product.dateReceipt) <= new Date(store.productsStore.filterStore.filters[4].value[1])));
                done()
            }
        )
    });
});


