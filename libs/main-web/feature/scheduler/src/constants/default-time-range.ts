import type { TimeRange } from '../types';

const defaultRange: TimeRange = { from: '10:00 AM', to: '8:00 PM' };
/** Call this to get a fresh default range each time. This is to prevent referencing the object. */
export const getDefaultRange = () => ({ ...defaultRange });
