export const createEventInfoTemplate = (tripinfo) => {
  const {firstStop, secondStop, lastStop, cost, startDate, endDate} = tripinfo;

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${firstStop} &mdash; ${secondStop} &mdash; ${lastStop}</h1>

              <p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${endDate}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
            </p>
          </section>`;
};
