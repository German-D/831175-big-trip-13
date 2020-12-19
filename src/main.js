import EventInfoView from "./view/event-info.js";
import MenuView from "./view/menu.js";
import FiltersView from "./view/filters.js";
import SortView from "./view/sort.js";
import EventListView from "./view/event-list.js";
import EventFormView from "./view/event-form.js";
import EventPointView from "./view/event-point.js";
import NoPointView from "./view/no-point.js";
import {generatePoint} from "./mock/point.js";
import {render, RenderPosition} from "./utils.js";
import {generateFullTrip} from "./mock/fullTrip.js";

const POINT_COUNT = 0;

const points = new Array(POINT_COUNT).fill().map(generatePoint);
const fullTripInfo = generateFullTrip(points);
points.sort((a, b) => b.startDate - a.startDate);
const tripControls = document.querySelector(`.trip-controls`);

const tripMain = document.querySelector(`.trip-main`);
if (points.length !== 0) {
  render(tripMain, new EventInfoView(fullTripInfo).getElement(), RenderPosition.AFTERBEGIN);
}

render(tripControls, new MenuView().getElement(), RenderPosition.BEFOREEND);
render(tripControls, new FiltersView().getElement(), RenderPosition.BEFOREEND);

const tripEvents = document.querySelector(`.trip-events`);
if (points.length !== 0) {
  render(tripEvents, new SortView().getElement(), RenderPosition.BEFOREEND);
}
render(tripEvents, new EventListView().getElement(), RenderPosition.BEFOREEND);

const tripEventList = tripEvents.querySelector(`.trip-events__list`);
if (points.length === 0) {
  render(tripEventList, new NoPointView().getElement(), RenderPosition.BEFOREEND);
}
if (points.length !== 0) {
  const renderPoint = (pointListElement, point) => {
    const pointComponent = new EventPointView(point);
    const pointEditComponent = new EventFormView(point);

    const closeForm = () => {
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const replacePointToForm = () => {
      pointListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
    };

    const replaceFormToPoint = () => {
      pointListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        closeForm();
      }
    };

    const eventRollupToPointClickHandler = () => {
      closeForm();
    };

    const eventRollupToFormClickHandler = () => {
      replacePointToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
      pointEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, eventRollupToPointClickHandler);
    };

    pointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, eventRollupToFormClickHandler);

    pointEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      closeForm();
    });

    render(pointListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
  };

  points.forEach((point) => {
    renderPoint(tripEventList, point);
  });
}
