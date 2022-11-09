import React, { useEffect, useState } from "react";
import { FaTruck } from "react-icons/fa"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";


const ProductCart = ({ basePrice, name, mediaSrc, editMode, data }) => {
  const { row } = useParams();
  const { optionSelected, optionSelectedId }= useSelector(state => state.furniture);
  const [totalPrice, setTotalPrice] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [qty, setQty] = useState(1);
  const [isActive, setIsActive] = useState('')
  const navigate = useNavigate();  

  useEffect(() => {
    if (editMode) {
      const localStorageArray = JSON.parse(localStorage.getItem('cartArr'));
      const itemToEdit = localStorageArray[row]; 
      setQty(itemToEdit.qty);
    }
  }, [])

  useEffect(() => {
    if (!Object.values(optionSelected).includes(null)) {
      const newTotal = Object.values(optionSelected).reduce((acc, cur) => acc + Number(cur.price), Number(basePrice));
      setTotalPrice(newTotal);
    }
  }, [optionSelected]); 


  const isEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((e, index) => e.checked === arr2[index].checked);
  }

  const someChairIdentical = (localStorageArray, obj2) => {
      for (let i = 0; i < localStorageArray.length; i++){
          if (localStorageArray?.[i].chairObj !== obj2?.chairObj) {
            continue;
          }
          const result = isEqual(Object.values(localStorageArray?.[i].selectInfo), Object.values(obj2?.selectInfo));
          if (result) {
            return [true, i];
          }
      }
      return false;
  }

  const addToCart = () => {
      const itemInCart = {
          "chairObj": data?.id,
          "name": data?.name,
          "selectInfo": optionSelected,
          "profileItems": optionSelectedId,
          "qty": Number(qty),
          "totalPrice": totalPrice,
          "media": mediaSrc 
        }; 
      if (!localStorage.getItem('cartArr')) {
        const initialArray = [];
        initialArray.push(itemInCart);
        localStorage.setItem('cartArr', JSON.stringify(initialArray));
      } else {
        const localStorageArray = JSON.parse(localStorage.getItem('cartArr'));
        if (someChairIdentical(localStorageArray, itemInCart) === false) {
          localStorageArray.push(itemInCart);
          localStorage.setItem('cartArr', JSON.stringify(localStorageArray));
        } else {
          const indexOfEqualItem = someChairIdentical(localStorageArray, itemInCart)[1];
          localStorageArray[indexOfEqualItem].qty += Number(qty);
          localStorage.setItem('cartArr', JSON.stringify(localStorageArray));
        }
      }

      setIsActive('active');
      setIsDisabled(true);

      setTimeout(() => {
        setIsActive('');
        setIsDisabled(false);
      }, 1500);
  }

  const updateCart = () => {
    const localStorageArray = JSON.parse(localStorage.getItem('cartArr'));
    const itemToEdit = localStorageArray[row]
    const tempArr = localStorageArray.filter((_, index) => index !== Number(row));
    itemToEdit.qty = Number(qty);
    itemToEdit.selectInfo = optionSelected;
    itemToEdit.profileItems= optionSelectedId;
    itemToEdit.totalPrice = totalPrice;
    const isIdentical = someChairIdentical(tempArr, itemToEdit);
    if (isIdentical === false) {
      localStorage.setItem('cartArr', JSON.stringify(localStorageArray));
    } else {
      localStorageArray.splice(row, 1);
      const indexOfEqualItem = isIdentical[1];
      localStorageArray[indexOfEqualItem].qty += Number(qty);
      localStorage.setItem('cartArr', JSON.stringify(localStorageArray));
    }

    navigate('/cart', { replace: true });
  }


  const createBtnOnEditMode = () => {
    return editMode === false ? 
      <button className="cart-add-btn"
              onClick={addToCart}
              disabled={isDisabled}
              >Add To Cart
      </button> :

      <button className="cart-edit-btn"
              onClick={updateCart}
              disabled={isDisabled}
              >Update
      </button> 
  }
  

  return (
    <div className="cart-container">
      <div className="cart-container-wrapper">
        <div className="cart-container-detail">
          <div className="cart-name">
              <h2 className="cart-name-large">{name}</h2>
              <img src={mediaSrc} className="cart-name-small" />
          </div>
          <div className="cart-icon">
              <FaTruck transform='scale(-1.5, 1.5)'/>
          </div>
        </div>
        <div className="cart-action">
          <div className="cart-info-price">
            <div>In Stock</div>
            <div className="final-price">CS$ {totalPrice ? parseFloat(totalPrice).toFixed(2) : ''}</div>
          </div>
          <div className="cart-add">
            <div className={`cart-add-info ${isActive}`}>{`Successfully ${editMode === false ? 'added to Cart!' : 'updated cart!'} `} </div>
            <div className="cart-add-qty">
              <input type="number" min="1" value={qty} maxLength="3"
                      onChange={event => setQty(event.target.value)}/>
              {isDisabled === false ? createBtnOnEditMode() : <button className="cart-add-disabled" disabled>Wait a second!</button>}
            </div>
          </div>
        </div>
      </div>
    </div> 
  )
}
export default ProductCart
