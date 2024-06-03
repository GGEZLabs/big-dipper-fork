import { makeStyles } from 'tss-react/mui';
export const useStyles = makeStyles()((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  label: {
    marginBottom: theme.spacing(2),
  },
  data: {
    display: 'flex',
    '& .data__item': {
      width: '50%',
      paddingTop: '15px',
      whiteSpace: 'pre-wrap',
      '& h4': {
        color: theme.palette.custom.fonts.fontTwo,
      },
      '& .MuiTypography-caption': {
        color: theme.palette.custom.fonts.fontThree,
      },
      '& .loading': {
        width: '20%',
      },
    },
  },
  icons: {
    '& svg': {
      width: theme.spacing(4.5),
      height: theme.spacing(4.5),
    },
  },
  dialog: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    '& .MuiTypography-body1': {
      marginBottom: theme.spacing(2),
    },
    '& .dialog__share--wrapper': {
      marginTop: theme.spacing(2),
    },
    '& .share-buttons': {
      '&:not(:last-child)': {
        marginRight: theme.spacing(1),
      },
      '&.email': {
        '& circle': {
          fill: theme.palette.primary.main,
        },
      },
    },
  },
  legends: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    width: '100%',
    '& .MuiTypography-caption': {
      color: theme.palette.custom.fonts.fontThree,
    },
    '& .address': {
      color: theme.palette.custom.customCreateAccountBGmenomic.one,
    },
    '& .legends__item': {
      width: '50%',
      '&:before': {
        content: '""',
        display: 'inline-block',
        width: '12px',
        height: '12px',
        marginRight: '5px',
      },
      '&:first-of-type:before': {
        background: theme.palette.custom.tokenomics.one,
      },
      '&:nth-of-type(2):before': {
        background: theme.palette.custom.tokenomics.two,
      },
      '&:last-child:before': {
        background: theme.palette.custom.tokenomics.three,
      },
      '& .caption__percent': {
        color: theme.palette.custom.fonts.fontThree,
      },
    },
  },
  content: {
    flex: 0.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  actionIcons: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  item: {
    padding: theme.spacing(2, 0),
    color: theme.palette.custom.fonts.fontTwo,
    '&:first-of-type': {
      paddingTop: 0,
    },
    '&:last-child': {
      paddingBottom: 0,
    },
    '&:not(:last-child)': {
      borderBottom: `solid 1px ${theme.palette.divider}`,
    },
    '& .label': {
      marginBottom: theme.spacing(1),
    },
    '& .detail': {
      '&.MuiTypography-body1': {
        wordWrap: 'break-word',
      },
    },
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
    [theme.breakpoints.up('md')]: {
      padding: 0,
      '&:not(:last-child)': {
        borderBottom: 'none',
      },
      '& .label': {
        marginBottom: 0,
      },
    },
  },
  copyText: {
    '& .detail': {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end',
      '& svg': {
        width: '1rem',
        marginLeft: theme.spacing(1),
      },
    },
  },
}));
