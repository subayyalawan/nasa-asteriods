import React from "react";

const AsteriodsData = (props) => {
  return (
    <>
      {props.apiError ? (
        <h2 className="text-2xl font-semibold text-gray-500 text-center">{props.apiError}</h2>
      ) : (
        <>
          <div className="dataHead py-5">
            <ul className="flex justify-center items-center text-gray-500  text-sm font-semibold">
              <li className="w-1/12 px-3">ID</li>
              <li className="w-1/12 px-1">Name</li>
              <li className="w-1/12 px-1">Date</li>
              <li className="w-1/12 px-1">Time</li>
              <li className="w-2/12 px-1">Ab Magnitude</li>
              <li className="w-2/12 px-2 flex justify-start items-center">
                <p>Min - Max Est Diamater</p>
                <select name="diameter" className="p-1 ml-3">
                  <option value="km">Kilo Meters</option>
                  <option value="meters">Meters</option>
                  <option value="miles">Miles</option>
                  <option value="Feets">Feets</option>
                </select>
              </li>
              <li className="w-2/12 px-2 flex justify-start items-center">
                <p>Relative Velocity</p>
                <select name="velocity" className="p-1 ml-3">
                  <option value="km/s">KM/sec</option>
                  <option value="km/h">KM/Hour</option>
                  <option value="m/h">Miles/Hours</option>
                </select>
              </li>
              <li className="w-1/12 px-1 text-center">Hazard</li>
              <li className="w-2/12 px-1 text-center">Add To Favourite</li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default AsteriodsData;
