import React from 'react';
import {configure, shallow} from 'enzyme'
import FooterComponent from "./FooterComponent";
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()});

describe('Shallow Render Footer Component',()=>{
    let wrapper: any;

    beforeEach(()=>{
        wrapper = shallow(<FooterComponent />)

    });

    it('+ render the DUMB component', () => {
        expect(wrapper.length).toEqual(1)
    });
});