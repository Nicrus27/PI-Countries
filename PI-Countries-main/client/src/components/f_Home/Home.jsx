import {React} from "react";
import SearchBar from './f_SearchBar/SearchBar';
import IntroCountries from "./f_IntroCountries/IntroCountries";
import CardByName from "./f_CardByName/CardByName";
import { Link } from "react-router-dom";

export default function Home(){

    return(
        <div>
            <Link to='/home'><button>Home</button></Link>
            <Link to='/createActivity'><button>Create Activity</button></Link>
            <SearchBar/>
            <CardByName/>
            <IntroCountries/>
        </div>
    )
}