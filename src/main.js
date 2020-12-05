
import {createEventInfoTemplate} from "./view/event-info.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createSortTemplate} from "./view/sort.js";
import {createEventFormTemplate} from "./view/event-form.js";
import {creatEventPointTemplate} from "./view/event-point.js";
import {creatEventList} from "./view/event-list.js";
import {generatePoint} from "./mock/point.js";
import {generateFullTrip} from "./mock/fullTrip.js";

const POINT_COUNT = 20;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const points = new Array(POINT_COUNT).fill().map(generatePoint);
points.sort((a, b) => a.startDate - b.startDate);

const fullTripInfo = generateFullTrip(points);

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, createEventInfoTemplate(fullTripInfo), `afterbegin`);

const tripControls = document.querySelector(`.trip-controls`);
render(tripControls, createMenuTemplate());
render(tripControls, createFiltersTemplate());


const tripEvents = document.querySelector(`.trip-events`);
render(tripEvents, createSortTemplate());
render(tripEvents, creatEventList());

const tripEventList = tripEvents.querySelector(`.trip-events__list`);

render(tripEventList, createEventFormTemplate(points[0]));

points.forEach((point)=> {
  render(tripEventList, creatEventPointTemplate(point));
});
