import React from 'react';
import {Select, Avatar, Checkbox, DatePicker} from "antd";
import {formatDateToString} from "../../common/functions_common"
import {DATE_RECEIPT, SHOW_COLOR, SHOW_INSTOCK, SHOW_SIZE, SHOW_TYPE,} from "../../common/constants_common"
import {TFilterStore} from "../../types/types";
import {CheckboxChangeEvent} from "antd/es/checkbox";


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
                    filterStore.takeFilters.map((filter) => {
                        if (filter.type === SHOW_TYPE || filter.type === SHOW_SIZE || filter.type === SHOW_COLOR) {
                            return (
                                <div key={filter.id}>
                                    <div>{filter.type}</div>
                                    <Select allowClear={true}
                                            size={filter.type === SHOW_COLOR ? "large" : "default"}
                                            onChange={(value: string) => {
                                                filterStore.changeFilter(filter.type, value, filter.id)
                                            }}
                                    >
                                        {
                                            filter.options.map((option: any) =>
                                                <Option key={option} value={option}>
                                                    {
                                                        filter.type === SHOW_COLOR
                                                            ? <Avatar
                                                                style={{background: option, border: '1px solid gray'}}
                                                                shape={"square"}/>
                                                            : <div>{option}</div>
                                                    }
                                                </Option>)
                                        }
                                    </Select>
                                </div>
                            )
                        }
                        if (filter.type === SHOW_INSTOCK) {
                            return (
                                <div key={filter.id}>
                                    <Checkbox style={{color: "white"}}
                                              onChange={(e: CheckboxChangeEvent) => {
                                                  filterStore.changeFilter(filter.type, e.target.checked, filter.id)
                                              }}>{filter.type}</Checkbox>
                                </div>
                            )
                        }
                        if (filter.type === DATE_RECEIPT) {
                            return (
                                <div key={filter.id}>
                                    <RangePicker style={{width: '90%'}}
                                                 onChange={(range: Array<any>): void => {
                                                     let dateRanges: Array<string> = [];
                                                     range.map(momentI => {
                                                         dateRanges.push(formatDateToString(momentI));
                                                     });
                                                     filterStore.changeFilter(filter.type, dateRanges.length === 2 ? dateRanges : undefined, filter.id)
                                                 }} format={"YYYY-DD-MM"}/>
                                </div>
                            )
                        }

                    })
                }
            </div>
        </div>
    );
};

export default SiderComponent;