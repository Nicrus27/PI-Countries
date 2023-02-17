import {React, useState} from "react";
import { useDispatch } from "react-redux";
import * as actions from '../../../Redux/actions';
import style from './style.module.css';

export default function SearchBar(){

    var [pais, setPais] = useState('');
    const dispatch = useDispatch();

    function dataPais(e){
        setPais(prev => prev = e.target.value)
    }

    function noRefresh(e){
        e.preventDefault();
        dispatch(actions.searchByName(pais))
    }

    return(
        <div className={`${style.box}`}>
            <form onSubmit={noRefresh} className={`${style.form}`}>
                <input
                    placeholder="lugar en mente...?"
                    value={pais}
                    onChange={dataPais}
                    className={`${style.barra}`}
                />
                <button type="submit" className={`${style.boton}`}>Search</button>
            </form>
        </div>
    )
}