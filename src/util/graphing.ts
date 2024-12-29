import moment from "moment";

export const generateHourlyTicks = () => {
  const startOfDay = moment().startOf("day").valueOf(); // Start of the current day in Unix time
  const ticks = [];
  for (let i = 0; i <= 24; i++) {
    ticks.push(startOfDay + i * 60 * 60 * 1000); // Add an hour in milliseconds
  }
  return ticks;
};
