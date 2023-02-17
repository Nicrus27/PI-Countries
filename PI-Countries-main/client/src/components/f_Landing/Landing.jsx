import {React} from "react";
import { Link } from "react-router-dom";
import style from './style.module.css';

export default function Landing(){
    return(
        <div className={`${style.box}`}>
            <h1 className={`${style.wel}`}>Welcome a new destination...</h1>
            <Link to='/home'><button className={`${style.enter}`}>Enter</button></Link>
        </div>
    )
}