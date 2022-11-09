import React from "react";
import "./styles/ProductImg.scss";
import {keyFeature} from "../../constants";

const DetailSection = ({ data }) => {

    const {description} = data;

    const showingList = () => {
        return (keyFeature.map((ele,index)=>
            <li key={index}>{ele}</li>
        ))
    }


    return (
        <div className='detail' id='description'>
            <div className="detail-description">
                <h4>Description</h4>
                <div className="description-wrap">
                    <div className="wrap-left">
                            {description}
                    </div>

                    <div className="wrap-right">
                        <h6>Key Features</h6>
                        <ul className="description-list">
                            {showingList(keyFeature)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default DetailSection