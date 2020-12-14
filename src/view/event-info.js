import {toFormat} from "../utils.js";
import {createElement} from "../utils.js";

// Функцию для генерации HTML-разметки можно превратить в метод класса,
// однако делать мы этого не будем, чтобы не раздувать diff изменений
const createEventInfoTemplate = (tripinfo) => {
  const {stops, cost, startDate, endDate} = tripinfo;
  const currentStops = (stops.length > 3) ? `${stops[0]} — ... — ${stops[stops.length - 1]}` : stops.join(` &mdash; `);

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${currentStops}</h1>

              <p class="trip-info__dates">${toFormat(startDate, `MMM DD`)}&nbsp;&mdash;&nbsp;${toFormat(endDate, `DD`)}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
            </p>
          </section>`;
};

export default class EventInfo {
  constructor(fullTripInfo) {
    this._fullTripInfo = fullTripInfo;
    this._element = null;
  }

  getTemplate() {
    return createEventInfoTemplate(this._fullTripInfo);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
