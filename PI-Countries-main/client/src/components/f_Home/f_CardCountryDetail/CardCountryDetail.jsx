import {React, useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../Redux/actions";
import { useParams } from "react-router-dom";
import { DetailActivities } from "./f_DetailActivities/DetailActivities";
import { Link } from "react-router-dom";


export default function CardCountryDetail(){

    const {id} = useParams();
    var detalles = useSelector(state => state.searchedById)
    const dispatch = useDispatch();
    var [det, setDet] = useState(detalles);

    useEffect(() => {
        dispatch(actions.searchById(id));
    }, [])

    useEffect(() => {
        setDet(detalles);
    }, [detalles])

    useEffect(() => {
        return () => {
            dispatch(actions.clearIdSearch())
        }
    }, [])

    return(
        <div>
            <Link to='/home'><button>Home</button></Link>
            {
                det.name?
                <div>
                    <img src={det.flag} alt={det.name}/>
                    <h1>{det.name}</h1>
                    <h2>Codigo de pais: {det.id}</h2>
                    <h2>Continente: {det.continent}</h2>
                    <h2>Capital: {det.capital}</h2>
                    <h2>Subregion: {det.subregion}</h2>
                    <h2>Area: {det.area}</h2>
                    <h2>Poblacion: {det.population}</h2>
                    <div>
                        <h1>Activities</h1>
                        {
                            det.acts?
                            det.acts.map(item => {
                                return(
                                    <DetailActivities
                                        key={item.name}
                                        name={item.name}
                                        season={item.season}
                                        duration={item.duration}
                                        difficulty={item.difficulty}
                                    />
                                )
                            })
                            :
                            'No activities found'
                        }
                    </div>
                </div>
                :
                <h3>cargando</h3>
            }
        </div>
    )
}