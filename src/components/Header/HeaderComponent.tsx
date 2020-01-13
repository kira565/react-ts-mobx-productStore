import React from 'react';

const styles = require('./HeaderComponent.module.css');
import {Row, Col} from 'antd';
import {LOGO} from "../../common/constants_common";
import {TRootStore} from "../../types/types";
import Preloader from "../../etc/preloader/Preloader";
import {observer} from "mobx-react";

interface HProps {
    rootStore?: TRootStore
}

const HeaderComponent: React.FC<HProps> = observer(({rootStore}) => {
    return (
        <div className={styles['header-container']}>
            <Row>
                <Col span={2}>
                    <div className={styles['header-logo']}><img alt={"logo"} src={LOGO}/></div>
                </Col>
                <Col span={8}>
                    <div className={styles['header-title']}><h1>КАЛАШНИКОВ КОНЦЕРН DEV-TASK</h1></div>
                </Col>
                <Col span={2}>
                    <div className={styles['header-title']}>
                        <div className={styles['preloader-wrapper']}>
                            {
                                rootStore &&
                                rootStore.stateGet === "done" ? null : <Preloader/>
                                || rootStore && rootStore.stateGet === "error" && <div>Fetch error</div>

                            }
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
});

export default HeaderComponent;