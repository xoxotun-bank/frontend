import React from 'react';

import { Box, Paper, Typography } from '@mui/material';
import dropArrowImg from 'src/assets/dropArrow.png';
import growthArrowImg from 'src/assets/growthArrow.png';
import { StatsItem as StatsItemType } from 'src/types/Analytics';

import { analyticsPageConst } from 'src/shared/constants';
import { formatComparisonString, formatLongNumberWithSuffix } from 'src/utils/Mappers';

import styles from './Statsitem.module.css';

interface Props {
  statsItem: StatsItemType;
  period: string;
}

export const StatsItem = ({ statsItem, period }: Props) => {
  const { growthValue, mark, name, value } = statsItem;

  const valueString = formatLongNumberWithSuffix(value, mark);
  const comparisonString = formatComparisonString(growthValue, period);

  let comparisonColor = 'text.secondary';
  let comparisonImgSrc = null;
  let growthText = comparisonString;

  if (growthValue !== null) {
    comparisonColor = growthValue > 0 ? 'success.main' : 'error';
    comparisonImgSrc = growthValue >= 0 ? growthArrowImg : dropArrowImg;
  } else {
    growthText = analyticsPageConst.NO_PREV_PERIOD_DATA;
  }

  return (
    <Paper className={styles.wrapper}>
      <Typography className={styles.title} sx={{ fontWeight: 'bold' }}>
        {name}
      </Typography>
      <Typography className={styles.value} variant="h4" sx={{ fontWeight: '700' }}>
        {valueString}
      </Typography>
      <Box className={styles.comparisonStr}>
        {comparisonImgSrc && <img src={comparisonImgSrc} alt="growth icon" />}
        <Typography className={styles.growth} color={comparisonColor}>
          {growthText}
        </Typography>
      </Box>
    </Paper>
  );
};
