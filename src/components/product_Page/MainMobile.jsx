import React from "react";
import './styles/ProductMain.scss';
import {DesignedBy, ItemNo} from "../../constants";

export const MainMobile = ({ data }) => {
    return (
        <div className="main-mobile">
            <div className="main-mobile-content-number">
                <span>{ItemNo}</span>
            </div>
            <h1 className="main-mobile-product-name">{data?.name}</h1>
            <p className="main-mobile-product-designer">{DesignedBy}</p>
            <div className="main-mobile-price">
                <span>${data?.price}</span>
            </div>
        </div>
    )

}