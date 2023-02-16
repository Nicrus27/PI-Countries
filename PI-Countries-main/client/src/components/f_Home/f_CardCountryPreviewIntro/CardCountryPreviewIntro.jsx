import {React} from "react";
import style from './style.module.css';
import { Link } from "react-router-dom";


export default function CardCountryPreviewIntro({img, name, cont, id}){

    return(
        <Link to={`/countries/${id}`}>
            <div className={`${style.card}`}>
                <img src={img} alt={name} className={`${style.img}`}/>
                <div>
                    <h1>{name}</h1>
                </div>
                <div>
                    <h2>{cont}</h2>
                </div>
            </div>
        </Link>
    )
}