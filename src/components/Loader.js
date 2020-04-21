import React, { useEffect } from 'react';

import { getLoaderImage } from "../utils";

import "../css/Loader.css";

export default function Loader() {
    useEffect( () => {
        let counter = 1;
        let loaderImgFronteElem = document.getElementById('loader-front');
        let loaderImgBackeElem = document.getElementById('loader-back');
        let loaderInnerElem = document.getElementById('loader-inner');
        loaderImgFronteElem.src = `${process.env.PUBLIC_URL}${getLoaderImage()}`;
        loaderImgBackeElem.src = `${process.env.PUBLIC_URL}${getLoaderImage()}`;
        loaderInnerElem.classList.add('rotate-card0');
        let timer = setInterval( () => {
            if(counter === 0){
                loaderInnerElem.classList.toggle('rotate-card0');
                loaderInnerElem.classList.toggle('rotate-card3');
            } else if(counter === 1){
                loaderImgFronteElem.src = `${process.env.PUBLIC_URL}${getLoaderImage()}`;
                loaderInnerElem.classList.toggle('rotate-card1');
                loaderInnerElem.classList.toggle('rotate-card0');
            } else if (counter === 2){
                loaderInnerElem.classList.toggle('rotate-card2');
                loaderInnerElem.classList.toggle('rotate-card1');
            }else{
                loaderImgBackeElem.src = `${process.env.PUBLIC_URL}${getLoaderImage()}`;
                loaderInnerElem.classList.toggle('rotate-card3');
                loaderInnerElem.classList.toggle('rotate-card2');
            }
            counter = counter > 2 ? 0 : counter += 1;
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    })

  return (
    <div className="loaderContainer">
        <div className="loader-cardContainer">
            <div 
                id="loader-inner"
                className="loader-inner" >
                <img
                    id="loader-front"
                    src=""
                    alt="pick result"
                    className="card-front"
                    />
                <img
                    id="loader-back"
                    src=""
                    alt="pick result"
                    className="card-back"
                    />
            </div>
        </div>
    </div>
  );
}
