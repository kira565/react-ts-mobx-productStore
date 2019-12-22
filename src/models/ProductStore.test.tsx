import React from 'react'
import {ProductStore} from "./ProductStore";
import {fillProducts, inDateInterval} from "../common/functions_common";
import {when} from "mobx";
import {SHOW_ALL, SHOW_COLOR, SHOW_SIZE, SHOW_TYPE} from "../common/constants_common";
import {Colors, Sizes, Types} from "../common/enums_common";

it("Product store was filled with 1000 random values", done => {
    const store = ProductStore.create({products: fillProducts(1000)});
    when(
        (): any => {
            expect(store.products.length).toBe(1000);
            done()
        }
    )
});

it("All filters should be disabled or with 'show_all' value", done => {
    const store = ProductStore.create({products: fillProducts(10)});
    when(
        (): any => {
            expect(store.typeFilter).toBe(SHOW_ALL);
            expect(store.sizeFilter).toBe(SHOW_ALL);
            expect(store.colorFilter).toBe(SHOW_ALL);
            expect(store.inStockFilter).toBe(false);
            expect(store.dateFilter.length).toBe(0);
            done()
        }
    )
});

describe("All Filters works fine", () => {
    const store = ProductStore.create({products: fillProducts(500)});

    it("ProductStore filters data by Size", done => {
        store.setFilter(SHOW_SIZE, Sizes.XL);
        when(
            (): any => store.sizeFilter === Sizes.XL,
            (): any => {
                expect(store.filteredProducts.every((product: any) => product.size === Sizes.XL)).toBe(true);
                done()
            }
        )
    });
    it("ProductStore filters data by Type", done => {
        store.setFilter(SHOW_TYPE, Types.Underwear);
        when(
            (): any => store.typeFilter === Types.Underwear,
            (): any => {
                expect(store.filteredProducts.every((product: any) => product.type === Types.Underwear)).toBe(true);
                done()
            }
        )
    });
    it("ProductStore filters data by Color", done => {
        store.setFilter(SHOW_COLOR, Colors.RED);
        when(
            (): any => store.colorFilter === Colors.RED,
            (): any => {
                expect(store.filteredProducts.every((product: any) => product.color === Colors.RED)).toBe(true);
                done()
            }
        )
    });
    it("ProductStore filters data by inStock", done => {
        store.setInStock(true);
        when(
            (): any => store.inStockFilter === true,
            (): any => {
                expect(store.filteredProducts.every((product: any) => product.inStock)).toBe(true);
                done()
            }
        )
    });
    it("ProductStore filters data by date interval", done => {
        store.setDateInterval(["12/19/2019", "02/23/2020"]);
        when(
            (): any => store.dateFilter.length > 0,
            (): any => {
                expect(store.filteredProducts.every((product: any) => inDateInterval(store.dateFilter, product.dateReceipt))).toBe(true);
                done()
            }
        )
    });



});

