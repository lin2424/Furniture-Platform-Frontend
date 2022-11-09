import React from "react";
import { useEffect, useState } from "react";
import { MdOutlineCheckCircleOutline, MdOutlineRadioButtonUnchecked } from "react-icons/md"
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { CART_PRICE_UPDATE_OPTIONSELECT, UPDATE_OPTIONSELECTED_ID } from "../../features/furnitureSlice.js";


const CustomizeSelectBlock = ({ category, id, editMode }) => {
    const { row } = useParams();
    const dispatch = useDispatch();
    const { profileItems } = category;
    const [optionSelected, setOptionSelected] = useState(null);

    useEffect(() => {
        if (!editMode) {
            setOptionSelected(...profileItems.filter(ele => ele.checked));
        } else {
            const localStorageArray = JSON.parse(localStorage.getItem('cartArr'));
            const selectInfo = localStorageArray[row].selectInfo;
            setOptionSelected(Object.values(selectInfo)[id]);
        }
    },[])

    useEffect(() => {
        if (optionSelected) {
            dispatch(CART_PRICE_UPDATE_OPTIONSELECT(
                [id, optionSelected]
            ));
            dispatch(UPDATE_OPTIONSELECTED_ID([Number(id), optionSelected.id]));
        }
    }, [optionSelected])

    const onClickselectOption = (evt) => {
        setOptionSelected(...profileItems.filter((_, idx) => idx === parseInt(evt.currentTarget.dataset.index)))
    }

    const generateOptions = () => {
        if (optionSelected) {
            return profileItems.map((ele, idx) => {
                const rowItem = profileItems.find(ele => ele.id === optionSelected.id); 
                const indexOfProfileItems = profileItems.indexOf(rowItem);
                return <li key={idx} className={`select ${indexOfProfileItems === idx ? 'selected' : '' }`} onClick={onClickselectOption} data-index={idx}>
                        <MdOutlineCheckCircleOutline fontSize="20px" color="green" className="checked"/>
                        <MdOutlineRadioButtonUnchecked fontSize="20px" color="rgb(141,141,141)" className="unChecked"/>
                        <span>{ele.name}</span>
                    </li>
            })
        }
    }


  return (
    <li className="profiles">
        <div className="profile-label">{category.name}</div>
        <ul className="profile-items">
            {generateOptions()}
        </ul>
    </li>
  )
}
export default CustomizeSelectBlock