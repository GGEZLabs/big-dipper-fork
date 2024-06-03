import React from 'react';
import { useRecoilValue } from 'recoil';
import GgezLogoAR from 'shared-utils/assets/ggez-logo-ar.svg';
import GgezLogoWhiteAR from 'shared-utils/assets/ggez-logo-ar-white.svg';
import GgezLogoWhite from 'shared-utils/assets/ggez-logo-white.svg';
import GgezLogo from 'shared-utils/assets/ggez-logo.svg';
import useStyles from './styles';
import { useDesktop } from './hooks';
import useAppTranslation from '@/hooks/useAppTranslation';
import AppBar from '@mui/material/AppBar';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Drawer from '@mui/material/Drawer';
import { readTheme } from '@/recoil/settings';
import TitleBar from '@/components/nav/components/title_bar';
import MenuItems from '@/components/nav/components/menu_items';
import ActionBar from '@/components/nav/components/desktop/components/action_bar';

const Desktop: React.FC<{
  className?: string;
  title: string;
}> = ({ className, title }) => {
  const { classes, cx } = useStyles();
  const theme = useRecoilValue(readTheme);
  const { isMenu, toggleMenu, turnOffAll, toggleNetwork, isNetwork } = useDesktop();
  const { i18n } = useAppTranslation('common');
  const lang = i18n.language;

  return (
    <ClickAwayListener onClickAway={turnOffAll}>
      <div
        className={cx(className, classes.root)}
        //style={{textAlign : 'right',alignItems:'flex-start',position: 'absolute',right: 0}}
      >
        <AppBar
          position="fixed"
          className={cx(classes.appBar, {
            open: isMenu,
          })}
        >
          <ActionBar toggleNetwork={toggleNetwork} isNetwork={isNetwork} title={title} />
          <TitleBar title={title} />
        </AppBar>
        <Drawer
          variant="permanent"
          className={cx(classes.drawer, {
            open: isMenu,
            closed: !isMenu,
            [classes.drawerOpen]: isMenu,
            [classes.drawerClose]: !isMenu,
          })}
          anchor={lang === 'en' ? 'left' : 'right'}
          classes={{
            paper: cx({
              open: isMenu,
              closed: !isMenu,
              [classes.drawerOpen]: isMenu,
              [classes.drawerClose]: !isMenu,
            }),
          }}
        >
          {lang === 'en' && theme === 'light' ? (
            <GgezLogo className={classes.logo} onClick={toggleMenu} role="button" />
          ) : lang === 'ar' && theme === 'dark' ? (
            <GgezLogoWhiteAR className={classes.logo} onClick={toggleMenu} role="button" />
          ) : lang === 'en' && theme == 'dark' ? (
            <GgezLogoWhite className={classes.logo} onClick={toggleMenu} role="button" />
          ) : (
            <GgezLogoAR className={classes.logo} onClick={toggleMenu} role="button" />
          )}
          <MenuItems />
        </Drawer>
      </div>
    </ClickAwayListener>
  );
};

export default Desktop;
