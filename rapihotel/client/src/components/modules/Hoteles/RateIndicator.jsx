import React from "react";
import { Link } from "react-router-dom";
import { getRateColor } from "../../../helpers";

const RateIndicator = ({
  avg_rating,
  total_ratings,
  onClick,
  direction = "flex-col",
}) => {
  return (
    <section className={`w-full h-full  flex ${direction} items-start`}>
      <div
        className={`h-10 w-full min-w-14 lg:w-10 grid place-items-center font-bold rounded-lg text-white  ${getRateColor(
          avg_rating,
          total_ratings
        )}`}
        onClick={onClick}
      >
        {Number(avg_rating) > 9.9
          ? Number(avg_rating).toFixed(0)
          : Number(avg_rating).toFixed(1)}
      </div>
      <div className="flex flex-col text-sm ml-1 w-full">
        <span>
          <p className=" hidden sm:block text-xs">{"Basado en"}</p>
        </span>
        <span className="flex space-x-2 font-semibold ">
          {/* si hay mas de 999 opiniones que se muestre en K ej 1k o 1.1k */}
          <span>
            {total_ratings > 999
              ? (total_ratings / 1000).toFixed(1) + " k"
              : total_ratings}{" "}
          </span>
          <span className="">Opiniones</span>
        </span>
      </div>
    </section>
  );
};
export default RateIndicator;
