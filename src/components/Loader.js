import React, { useEffect } from 'react';

import { getLoaderImage } from "../utils";

import "../css/Loader.css";

export default function Loader() {
    useEffect( () => {
        let count = 1;
        let loaderImgFronteElem = document.getElementById('loader-front');
        let loaderImgBackeElem = document.getElementById('loader-front');
        let timer = setInterval( () => {
            if(count % 2 === 0){
            } else {
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    })

  return (
    <div className="loaderContainer">
        <div className="cardContainer">
            <div className="card-inner" >
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
