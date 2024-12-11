import React from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Stack, Tooltip, Typography } from '@mui/material';

import { HeaderConst } from 'shared/constants/localeConstants';

const HeaderUnauth = () => {
  return (
    <>
      <Box>
        <Typography align="left" color="#373A36 " variant="subtitle1">
          {HeaderConst.PHONE_NUM1}
        </Typography>
        <Typography align="left" color="#999999" variant="caption">
          {HeaderConst.TEXT_PHONE1}
        </Typography>
      </Box>
      <Box>
        <Typography align="left" color="#373A36" variant="subtitle1">
          {HeaderConst.PHONE_NUM2}
        </Typography>
        <Typography align="left" color="#999999" variant="caption">
          {HeaderConst.TEXT_PHONE2}
        </Typography>
      </Box>
      <Stack spacing={1} direction="row" alignItems="center">
        <Tooltip title={HeaderConst.TEXT_SUPP_MODAL}>
          <InfoOutlinedIcon />
        </Tooltip>
        <Typography align="left" color="#373A36" variant="caption">
          {HeaderConst.TEXT_SUPP}
        </Typography>
      </Stack>
    </>
  );
};

export default HeaderUnauth;
