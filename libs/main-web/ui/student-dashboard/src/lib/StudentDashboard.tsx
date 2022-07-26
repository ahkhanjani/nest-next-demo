import React, { useState } from 'react';
import Image from 'next/image';
import {
  Icon2User,
  IconArrow,
  IconCahrt,
  IconCalendar,
  IconCategory,
  IconEditSquare,
  IconHorizontalLogo,
  IconInfoCircle,
  IconMessage,
  IconNotificatin,
  IconSetting,
  IconVerticalLogo,
} from 'fm/icons';
import { ImageAvatarTest } from 'fm/images';

export type IStudentDashboardProps = {};

const StudentDashboard: React.FC<IStudentDashboardProps> = ({}) => {
  const [isActive, setActive] = useState(2);
  const [isActiveDesk, setActiveDesk] = useState(0);

  return (
    <div>
      <div className="tw-flex tw-flex-col tw-items-center tw-justify-between tw-h-screen tw-w-screen tw-px-5 tw-py-1 md:tw-hidden">
        <div className="tw-w-full tw-flex tw-items-center tw-justify-between  ">
          <div className=" tw-border-[3px] tw-border-blue tw-rounded-full tw-flex tw-items-center tw-justify-center tw-w-[42px] tw-h-[42px] ">
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
            <Image src={IconCalendar} alt="calendar" />
          </button>
          <button
            className={` tw-rounded-18 tw-p-[13px] tw-flex tw-items-center  ${
              isActive === 2
                ? 'tw-bg-blue white-svg '
                : 'tw-border tw-border-borderColor gray-svg'
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
      <div className="tw-hidden md:tw-flex ">
        <div className="tw-h-screen tw-px-4 tw-flex tw-flex-col tw-items-center tw-shadow-[2px_0px_1px_rgba(0,0,0,0.1)]">
          <div className="tw-mt-8 tw-block 2xl:tw-hidden">
            <Image src={IconVerticalLogo} alt="logo" />
          </div>
          <div className="tw-mt-8 tw-hidden 2xl:tw-block">
            <Image src={IconHorizontalLogo} alt="logo" />
          </div>
          <div className="tw-flex tw-flex-col tw-items-center tw-my-12 tw-border-t-4 tw-border-field tw-py-4 2xl:tw-w-40">
            <button
              onClick={() => setActiveDesk(0)}
              className="tw-flex tw-flex-row tw-items-center tw-min-w-full"
            >
              <div
                className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center		  ${
                  isActiveDesk === 0 ? 'tw-bg-blue white-svg ' : ' gray-svg'
                }`}
              >
                <Image src={IconCategory} alt="category" />
              </div>
              <label className="tw-px-2 tw-text-sm tw-font-medium tw-text-gray tw-cursor-pointer tw-hidden 2xl:tw-block">
                Dashboard
              </label>
            </button>
            <button
              className="tw-flex tw-flex-row tw-items-center tw-py-2 tw-min-w-full"
              onClick={() => setActiveDesk(1)}
            >
              <div
                className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center		  ${
                  isActiveDesk === 1 ? 'tw-bg-blue white-svg ' : ' gray-svg'
                }`}
              >
                <Image src={Icon2User} alt="2user" />
              </div>
              <label className="tw-px-2 tw-text-sm tw-font-medium tw-text-gray tw-cursor-pointer tw-hidden 2xl:tw-block">
                Classroom
              </label>
            </button>
            <button
              className="tw-flex tw-flex-row tw-items-center tw-py-2 tw-min-w-full"
              onClick={() => setActiveDesk(2)}
            >
              <div
                className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center		  ${
                  isActiveDesk === 2 ? 'tw-bg-blue white-svg ' : ' gray-svg'
                }`}
              >
                <Image src={IconCalendar} alt="calendar" />
              </div>
              <label className="tw-px-2 tw-text-sm tw-font-medium tw-text-gray tw-cursor-pointer tw-hidden 2xl:tw-block">
                Calendar
              </label>
            </button>
            <button
              className="tw-flex tw-flex-row tw-items-center tw-py-2 tw-min-w-full"
              onClick={() => setActiveDesk(3)}
            >
              <div
                className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center		  ${
                  isActiveDesk === 3 ? 'tw-bg-blue white-svg ' : ' gray-svg'
                }`}
              >
                <Image src={IconEditSquare} alt="edit" />
              </div>
              <label className="tw-px-2 tw-text-sm tw-font-medium tw-text-gray tw-cursor-pointer tw-hidden 2xl:tw-block">
                Home-Work
              </label>
            </button>
            <button
              className="tw-flex tw-flex-row tw-items-center tw-py-2 tw-min-w-full"
              onClick={() => setActiveDesk(4)}
            >
              <div
                className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center		  ${
                  isActiveDesk === 4 ? 'tw-bg-blue white-svg ' : ' gray-svg'
                }`}
              >
                <Image src={IconCahrt} alt="chart" />
              </div>
              <label className="tw-px-2 tw-text-sm tw-font-medium tw-text-gray tw-cursor-pointer tw-hidden 2xl:tw-block">
                Payments
              </label>
            </button>
            <button
              className="tw-flex tw-flex-row tw-items-center tw-py-2 tw-min-w-full"
              onClick={() => setActiveDesk(5)}
            >
              <div
                className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center		  ${
                  isActiveDesk === 5 ? 'tw-bg-blue white-svg ' : ' gray-svg'
                }`}
              >
                <Image src={IconSetting} alt="setting" />
              </div>
              <label className="tw-px-2 tw-text-sm tw-font-medium tw-text-gray tw-cursor-pointer tw-hidden 2xl:tw-block">
                Settings
              </label>
            </button>
          </div>
          <div className="tw-border-[3px] tw-border-blue tw-rounded-full tw-flex tw-items-center tw-justify-center tw-w-[42px] tw-h-[42px] ">
            <Image
              src={ImageAvatarTest}
              alt="avatar"
              width={42}
              height={42}
              className="tw-rounded-full tw-object-cover"
            />
          </div>
        </div>
        <div className="tw-w-full">
          <div className=" tw-min-w-full tw-py-6 tw-flex tw-flex-row tw-items-center tw-justify-around tw-shadow-md 2xl:tw-justify-between 2xl:tw-pr-9">
            <span className="tw-text-2xl tw-text-lightGray tw-font-normal tw-px-6 tw-border-r-4 tw-border-r-field 2xl:tw-border-none 2xl:tw-hidden">
              Dashboard
            </span>
            <div className="tw-px-9  ">
              <div className="tw-flex tw-flex-row tw-items-center tw-justify-around tw-rounded-2xl tw-py-2 tw-px-5 tw-shadow-md ">
                <Image src={IconInfoCircle} alt="info" />
                <div className="tw-pl-3 tw-pr-7">
                  <span className="tw-text-sm tw-font-medium">
                    Daily idiom:
                  </span>
                  <span className="tw-text-sm tw-font-normal">
                    Sweep (someone) off (someone's) feet
                  </span>
                </div>
                <Image src={IconArrow} alt="arrow" />
              </div>
            </div>
            <div>
              <button>
                <Image src={IconSetting} alt="setting" />
              </button>
              <button className="tw-px-9 ">
                <Image src={IconNotificatin} alt="notification" />
              </button>
              <button>
                <Image src={IconMessage} alt="message" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
