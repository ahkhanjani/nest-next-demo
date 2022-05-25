import { PropsWithChildren } from 'react';
import Button from '@mui/material/Button';

const SubmitButton: React.FC<PropsWithChildren<SubmitButtonProps>> = ({
  children,
  loading = false,
  onClick,
}) => {
  return (
    <Button id='submit' {...{ loading, onClick }}>
      {children}
    </Button>
  );
};
export default SubmitButton;

interface SubmitButtonProps {
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
