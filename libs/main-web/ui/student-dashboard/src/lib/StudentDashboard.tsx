import React, { useState } from 'react';
import Image from 'next/image';
import {
  Icon2User,
  IconCahrt,
  IconCalnedar,
  IconCategory,
  IconEditSquare,
  IconSetting,
} from 'fm/icons';
import { ImageAvatarTest } from 'fm/images';

export type IStudentDashboardProps = {};

const StudentDashboard: React.FC<IStudentDashboardProps> = ({}) => {
  const [isActive, setActive] = useState(2);
  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-justify-between tw-h-screen tw-w-screen tw-px-5 tw-py-1">
      <div className="tw-w-full tw-flex tw-items-center tw-justify-between  ">
        <div className="tw-border tw-border-[3px] tw-border-blue tw-rounded-full tw-flex tw-items-center tw-justify-center tw-w-[42px] tw-h-[42px] ">
          <Image
            src={ImageAvatarTest}
            alt="avatar"
            width={42}
            height={42}
            className="tw-rounded-full tw-object-cover"
          />
        </div>
        <span>title</span>
        <button className="tw-border tw-border-borderColor tw-rounded-18 tw-p-3 tw-flex tw-items-center">
          <Image src={IconSetting} alt="setting" />
        </button>
      </div>
      <div className="tw-w-full">Content</div>
      <div className="tw-w-full  tw-flex tw-flex-row tw-items-center tw-justify-between">
        <button
          className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center		  ${
            isActive === 0
              ? 'tw-bg-blue white-svg '
              : 'tw-border tw-border-borderColor'
          }`}
          onClick={() => setActive(0)}
        >
          <Image src={Icon2User} alt="2user" />
        </button>
        <button
          className={` tw-rounded-18 tw-p-[13px] tw-flex tw-items-center ${
            isActive === 1
              ? 'tw-bg-blue white-svg '
              : 'tw-border tw-border-borderColor'
          }`}
          onClick={() => setActive(1)}
        >
          <Image src={IconCalnedar} alt="calendar" />
        </button>
        <button
          className={` tw-rounded-18 tw-p-[13px] tw-flex tw-items-center  ${
            isActive === 2
              ? 'tw-bg-blue white-svg '
              : 'tw-border tw-border-borderColor black-svg'
          }`}
          onClick={() => setActive(2)}
        >
          <Image src={IconCategory} alt="category" />
        </button>
        <button
          className={` tw-rounded-18 tw-p-[13px] tw-flex tw-items-center  ${
            isActive === 3
              ? 'tw-bg-blue white-svg '
              : 'tw-border tw-border-borderColor'
          }`}
          onClick={() => setActive(3)}
        >
          <Image src={IconEditSquare} alt="edit" />
        </button>
        <button
          className={` tw-rounded-18 tw-p-[13px] tw-flex tw-items-center  ${
            isActive === 4
              ? 'tw-bg-blue white-svg '
              : 'tw-border tw-border-borderColor'
          }`}
          onClick={() => setActive(4)}
        >
          <Image src={IconCahrt} alt="chart" />
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
