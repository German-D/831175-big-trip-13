import dayjs from "dayjs";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};
// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Скопипастил лучшее решение для перемешивания массива со stackoverflow
export const shuffle = (array) => {
  let list = array.slice();
  let m = list.length;
  let temp;
  let j;

  // Check if there's still elements remaining
  while (m) {

    // Pick remaining element
    j = Math.floor(Math.random() * m--);

    // Swap it with the current element
    temp = list[m];
    list[m] = list[j];
    list[j] = temp;
  }

  return list;
};

export const toFormat = (date, format) => {
  return dayjs(date).format(format).toUpperCase();
};
