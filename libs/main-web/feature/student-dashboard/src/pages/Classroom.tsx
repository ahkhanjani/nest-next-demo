const Classroom: React.FC = () => {
  return (
    <div className="tw-grid tw-grid-cols-3 tw-grid-rows-2 tw-gap-5 tw-w-full">
      <div className="tw-bg-field tw-col-span-2 tw-row-span-2 tw-h-[80vh] tw-flex tw-items-center tw-justify-center ">
        Video call
      </div>
      <div className="tw-bg-field tw-flex tw-items-center tw-justify-center ">
        Chat
      </div>
      <div className="tw-bg-field tw-flex tw-items-center tw-justify-center ">
        material
      </div>
    </div>
  );
};
export default Classroom;
