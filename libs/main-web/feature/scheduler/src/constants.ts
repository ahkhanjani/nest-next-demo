import type { Hour, TimeRange } from './types/time-range';

const periods = ['AM', 'PM'];
const hours = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
const mins = ['00', '15', '30', '45'];

const hourArr: Hour[] = [];
periods.forEach((p) => {
  hours.forEach((h) => {
    mins.forEach((m) => {
      hourArr.push(`${h}:${m} ${p}` as Hour);
    });
  });
});
export const hourList = Object.freeze(hourArr);

const defaultRange: TimeRange = { from: '10:00 AM', to: '8:00 PM' };
/** Call this to get a fresh default range each time. This is to prevent referencing the object. */
export const getDefaultRange = () => ({ ...defaultRange });
