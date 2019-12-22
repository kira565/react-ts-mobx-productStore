import React from "react"
import App from "./App"
import {Provider, RootStore} from "./models/RootStore"
import renderer from "react-test-renderer"
import {fillProducts} from "./common/functions_common";

it("matches snapshot after+before loading", done => {
    const store = RootStore.create({productsStore: {products: fillProducts(1000)}});

    const app = renderer.create(
        <Provider value={store}><App/></Provider>
    );
    let tree = app.toJSON();
    expect(tree).toMatchSnapshot();

    setTimeout(()=>{
        let tree = app.toJSON();
        expect(tree).toMatchSnapshot();
        done()
    }, 100)
});