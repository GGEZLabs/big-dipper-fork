import React from 'react';
import numeral from 'numeral';
import useAppTranslation from '@/hooks/useAppTranslation';
import { SingleBlock } from './components';
import useStyles from './styles';
import { useDataBlocks } from './hooks';

const DataBlocks: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { t } = useAppTranslation('assets');
  const { classes, cx } = useStyles();
  const { state } = useDataBlocks();
  const data = [
    {
      key: t('investmentValue'),
      value: `$${numeral(state.assetsPurchaseValue).format('0,0.00')}`,
      className: classes.blockHeight,
    },
    {
      key: t('currentInvestmentValue'),
      value: `$${numeral(state.assetsCurrentValue).format('0,0.00')}`,
      className: classes.blockTime,
    },
    {
      key: t('returnAmount'),
      value:
        state.returnAmount !== null ? `$${numeral(state.returnAmount).format('0,0.00')}` : 'N/A',
      className: classes.price,
    },
    {
      key: t('returnPercent'),
      value: `${numeral(state.returnPercent).format('0.00')}%`,
      description: t('noOfHoldings', {
        count: state.heldNoAssets,
      }),
      className: classes.validators,
    },
  ];

  return (
    <div className={cx(classes.root, className)}>
      {data.map((x) => (
        <SingleBlock
          key={x.key}
          label={x.key}
          value={x.value}
          description={x.description}
          className={x.className}
        />
      ))}
    </div>
  );
};

export default DataBlocks;
