export const formatDate = (date) => {
  dateObj = new Date(date);

  let year = dateObj.getFullYear().toString().substr(-2);
  let month = (1 + dateObj.getMonth()).toString().padStart(2, "0");
  let day = dateObj.getDate().toString().padStart(2, "0");

  return `${month}/${day}/${year}`;
};

export const formatDateDayMonthDate = (date) => {
  const dateToString = date.toDateString();
  const formattedDateToString = `${dateToString.substring(
    0,
    dateToString.length - 5
  )},${dateToString.substring(dateToString.length - 5)}`;

  return formattedDateToString;
};

export const returnDayOfWeek = (date) => {
  const today = new Date();
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  return days[today.getDay()];
};

export const formatCurrency = (value) => {
  return `$${value.toFixed(2)}`;
};

export const formatToAWSDate = (date) => {
  const tempDate = date.split("+");

  return tempDate[0] + "Z";
};

export const formatDateToTime = (date) => {
  const workingDate = new Date(date);

  const dateToString = workingDate.toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
  });
  const dateToArray = dateToString.split(":");

  let hour = dateToArray[0];
  let minute = dateToArray[1];
  let modifier = dateToArray[2].slice(-2);

  return `${hour !== "00" ? hour : "12"}:${minute} ${modifier}`;
};

export const verifyEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email);
};

export const verifyCVV = (cvv) => {
  const regex = /^[0-9]{3,4}$/;

  return regex.test(cvv);
};

export const verifyExpDate = (expDate) => {
  const regex = /\d\d\/\d\d\d\d/;

  return regex.test(expDate);
};

export const verifyCCNumber = (number) => {
  const regex = /^[0-9]{15,19}$/;

  return regex.test(number);
};

export const verifyZip = (number) => {
  const regex = /^[0-9]{5}$/;

  return regex.test(number);
};

export const splitFullName = (name) => {
  const nameArr = [];

  if (
    name.indexOf(" ") === -1 ||
    name.substring(name.indexOf(" ") + 1) === ""
  ) {
    nameArr.push(name);
    nameArr.push("Not Provided");
  } else {
    nameArr.push(name.substring(0, name.indexOf(" ")));
    nameArr.push(name.substring(name.indexOf(" ") + 1));
  }

  return nameArr;
};

export const splitExpDate = (date) => {
  const dateArr = [];

  dateArr.push(date.substring(0, date.indexOf("/")));
  dateArr.push(date.substring(date.indexOf("/") + 1));

  return dateArr;
};

export const formatCCProvider = (provider) => {
  let corrected;
  switch (provider) {
    case "american_express":
      corrected = "AMEX";
      break;
    default:
      corrected = provider;
  }

  return corrected;
};

export const verifyRangeRequirement = (number) => {
  const regex = /^.{8,20}$/;

  return regex.test(number);
};

export const verifyNumberRequirement = (number) => {
  const regex = /\d/;
  return regex.test(number);
};

export const verifySpecialCharacterRequirement = (number) => {
  const regex = /[\[\]\{\}\"\/\\\':;|~`,<>?!@#\$%\^\&*\)\(+=._-]/;

  return regex.test(number);
};

export const verifyUppercaseCharacterRequirement = (number) => {
  const regex = /^[A-Z]/;

  return regex.test(number);
};

export const calcPoints = (subtotal) => {
  return Math.floor(5 * subtotal);
};
