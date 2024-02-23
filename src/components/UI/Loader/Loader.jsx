import React from 'react';
import cl from './Loader.module.css'
const Loader = () => {
    return (
        <div className={cl.shield}>
            <div className={cl.lds_spinner}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

    );
};

export default Loader;