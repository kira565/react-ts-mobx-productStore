import React from 'react';
import {Select, Avatar, Checkbox, DatePicker} from "antd";
import {Colors, Sizes, Types} from "../../common/enums_common";
import {formatDateToString, makeArrayFromEnum} from "../../common/functions_common"
import {SHOW_COLOR, SHOW_SIZE, SHOW_TYPE,} from "../../common/constants_common"


const styles = require('./SiderComponent.module.css');

const {Option} = Select;
const {RangePicker} = DatePicker;


interface IProps {
    rootStore: any;
}


const SiderComponent: React.FC<IProps> = (props) => {


    const onChangeType = (type: string): void => {
        props.rootStore.productsStore.setFilter(SHOW_TYPE, type)
    };
    const onChangeColor = (color: string): void => {
        props.rootStore.productsStore.setFilter(SHOW_COLOR, color)
    };
    const onChangeSize = (size: string): void => {
        props.rootStore.productsStore.setFilter(SHOW_SIZE, size)
    };
    const onChangeInStock = (event: any): void => {
        props.rootStore.productsStore.setInStock(event.target.checked);
    };
    const onChangeDateRange = (range: Array<any>): void => {
        let dateRanges: Array<string> = [];
        range.map(momentI => {
            dateRanges.push(formatDateToString(momentI));
        });
        props.rootStore.productsStore.setDateInterval(dateRanges)
    };


    return (
        <div className={styles['sider-container']}>
            <div className={styles['sider-header']}><h2>Опции:</h2></div>
            <div className={styles['sider-controls']}>
                <div className={styles['sider-controls__select-type']}>
                    <div className={styles['select-type-title']}>Тип товара:</div>
                    <Select placeholder="Выбрать тип..." style={{width: '90%'}} onChange={onChangeType}
                            allowClear={true}>
                        {
                            makeArrayFromEnum(Types).map((item) => (
                                <Option key={item} value={item}>
                                    <div>{item}</div>
                                </Option>
                            ))
                        }
                    </Select>
                </div>
                <div className={styles['sider-controls__select-color']}>
                    <div className={styles['select-type-title']}>Цвет:</div>
                    <Select placeholder={'Цвет'} style={{width: '45%'}} size={"large"} onChange={onChangeColor}
                            allowClear={true}>
                        {
                            makeArrayFromEnum(Colors).map((item) => (<Option key={item}>
                                    <Avatar style={{background: item, border: '1px solid gray'}} shape={"square"}/>
                                </Option>
                            ))}
                    </Select>
                </div>
                <div className={styles['sider-controls__select-size']}>
                    <div className={styles['select-type-title']}>Размер:</div>
                    <Select placeholder="Выбрать размер..." style={{width: '90%'}} onChange={onChangeSize}
                            allowClear={true}>
                        {
                            makeArrayFromEnum(Sizes).map((item) => (
                                <Option key={item} value={item}>
                                    <div>{item}</div>
                                </Option>
                            ))
                        }
                    </Select>
                </div>
                <div className={styles['sider-controls__select-instock']}>
                    <Checkbox onChange={onChangeInStock} style={{color: 'white'}}>В наличии</Checkbox>
                </div>
                <div className={styles['sider-controls__select-date_range']}>
                    <div className={styles['select-type-title']}>За время:</div>
                    <RangePicker style={{width: '90%'}} onChange={onChangeDateRange}
                                 format={"YYYY-DD-MM"}/>
                </div>

            </div>
        </div>
    );
};

export default SiderComponent;