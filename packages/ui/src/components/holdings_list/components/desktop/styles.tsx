/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeStyles } from 'tss-react/mui';
import { CSSObject } from '@emotion/react';

const useStyles = makeStyles()((theme) => ({
  root: {
    height: '100%',
  },
  cell: {
    ...(theme.mixins.tableCell as CSSObject),
  },
  body: {
    color: theme.palette.custom.fonts.fontTwo,
  },
  table: {
    '& .MuiTableBody-root': {
      '& .MuiTableCell-root': {
        whiteSpace: 'nowrap',
      },
    },
  },
  toolTip: {
    paddingBottom: 5,
  },
  flex: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    '& > div': {
      width: '50%',
    },
  },
}));

export default useStyles;
