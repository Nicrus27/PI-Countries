import React from "react";
import style from "./style.module.css"

export function DetailActivities({name, season, duration, difficulty}){

    return (
        <div className={`${style.box}`}>
            <h2>Activity's Name: </h2><h3>{name}</h3>
            <h2>Difficulty: </h2><h3>{difficulty}</h3>
            <h2>Duration: </h2><h3>{ duration === 0 ? 'Up to the traveler' : duration}</h3>
            <h2>Season/s:</h2>
            <div>
                {
                    season.map((item, pos) => <h3 key={pos}>{item}</h3>)
                }
            </div>
            
        </div>
    )
}