import {React, useEffect, useState} from "react";
import { useSelector } from "react-redux";
//import * as actions from "../../../Redux/actions";
import CardCountryPreviewName from "../f_CardCountryPreviewName/CardCountryPreviewName";
import style from "./style.module.css";

/*
BOTONES:

_filtrar por tipo de actividad turistica
*/

export default function CardByName(){

    var paisesStore = useSelector(state => state.searchedByName);
    var [paises, setPaises] = useState([]); //data con paises, a mostrarse con o sin filtrado por parte del usuario
    var [mostrarBotones, setMostrarBotones] = useState(false); //prepara la disponibilidad del boton "filtro"
    var [filtro, setfiltro] = useState(false); //muestra los botones filtro cuando esten disponibles
    var [b_cont, setB_cont] = useState([]); //array para crear botones de filtro por continente 
    var [cont_a, setCont_a] = useState('All'); //continente activo en filtro
    var [botonesPaginado, setBotonesPaginado] = useState([]); //se guardan los array que forman los datos para botones de paginado
    var [mostrarPagina, setMostrarPagina] = useState([]); //esta pagina muestra los paises que pertenecen a esta
    var [paginaActual, setPaginaActual] = useState('');
    var [act_b, setAct_b] = useState([]); 
    var [c_act, setC_act] = useState('none');

    function takeC(arr){
        let res = ['All']
        arr.every(item => {
            if (!res.includes(item.continent)){
                res.push(item.continent)
            }
            if(res.length === 8){
                return false;
            }
            return true;
        })
        setB_cont(res);
    }

    function activityButtons(arr){
        let res = ['none'];
        arr.forEach(item => {
            if(item.act.length > 0){
                item.act.forEach(i => {
                    if(!res.includes(i.name)){
                        res.push(i.name)
                    }
                })
            }
        })
        setAct_b(res);
    }

    function toggleFiltro(){
        setfiltro(prev => prev = !filtro)
    }

    function filter_cont(e){
        var cont = e.target.value;
        setCont_a(prev => prev = cont)
        if(cont === 'All'){
            setPaises(prev => prev = paisesStore[0])
        } else {
            setPaises(paisesStore[0].filter(c => c.continent === cont))
        }
    }

    function filter_act(e){
        var act = e.target.value;
        setC_act(act);
        if(act === 'none'){
            setPaises(prev => prev = paisesStore[0])
        } else {
            var buscar = [];
            paisesStore[1].forEach(item => {
                item.act.forEach((i) => {
                    if(i.name === act){
                        buscar.push(paisesStore[0].filter(cc => cc.name === item.name)[0])
                    }
                })
            })
            setPaises(prev => prev = buscar)
        }

    }

    function toggleAZ(e){
        var orden = e.target.value;
        var data = paises.map(item => item.name);
            data.sort();
            var ordenado = [];
            data.forEach(item => {
                ordenado.push(paises.filter(pp => pp.name === item)[0])
            })
            if(orden === 'Az'){
                setPaises(prev => prev = ordenado);
            } else if(orden === 'Za'){
                ordenado = ordenado.reverse()
                setPaises(prev => prev = ordenado);
            }
        
    }

    function compararOBJ(a, b){
        if (a.p !== b.p){
            return a.p - b.p
        } else {
            if (a.n < b.n) return -1
            if (b.n < a.n) return 1
        }
    }

    function toggle_P(e){
        var pob = e.target.value;
        var data = paises.map(item => {
            return {
                p: item.population,
                n: item.name
            }
        })
        data.sort(compararOBJ)
        var ordenado = [];
        data.forEach(item => ordenado.push(paises.filter(pp => pp.name === item.n)[0]))
        if(pob === '-P'){
            setPaises(prev => prev = ordenado);
        } else if(pob === '+P'){
            ordenado = ordenado.reverse();
            setPaises(prev => prev = ordenado);
        }
    }

    function botonesDePaginado(){
        var tam = paises.length;
        var array = []
        if(tam !== 0){
            if(tam <= 9){
                if(tam === 1){
                    array = [[0]];
                } else {
                    array = [[0, tam-1]];
                }
            } else {
                array = [[0, 8]];
                var botones = Math.ceil((tam-9)/10);
                var siguiente = 9;
                for (var i = 1; i <= botones; i++){
                    if(i === botones){
                        if(siguiente === tam-1){
                            array.push([siguiente]);
                        } else {
                            array.push([siguiente, tam-1])
                        }
                    } else {
                        array.push([siguiente, siguiente+9]);
                    }
                    siguiente += 10;
                }
            }
            setBotonesPaginado(prev => prev = array);
        }
    }

    function seleccionarPagina(e){
        var pos = e.target.value;
        let tam = botonesPaginado[pos];
        if(tam.length === 2){
            setMostrarPagina(paises.slice(tam[0], tam[1]+1));
        } else {
            setMostrarPagina([paises[tam[0]]]);
        }
        setPaginaActual(pos)
    }

    function ccc(e){
        var a = e.target.value;
        console.log(a);
        console.log(typeof a);
    }

    useEffect(() => {
        
        if(paisesStore.length && paisesStore[0].length > 0){
            setPaises(paisesStore[0])
            setMostrarBotones(true);
            takeC(paisesStore[0]);
            setCont_a(prev => prev = 'All')
            activityButtons(paisesStore[1])
        } else {
            setMostrarBotones(false)
        }
    }, [paisesStore])

    useEffect(() => {
        if(paises.length > 0){
            botonesDePaginado()
        } else {
            setBotonesPaginado([])
        }
    }, [paises])

    
    useEffect(() => {
        
        var tamB = [];
        if(botonesPaginado.length>0){
            tamB = botonesPaginado[0];
            if(tamB.length === 2){
                setMostrarPagina(paises.slice(tamB[0], tamB[1]+1));
            } else {
                setMostrarPagina([paises[0]]);
            }
            setPaginaActual(1)
        } else {
            setMostrarPagina([])
            setPaginaActual('')
        }
    }, [botonesPaginado])
    

    //console.log('p1', paisesStore);
    //console.log('p2', mostrarPagina);
    //className={`${style.box}`}
    return(
        <div >
            <div>
                <div>
                    {
                        mostrarBotones &&
                        <button onClick={toggleFiltro} className={`${style.boton}`}>Filters</button>
                    }
                </div>
                <div className={`${style.filter}`}>
                    <div>
                        {/*botones filtro por continente "falta por actividad"*/
                            filtro &&
                            
                            b_cont.map((item, pos) => 
                                <div key={pos} className={`${style.radio}`}>
                                    <input type="radio" id={item} value={item} name="continente_seleccionado" onChange={filter_cont} checked={cont_a === item}/>
                                    <label htmlFor={item}>{item}</label>
                                </div>
                                )
                        }
                    </div>
                    <div>
                        {/*botones orden por alfabeto o poblacion */
                            filtro && 
                                <div>
                                    <button onClick={toggleAZ} className={`${style.boton}`} value="Az">Az</button>
                                    <button onClick={toggleAZ} className={`${style.boton}`} value="Za">Za</button>
                                </div>
                        }
                    </div>
                        {
                            paginaActual &&
                            <div className={`${style.boton2}`}>
                                Page: {paginaActual}
                            </div>
                        }
                    <div>
                        {/*botones orden por alfabeto o poblacion */
                            filtro && 
                                <div>
                                    <button onClick={toggle_P} className={`${style.boton}`} value="+P">+P</button>
                                    <button onClick={toggle_P} className={`${style.boton}`} value="-P">-P</button>
                                </div>
                        }
                    </div>
                    <div>
                        { //filtro actividades
                            (filtro && act_b.length) &&
                            act_b.map((item, pos) => 
                                <div key={pos} className={`${style.radio}`}>
                                    <input type="radio" id={item} value={item} name="actividad_seleccionada" onChange={filter_act} checked={c_act === item}/>
                                    <label>{item}</label>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div>
                        {//botones paginado
                        
                            filtro &&
                            botonesPaginado.map((item, pos) => <button key={pos} value={pos} onClick={seleccionarPagina} className={`${style.boton}`}>{pos+1}</button>)
                            
                        }
                    </div>
            <div className={`${style.box}`}>
                {/*paises buscados*/
                    paises.length > 0 &&
                    mostrarPagina.map(item =>
                        <CardCountryPreviewName
                            key={item.id}
                            id={item.id}
                            img={item.flag}
                            name={item.name}
                            cont={item.continent}
                            pob={item.population}
                        />
                    )
                }
            </div>
            <div>
                        {//botones paginado
                        
                            filtro &&
                            botonesPaginado.map((item, pos) => <button key={pos} value={pos} onClick={seleccionarPagina} className={`${style.boton}`}>{pos+1}</button>)
                            
                        }
                    </div>
        </div>
    )
}

/*
:
<h2>cargando</h2>
*/