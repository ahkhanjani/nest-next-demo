import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

const EditButton = () => {
  return (
    <IconButton
      edge="end"
      aria-label="edit"
      onClick={() => handleClickEdit(ctg)}
    >
      <EditIcon />
    </IconButton>
  );
};

export default EditButton;

interface EditButtonProps {
  onClick: () => void;
}
