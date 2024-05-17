import React from "react";

const FormatNumber = ({ number }) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default FormatNumber;
