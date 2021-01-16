import AbstractView from "./abstract.js";

const creatEventList = () => {
  return `<ul class="trip-events__list">
          </ul>`;
};

export default class EventList extends AbstractView{

  getTemplate() {
    return creatEventList();
  }
}
