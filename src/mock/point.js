import dayjs from "dayjs";
import {getRandomInteger} from "../utils/common.js";
import {shuffle} from "../utils/common.js";

const MAX_OFFERS_QUATITY = 5;
const MAX_PHOTOS_QUATITY = 6;
const MAX_COST = 100;

const generateDescription = () => {
  const descriptionNote = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta
   ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam
    nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae,
    sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
    Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.
    In rutrum ac purus sit amet tempus.`;

  const descriptionNoteArray = descriptionNote.split(`. `);
  const suffleDescriptionNoteArray = shuffle(descriptionNoteArray);
  const newSuffleDescriptionNoteArray = suffleDescriptionNoteArray.slice(0, getRandomInteger(1, 5));
  return newSuffleDescriptionNoteArray.join(`. `);
};

const generatePointType = () => {
  const types = [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Carshering`,
    `Drive`,
    `Flight`,
    `Check-in`,
    `Sightseeng`,
    `Restaurant`,
  ];

  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
};

const generateDestination = () => {
  const destinations = [
    `Yekaterinburg`,
    `New York`,
    `Paris`,
    `Vancouver`,
    `Tokyo`,
    `Helsinki`,
    `Copenhagen`,
    `Moscow`,
    `Amsterdam`,
    `Beijing`,
  ];

  const randomIndex = getRandomInteger(0, destinations.length - 1);
  return destinations[randomIndex];
};


const generateOffers = (type) => {

  const names = [
    `UBER`,
    `MacDonalds`,
    `MTS`,
    `Add lugguage`,
    `Rent a car`,
    `Lunch`,
    `Museum`,
  ];
  const getOffersName = () => {

    const randomIndex = getRandomInteger(0, names.length - 1);
    const currentName = names[randomIndex];
    names.splice(randomIndex, 1);
    return currentName;
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

const generateDates = () => {
  const gap = getRandomInteger(36000, 360000);

  const startDate = dayjs().toDate();
  startDate.setSeconds(gap);

  const endDate = dayjs().toDate();
  endDate.setSeconds(gap + getRandomInteger(1000, 10000));

  return [startDate, endDate];
};

export const generatePoint = () => {

  const pointType = generatePointType();
  const [startDate, endDate] = generateDates();
  return {
    type: pointType,
    destination: generateDestination(),
    offers: generateOffers(pointType),
    description: generateDescription(),
    photos: generatePhotos(),
    cost: getRandomInteger(1, MAX_COST),
    startDate,
    endDate,
  };
};
