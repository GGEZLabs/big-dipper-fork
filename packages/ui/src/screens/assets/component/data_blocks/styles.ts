/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'grid',
    gridGap: theme.spacing(1),
    gridTemplateRows: 'auto',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.up('lg')]: {
      gridGap: theme.spacing(2),
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
  blockHeight: {
    background: '#8400CD',
  },
  blockTime: {
    background: '#A700FC',
  },
  price: {
    background: '#DA00FD',
  },
  validators: {
    background: '#FF3CFE',
  },
}));

export default useStyles;
