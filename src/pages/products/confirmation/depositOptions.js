/* eslint-disable i18n/no-russian-character */
import React from 'react';

import capitalizationPeriod from 'src/assets/capitalizationPeriod.png';
import category from 'src/assets/category.png';
import percent from 'src/assets/percent.png';
import period from 'src/assets/period.png';
import profit from 'src/assets/profit.png';
import profitInPercent from 'src/assets/profitInPercent.png';

export const depositOptions = {
  percent: {
    translation: 'Ставка',
    unit: '%',
    icon: <img src={percent} />
  },
  category: {
    translation: 'Тип клиента',
    unit: '',
    icon: <img src={category} />
  },
  period: {
    translation: 'Срок вклада',
    unit: ' мес.',
    icon: <img src={period} />
  },
  capitalizationPeriod: {
    translation: 'Периодичность выплат',
    unit: '',
    icon: <img src={capitalizationPeriod} />
  },
  profit: {
    translation: 'Доход',
    unit: '',
    icon: <img src={profit} />
  },
  profitInPercent: {
    translation: 'Доход (%)',
    unit: '%',
    icon: <img src={profitInPercent} />
  }
};
