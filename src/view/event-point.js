import {toFormat} from "../utils/common.js";
import {getRandomInteger} from "../utils/common.js";
import AbstractView from "./abstract.js";


/**
 *
 * @param {object} point
 * @param {Date} point.startDate
 * @return {string}
 */
const creatEventPointTemplate = (point) => {
  const {type, destination, offers, cost, startDate, endDate} = point;

  const offersArray = [];
  offers.forEach(function (item) {
    const {offersCost, offersName} = item;
    offersArray.push(`<li class="event__offer">
                    <span class="event__offer-title">${offersName}</span>
                        &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offersCost}</span>
                     </li>`);
  });

  const offersString = offersArray.join(``);

  // eslint-disable-next-line valid-jsdoc
  /**
   *
   * @param {Date} start
   * @param {Date} end
   */
  const diffDate = (start, end) => {
    const diff = Math.floor((end.getTime() - start.getTime()) / 60000);
    const minutes = diff % 60;
    const hours = Math.floor((diff / 60)) % 24;
    const days = Math.floor(diff / (60 * 24));

    const result = [];
    if (days) {
      result.push(days + `D`);
    }
    if (hours) {
      result.push(hours + `H`);
    }
    if (minutes) {
      result.push(minutes + `M`);
    }

    return result.join(` `);
  };

  const isFavoriteBool = getRandomInteger(0, 1);

  const activeClass = (isFavoriteBool) ? `event__favorite-btn--active` : ` `;

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${toFormat(startDate, `YYYY-MM-DD`)}">${toFormat(startDate, `MMM D`)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/sightseeing.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${toFormat(startDate, `YYYY-MM-DDThh:mm`)}">${toFormat(startDate, `hh:mm`)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${toFormat(endDate, `YYYY-MM-DDThh:mm`)}">${toFormat(endDate, `hh:mm`)}</time>
                  </p>
                  <p class="event__duration">${diffDate(startDate, endDate)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${cost}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                 ${offersString}
                </ul>
                <button class="event__favorite-btn ${activeClass}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

export default class EventPoint extends AbstractView {

  constructor(point) {
    super();
    this._point = point;
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return creatEventPointTemplate(this._point);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}
