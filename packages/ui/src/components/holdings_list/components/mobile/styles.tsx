/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
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
