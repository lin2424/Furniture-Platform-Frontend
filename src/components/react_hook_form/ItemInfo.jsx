import React from 'react';

const ItemInfo = ({ name, price, qty, mediaSrc, profileItems }) => {
    return (
        <div>
            <div className="item-info">
                <div className="item-photo-box">
                    <div className='item-photo-box-left'>
                        <div className="item-photo">
                            <img src={mediaSrc} alt=""/>
                        </div>
                        <div className="item-name"><p>{name}</p></div>
                    </div>
                    <div className="item-photo-box-right">
                        {profileItems.map((ele, index) => <div key={index}>{ele}</div>)}
                    </div>
                </div>
                
                <div className="price-quantities">
                    <div className="unit-price">${price.toFixed(2)} / Unit</div>
                    <div className="quantity">Quantity: {qty}</div>
                </div>
            </div>
            <hr/>
        </div>
    );
};

export default ItemInfo;

