type h =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

type m = '00' | '15' | '30' | '45';

type p = 'AM' | 'PM';

export type Hour = `${h}:${m} ${p}`;

export interface TimeRange {
  from: Hour;
  to: Hour;
}
