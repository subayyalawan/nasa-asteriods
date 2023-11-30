import React from "react";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Favourite = (props) => {
  return (
    <div className="py-1">
      <ul className="flex justify-between py-3 bg-white hover:bg-blue-300 text-sm font-normal text-gray-800 border-gray-800 border border-opacity-30 shadow-sm rounded cursor-pointer">
        <li className="w-4/12 px-3" onClick={props.makeSingleId}>{props.id}</li>
        <li className="w-4/12 px-1">{props.name}</li>
        <li className="flex justify-center items-center w-4/12 px-1">
          <FontAwesomeIcon
            icon={heartSolid}
            onClick={props.removeFavAsteriod}
            className="text-xl text-gray-800"
          />
        </li>
      </ul>
    </div>
  );
};

export default Favourite;
