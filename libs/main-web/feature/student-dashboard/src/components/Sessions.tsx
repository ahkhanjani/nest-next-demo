import { useId } from 'react';
import SessionCard from './SessionCard';

// TODO provide type for list
const Sessions: React.FC<{ sessionList: Session[] }> = ({
  sessionList: list,
}) => {
  const domId = useId();
  return (
    <>
      {list.map((s) => (
        <SessionCard key={domId + s.id} session={s} />
      ))}
    </>
  );
};
export default Sessions;

export interface Session {
  id: string;
  date: Date;
  timeZone: string;
  participants: string;
}
