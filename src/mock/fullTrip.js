import dayjs from "dayjs";
import {getRandomInteger} from "../utils.js";

const MAX_COST = 5000;

const generateStop = () => {
  const destinations = [
    `Yekaterinburg`,
    `New York`,
    `Paris`,
    `Vancouver`,
    `Tokyo`,
  ];

  const randomIndex = getRandomInteger(0, destinations.length - 1);
  return destinations[randomIndex];
};

const generateStartEndDate = (date) => {
  if (date) {
    const daysGap = getRandomInteger(5, 9);
    return dayjs().add(daysGap, `day`).format(`DD`);
  }
  const daysGap = getRandomInteger(1, 4);

  return dayjs().add(daysGap, `day`).format(`MMM DD`).toUpperCase();
};

export const generateFullTrip = () => {
  const startDate = generateStartEndDate();
  const endDate = generateStartEndDate(startDate);

  return {
    firstStop: generateStop(),
    secondStop: generateStop(),
    lastStop: generateStop(),
    cost: getRandomInteger(1, MAX_COST),
    startDate,
    endDate,
  };
};
