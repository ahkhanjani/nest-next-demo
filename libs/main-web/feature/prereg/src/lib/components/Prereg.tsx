// context
import { PreregServiceProvider } from '../service/PreregServiceProvider';
// cmp
import PreregForm from './PreregForm';

export const Prereg: React.FC = () => {
  return (
    <PreregServiceProvider>
      <PreregForm />
    </PreregServiceProvider>
  );
};
export default Prereg;
