import React, { FC, useId } from 'react';

import { Chip, Grid, Stack, Typography } from '@mui/material';
import { ClientCategory } from 'src/types';

import { IdentifyClientConstants } from 'src/shared/constants';

interface Props {
  name: string;
  categories: string[];
}

const splitIntoRows = (arr: string[], rowSize: number): string[][] => {
  return arr.reduce((acc: string[][], curr, index) => {
    if (index % rowSize === 0) acc.push([curr]);
    else acc[acc.length - 1].push(curr);
    return acc;
  }, []);
};

export const ClientInfo: FC<Props> = ({ name, categories }) => {
  const keyBase = useId();
  const rows = splitIntoRows(categories, 10);

  return (
    <Stack pb={1}>
      <Typography variant="h6">{name}</Typography>
      <Grid container spacing={1} pb={1} pt={1}>
        {rows.map((row, rowIndex) => (
          <Grid item xs={12} key={`${keyBase}-row-${rowIndex}`}>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              <Typography color="#707070">{IdentifyClientConstants.CLIENT_TYPE}</Typography>
              {row.map((category, i) => {
                const color = category !== ClientCategory.CLIENT ? 'primary' : 'default';
                return (
                  <Chip
                    key={`${keyBase}-${rowIndex}-${i}`}
                    label={category}
                    variant="outlined"
                    color={color}
                    style={{ marginBottom: '5px' }}
                  />
                );
              })}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
