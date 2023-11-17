import React from "react";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Favourite = ({ favApiData }) => {
  console.log(favApiData);
  return (
    <div className="py-4">
      {favApiData && favApiData.length > 0 ? (
        <>
        {/* for fav data head */}
        <h2 className="text-2xl text-gray-500 font-semibold text-center">Favourite Asteriods</h2>
          <div className="fav-upper flex justify-center">
            <ul className="w-6/12 flex justify-between">
              <li className="w-4/12 px-3">ID</li>
              <li className="w-4/12 px-1">Name</li>
              <li className="text-center w-4/12 px-1">Remove From Favorite</li>
            </ul>
          </div>
          
          {/* for Favorite data mapping */}
          <div className="fav-lower">
            <div className="w-6/12 mx-auto">
              {favApiData.map((data, index) => {
                return (
                  <div className="py-1">
                    <ul className="flex justify-between py-3 bg-white hover:bg-blue-300 text-sm font-normal text-gray-800 border-gray-800 border border-opacity-30 shadow-sm rounded" key={index}>
                      <li className="w-4/12 px-3">{data.id}</li>
                      <li className="w-4/12 px-1">{data.name}</li>
                      <li className="flex justify-center items-center w-4/12 px-1">
                        <FontAwesomeIcon icon={heartSolid} className="text-xl text-gray-800"/>
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        // for when there is no data in the fav data
        <div className="flex justify-center">
          <h2 className="text-2xl text-gray-500 font-semibold">
            No Favourite Asteriods Found Yet
          </h2>
        </div>
      )}
    </div>
  );
};

export default Favourite;
