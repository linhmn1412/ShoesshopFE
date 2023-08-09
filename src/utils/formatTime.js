import React from "react";
import moment from "moment";

export const formatTime = (time) => {
  const formattedTime = moment(time).utcOffset(7).format("YYYY-MM-DD HH:mm:ss");

  return formattedTime;
};