import React from "react";
import {Column, Table, AutoSizer} from 'react-virtualized';

const styles = require('./TableComponent.module.css');
import moment from 'moment'


interface IProps {
    rootStore?: any;
}

const TableComponent: React.FC<IProps> = props => {
    const _rowClassName = ({index}: any): any => {
        if (index < 0) {
            return styles.headerRow;
        } else {
            return index % 2 === 0 ? styles.evenRow : styles.oddRow;
        }
    };

    return (
        <div className={styles['shop-wrapper__table']}>
            <AutoSizer disableHeight>
                {
                    ({width}) => (
                        <Table width={width}
                               height={500}
                               rowHeight={70}
                               rowCount={props.rootStore.productsStore.filteredProducts.length}
                               headerHeight={80}
                               rowGetter={({index}) => props.rootStore.productsStore.filteredProducts[index]}
                               rowStyle={{display: 'flex', flexDirection: 'row', textAlign: 'center'}}
                               headerClassName={styles['table__header']}
                               gridClassName={styles['grid__item']}
                               rowClassName={_rowClassName}
                               className="g-table"
                        >
                            <Column label={'id'} dataKey={'id'} width={70}/>
                            <Column label={'Название'} dataKey={'name'} width={300} flexGrow={1} maxWidth={5000}/>
                            <Column label={'Тип'} dataKey={'type'} width={220}/>
                            <Column label={'Цвет'}
                                    style={{display: 'flex', justifyContent: 'center'}}
                                    dataKey={'color'}
                                    width={200}
                                    flexGrow={0.5}
                                    maxWidth={2500}
                                    cellRenderer={({dataKey, rowData}) =>
                                        <div className={styles['colored-div']}
                                             style={{backgroundColor: rowData[dataKey]}}/>}/>
                            <Column label={'Размер'} dataKey={'size'} width={50} flexGrow={0.5} maxWidth={2500}/>
                            <Column label={'В наличии'}
                                    dataKey={'inStock'}
                                    width={250}
                                    flexGrow={0.5}
                                    maxWidth={2500}
                                    cellRenderer={({dataKey, rowData}) =>
                                        rowData[dataKey] ? 'Да' : 'Нет'}
                            />
                            <Column label={'Дата поступления'}
                                    dataKey={'dateReceipt'}
                                    width={300}
                                    flexGrow={1}
                                    maxWidth={5000}
                                    cellRenderer={({dataKey, rowData}) =>
                                        moment(rowData[dataKey]).format('YYYY-DD-MM')}/>
                        </Table>
                    )
                }
            </AutoSizer>
        </div>
    );
};

export default TableComponent
