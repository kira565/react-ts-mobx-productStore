import React from 'react'
import {RootStore} from "./RootStore";
import {fillProducts} from "../common/functions_common";
import {when} from "mobx";

let products = fillProducts(10);

it('Test postProducts flow action should be failed', (done) => {
    const store = RootStore.create({
        productsStore: {},
        filterStore: {},
        stateGet: "pending",
        statePost: "pending"
    });


        when(
            (): boolean => store.statePost === "pending",
            async () => {
                await store.postProducts([1,2,3]);
                expect(store.statePost).toBe("error");
                done()
            }
        )
});



describe('Test postProducts + getProducts flow action should be successful', () => {
    const store = RootStore.create({
        productsStore: {},
        filterStore: {},
        stateGet: "pending",
        statePost: "pending"
    });

    it('Test postProducts flow action should be successful', (done) => {
        when(
            (): boolean => store.statePost === "pending",
            async () => {
                await store.postProducts(products);
                expect(store.statePost).toBe("done");
                done()
            }
        )

    });

    it('Test getProducts flow action should be successful', (done) => {
        when(
            (): boolean => store.stateGet === "pending",
            async () => {
                await store.getProducts();
                expect(store.stateGet).toBe("done");
                done()
            }
        )
    });

});

