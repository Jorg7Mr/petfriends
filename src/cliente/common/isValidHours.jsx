const IsHourValid = (hourStart, hourEnd) => {
  if (hourStart < hourEnd) {
    return true;
  } else {
    return false;
  }
};

export default IsHourValid;
