import React from "react"
import {mount} from "enzyme"
import Adapter from 'enzyme-adapter-react-16'
import {configure} from 'enzyme';
import TableComponent from "./TableComponent";
import {fillProducts} from "../../common/functions_common";
import {RootStore} from "../../models/RootStore";
import {Table} from "react-virtualized";
import {TRootStore} from "../../types/types";

/*

configure({adapter: new Adapter()});


describe('Should render Table with values after receiving props', function () {
    let renderedComponent: any, rootStore: TRootStore;

    beforeEach(() => {
        rootStore = RootStore.create({productsStore: {products: fillProducts(1000)}, filterStore: {}});
        renderedComponent = mount(<TableComponent rootStore={rootStore}/>)
    });

    it('+ Smart Table component rendered', () => {
        expect(renderedComponent.find(Table).length).toEqual(1);
    });

    it('++ Smart Table component rendered with checking incoming props', () => {
        expect(renderedComponent.find(Table).prop('rowCount')).toEqual(rootStore.takeFilteredProducts.length);
    });
});


*/
