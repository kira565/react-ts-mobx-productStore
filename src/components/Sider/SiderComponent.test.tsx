import React from "react"
import {mount} from "enzyme"
import Adapter from 'enzyme-adapter-react-16'
import {configure} from 'enzyme';
import {fillProducts} from "../../common/functions_common";
import {RootStore} from "../../models/RootStore";
import SiderComponent from "./SiderComponent";
import {Select, Checkbox, DatePicker} from "antd";
const {RangePicker} = DatePicker;

configure({adapter: new Adapter()});

describe('Should render smart Sider component with incoming props', function () {
    let renderedComponent: any, rootStore:any;

    beforeEach(() => {
        rootStore = RootStore.create({productsStore: {products: fillProducts(1000)}});
        renderedComponent = mount(<SiderComponent rootStore={rootStore}/>)
    });

    it('+ Smart sider component rendered with 3 Select, 1 Checkbox, 1 RangePicker components', () => {
        expect(renderedComponent.find(Select).length).toEqual(3);
        expect(renderedComponent.find(Checkbox).length).toEqual(1);
        expect(renderedComponent.find(RangePicker).length).toEqual(1);
    });

});
