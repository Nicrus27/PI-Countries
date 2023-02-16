import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./style.module.css";
import * as actions from '../../Redux/actions';
import { Link } from "react-router-dom";

export default function CreateActivityCard(){
    
    var paisesStore = useSelector(state => state.introCountries);
    var respuestaActivity = useSelector(state => state.activity_msj)
    var [paises, setPaises] = useState([]);
    var [listaPaises, setListaPaises] = useState([]);
    var [activity, setActivity] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: []
    });
    var [llenar, setLlenar] = useState('');
    var [adNombre, setAdNombre] = useState('');
    var [send, setSend] = useState(respuestaActivity);
    var [CNA_msg, setCNA_msg] = useState('')

    const dispatch = useDispatch();

    function elegirPais(e){
        var pais = e.target.value;
        if(!listaPaises.includes(pais)){
            setListaPaises(prev => prev = [...listaPaises, pais])
        } else {
            setListaPaises(prev => prev = listaPaises.filter(pp => pp !== pais))
        }
    }

    function ordenarData(){
        var data = paisesStore[0].map(item => item.name);
        data.sort();
        var ordenado = [];
        data.forEach(item => {
            ordenado.push(paisesStore[0].filter(pp => pp.name === item)[0])
        })
        setPaises(prev => prev = ordenado)
    }

    function writting(e){
        if (e.target.name === 'season'){
            var arr = activity.season;
            var ss = e.target.value;
            if(!arr.includes(ss)){
                arr.push(ss)
            } else {
                arr = arr.filter(i => i !== ss)
            }
            setActivity({
                ...activity,
                [e.target.name]: arr
            })
        } else  {
            setActivity({
                ...activity,
                [e.target.name]: e.target.value
            })
        }
    }

    function checkName(n){
        if(n.length < 2  || n.length > 20){
            return false;
        }
        if((/\d/.test(n))){
            return false
        }
        if ((/\W/.test(n))){
            return false
        }
        return true;
    }

    function noRef(e){
        e.preventDefault();
        var resName = checkName(activity.name);
        if(resName && activity.duration && activity.difficulty && activity.season.length>0){
            dispatch(actions.post_activity({...activity, listaPaises}))
            setListaPaises([]);
            setActivity({
                name: '',
                difficulty: '',
                duration: '',
                season: []
            })
        } else {
            if(!resName){
                setAdNombre('*nombre debe tener entre 2 y 20 caracteres, no llevar simbolos ni numeros y no ser ')
            }
            if(!activity.duration || !activity.difficulty || !activity.season>0){
                setLlenar('*no se pueden enviar campos vacios')
            }
        }
    }

    function CNA(){
        setCNA_msg('Esta accion limpia este formulario para crear la accion. Los datos no guardados se perderan. Desea proseguir?')
    }

    function quedarse(){
        setCNA_msg('')
    }

    function proseguir(){
        setListaPaises([]);
        setActivity({
            name: '',
            difficulty: '',
            duration: '',
            season: []
        });
        setCNA_msg('');
    }

    useEffect(() => {
        if(paisesStore.length === 0){
            dispatch(actions.all_countries())
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setAdNombre('')
        }, 8000);
    }, [adNombre])


    useEffect(() => {
        setTimeout(() => {
            setLlenar('')
        }, 8000);
    }, [llenar])

    useEffect(() => {
        if(paisesStore.length && paisesStore[0].length > 0){
            ordenarData();
        }
    }, [paisesStore])

    useEffect(() => {
        setSend(prev => prev = respuestaActivity)
    }, [respuestaActivity])

    return(
        <div>
            {
                send?
                send
                :
               <div>
                {
                    CNA_msg?
                    <div>
                        <h1>{CNA_msg}</h1>
                        <div>
                            <button onClick={proseguir}>Proseguir</button>
                            <button onClick={quedarse}>Quedarse</button>
                        </div>
                    </div>
                    :
                    <div>
                        <Link to='/home'><button>Home</button></Link>
                        <button onClick={CNA}>Create New Activity</button>
                        <form>
                            <button type='submit' onClick={noRef}>Save Activity</button>
                            <div>{llenar && llenar}</div>
                            <div>
                                <label>Name: </label>
                                <input type='text' name='name' value={activity.name} onChange={writting}/>
                                <div>{adNombre && adNombre}</div>
                            </div>
                            <div>
                                <label>Difficulty: </label>
                                <input type='radio' name='difficulty' value='1' onChange={writting} checked={activity.difficulty === '1'}/>1
                                <input type='radio' name='difficulty' value='2' onChange={writting} checked={activity.difficulty === '2'}/>2
                                <input type='radio' name='difficulty' value='3' onChange={writting} checked={activity.difficulty === '3'}/>3
                                <input type='radio' name='difficulty' value='4' onChange={writting} checked={activity.difficulty === '4'}/>4
                                <input type='radio' name='difficulty' value='5' onChange={writting} checked={activity.difficulty === '5'}/>5
                            </div>
                            <div>
                                <label>Duration: </label>
                                <div>*in hours</div>
                                <div>*0 means it depends on the person</div>
                                <input type='radio' name='duration' value='1' onChange={writting} checked={activity.duration === '1'}/>1
                                <input type='radio' name='duration' value='2' onChange={writting} checked={activity.duration === '2'}/>2
                                <input type='radio' name='duration' value='3' onChange={writting} checked={activity.duration === '3'}/>3
                                <input type='radio' name='duration' value='4' onChange={writting} checked={activity.duration === '4'}/>4
                                <input type='radio' name='duration' value='5' onChange={writting} checked={activity.duration === '5'}/>5
                                <input type='radio' name='duration' value='6' onChange={writting} checked={activity.duration === '6'}/>6
                                <input type='radio' name='duration' value='7' onChange={writting} checked={activity.duration === '7'}/>7
                                <input type='radio' name='duration' value='8' onChange={writting} checked={activity.duration === '8'}/>8
                                <input type='radio' name='duration' value='0' onChange={writting} checked={activity.duration === '0'}/>0
                            </div>
                            <div>
                                <label>Season: </label>
                                <input type='checkbox' name='season' value='Summer' onChange={writting} checked={activity.season.includes('Summer')}/>Summer
                                <input type='checkbox' name='season' value='Autumn' onChange={writting} checked={activity.season.includes('Autumn')}/>Autumn
                                <input type='checkbox' name='season' value='Winter' onChange={writting} checked={activity.season.includes('Winter')}/>Winter
                                <input type='checkbox' name='season' value='Spring' onChange={writting} checked={activity.season.includes('Spring')}/>Spring
                            </div>
                            <div>
                                <label>Country or countries: </label>
                                {
                                    paises.length > 0?
                                    paises.map((item, pos) => {
                                        return <div key={pos}><input type='checkbox' value={item.name} checked={listaPaises.includes(item.name)} onChange={elegirPais}/>{item.name}</div>
                                    })
                                    :
                                    <h3>cargando</h3>
                                }
                            </div>
                        </form>
                    </div>
                }
               </div>
            }
        </div>
    )
}
