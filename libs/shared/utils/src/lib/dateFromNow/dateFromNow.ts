import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const dateFromNow = (date: Date): string => dayjs(date).fromNow();
