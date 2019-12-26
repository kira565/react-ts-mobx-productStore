import React from 'react';
import {Select, Avatar, Checkbox, DatePicker} from "antd";
import {Colors, Sizes, Types} from "../../common/enums_common";
import {formatDateToString, makeArrayFromEnum} from "../../common/functions_common"
import {DATE_RECEIPT, SHOW_COLOR, SHOW_INSTOCK, SHOW_SIZE, SHOW_TYPE,} from "../../common/constants_common"
import {TFilterStore} from "../../types/types";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {Instance} from "mobx-state-tree";
import {Filters} from "../../models/Filter";
import {filter} from "minimatch";


const styles = require('./SiderComponent.module.css');

const {Option} = Select;
const {RangePicker} = DatePicker;


interface IProps {
    filterStore: TFilterStore;
}


const SiderComponent: React.FC<IProps> = ({filterStore}) => {

    return (
        <div className={styles['sider-container']}>
            <div className={styles['sider-header']}><h2>Опции:</h2></div>
            <div className={styles['sider-controls']}>
                {
                    filterStore.takeFilters.map((el) => {
                        switch (el.type) {
                            case (SHOW_TYPE):
                                return (
                                    <div  key={el.type}>
                                        <div>{el.type}</div>
                                        <Select onChange={(type: string) => {filterStore.changeFilter(el.type, type)}}
                                                allowClear={true}
                                        >
                                            {
                                                makeArrayFromEnum(Types).map(item => <Option key={item} value={item}>
                                                    <div>{item}</div>
                                                </Option>)
                                            }
                                        </Select>
                                    </div>
                                );
                            case (SHOW_COLOR):
                                return (
                                    <div  key={el.type}>
                                        <div>{el.type}</div>
                                        <Select size={"large"} onChange={(color: string) => {filterStore.changeFilter(el.type, color)}}
                                                allowClear={true}>
                                            {
                                                makeArrayFromEnum(Colors).map(item =>
                                                    <Option key={item} value={item}>
                                                        <Avatar style={{background: item, border: '1px solid gray'}}
                                                                shape={"square"}/>
                                                    </Option>)
                                            }
                                        </Select>
                                    </div>
                                );
                            case (SHOW_SIZE):
                                return (
                                    <div  key={el.type}>
                                        <div>{el.type}</div>
                                        <Select onChange={(size: string) => {filterStore.changeFilter(el.type, size)}} allowClear={true}>
                                            {
                                                makeArrayFromEnum(Sizes).map(item => <Option key={item} value={item}>
                                                    <div>{item}</div>
                                                </Option>)
                                            }
                                        </Select>
                                    </div>
                                );
                            case (SHOW_INSTOCK):
                                return (
                                    <div  key={el.type}>
                                        <div>{el.type}</div>
                                        <Checkbox onChange={(e: CheckboxChangeEvent) => {filterStore.changeFilter(el.type, e.target.checked)}}
                                                  style={{color: 'white'}}>{el.value}</Checkbox>
                                    </div>
                                );
                            case (DATE_RECEIPT):
                                return (
                                    <div  key={el.type}>
                                        <div>{el.type}</div>
                                        <RangePicker style={{width: '90%'}}
                                                     onChange={(range: Array<any>): void => {
                                                         let dateRanges: Array<string> = [];
                                                         range.map(momentI => {
                                                             dateRanges.push(formatDateToString(momentI));
                                                         });
                                                         filterStore.changeFilter(el.type, dateRanges)
                                                     }} format={"YYYY-DD-MM"}/>
                                    </div>
                                );
                        }

                    })
                }
            </div>
        </div>
    );
};

export default SiderComponent;