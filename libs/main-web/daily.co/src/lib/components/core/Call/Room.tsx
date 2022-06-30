import { PropsWithChildren } from 'react';
// cmp
import VideoContainer from '../../shared/components/VideoContainer/VideoContainer';
import Container from './Container';
import Header from './Header';
import VideoGrid from './VideoGrid';

const Room: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <Header />
      <VideoContainer>{children ? children : <VideoGrid />}</VideoContainer>
    </Container>
  );
};
export default Room;
