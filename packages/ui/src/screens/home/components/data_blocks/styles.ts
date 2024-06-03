import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'grid',
    gap: theme.spacing(1),
    gridTemplateRows: 'auto',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.up('lg')]: {
      gap: theme.spacing(2),
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },

  blockHeight: {
    background: '#0055AB', // theme.palette.custom.primaryData.five,
  },
  blockTime: {
    background: '#0079F2', // theme.palette.custom.primaryData.two,
  },
  price: {
    background: '#2994FF', // theme.palette.custom.primaryData.three,
  },
  validators: {
    background: '#71B8FF', // theme.palette.custom.primaryData.four,
  },
}));

export default useStyles;
