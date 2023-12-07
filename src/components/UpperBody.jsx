import React, { useEffect, useState, useRef } from "react";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../assets/loader.gif";
import AsteriodDataCard from "./AsteriodDataCard";
import Favourite from "./Favourite";
import axios from "axios";

const Body = ({ userEmail }) => {
  const [date, setDate] = useState({
    StartDate: "",
    EndDate: "",
  });
  const [validDateErr, setValidDateError] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showData, setShowData] = useState(false);

  // const [favApiData, setFavApiData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [matchedData, setMatchedData] = useState([]);

  const [diamater, setDiameter] = useState("km");
  const [velocity, setVelocity] = useState("km/s");

  const [isSingleID, setIsSingleID] = useState(false);
  const [totalLength, setTotalLength] = useState(0);
  const [searchId, setSearchId] = useState("");

  const searchInputRef = useRef(null);

  const validDateRange = () => {
    if (date.StartDate && date.EndDate) {
      // &&date.EndDate >= date.StartDate
      const startDate = new Date(date.StartDate);
      const endDate = new Date(date.EndDate);
      if (endDate < startDate) {
        setValidDateError(true);
        setShowData(false);
        return;
      }
      const timeDifference = Math.abs(endDate - startDate);
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      if (daysDifference <= 7) {
        setValidDateError(false);
        setIsLoading(true);
        fetchApiData();
        setShowData(false);
        setIsSingleID(false);
      } else {
        setValidDateError(true);
        setShowData(false);
      }
    } else if (date.EndDate) {
      setValidDateError(true);
      setShowData(false);
      return;
    }
  };

  const fetchApiData = async () => {
    await axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date.StartDate}&end_date=${date.EndDate}&api_key=LUBRc5fkhGMCDFt1fkCrDBdSdspPwoWlZeGHXfru`
        // `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date.StartDate}&end_date=${date.EndDate}&api_key=5xlaqIKHGj8Ucgg98bDbkfP5vI5p7K5yhYqg0FfO`
      )
      .then((resp) => {
        const combinedData = Object.keys(resp.data.near_earth_objects).reduce(
          (acc, dateKey) => [...acc, ...resp.data.near_earth_objects[dateKey]],
          []
        );
        setTotalLength(combinedData.length);
        setApiData(combinedData);
        setIsLoading(false);
        setShowData(true);
      })
      .catch((err) => {
        setApiError(err.error_message);
        setShowData(false);
      });
  };

  useEffect(() => {
    favApiFetch();
    validDateRange();
    setTimeout(() => {
      setValidDateError(false);
    }, 3200);
  }, [date.StartDate, date.EndDate, userEmail]);

  const addFavAsteriod = async (data) => {
    const dataToAdd = {
      email: userEmail,
      asteriodName: data?.name,
      asteriodId: data?.id,
    };
    await axios.post(`http://localhost:3500/users`, dataToAdd);
    await favApiFetch();
  };

  const handleRemoveFav = (asteriodId) => {
    favApiFetch();
    const matchedVal = matchedData.filter((data) => {
      return data.asteriodId === asteriodId;
    });
    removeFavAsteriod(matchedVal[0].id);
  };

  const removeFavAsteriod = async (dataID) => {
    await axios.delete(`http://localhost:3500/users/${dataID}`);
    await favApiFetch();
  };

  const favApiFetch = async () => {
    await axios
      .get(`http://localhost:3500/users/`)
      .then((resp) => {
        const fetchedData = resp.data.filter((data) => {
          return data.email === userEmail;
        });
        setMatchedData(fetchedData);
        setFavorites(fetchedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeSingleId = (dataID) => {
    setIsSingleID(true);
    setIsLoading(true);
    fetchSingleIdData(dataID);
  };

  const fetchSingleIdData = async (dataID) => {
    await axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/neo/${dataID}?api_key=LUBRc5fkhGMCDFt1fkCrDBdSdspPwoWlZeGHXfru`
        // `https://api.nasa.gov/neo/rest/v1/neo/${dataID}?api_key=5xlaqIKHGj8Ucgg98bDbkfP5vI5p7K5yhYqg0FfO`
      )
      .then((resp) => {
        if (resp.data) {
          setTotalLength(
            resp.data?.close_approach_data?.length ||
              resp.data?.close_approach_data?.length === 0
          );
          setApiData(resp.data);
        }
        setIsLoading(false);
        setShowData(true);
      })
      .catch((err) => {
        console.log(err.error_message);
        setShowData(false);
      });
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      makeSingleId(searchId);
    }
  };

  return (
    <>
      <div className="MainBody pt-[68px] px-8">
        {/* For Upper Body with date selector */}
        <div className="upperBody flex justify-between items-center py-5">
          <h2 className="text-2xl font-semibold text-gray-500 capitalize">
            {totalLength == 0
              ? "Search Nearest Asteriods"
              : `${totalLength} Nearest Asteriods as per their closest Approach`}
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
                onChange={(e) => setSearchId(e.target.value)}
                value={searchId}
                ref={searchInputRef}
                onKeyDown={handleEnterKeyPress}
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
              {apiError ? (
                <h2 className="text-2xl font-semibold text-gray-500 text-center">
                  {apiError}
                </h2>
              ) : (
                <div className="py-5">
                  <div className="dataHead">
                    <ul className="flex justify-center items-center text-gray-500  text-sm font-semibold">
                      <li className="w-1/12 px-3">ID</li>
                      <li className="w-1/12 px-1">Name</li>
                      <li className="w-1/12 px-1">Date</li>
                      <li className="w-1/12 px-1">Time</li>
                      <li className="w-2/12 px-1">Ab Magnitude</li>
                      <li className="w-2/12 px-2 flex justify-start items-center">
                        <p>Min - Max Est Diamater</p>
                        <select
                          name="diameter"
                          value={diamater}
                          onChange={(e) => setDiameter(e.target.value)}
                          className="p-1 ml-3"
                        >
                          <option value="km">Kilo Meters</option>
                          <option value="meters">Meters</option>
                          <option value="miles">Miles</option>
                          <option value="feet">Feets</option>
                        </select>
                      </li>
                      <li className="w-2/12 px-2 flex justify-start items-center">
                        <p>Relative Velocity</p>
                        <select
                          name="velocity"
                          value={velocity}
                          onChange={(e) => setVelocity(e.target.value)}
                          className="p-1 ml-3"
                        >
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

                  {isSingleID ? (
                    <>
                      {/* sing id data*/}
                      {apiData.close_approach_data ? (
                        apiData.close_approach_data.map((data, index) => {
                          const isFav = favorites.some(
                            (fav) => fav.asteriodId === apiData.id
                          );
                          // console.log(apiData.id);

                          return (
                            <AsteriodDataCard
                              key={index}
                              id={apiData.id}
                              name={apiData.name}
                              date={data.close_approach_date}
                              time={data.close_approach_date_full}
                              ab_magnitude={apiData.absolute_magnitude_h}
                              max_diameter={
                                diamater === "km"
                                  ? apiData.estimated_diameter.kilometers
                                      .estimated_diameter_max
                                  : diamater === "meters"
                                  ? apiData.estimated_diameter.meters
                                      .estimated_diameter_max
                                  : diamater === "miles"
                                  ? apiData.estimated_diameter.miles
                                      .estimated_diameter_max
                                  : diamater === "feet"
                                  ? apiData.estimated_diameter.feet
                                      .estimated_diameter_max
                                  : apiData.estimated_diameter.kilometers
                                      .estimated_diameter_max
                              }
                              min_diameter={
                                diamater === "km"
                                  ? apiData.estimated_diameter.kilometers
                                      .estimated_diameter_min
                                  : diamater === "meters"
                                  ? apiData.estimated_diameter.meters
                                      .estimated_diameter_min
                                  : diamater === "miles"
                                  ? apiData.estimated_diameter.miles
                                      .estimated_diameter_min
                                  : diamater === "feet"
                                  ? apiData.estimated_diameter.feet
                                      .estimated_diameter_min
                                  : apiData.estimated_diameter.kilometers
                                      .estimated_diameter_min
                              }
                              rel_velocity={
                                velocity === "km/s"
                                  ? data.relative_velocity.kilometers_per_second
                                  : velocity === "km/h"
                                  ? data.relative_velocity.kilometers_per_hour
                                  : velocity === "miles/h"
                                  ? data.relative_velocity.miles_per_hour
                                  : data.relative_velocity.kilometers_per_second
                              }
                              hazard={apiData.is_potentially_hazardous_asteroid}
                              isFav={isFav}
                              makeSingleId={(e) => makeSingleId(apiData.id)}
                              addFavAsteriod={() => addFavAsteriod(apiData)}
                              removeFavAsteriod={() =>
                                handleRemoveFav(apiData.id)
                              }
                            />
                          );
                        })
                      ) : (
                        <h3 className="text-2xl font-semibold text-gray-500 text-center">
                          No close approach data available.
                        </h3>
                      )}
                    </>
                  ) : (
                    // normal dates Data
                    <>
                      {apiData.map((data, index) => {
                        const isFav = favorites.some(
                          (fav) => fav.asteriodId === data.id
                        );

                        return (
                          <AsteriodDataCard
                            key={index}
                            id={data.id}
                            name={data.name}
                            date={
                              data.close_approach_data[0].close_approach_date
                            }
                            time={
                              data.close_approach_data[0]
                                .close_approach_date_full
                            }
                            ab_magnitude={data.absolute_magnitude_h}
                            max_diameter={
                              diamater === "km"
                                ? data.estimated_diameter.kilometers
                                    .estimated_diameter_max
                                : diamater === "meters"
                                ? data.estimated_diameter.meters
                                    .estimated_diameter_max
                                : diamater === "miles"
                                ? data.estimated_diameter.miles
                                    .estimated_diameter_max
                                : diamater === "feet"
                                ? data.estimated_diameter.feet
                                    .estimated_diameter_max
                                : data.estimated_diameter.kilometers
                                    .estimated_diameter_max
                            }
                            min_diameter={
                              diamater === "km"
                                ? data.estimated_diameter.kilometers
                                    .estimated_diameter_min
                                : diamater === "meters"
                                ? data.estimated_diameter.meters
                                    .estimated_diameter_min
                                : diamater === "miles"
                                ? data.estimated_diameter.miles
                                    .estimated_diameter_min
                                : diamater === "feet"
                                ? data.estimated_diameter.feet
                                    .estimated_diameter_min
                                : data.estimated_diameter.kilometers
                                    .estimated_diameter_min
                            }
                            rel_velocity={
                              velocity === "km/s"
                                ? data.close_approach_data[0].relative_velocity
                                    .kilometers_per_second
                                : velocity === "km/h"
                                ? data.close_approach_data[0].relative_velocity
                                    .kilometers_per_hour
                                : velocity === "miles/h"
                                ? data.close_approach_data[0].relative_velocity
                                    .miles_per_hour
                                : data.close_approach_data[0].relative_velocity
                                    .kilometers_per_second
                            }
                            hazard={data.is_potentially_hazardous_asteroid}
                            isFav={isFav}
                            // removeFavAsteriod={() => removeFavAsteriod(data.id)}
                            removeFavAsteriod={() => handleRemoveFav(data.id)}
                            addFavAsteriod={() => addFavAsteriod(data)}
                            makeSingleId={() => makeSingleId(data.id)}
                          />
                        );
                      })}
                    </>
                  )}
                </div>
              )}
            </>
          ) : null}
        </div>

        {/* to add favourite asteriods */}
        <div>
          <div className="py-4">
            {matchedData && matchedData.length > 0 ? (
              <>
                <h2 className="text-2xl text-gray-500 font-semibold text-center">
                  Favourite Asteriods
                </h2>
                <div className="fav-upper flex justify-center">
                  <ul className="w-6/12 flex justify-between">
                    <li className="w-4/12 px-3">ID</li>
                    <li className="w-4/12 px-1">Name</li>
                    <li className="text-center w-4/12 px-1">
                      Remove From Favorite
                    </li>
                  </ul>
                </div>
                <div className="fav-lower">
                  <div className="w-6/12 mx-auto">
                    {matchedData.map((data, index) => {
                      return (
                        <Favourite
                          key={index}
                          id={data.asteriodId}
                          name={data.asteriodName}
                          removeFavAsteriod={() =>
                            handleRemoveFav(data.asteriodId)
                          }
                          makeSingleId={() => makeSingleId(data.asteriodId)}
                        />
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
        </div>
      </div>
    </>
  );
};

export default Body;
