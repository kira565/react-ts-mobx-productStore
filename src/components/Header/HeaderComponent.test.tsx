import React from 'react';
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import HeaderComponent from "./HeaderComponent";

configure({adapter: new Adapter()});

describe('Shallow Render Footer Component',()=>{
    let wrapper: any;

    beforeEach(()=>{
        wrapper = shallow(<HeaderComponent />)

    });

    it('+ render the DUMB component', () => {
        expect(wrapper.length).toEqual(1)
    });
});