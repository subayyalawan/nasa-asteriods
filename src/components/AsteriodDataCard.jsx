import React from "react";

const AsteriodDataCard = (props) => {
//   console.log(props);

  return (
    <div className="AsteriodsDataCard py-1">
      <ul className="flex justify-between py-3 bg-white hover:bg-blue-300 text-sm font-normal text-gray-800 border-gray-800 shadow-sm">
        <li className="w-1/12 px-3">{props.id}</li>
        <li className="w-1/12 px-1">{props.name}</li>
        <li className="w-1/12 px-1">{props.date}</li>
        <li className="w-1/12 px-1">{props.time}</li>
        <li className="w-2/12 px-1">{props.ab_magnitude}</li>
        <li className="w-2/12 px-2">
          {props.max_diameter} - {props.min_diameter}
        </li>
        <li className="w-2/12 px-3">{props.rel_velocity}</li>
        <li className="w-1/12 px-1 text-center">{props.hazard? "oy" : "bello" }</li>
        <li className="w-2/12 px-1 text-center">Add to fav</li>
      </ul>
    </div>
  );
};

export default AsteriodDataCard;
