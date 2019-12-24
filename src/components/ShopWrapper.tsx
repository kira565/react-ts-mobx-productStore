import React from "react";
import {Layout} from "antd";
import TableComponent from "./Table/TableComponent";
import {observer} from "mobx-react";
import {useMst} from "../models/RootStore";
import {getSnapshot, onSnapshot} from "mobx-state-tree";
import HeaderComponent from "./Header/HeaderComponent";
import FooterComponent from "./Footer/FooterComponent";
import SiderComponent from "./Sider/SiderComponent";

const {Header, Footer, Sider, Content} = Layout;
const styles = require('./ShowWrapper.module.css');




const ShopWrapper: React.FC = observer(() => {
    const rootStore = useMst();


    return (
        <div className={styles['shop-wrapper']}>
            <Layout style={{height: '100%'}}>
                <Layout>
                    <Header className={styles['shop-wrapper__header']}>
                        <HeaderComponent/>
                    </Header>
                    <Content className={styles['shop-wrapper__content']}>
                        <TableComponent productsStore={rootStore.productsStore}/>
                    </Content>
                    <Footer className={styles['shop-wrapper__footer']}>
                        <FooterComponent/>
                    </Footer>
                </Layout>
                <Sider width={300} className={styles['shop-wrapper__sider']}>
                    <SiderComponent rootStore={rootStore}/>
                </Sider>
            </Layout>
        </div>
    );
});


export default ShopWrapper