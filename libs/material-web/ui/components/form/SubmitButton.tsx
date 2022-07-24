import { FormEvent, PropsWithChildren } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

const SubmitButton: React.FC<PropsWithChildren<SubmitButtonProps>> = ({
  children,
  onClick,
  loading = false,
  disabled = false,
}) => {
  return (
    <LoadingButton
      id="submit"
      onClick={() => onClick()}
      {...{ loading, disabled }}
    >
      {children}
    </LoadingButton>
  );
};
export default SubmitButton;

interface SubmitButtonProps {
  loading?: boolean;
  disabled?: boolean;
  onClick: (e?: FormEvent<HTMLFormElement>) => void;
}
