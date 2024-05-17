const IsDateTimeValid = (selectedDate, selectedTime) => {
  const selectedDateTime = new Date(selectedDate + "T" + selectedTime);
  const currentDateTime = new Date();
  if (selectedDateTime < currentDateTime) {
    return false;
  } else {
    return true;
  }
};

export default IsDateTimeValid;
