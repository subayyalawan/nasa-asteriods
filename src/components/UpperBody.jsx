import React, { useEffect, useState } from "react";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { get } from "./Api";
import Loader from "../assets/loader.gif";
import AsteriodsData from "./AsteriodsData";
import Favourite from "./Favourite";

const Body = () => {
  const [date, setDate] = useState({
    StartDate: "",
    EndDate: "",
  });
  const [validDateErr, setValidDateError] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      } else {
        setValidDateError(true);
      }
    }
  };

  const fetchApiData = async () => {
    try {
      const resp = await get(
        `start_date=${date.StartDate}&end_date=${date.EndDate}&api_key=LUBRc5fkhGMCDFt1fkCrDBdSdspPwoWlZeGHXfru`
      );

      const combinedData = Object.keys(resp.data.near_earth_objects).reduce(
        (acc, dateKey) => [...acc, ...resp.data.near_earth_objects[dateKey]],
        []
      );
      setApiData(combinedData);
      setIsLoading(false);
      console.log(apiData);
      // console.log(resp.data.near_earth_objects)
    } catch (error) {
      setApiError(error.message);
    }
  };

  useEffect(() => {
    validDateRange();
    setTimeout(() => {
      setValidDateError(false);
    }, 3200);
  }, [date.StartDate, date.EndDate]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="MainBody pt-[68px] pb-4 px-8">
        {/* For Upper Body with date selector */}
        <div className="upperBody flex justify-between items-center py-5">
          <h2 className="text-2xl font-semibold text-gray-500">
            Search Nearest Asteriods
          </h2>

          <form className="flex" onSubmit={handleFormSubmit}>
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
          {isLoading ? null : validDateErr ? (
            <AsteriodsData date={date} apiError={apiError} />
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
