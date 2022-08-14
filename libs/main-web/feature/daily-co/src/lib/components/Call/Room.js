import VideoContainer from '../VideoContainer';

import { Container } from './Container';
import { Header } from './Header';
import { VideoGrid } from './VideoGrid';

export function Room({ children }) {
  return (
    <Container>
      <Header />
      <VideoContainer>{children ? children : <VideoGrid />}</VideoContainer>
    </Container>
  );
}

export default Room;
