import {React} from "react";
import { Link } from "react-router-dom";
import style from './style.module.css';

//NOTA: HACERLE EL CSS

export default function CardCountryPreviewName({img, name, cont, id}){
    
    return(
        <Link to={`/countries/${id}`}>
            <div className={`${style.card}`}>
                <img src={img} alt={name} className={`${style.img}`}/>
                <div>
                    <h2>{name}</h2>
                </div>
                <div>
                    <h2>{cont}</h2>
                </div>
            </div>
        </Link>
    )
}

//CardCountryPreviewName