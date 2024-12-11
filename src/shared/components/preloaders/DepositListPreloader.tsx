import React from 'react';

import { Card, CardContent, Skeleton, Stack } from '@mui/material';

export const DepositListPreloader = () => (
  <Card elevation={0} sx={{ borderRadius: '10px', marginBottom: '25px', border: '1px solid lightgray' }}>
    <CardContent>
      <Stack direction="column" justifyContent="space-between" alignItems="start" spacing={1}>
        <Skeleton sx={{ height: '40px', width: '80px' }} />
        <Stack direction="row" spacing={4} justifyContent="space-between">
          <Stack>
            <Skeleton variant="text" sx={{ height: '16px', width: '56px' }} />
            <Skeleton variant="text" sx={{ height: '26px', width: '100px' }} />
          </Stack>
          <Stack>
            <Skeleton variant="text" sx={{ height: '16px', width: '126px' }} />
            <Skeleton variant="text" sx={{ height: '26px', width: '55px' }} />
          </Stack>
          <Stack>
            <Skeleton variant="text" sx={{ height: '16px', width: '64px' }} />
            <Skeleton variant="text" sx={{ height: '26px', width: '55px' }} />
          </Stack>
          <Stack>
            <Skeleton variant="text" sx={{ height: '16px', width: '160px' }} />
            <Skeleton variant="text" sx={{ height: '26px', width: '100px' }} />
          </Stack>
          <Stack>
            <Skeleton variant="text" sx={{ height: '16px', width: '40px' }} />
            <Skeleton variant="text" sx={{ height: '26px', width: '50px' }} />
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Skeleton sx={{ height: '45px', width: '140px', borderRadius: '18px' }} />
          <Skeleton sx={{ height: '45px', width: '90px', borderRadius: '18px' }} />
          <Skeleton sx={{ height: '45px', width: '120px', borderRadius: '18px' }} />
        </Stack>
      </Stack>
    </CardContent>
  </Card>
);
