import React, { useState, useEffect } from "react";
import '../styles/Products.scss';
import { useSelector } from "react-redux";
import { filterAndSort } from "../../../helperFunc.js";
import axios from "../../../customHook/axios.js";
import PageNotFound from "../../pages/PageNotFound.jsx";
import { Box, Pagination, PaginationItem, Select, Stack, Typography } from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";

export const ProductTile_1 = ({view}) => {
    const navigate = useNavigate();
    const { priceRange, sortOrder } = useSelector(state => state?.furniture); 
    const [filterSortData, setFilterSortData] = useState([])
    const [limit, setLimit] = useState(10);
    const { pageNum } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const priceRangeMemo = useMemo(() => {
        return {p1: priceRange[0], p2: priceRange[1], p3: priceRange[2], p4: priceRange[3], p5: priceRange[4], p6: priceRange[5]}
    }, [priceRange[0],priceRange[1], priceRange[2],priceRange[3],priceRange[4],priceRange[5]])

    useEffect(() => {
        const mainPageAxiosFetch = async () => {
            const priceRangeArray = [];
            priceRange?.map(ele => {
                if (ele !== null) {
                    priceRangeArray.push(`${ele[0]},${ele[1]}`)
                }
            })
            try {
                const response = await axios.get(`/product/?pageNum=${pageNum - 1}&limit=${limit}&priceRange=${priceRangeArray.join('|')}`);
                filterAndSort(response.data.data, sortOrder, setFilterSortData);
                setIsLoading(false);
            } catch(e) {
                setIsLoading(false);
            }
        }
        mainPageAxiosFetch();        
    }, [pageNum, limit, priceRangeMemo])

    useEffect(() => {
        if (filterSortData.length > 0) {
            filterAndSort([...filterSortData], sortOrder, setFilterSortData);
        }
    }, [sortOrder])


    const productList = () => 
                isLoading ? 

                <div className='loader-container'>
                    <h2>Loading...</h2>
                    <div className='loader'></div>
                </div> :

                filterSortData.length > 0 ? filterSortData?.map((ele, index) => {
                const firstImage = ele.media.split("|")[0];
                const secondImage = ele.media.split("|")[1];
                return (
                    <li className={view} key={index}>
                        <div className="productTile">
                            <div className="productImg">
                                <a href={`/product/${ele.id - 1}`}
                                    className="imgLink">
                                    <img className='productCover'
                                            src={firstImage}
                                            alt="img"/>
                                    <img className='productBack'
                                            src={secondImage}
                                            alt="img"/>
                                </a>
                            </div>
                            <div className="productContent">
                                <div className="productName">
                                    <h3 style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>{ele.name}</h3>
                                    <a href="" style={{cursor:'pointer'}}></a>
                                </div>
                                <div className="productPrice">CS$ {String(ele.price.toFixed(2))}</div>
                                    <div className="productSwatch">
                                        <div className="swatchDeskTop">
                                            <ul className="swatchList">
                                                <li>
                                                    <a className="swatch">
                                                        <img
                                                            src="https://s7d2.scene7.com/is/image/HermanMillerStore/s_frame_studio_white_mineral"
                                                            alt="color"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="swatch">
                                                        <img
                                                            src="https://s7d2.scene7.com/is/image/HermanMillerStore/s_frame_canyon"
                                                            alt="color"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="swatch">
                                                        <img
                                                            src="https://s7d2.scene7.com/is/image/HermanMillerStore/s_frame_carbon"
                                                            alt="color"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="swatch">
                                                        <img
                                                            src="https://s7d2.scene7.com/is/image/HermanMillerStore/s_frame_glacier"
                                                            alt="color"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="swatch">
                                                        <img
                                                            src="https://s7d2.scene7.com/is/image/HermanMillerStore/s_frame_nightfall"
                                                            alt="color"/>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </li>
                )
            }) : <PageNotFound />

    return (
        <>
            {productList()}
            <Stack spacing={2} sx={{mb: "30px"}}>
                <Box>
                    <span>Rows per page:</span>
                    <Select native 
                        value={limit} 
                        onChange={(e) => {
                            setLimit(Number(e.target.value));
                            navigate('/home/1');
                        }} 
                        id="grouped-native-select" 
                        sx={{width: 80, ml: 2, height: 40}}
                        >
                        <option aria-label="None" value="" />
                        <optgroup label="Rows per page:">
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </optgroup>
                    </Select>
                </Box> 
                <Box display="flex" justifyContent="center">
                    <Typography variant="div" sx={{display: "flex", alignItems: "center", mr: "3ch"}}>Page: {pageNum}</Typography>
                    <Pagination
                        size="large" 
                        page={Number(pageNum)}
                        count={filterSortData?.length}
                        renderItem={(item) => (
                            <PaginationItem
                            component={Link}
                            to={`/Home/${item.page}`}
                            {...item}
                            />
                        )}
                    />
                </Box>
            </Stack>
        </>
    )
}