import {React, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../../Redux/actions";
import CardCountryPreviewIntro from "../f_CardCountryPreviewIntro/CardCountryPreviewIntro";
import style from "./style.module.css";

/*
Notas:

_APARTE DE PONERLE UN BUEN CSS
*/

export default function IntroCountries(){

    const dispatch = useDispatch();
    
    var paises = useSelector(state => state.introCountries);

    useEffect(() => {
        dispatch(actions.all_countries())
    }, [])
    
    return(
        <div className={`${style.box}`}>
            {
                paises.length ?
                paises[0].slice(0, 10).map(item => 
                    <CardCountryPreviewIntro
                        key={item.id}
                        id={item.id}
                        img={item.flag}
                        name={item.name}
                        cont={item.continent}
                    />
                )
                :
                <h3>desactivado</h3> //cargando
            }
        </div>
    )
}