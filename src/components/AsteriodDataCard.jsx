import React, {useState} from "react";
import { faHeart as heartRegular} from "@fortawesome/free-regular-svg-icons";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const AsteriodDataCard = (props) => {

  const [isFav, setIsFav] = useState(false)
  console.log(props.isFav)

  const setFavAsteriods = () => {
    setIsFav((isFav) => !isFav)
  }
  // const handleEditBtn = () => {
  //   setIsEditing((isEditing) => !isEditing);
  // };
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
        <li className="w-1/12 px-1 text-center">{props.hazard? "Yes" : "No" }</li>
        <li className="w-2/12 px-1 flex items-center justify-center" onClick={setFavAsteriods}><FontAwesomeIcon className="text-xl text-gray-800" icon={isFav? heartSolid : heartRegular} /></li>
      </ul>
    </div>
  );
};

export default AsteriodDataCard;
