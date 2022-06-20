import * as dayjs from 'dayjs';
import relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export function dateFromNow(date: Date): string {
  return dayjs(date).fromNow();
}
