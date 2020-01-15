import React from "react"
import {mount} from "enzyme"
import Adapter from 'enzyme-adapter-react-16'
import {configure} from 'enzyme';
import {fillProducts, makeArrayFromEnum} from "../../common/functions_common";
import {RootStore} from "../../models/RootStore";
import SiderComponent from "./SiderComponent";
import {Select, Checkbox, DatePicker} from "antd";
import {TRootStore} from "../../types/types";
import {DATE_RECEIPT, SHOW_COLOR, SHOW_INSTOCK, SHOW_SIZE, SHOW_TYPE} from "../../common/constants_common";
import {Colors, Sizes, Types} from "../../common/enums_common";


const {RangePicker} = DatePicker;


configure({adapter: new Adapter()});


describe('Should render smart Sider component with incoming props', function () {
    let renderedComponent: any, rootStore: TRootStore;

    beforeEach(() => {
        rootStore = RootStore.create({
            productsStore: {
                products: fillProducts(1000)
            },
            stateGet: "pending",
            statePost: "pending",
            filterStore: {
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
            }
        });
        renderedComponent = mount(<SiderComponent filterStore={rootStore.filterStore}/>)
    });

    it('+ Smart sider component rendered with 3 Select, 1 Checkbox, 1 RangePicker components', () => {
        expect(renderedComponent.find(Select).length).toEqual(3);
        expect(renderedComponent.find(Checkbox).length).toEqual(1);
        expect(renderedComponent.find(RangePicker).length).toEqual(1);
    });

});

