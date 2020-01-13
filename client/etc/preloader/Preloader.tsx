import React from 'react'

const styles = require('./Preloader.module.css');

const Preloader: React.FC = () => {
    return (
        <div className={styles['lds-dual-ring']}/>
    )
};

export default Preloader