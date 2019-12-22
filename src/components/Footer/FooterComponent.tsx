import React from 'react';
const styles = require('./FooterComponent.module.css');

const FooterComponent: React.FC = () => {
    return (
        <div className={styles['footer-wrapper']}>
            <div className={styles['footer__by']}>by Kirill Kagdin</div>
        </div>
    );
};

export default FooterComponent;