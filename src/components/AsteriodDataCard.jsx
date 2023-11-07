import React from 'react'

const AsteriodDataCard = (props) => {
  return (
    <div className="AsteriodsDataCard">
        <p>{props.id}</p>
        <p>{props.name}</p>
        <p>{props.closest_approach}</p>
        <p>{props.time}</p>
        <p>{props.ab_magnitude}</p>
        <p>{props.min_diameter} - {props.max_diameter}</p>
        <p>{props.rel_velocity}</p>
        <p>{props.hazard}</p>
    </div>
  )
}

export default AsteriodDataCard