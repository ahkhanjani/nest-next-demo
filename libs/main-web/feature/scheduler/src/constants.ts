import type { TimeRange } from './types/time-range';

const hours = [
  '12',
  ...Array.from({ length: 11 }, (_, i) => (i + 1).toString()),
];
const mins = ['00', '15', '30', '45'];
const periods = ['AM', 'PM'];

export const hourList: string[] = [];
periods.forEach((p) => {
  hours.forEach((h) => {
    mins.forEach((m) => {
      hourList.push(`${h}:${m} ${p}`);
    });
  });
});

const defaultRange: TimeRange = { from: '10:00 AM', to: '8:00 PM' };
/** Call this to get a fresh default range each time. This is to prevent referencing the object. */
export const getDefaultRange = () => ({ ...defaultRange });
