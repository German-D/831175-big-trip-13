export const generateFullTrip = (points) => {

  return points.reduce((acc, point) =>{
    acc.cost += point.cost;
    acc.startDate = (acc.startDate < point.startDate) ? acc.startDate : point.startDate;
    acc.endDate = (acc.endDate > point.endDate) ? acc.endDate : point.endDate;
    if (acc.stops[acc.stops.length - 1] !== point.destination) {
      acc.stops.push(point.destination);
    }
    return acc;
  }, {
    stops: [],
    cost: 0,
    startDate: Infinity,
    endDate: 0,
  });
};
