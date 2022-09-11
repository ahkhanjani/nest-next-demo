import { PlusIcon } from 'fm/shared-assets/icons';
import Image from 'next/image';
import React, { useState } from 'react';
import { SelectSession } from './SelectSession';

interface AddSessionProps {}

const AddSession: React.FC<AddSessionProps> = () => {
  const [sessions, setSessions] = useState<number>(1);
  const [packages, setPackage] = useState<number>(1);

  return (
    <div>
      <label
        htmlFor="my-modal-6"
        className="tw-flex tw-items-center tw-border-2 tw-border-blue tw-px-5 tw-py-2 tw-rounded-2xl tw-cursor-pointer"
      >
        <PlusIcon />
        <span className="tw-px-2 tw-text-sm tw-text-blue tw-font-medium">
          Book sessions
        </span>
      </label>

      <input
        type="checkbox"
        id="my-modal-6"
        className="tw-daisy-modal-toggle"
      />
      <div className=" tw-daisy-modal tw-daisy-modal-bottom sm:tw-daisy-modal-middle">
        <div className="tw-max-w-xl tw-w-full tw-bg-white tw-rounded-lg tw-p-6 ">
          <h3 className="tw-font-medium tw-text-gray tw-text-xl">
            Upcoming sessions
          </h3>
          <hr className="tw-border-t-2 tw-border-field tw-my-4" />
          <div className="tw-flex tw-flex-row tw-items-center ">
            <div className="tw-flex tw-flex-col tw-items-start tw-max-w-[215px] tw-w-1/2 tw-mr-7">
              <label className="tw-font-normal tw-text-xs tw-text-dark tw-p-1 ">
                Package
              </label>
              <select
                onChange={(e) => setPackage(parseInt(e.target.value))}
                value={packages}
                className="tw-daisy-select tw-w-full tw-bg-field tw-max-w-xs tw-text-lightGray tw-text-base"
              >
                <option value="1">6 sessions</option>
                <option value="2">12 sessions</option>
                <option value="3">20 sessions</option>
              </select>
            </div>
            <div className="tw-flex tw-flex-col tw-items-start tw-max-w-[215px] tw-w-1/2 ">
              <label className="tw-font-normal tw-text-xs tw-text-dark tw-p-1">
                Sessions per week
              </label>
              <select
                onChange={(e) => setSessions(parseInt(e.target.value))}
                value={sessions}
                className="tw-daisy-select tw-w-full tw-bg-field tw-max-w-xs tw-text-lightGray tw-text-base"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>
          <div className="tw-pt-10">
            {Array.from({ length: sessions }).map(() => (
              <SelectSession />
            ))}
          </div>
          <div className="tw-daisy-modal-action tw-w-full   tw-text-white">
            <label
              htmlFor="my-modal-6"
              onClick={() => {
                setSessions(1);
                setPackage(1);
              }}
              className="tw-bg-blue tw-cursor-pointer tw-w-full tw-flex  tw-justify-center tw-items-center tw-tracking-[1px] tw-font-medium tw-text-sm tw-rounded-2xl tw-py-3"
            >
              SAVE
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSession;
