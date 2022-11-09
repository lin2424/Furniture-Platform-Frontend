import { useContext, useEffect } from "react";
import { UNSAFE_NavigationContext } from "react-router-dom";

export const BasicUrl = 'http://localhost:3500/';
export const ServerURL = 'http://localhost:3500/';
export const paypalClientID = 'AZzClG01L4Awmw1Y-L1rJKSlkDWHWkTUUvaAxvYumOTx-Kj_Lwm7h5Hjt_hpECoBRTvHLjheNaSDFuY7';
export const stripePublishableKey = 'pk_test_51LORkTA8y6PPVv2envxaw3UroDOnSmOghN82rq4SCT7rBo6Ij7ZTeWQdMORFJcNdvXkPH61gHNRMFUcE1PlMitjB00SnronHzb';
export const MY_GOOGLE_MAPS_API_KEY = 'AIzaSyAetD2SNseJTeojDOOW-0qqxWs-tkZ_x6M';

// Navbar + actionBar + promoteBar
export const promotions = "Enjoy Free Shopping on Office Chairs + 0% Financing Available";
export const navbarMenu = ['Office', 'Living', 'Dining', 'Bedroom', 'Outdoor', 'Lighting', 'Accessories', 'Gaming'];

// mainPage    searchTop
export const materialList = ['Fabric (8)', 'Leather (9)', 'Plastic (2)', 'Combination (1)', 'Epic (1)', 'MCL Leather (1)']
export const priceRange = [[0,500], [500,1000], [1000, 1500], [1500, 2000], [2000, 2500], [2500, Infinity]];

// footer
export const arr1 = ['Contact Us', 'FAQ', 'Returns and Exchanges', 'Shipping and Delivery', 'Warranty and Service', 'Assembly Instructions', 'Care and Maintenance', 'Site Feedback', 'Track Your Order', 'Nelson Product Recall', 'Our Response to COVID-19']
export const arr2 = ['For Business']
export const arr3 = ['Find a Retailer', 'Our New York Store']
export const arr4 = ['About Us', 'HermartMiller.com', 'Our Designers', 'Request A Catalog', 'Careers', 'Accessibility Statement', 'Terms of Sale', 'Privacy Notice', 'Cookie Notice', 'Do Not Sell My Information', 'Site Map']

// cart
export const cartHeader = ['Product Information', '', 'Availability', 'Price', 'Quantity', 'Total'];

//keyFeature
export const keyFeature = ['12-Year Warranty', 'Named 100 Best Inventions By Time Magazine In 2019',
    'Auto-Harmonic™ Tilt Mechanism Automatically Adjusts', 'Flexible Frame', 'Continuous And Breathable Seat And Back',
    'One Adjustment For Height','Wrap-Top Facilitates Casual Collaboration','Available In Three Arm Styles: Fixed, Fully Adjustable, And Leaf',
    'Dipped-In-Color Option','Made In Michigan At A 100% Green-Energy Facility',
    'For Questions About Lead Times, In-Stock Options Or Delivery Please Give Usa Call At 888.798.0202.']

//ItemNo
export const ItemNo = 'Item No. FLC142SFPG1G1G1BKS84501';

//DesignedBy
export const DesignedBy = 'Designed by Studio 5.0'

// react hook form

export const useBackListener = (callback) => {
  const navigator = useContext(UNSAFE_NavigationContext).navigator;

  useEffect(() => {
    const listener = ({ location, action }) => {
      if (action === "POP") {
        callback({ location, action });
      }
    };

    const unlisten = navigator.listen(listener);
    return unlisten;
  }, [callback, navigator]);
};