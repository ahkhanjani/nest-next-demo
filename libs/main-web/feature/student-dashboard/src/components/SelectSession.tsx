import React from 'react';

export type ISelectSessionProps = {};

const SelectSession: React.FC<ISelectSessionProps> = ({}) => {
  return (
    <div className="tw-flex tw-flex-row tw-mb-5">
      <div className="tw-flex tw-flex-col tw-items-start tw-max-w-[215px] tw-w-1/2 tw-mr-7">
        <label className="tw-font-normal tw-text-xs tw-text-dark tw-p-1">
          Day
        </label>
        <select className="tw-daisy-select tw-w-full tw-bg-field tw-max-w-xs tw-text-lightGray tw-text-base">
          <option selected>Sunday</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday </option>
          <option disabled>Saturdays</option>
        </select>
      </div>
      <div className="tw-flex tw-flex-col tw-items-start tw-max-w-[325px] tw-w-80 ">
        <label className="tw-font-normal tw-text-xs tw-text-dark tw-p-1">
          Start at
        </label>
        <select className="tw-daisy-select tw-w-full tw-bg-field tw-max-w-xs tw-text-lightGray tw-text-base">
          <option selected>12:30 - Tehran</option>
          <option>13:30 - Tehran</option>
          <option>14:30 - Tehran</option>
          <option>15:30 - Tehran</option>
        </select>
      </div>
    </div>
  );
};

export { SelectSession };
