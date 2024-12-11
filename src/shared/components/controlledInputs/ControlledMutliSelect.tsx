import React, { FC, useId } from 'react';
import { Control, useController } from 'react-hook-form';

import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps
} from '@mui/material';

interface Props extends Omit<SelectProps<string[]>, 'name'> {
  name: string;
  control: Control<any>;
  options: string[];
  pickAllOption: string;
}

export const ControlledMultiSelect: FC<Props> = ({ name, control, options, pickAllOption, ...selectProps }) => {
  const keyBase = useId();
  const {
    field: { onChange, value }
  } = useController({
    name,
    control
  });

  const handleDelete = (option: string) => {
    const newValue = value.filter((v: string) => v !== option);
    if (newValue.length === 0) onChange([pickAllOption]);
    else onChange(newValue);
  };

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValues: string[] = event.target.value as string[];
    if (selectedValues[selectedValues.length - 1] === pickAllOption || selectedValues.length === 0)
      onChange([pickAllOption]);
    else onChange(selectedValues.filter((value) => value !== pickAllOption));
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{selectProps.label}</InputLabel>
      <Select
        {...selectProps}
        multiple
        value={value}
        onChange={handleChange}
        renderValue={(selected: string[]) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() => handleDelete(value)}
                size="small"
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
              />
            ))}
          </Box>
        )}
      >
        {options.map((option, i) => (
          <MenuItem key={`${keyBase}-${i}-${option}`} value={option}>
            <Checkbox checked={value.includes(option)} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
