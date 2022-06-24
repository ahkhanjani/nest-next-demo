const ClassroomPage: React.FC<ClassroomPageProps> = ({ roomId }) => {
  return <p>{roomId}</p>;
};
export default ClassroomPage;

interface ClassroomPageProps {
  roomId: string | string[];
}
