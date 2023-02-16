import React from "react";

export function DetailActivities({name, season, duration, difficulty}){


    return (
        <div>
            <h3>{name}</h3>
            <h3>{difficulty}</h3>
            <h3>{duration}</h3>
            <ul>
                {
                    season.map((item, pos) => {
                        <li key={pos}>{item}</li>
                    })
                }
            </ul>
        </div>
    )
}