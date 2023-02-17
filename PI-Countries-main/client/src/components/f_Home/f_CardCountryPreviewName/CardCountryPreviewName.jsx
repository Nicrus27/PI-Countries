import {React} from "react";
import { Link } from "react-router-dom";
import style from './style.module.css';

//NOTA: HACERLE EL CSS

export default function CardCountryPreviewName({img, name, cont, id, pob}){
    
    return(
        <Link to={`/countries/${id}`} style={{textDecoration: 'none'}}>
            <div className={`${style.card}`}>
                <img src={img} alt={name} className={`${style.img}`}/>
                <div className={`${style.datos}`}>
                    <h2 className={`${style.txt}`}>Country: {name}</h2>
                    <h3 className={`${style.txt}`}>Continent: {cont}</h3>
                    <h3 className={`${style.txt}`}>Population: {pob}</h3>
                </div>
            </div>
        </Link>
    )
}

//CardCountryPreviewName