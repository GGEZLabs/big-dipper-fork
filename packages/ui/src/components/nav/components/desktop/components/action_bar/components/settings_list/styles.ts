import useAppTranslation from '@/hooks/useAppTranslation';
import { makeStyles } from 'tss-react/mui';

const useStyles = () => {
  const { i18n } = useAppTranslation();
  const lang = i18n.language;
  const style = makeStyles()((theme) => ({
    icon: {
      paddingRight: lang === 'ar' ? 10 : 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        cursor: 'pointer',
      },
      '& svg': {
        fill: theme.palette.custom.general.icon,
        '& path': {
          fill: theme.palette.custom.general.icon,
        },
      },
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& .MuiIconButton-root': {
        padding: 0,
      },
    },
    timeToggleDiv: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingTop: theme.spacing(1.25),
    },
    title: {
      display: 'flex',
      alignItems: 'center',
    },
    dialog: {
      '& .MuiDialog-paper': {
        width: '500px',
      },
    },
    formItem: {
      marginBottom: theme.spacing(2),
      '& .MuiOutlinedInput-root': {
        width: '100%',
      },
      '& .form-item--label': {
        marginBottom: theme.spacing(1),
      },
    },
    version: {
      color: theme.palette.custom.fonts.fontFour,
      marginLeft: theme.spacing(1),
    },
  }));
  return style;
};

export default useStyles;
