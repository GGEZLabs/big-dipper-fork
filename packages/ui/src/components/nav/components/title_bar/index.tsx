/* eslint-disable @next/next/no-img-element */
import Typography from '@mui/material/Typography';
import useAppTranslation from '@/hooks/useAppTranslation';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import useStyles from '@/components/nav/components/title_bar/styles';
import { formatMarket, formatVotingMarket } from '@/components/nav/components/title_bar/utils';
import { readMarket } from '@/recoil/market';
import { useScreenSize } from '@/hooks/use_screen_size';
import { useDesktop } from '../desktop/hooks';

type TitleBarProps = {
  title?: string;
};

const TitleBar: FC<TitleBarProps> = ({ title }) => {
  const { t, i18n } = useAppTranslation('common');
  const lang = i18n.language;
  const style = useStyles();
  const { classes, cx } = style();
  const { isDesktop } = useScreenSize();
  const { isMenu } = useDesktop();
  const marketState = useRecoilValue(readMarket);
  const market = formatMarket(marketState);
  const votingMarket = formatVotingMarket(marketState);
  return (
    <div
      className={cx(title, classes.root)}
      // style={{
      //   paddingLeft: isDesktop && lang == 'ar' ? '15px' : '',
      //   paddingRight: isDesktop && lang == 'ar' ? '13px' : '',
      // }}
    >
      <div className={classes.content}>
        <img
          src="https://res.cloudinary.com/dvgnuchjw/image/upload/v1717481412/ggez1-s_gq5u9i.png"
          alt="icon"
          width={35}
        />
        {votingMarket.map((x) => (
          <div key={x.key} className={classes.item}>
            <Typography variant="body1" className="label">
              {t(x.key)}
            </Typography>
            <Typography variant="body1" className="data-left">
              {x.data}
            </Typography>
          </div>
        ))}
      </div>
      <div className={classes.content}>
        <img
          src="https://res.cloudinary.com/dvgnuchjw/image/upload/v1717481418/ggez-s_fhlf1r.png"
          alt="icon"
          width={35}
        />
        {market.map((x) => (
          <div key={x.key} className={classes.item}>
            <Typography variant="body1" className="label">
              {t(x.key)}
            </Typography>
            <Typography variant="body1" className="data-right">
              {x.data}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleBar;
