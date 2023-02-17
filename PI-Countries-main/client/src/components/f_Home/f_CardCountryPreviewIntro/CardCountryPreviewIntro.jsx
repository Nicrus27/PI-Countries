import {React} from "react";
import style from './style.module.css';
import { Link } from "react-router-dom";


export default function CardCountryPreviewIntro({img, name, cont, id}){
    return(
        <Link to={`/countries/${id}`} style={{textDecoration: 'none'}}>
            <div className={`${style.card}`}>
            <img src={img} alt={name} className={`${style.img}`}/>
                <div className={`${style.boxTitle}`}>
                    <h1 className={`${style.title}`}>{name}</h1>
                </div>
            </div>
        </Link>
    )
}