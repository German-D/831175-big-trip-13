import dayjs from "dayjs";
import {getRandomInteger} from "../utils.js";

const MAX_LENGTH_DESCRIPTION = 5;
const MAX_OFFERS_QUATITY = 5;
const MAX_PHOTOS_QUATITY = 6;
const MAX_COST = 100;

const generateDescription = () => {
  const descriptionNote = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;
  const descriptionLength = getRandomInteger(1, MAX_LENGTH_DESCRIPTION);
  let descriptionNotes = ``;

  for (let y = 0; y < descriptionLength; y++) {
    descriptionNotes += descriptionNote;
  }
  return descriptionNotes;
};

const generatePointType = () => {
  const types = [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`,
    `Check-in`,
    `Sightseeng`,
    `Restaurant`,
  ];

  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
};
generatePointType();

const generateDestination = () => {
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


const generateOffers = (type) => {

  const getOffersName = () => {
    const names = [
      `UBER`,
      `Macdonalds`,
      `MTS`,
    ];

    const randomIndex = getRandomInteger(0, names.length - 1);
    return names[randomIndex];
  };


  const offers = [];
  const offersQuantity = getRandomInteger(0, MAX_OFFERS_QUATITY);
  for (let i = 0; i < offersQuantity; i++) {
    offers.push({
      offersType: type,
      offersName: getOffersName(),
      offersCost: getRandomInteger(1, 100),
    });
  }
  return offers;
};

const generatePhotos = () => {
  const photosQuantity = getRandomInteger(1, MAX_PHOTOS_QUATITY);
  let photos = [];

  for (let n = 0; n < photosQuantity; n++) {
    photos.push(`http://picsum.photos/248/152?r=\${getRandomInteger(1, 100)}`);
  }
  return photos;
};

const generateStartEndDate = (date) => {
  if (date) {
    const daysGap = getRandomInteger(100, 200);
    return dayjs().add(daysGap, `day`).format(`DD/MM/YYYY hh:mm`);
  }
  const daysGap = getRandomInteger(1, 100);

  return dayjs().add(daysGap, `day`).format(`DD/MM/YYYY hh:mm`);
};

const generateDate = () => {
  return dayjs().format(`MMM D`).toUpperCase();
};

export const generatePoint = () => {

  const pointType = generatePointType();
  const startDate = generateStartEndDate();
  const endDate = generateStartEndDate(startDate);
  const date = generateDate();
  return {
    type: pointType,
    destination: generateDestination(),
    offers: generateOffers(pointType),
    description: generateDescription(),
    photos: generatePhotos(),
    cost: getRandomInteger(1, MAX_COST),
    startDate,
    endDate,
    date,
  };
};
