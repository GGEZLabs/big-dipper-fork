/* eslint-disable arrow-body-style */
import chainConfig from '@/chainConfig';
import SocialMedia from '@/components/footer/components/social_media';
import useStyles from '@/components/footer/styles';
import { footerLinks } from '@/components/footer/utils';
import generalConfig from '@/generalConfig';
import { readTheme } from '@/recoil/settings';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import AppTrans from '@/components/AppTrans';
import useAppTranslation from '@/hooks/useAppTranslation';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import FooterGgezLogo from 'shared-utils/assets/footer-ggez-logo.svg';
import FooterLogoDark from 'shared-utils/assets/footer-ggez-logo -white.svg';

const { title } = chainConfig();

const Footer: FC<{ className?: string }> = ({ className }) => {
  const { t } = useAppTranslation();
  const { classes, cx } = useStyles();
  const theme = useRecoilValue(readTheme);

  // ============================
  // Footer
  // ============================
  const year = new Date().getFullYear();

  return (
    <div className={cx(className, classes.root)}>
      <div className={cx('footer')}>
        {/* ============================= */}
        {/* logo */}
        {/* ============================= */}
        <div className="footer__logo--container">
          {theme === 'light' ? (
            <FooterGgezLogo className="footer__logo" />
          ) : (
            <FooterLogoDark className="footer__logo" />
          )}
          <p className="footer__slogan">{title}</p>
        </div>
        {/* ============================= */}
        {/* links */}
        {/* ============================= */}
        <div className="footer__links">
          {footerLinks.map((group) => {
            return (
              <div key={group.key} className={`${group.key} links__group`}>
                <h3>{t(`common:${group.key}`)}</h3>
                {group.links.map((x) => {
                  return (
                    <a key={x.url} href={x.url} target="_blank" rel="noreferrer">
                      {t(`common:${x.key}`)}
                    </a>
                  );
                })}
              </div>
            );
          })}
          {/* ============================= */}
          {/* social */}
          {/* ============================= */}
          <div className="footer__social">
            <h3>{t('common:community')}</h3>
            <SocialMedia />
          </div>
        </div>
      </div>
      <Divider />
      <div className="footer__closing--container">
        <Typography className="footer__closing--text">
          {/* ============================= */}
          {/*
            WARNING: WE ARE USING APACHE 2.0 LICENSE
            DO YOUR RESEARCH BEFORE TRYING TO REMOVE/ EDIT THE FOLLOWING LINE(S)
            RESPECT OPEN SOURCE!!
          */}
          {/* ============================= */}
          <AppTrans
            i18nKey="common:copyright"
            components={[
              // eslint-disable-next-line
              <a target="_blank" rel="noreferrer" href="https://ggez.one/legal/terms" />,
            ]}
            values={{
              name: generalConfig.maintainer.name,
            }}
          />{' '}
          {year}
        </Typography>
        <Typography className="footer__closing--text">
          <AppTrans
            i18nKey="common:maintainBy"
            components={[
              // eslint-disable-next-line
              <a target="_blank" rel="noreferrer" href={generalConfig.maintainer.url} />,
            ]}
            values={{
              name: generalConfig.maintainer.name,
            }}
          />
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
