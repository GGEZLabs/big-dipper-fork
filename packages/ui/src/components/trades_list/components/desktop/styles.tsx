import { CSSObject } from 'tss-react';
import { makeStyles } from 'tss-react/mui';

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
}));

export default useStyles;
