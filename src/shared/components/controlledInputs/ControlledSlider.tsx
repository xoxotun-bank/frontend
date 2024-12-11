import React, { FC } from 'react';
import { Control, useController } from 'react-hook-form';

import { Slider, SliderProps } from '@mui/material';

interface Props extends Omit<SliderProps, 'name'> {
  name: string;
  control: Control<any>;
}

export const ControlledSlider: FC<Props> = ({ name, control, ...sliderProps }) => {
  const { field } = useController({
    name,
    control
  });

  return <Slider {...sliderProps} {...field} />;
};
