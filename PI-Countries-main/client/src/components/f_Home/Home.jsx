import {React} from "react";
import SearchBar from './f_SearchBar/SearchBar';
import IntroCountries from "./f_IntroCountries/IntroCountries";
import CardByName from "./f_CardByName/CardByName";
import { Link } from "react-router-dom";
import style from './style.module.css'

export default function Home(){

    return(
        <div>
            <div className={`${style.main}`}>
                <Link to='/home' style={{textDecoration: 'none'}} className={`${style.home}`}>Home</Link>
                <SearchBar/>
                <Link to='/createActivity' className={`${style.act}`} style={{textDecoration: 'none'}}>Create Activity</Link>
            </div>
            <CardByName/>
            <IntroCountries/>
        </div>
    )
}