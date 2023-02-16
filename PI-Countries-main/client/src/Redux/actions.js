import axios from "axios";

export const ALL_COUNTRIES = "ALL_COUNTRIES";
export const SEARCHBYNAME = "SEARCHBYNAME";
export const SEARCHBYID = "SEARCHBYID";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const CLEAR_ID_SEARCH = "CLEAR_ID_SEARCH";

export function all_countries(){
    return function(dispatch){
        return axios.get("http://localhost:3001/countries")
            .then(r => r.data)
            .then(data => dispatch({
                type: ALL_COUNTRIES,
                payload: data
            }))
            .catch(err => console.log('error en action ', ALL_COUNTRIES, err))
    }
}

export function searchByName(busqueda){
    return function(dispatch){
        return axios.get(`http://localhost:3001/countries?name=${busqueda}`)
            .then(r => r.data)
            .then(data => dispatch({
                type: SEARCHBYNAME,
                payload: data
            }))
            .catch(err => {
                console.log('error en action ', SEARCHBYNAME, err) //err.response.data
                dispatch({
                    type: SEARCHBYNAME,
                    payload: []
                })
            })
    }
}

export function searchById(id){
    return function(dispatch){
        return axios.get(`http://localhost:3001/countries/${id}`)
            .then(r => r.data)
            .then(data => {
                dispatch({
                type: SEARCHBYID,
                payload: data
            })})
            .catch(err => console.log('error en action ', SEARCHBYID, err))
    }
}

export function post_activity(act){ //acordarse de chequear la respuesta del server!!!
    return function(dispatch){
        return axios.post('http://localhost:3001/activities', act)
            .then(r => r.data)
            .then(data => {
                dispatch({
                    type: POST_ACTIVITY,
                    payload: data
                })
                setTimeout(() => {
                    dispatch({
                        type: POST_ACTIVITY,
                        payload: ''
                    })  
                }, 2500);
            })
            .catch(err => {
                console.log('error en action ', POST_ACTIVITY, err);
                dispatch({
                    type: POST_ACTIVITY,
                    payload: 'A ocurrido un error inesperado O.o'
                })
            })
    }
}

export function clearIdSearch(){
    return {
        type: CLEAR_ID_SEARCH,
    }
}

