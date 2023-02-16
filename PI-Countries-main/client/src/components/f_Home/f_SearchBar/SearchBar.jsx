import {React, useState} from "react";
import { useDispatch } from "react-redux";
import * as actions from '../../../Redux/actions';

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
        <div>
            <form onSubmit={noRefresh}>
                <input
                    placeholder="lugar en mente...?"
                    value={pais}
                    onChange={dataPais}
                />
                <button type="submit">Buscar</button>
            </form>
        </div>
    )
}