import type { p, h, m, Hour } from '../types';

const periods: p[] = ['AM', 'PM'];
const hours: h[] = [
  '12',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
];
const mins: m[] = ['00', '15', '30', '45'];

const hourArr: Hour[] = [];
periods.forEach((p) => {
  hours.forEach((h) => {
    mins.forEach((m) => {
      hourArr.push(`${h}:${m} ${p}`);
    });
  });
});
export const hourList = Object.freeze(hourArr);
