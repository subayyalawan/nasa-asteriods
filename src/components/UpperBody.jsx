import React, { useEffect, useState } from "react";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { get } from "./Api";
import Loader from "../assets/loader.gif";
import AsteriodDataCard from "./AsteriodDataCard";
import Favourite from "./Favourite";
import axios from "axios";

const Body = () => {
  const [date, setDate] = useState({
    StartDate: "",
    EndDate: "",
  });
  const [validDateErr, setValidDateError] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showData, setShowData] = useState(false);
  // const [isFav, setIsFav] = useState(false)

  const validDateRange = () => {
    if (date.StartDate && date.EndDate) {
      const startDate = new Date(date.StartDate);
      const endDate = new Date(date.EndDate);
      const timeDifference = Math.abs(endDate - startDate);
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      if (daysDifference <= 7) {
        setValidDateError(false);
        setIsLoading(true);
        fetchApiData();
        setShowData(false);
      } else {
        setValidDateError(true);
        setShowData(false);
      }
    }
  };

  const fetchApiData = async () => {
    try {
      const resp = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date.StartDate}&end_date=${date.EndDate}&api_key=LUBRc5fkhGMCDFt1fkCrDBdSdspPwoWlZeGHXfru`
        // `start_date=2023-10-03&end_date=2023-10-04&api_key=LUBRc5fkhGMCDFt1fkCrDBdSdspPwoWlZeGHXfru`
      );

      const combinedData = Object.keys(resp.data.near_earth_objects).reduce(
        (acc, dateKey) => [...acc, ...resp.data.near_earth_objects[dateKey]],
        []
      );

      // setApiData(resp.data.near_earth_objects);
      setApiData(combinedData);
      console.log(apiData.length);
      setIsLoading(false);
      setShowData(true);
    } catch (error) {
      setApiError(error.error_message);
      setShowData(false);
    }
  };

  const handleFav = () => {};

  useEffect(() => {
    validDateRange();
    setTimeout(() => {
      setValidDateError(false);
    }, 3200);
  }, [date.StartDate, date.EndDate]);

  return (
    <>
      <div className="MainBody pt-[68px] pb-4 px-8">
        {/* For Upper Body with date selector */}
        <div className="upperBody flex justify-between items-center py-5">
          <h2 className="text-2xl font-semibold text-gray-500 capitalize">
            {apiData.length == 0
              ? "Search Nearest Asteriods"
              : `${apiData.length} Nearest Asteriods as per their closest Approach`}
          </h2>

          <form className="flex" onSubmit={(e) => e.preventDefault()}>
            <div className="pl-2">
              <label
                htmlFor="asteriod-id"
                className="capitalize block text-gray-500 px-2 text-base font-semibold"
              >
                Enter Asteriod Id
              </label>
              <input
                className="p-3 font-sans font-semibold outline-none rounded border "
                type="number"
                placeholder="1234"
              />
            </div>

            <div className="pl-2">
              <label
                htmlFor="start-date"
                className="capitalize block text-gray-500 px-2 text-base font-semibold"
              >
                Start Date
              </label>
              <input
                className="p-3 font-sans font-semibold outline-none rounded border "
                type="date"
                name="start-date"
                value={date.StartDate}
                onChange={(e) =>
                  setDate({ ...date, StartDate: e.target.value })
                }
              />
            </div>

            <div className="pl-2">
              <label
                htmlFor="end-date"
                className="capitalize block text-gray-500 px-2 text-base font-semibold"
              >
                Start Date
              </label>
              <input
                className="p-3 font-sans font-semibold outline-none rounded border "
                type="date"
                name="end-date"
                value={date.EndDate}
                onChange={(e) => setDate({ ...date, EndDate: e.target.value })}
              />
            </div>
          </form>
        </div>

        {/* For error in date validation */}
        <div>
          {validDateErr ? (
            <div className="errorMsg py-4 px-2 fixed -right-0 top-12 bg-transparent-red-600 hover:bg-red-600 text-white w-80 flex items-center justify-between">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="w-1/5 text-2xl"
              />
              <div className="w-4/5">
                <h2 className="text-xl">Alert</h2>
                <p>please Enter Valid Input in the fields</p>
              </div>
            </div>
          ) : null}
        </div>

        {/* For api data fetching loader */}
        <div>
          {isLoading ? (
            <div className="fixed top-0 right-0 w-full h-screen bg-transparent-black flex items-center justify-center">
              <img src={Loader} alt="Loading" className="w-1/12" />
            </div>
          ) : null}
        </div>

        {/* to show API data on the page */}
        <div>
          {showData ? (
            <>
              {props.apiError ? (
                <h2 className="text-2xl font-semibold text-gray-500 text-center">
                  {props.apiError}
                </h2>
              ) : (
                <div>
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
                          <option value="miles/h">Miles/Hours</option>
                        </select>
                      </li>
                      <li className="w-1/12 px-1 text-center">Hazard</li>
                      <li className="w-2/12 px-1 text-center">
                        Add To Favourite
                      </li>
                    </ul>
                  </div>

                  {props.apiData.map((data, index) => {
                    return (
                      <AsteriodDataCard
                        key={index}
                        id={data.id}
                        name={data.name}
                        date={data.close_approach_data[0].close_approach_date}
                        time={
                          data.close_approach_data[0].close_approach_date_full
                        }
                        ab_magnitude={data.absolute_magnitude_h}
                        max_diameter={
                          data.estimated_diameter.kilometers
                            .estimated_diameter_max
                        }
                        min_diameter={
                          data.estimated_diameter.kilometers
                            .estimated_diameter_min
                        }
                        rel_velocity={
                          data.close_approach_data[0].relative_velocity
                            .kilometers_per_second
                        }
                        hazard={data.is_potentially_hazardous_asteroid}
                      />
                    );
                  })}
                </div>
              )}
            </>
          ) : null}
        </div>

        {/* to add favourite asteriods */}
        <div>
          <Favourite />
        </div>
      </div>
    </>
  );
};

export default Body;
