import React from 'react';

const styles = require('./HeaderComponent.module.css');
import {Row, Col} from 'antd';
import {LOGO} from "../../common/constants_common";


const HeaderComponent: React.FC = () => {
    return (
        <div className={styles['header-container']}>
            <Row>
                <Col span={2}>
                    <div className={styles['header-logo']}><img alt={"logo"} src={LOGO}/></div>
                </Col>
                <Col span={22}>
                    <div className={styles['header-title']}><h1>КАЛАШНИКОВ КОНЦЕРН DEV-TASK</h1></div>
                </Col>
            </Row>
        </div>
    );
};

export default HeaderComponent;