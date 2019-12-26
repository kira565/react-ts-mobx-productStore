import React from 'react';
import {Select, Avatar, Checkbox, DatePicker} from "antd";
import {Colors, Sizes, Types} from "../../common/enums_common";
import {formatDateToString, makeArrayFromEnum} from "../../common/functions_common"
import {DATE_RECEIPT, SHOW_COLOR, SHOW_INSTOCK, SHOW_SIZE, SHOW_TYPE,} from "../../common/constants_common"
import {TFilterStore} from "../../types/types";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {Instance} from "mobx-state-tree";
import {Filters, FiltersType, FilterTypesWithOptions} from "../../models/Filter";


const styles = require('./SiderComponent.module.css');

const {Option} = Select;
const {RangePicker} = DatePicker;


interface IProps {
    filterStore: TFilterStore;
}


const SiderComponent: React.FC<IProps> = ({filterStore}) => {
    console.log(filterStore.takeFilters);

    const onChangeType = (type: string): void => {
        filterStore.changeFilter(SHOW_TYPE, type)
    };
    const onChangeColor = (color: string): void => {
        filterStore.changeFilter(SHOW_COLOR, color)
    };
    const onChangeSize = (size: string): void => {
        filterStore.changeFilter(SHOW_SIZE, size)
    };
    const onChangeInStock = (event: CheckboxChangeEvent): void => {
        filterStore.changeFilter(SHOW_INSTOCK, event.target.checked);
    };
    const onChangeDateRange = (range: Array<any>): void => { //Честно, так и не понял какой тип он хочет в параметрах увидеть
        let dateRanges: Array<string> = [];
        range.map(momentI => {
            dateRanges.push(formatDateToString(momentI));
        });
        filterStore.changeFilter(DATE_RECEIPT, dateRanges)
    };


    return (
        <div className={styles['sider-container']}>
            <div className={styles['sider-header']}><h2>Опции:</h2></div>
            <div className={styles['sider-controls']}>
                {
                 filterStore.takeFilters.map((el) => {
                     switch (el.type){
                         case (SHOW_TYPE):
                             return (
                                 <>
                                     <div>{el.type}</div>
                                     <Select onChange={(type:string) => {el.setValue(type)}}>
                                         {
                                             makeArrayFromEnum(Types).map(item => <Option key={item} value={item}><div>{item}</div></Option>)
                                         }
                                     </Select>
                                 </>
                             )
                     }

                 })
                }
            </div>
        </div>
    );
};

export default SiderComponent;