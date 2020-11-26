
import {createEventInfoTemplate} from "./view/event-info.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createSortTemplate} from "./view/sort.js";
import {createEventFormTemplate} from "./view/event-form.js";
import {creatEventPointTemplate} from "./view/event-point.js";

const POINT_COUNT = 3;

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, createEventInfoTemplate(), `afterbegin`);

const tripControls = document.querySelector(`.trip-controls`);
render(tripControls, createMenuTemplate());
render(tripControls, createFiltersTemplate());


const tripEvents = document.querySelector(`.trip-events`);
render(tripEvents, createSortTemplate());
render(tripEvents, createEventFormTemplate());

for (let i = 0; i < POINT_COUNT; i++) {
  render(tripEvents, creatEventPointTemplate());
}
