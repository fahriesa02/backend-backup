import moment from "moment/moment.js";

export default async () => {
  const newDate = moment().format("YYYY-MM-DD");
  const date = new Date();

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  var currentDate = `${year}-${month}-${day}`;
  return newDate;
}