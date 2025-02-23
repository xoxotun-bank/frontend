import React, { FC } from 'react';
import { Control, useController } from 'react-hook-form';

import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps } from '@mui/material';

import { CalculatorConstants, UNDEFINED } from 'src/shared/constants';

interface Props extends Omit<ToggleButtonGroupProps, 'name'> {
  name: string;
  control: Control<any>;
}

export const ControlledToggleButtonGroup: FC<Props> = ({ name, control, ...toggleButtonGroupProps }) => {
  const { field } = useController({
    name,
    control
  });

  return (
    <ToggleButtonGroup
      {...field}
      {...toggleButtonGroupProps}
      value={field.value}
      onChange={(_, value) => field.onChange(value !== null ? value : UNDEFINED)}
    >
      <ToggleButton size="small" value={UNDEFINED}>
        {CalculatorConstants.NOT_IMPORTANT}
      </ToggleButton>
      <ToggleButton size="small" value={false}>
        {CalculatorConstants.NO}
      </ToggleButton>
      <ToggleButton size="small" value={true}>
        {CalculatorConstants.YES}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
