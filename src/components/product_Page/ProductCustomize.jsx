import React from "react"
import CustomizeSelectBlock from "./CustomizeSelectBlock.jsx";


const ProductCustomize = ({ basePrice, editMode, data }) => {
    
    const generateItemProfiles = () => {
      return data && data.__profileCategories__?.map((ele, idx) => (
        <CustomizeSelectBlock
          key={idx}
          category={ele}
          basePrice={basePrice}
          id={idx}
          editMode={editMode}
        />
      ));
  };


  return (
    <div className="product-content-profile">
      <ul>
        {generateItemProfiles()}
      </ul>
    </div>
  )
}
export default ProductCustomize