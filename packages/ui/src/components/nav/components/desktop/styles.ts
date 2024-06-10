import useAppTranslation from '@/hooks/useAppTranslation';
import { CSSObject } from '@emotion/react';
import { makeStyles } from 'tss-react/mui';
const useStyles = () => {
  const { i18n } = useAppTranslation();
  const lang = i18n.language;
  const style = makeStyles()((theme) => {
    const OPEN_DRAWER_WIDTH = 230;
    const CLOSED_DRAWER_WIDTH = 59;
    return {
      root: {
        '& .MuiDrawer-paperAnchorDockedLeft': {
          border: 'none',
        },
      },
      logo: {
        width: '216px',
        padding: theme.spacing(2, 1.75, 2.5),
        '&:hover': {
          cursor: 'pointer',
        },
      },
      appBar: {
        ...(theme.mixins.toolbar as CSSObject),
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        background: theme?.palette?.background?.default,
        color: theme?.palette?.custom?.fonts?.fontTwo ?? 'inherit',
        width: `calc(100% - ${CLOSED_DRAWER_WIDTH}px)`,
        zIndex: lang == 'en' ? theme.zIndex.drawer + 1 : theme.zIndex.drawer,
        marginRight: lang == 'ar' ? '70px' : '0px',
        paddingLeft: lang == 'ar' ? '20px' : '',
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.easeIn,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '&.MuiPaper-elevation4': {
          boxShadow: 'none',
        },
        '&.open': {
          marginLeft: OPEN_DRAWER_WIDTH,
          marginRight: lang == 'ar' ? OPEN_DRAWER_WIDTH : '',
          width: `calc(100% - ${OPEN_DRAWER_WIDTH}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.easeIn,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      },
      drawer: {
        width: OPEN_DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        paddingLeft: theme.spacing(2),
        boxSizing: 'border-box',
      },
      drawerOpen: {
        width: OPEN_DRAWER_WIDTH,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.easeIn,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.easeIn,
          duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
        width: CLOSED_DRAWER_WIDTH,
      },
    };
  });
  return style;
};
export default useStyles;
