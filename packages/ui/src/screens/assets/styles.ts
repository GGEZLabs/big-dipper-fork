import { CSSObject } from '@emotion/react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    ...(theme.mixins.layout as CSSObject),
    display: 'grid',
    gridGap: theme.spacing(1),
    gridTemplateRows: 'auto auto 1fr',
    gridTemplateColumns: 'repeat(1, 1fr)',
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.up('lg')]: {
      gridGap: theme.spacing(2),
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
  dataBlocks: {
    [theme.breakpoints.up('md')]: {
      gridColumn: '1 / 3',
    },
    [theme.breakpoints.up('lg')]: {
      gridColumn: '1 / 5',
    },
  },
  hero: {
    [theme.breakpoints.up('md')]: {
      gridColumn: '1 / 3',
    },
    [theme.breakpoints.up('lg')]: {
      gridColumn: '1 / 3',
      // height: '400px', // if we can get the change feature
      height: '350px',
    },
  },
  holding: {
    [theme.breakpoints.up('md')]: {
      gridColumn: '1 / 3',
    },
    [theme.breakpoints.up('lg')]: {
      gridColumn: '1 / 5',
      // height: '400px', // if we can get the change feature
      height: 'fit-content',
      overflow: 'hidden',
    },
  },
  investment: {
    [theme.breakpoints.up('md')]: {
      gridColumn: '1 / 3',
    },
    [theme.breakpoints.up('lg')]: {
      gridColumn: '1 / 5',
      // height: '400px', // if we can get the change feature
      height: 'fit-content',
      overflow: 'hidden',
    },
  },
  boxOne: {
    height: '375px',
    [theme.breakpoints.up('md')]: {
      gridColumn: '1 / 2',
    },
    [theme.breakpoints.up('lg')]: {
      gridColumn: '3 / 4',
      // height: '400px', // if we can get the change feature
      height: '350px',
      overflow: 'hidden',
    },
  },
  boxTwo: {
    height: '375px',
    [theme.breakpoints.up('md')]: {
      gridColumn: '1 / 2',
    },
    [theme.breakpoints.up('lg')]: {
      gridColumn: '4 / 5',
      // height: '400px', // if we can get the change feature
      height: '350px',
      overflow: 'hidden',
    },
  },
  tokenomics: {
    height: '375px',
    [theme.breakpoints.up('md')]: {
      gridColumn: '1 / 2',
    },
    [theme.breakpoints.up('lg')]: {
      gridColumn: '3 / 4',
      height: '100%',
    },
  },
  consensus: {
    height: '375px',
    [theme.breakpoints.up('md')]: {
      gridColumn: '2 / 3',
    },
    [theme.breakpoints.up('lg')]: {
      gridColumn: '4 / 5',
      height: '100%',
    },
  },
  blocks: {
    [theme.breakpoints.up('md')]: {
      gridColumn: '1 / 3',
    },
    [theme.breakpoints.up('lg')]: {
      gridColumn: '1 / 3',
    },
  },
  transactions: {
    [theme.breakpoints.up('md')]: {
      gridColumn: '1 / 3',
    },
    [theme.breakpoints.up('lg')]: {
      gridColumn: '3 / 5',
    },
  },
}));

export default useStyles;
