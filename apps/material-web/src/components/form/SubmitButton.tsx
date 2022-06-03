import { FormEvent, PropsWithChildren } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

const SubmitButton: React.FC<PropsWithChildren<SubmitButtonProps>> = ({
  children,
  loading = false,
  onClick,
}) => {
  return (
    <LoadingButton id="submit" loading={loading} onClick={() => onClick()}>
      {children}
    </LoadingButton>
  );
};
export default SubmitButton;

interface SubmitButtonProps {
  loading?: boolean;
  onClick?: (e?: FormEvent<HTMLFormElement>) => void;
}
