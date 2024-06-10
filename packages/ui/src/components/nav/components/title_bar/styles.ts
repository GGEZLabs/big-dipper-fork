import useAppTranslation from '@/hooks/useAppTranslation';
import { makeStyles } from 'tss-react/mui';

const useStyles = () => {
  const { i18n } = useAppTranslation();
  const lang = i18n.language;
  const style = makeStyles()((theme) => ({
    root: {
      padding: theme.spacing(1, 2),
      display: 'flex',
      gridGap: '16px',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'flex-start',
      [theme.breakpoints.up('lg')]: {
        padding: lang == 'en' ? theme.spacing(1, 3) : lang == 'ar' ? theme.spacing(1, 1.75) : '',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        '& .MuiTypography-h1': {
          lineHeight: 1,
          alignSelf: 'flex-end',
        },
      },
    },
    logo: {
      height: '56px',
      // width: '225px',
    },
    content: {
      width: '100%',
      background: theme.palette.custom.general.surfaceOne,
      marginTop: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
      },
      [theme.breakpoints.up('lg')]: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 0,
        width: '70%',
        padding: theme.spacing(1, 3),
        flexWrap: 'nowrap',
      },
    },
    item: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      padding: theme.spacing(1),
      width: '100%',
      '& .label': {
        marginRight: theme.spacing(1),
        fontSize: '0.875rem',
      },
      '& .data-left': {
        fontSize: '1.05rem',
        color: '#039abf',
      },
      '& .data-right': {
        fontSize: '1.05rem',
        color: '#8400CD',
      },
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      [theme.breakpoints.up('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      [theme.breakpoints.up('lg')]: {
        padding: 0,
        width: 'auto',
      },
    },
  }));
  return style;
};

export default useStyles;
