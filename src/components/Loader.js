import React, { useEffect } from 'react';

import { getLoaderImage } from "../utils";

import "../css/Loader.css";

export default function Loader() {
    useEffect( () => {
        let counter = 1;
        let frontImg = "/images/agent-red-1.jpeg";
        let backImg = "/images/agent-blue-1.png";
        let loaderImgFronteElem = document.getElementById('loader-front');
        let loaderImgBackeElem = document.getElementById('loader-back');
        loaderImgFronteElem.src = `${process.env.PUBLIC_URL}${getLoaderImage()}`;
        loaderImgBackeElem.src = `${process.env.PUBLIC_URL}${getLoaderImage()}`;
        let timer = setInterval( () => {
            if(counter % 2 === 0){
                loaderImgFronteElem.src = `${process.env.PUBLIC_URL}${getLoaderImage()}`;
            } else {
                loaderImgBackeElem.src = `${process.env.PUBLIC_URL}${getLoaderImage()}`;
            }
            counter++;
        }, 1500);

        return () => {
            clearInterval(timer);
        }
    })

  return (
    <div className="loaderContainer">
        <div className="loader-cardContainer">
            <div className="loader-inner rotate-card" >
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
