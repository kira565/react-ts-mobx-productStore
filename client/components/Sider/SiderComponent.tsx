import React from 'react';
import {Select, Avatar, Checkbox, DatePicker} from "antd";
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
                                <div key={filter.id} className={styles['sider-controls__select-type']}>
                                    <div className={styles['select-type-title']}>
                                        {
                                            filter.type === SHOW_TYPE && 'Тип' || filter.type === SHOW_SIZE && 'Размер' || filter.type === SHOW_COLOR && 'Цвет'
                                        }
                                    </div>
                                    <Select allowClear={true}
                                            size={filter.type === SHOW_COLOR ? "large" : "default"}
                                            onChange={(value: string) => {
                                                filterStore.changeFilter(value, filter.id)
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
                                <div key={filter.id} className={styles['sider-controls__select-type']}>
                                    <Checkbox style={{color: "white"}}
                                              onChange={(e: CheckboxChangeEvent) => {
                                                  filterStore.changeFilter(e.target.checked ? 1 : 0, filter.id)
                                              }}>{filter.type === SHOW_INSTOCK && 'В наличии'}</Checkbox>
                                </div>
                            )
                        }
                        if (filter.type === DATE_RECEIPT) {
                            return (
                                <div key={filter.id} className={styles['sider-controls__select-type']}>
                                    <RangePicker style={{width: '90%'}}
                                                 onChange={(range: Array<any>): void => {
                                                     filterStore.changeFilter(range.length === 2 ? range : undefined, filter.id)
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