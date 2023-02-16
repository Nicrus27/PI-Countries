import { ALL_COUNTRIES, SEARCHBYNAME, SEARCHBYID, POST_ACTIVITY, CLEAR_ID_SEARCH } from "./actions";

const initialState = {
    introCountries: [],
    searchedByName: [],
    searchedById: {},
    activity_msj: '',
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case ALL_COUNTRIES:
            return {
                ...state,
                introCountries: action.payload
            }
        case SEARCHBYNAME:
            return {
                ...state,
                searchedByName: action.payload
            }
        case SEARCHBYID:
            return {
                ...state,
                searchedById: action.payload
            }
        case POST_ACTIVITY:
            return {
                ...state,
                activity_msj: action.payload
            }
        case CLEAR_ID_SEARCH:
            return {
                ...state,
                searchedById: {}
            }
        default:
            return state
    }
}