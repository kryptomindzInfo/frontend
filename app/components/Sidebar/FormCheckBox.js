import React from 'react';
import { useField } from 'formik';
import MuiCheckbox from '@material-ui/core/Checkbox';



export const Checkbox = ({ ...props }) => {
  const [field] = useField(props.name);
  return (
    <MuiCheckbox
      {...field}
      style={{
        color: 'rgb(53, 153, 51)',
        '&$checked': {
          color: 'rgb(53, 153, 51)',
        },
      }}
      checked={field.value}
    />
  );
};
