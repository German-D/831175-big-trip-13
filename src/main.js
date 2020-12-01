
import {createEventInfoTemplate} from "./view/event-info.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createSortTemplate} from "./view/sort.js";
import {createEventFormTemplate} from "./view/event-form.js";
import {creatEventPointTemplate} from "./view/event-point.js";
import {creatEventList} from "./view/event-list.js";
import {generatePoint} from "./mock/point.js";
import {generateFullTrip} from "./mock/fullTrip.js";

const POINT_COUNT = 4;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const fullTripInfo = generateFullTrip();

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, createEventInfoTemplate(fullTripInfo), `afterbegin`);

const tripControls = document.querySelector(`.trip-controls`);
render(tripControls, createMenuTemplate());
render(tripControls, createFiltersTemplate());


const tripEvents = document.querySelector(`.trip-events`);
render(tripEvents, createSortTemplate());
render(tripEvents, creatEventList());

const tripEventList = tripEvents.querySelector(`.trip-events__list`);
const points = new Array(POINT_COUNT).fill().map(generatePoint);

render(tripEventList, createEventFormTemplate(points[0]));

for (let i = 1; i < POINT_COUNT; i++) {
  render(tripEventList, creatEventPointTemplate(points[i]));
}
