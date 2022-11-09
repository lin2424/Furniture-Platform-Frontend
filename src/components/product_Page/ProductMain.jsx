import React, {useEffect, useState} from "react"
import "./styles/ProductMain.scss";
import ProductImg from "./ProductImg.jsx"
import ProductProfile from "./ProductProfile.jsx"
import MaskImg from "./MaskImg";
import DetailSection from "./DetailSection";
import {Breadcrumb} from "./Breadcrumb";
import { useParams } from "react-router-dom";
import {MainMobile} from "./MainMobile";
import axios from "../../customHook/axios.js";


const ProductMain = ( {editMode = false} ) => {
    const {id} = useParams();
    const [maskStatus, setMaskStatus] = useState(false);
    const [oneChairData, setOneChairData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        const productPageAxiosFetch = async () => {
            try {
                const {data}= await axios.get(`/product/${id}`);
                setOneChairData(data.data);
                setIsLoading(false);
            } catch(e) {
                setIsLoading(false);
            }
        }
        productPageAxiosFetch(); 
    }, [])

    const onClick = () => {
        setMaskStatus(true)
    }

    const onClose = () => {
        setMaskStatus(false)
    }
    
    return (
        isLoading ? 

        <div className='loader-container'>
            <h2>Loading...</h2>
            <div className='loader'></div>
        </div> :

        oneChairData &&
        <>
            <Breadcrumb data={oneChairData}/>
            <MainMobile data={oneChairData}/>
            <div className="main-section" >
                <ProductImg onClick={onClick} data={oneChairData}/>
                <ProductProfile id={id} editMode={editMode} data={oneChairData}/>
                <MaskImg onClose={onClose} status={maskStatus} data={oneChairData}/>
            </div>
            <DetailSection data={oneChairData} />
        </>
  )
}
export default ProductMain