import * as dayjs from 'dayjs';
import relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export const dateFromNow = (date: Date): string => dayjs(date).fromNow();
