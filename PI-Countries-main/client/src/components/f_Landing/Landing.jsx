import {React} from "react";
import { Link } from "react-router-dom";
import style from './style.module.css';

export default function Landing(){
    return(
        <div>
            <Link to='/home'><button>Entrar</button></Link>
        </div>
    )
}