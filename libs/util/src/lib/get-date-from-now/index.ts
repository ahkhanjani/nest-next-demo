import * as dayjs from 'dayjs';
import relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export function utilGetDateFromNow(date: Date): string {
  return dayjs(date).fromNow();
}
