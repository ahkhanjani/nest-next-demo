import { MediaDeviceProvider, DeviceSelectList } from '@fm/daily.co';
import { RecoilRoot } from 'recoil';

const ClassroomPageContainer: React.FC<ClassroomPageProps> = ({ roomId }) => {
  return (
    <>
      <RecoilRoot>
        <MediaDeviceProvider>
          <DeviceSelectList />
        </MediaDeviceProvider>
      </RecoilRoot>
    </>
  );
};
export default ClassroomPageContainer;

interface ClassroomPageProps {
  roomId: string;
}
